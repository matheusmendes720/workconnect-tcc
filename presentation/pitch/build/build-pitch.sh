#!/usr/bin/env bash
# build-pitch.sh — pipeline FFmpeg (POSIX) para o pitch WorkConnect.
# Pré-requisitos:
#   - ffmpeg + ffprobe no PATH
#   - jq para parsing do EDL.json
#   - 28 PNGs em build/frames/ (1920×1080)
#   - build/audio/voice.mp3 e build/audio/track.mp3
# Uso:
#   bash build/build-pitch.sh

set -euo pipefail
cd "$(dirname "$0")/.."

# ============== CONFIG ==============
EDL="build/EDL.json"
FRAMES_DIR="build/frames"
CLIPS_DIR="build/clips"
EXPORTS_DIR="build/exports"
VOICE="build/audio/voice.mp3"
TRACK="build/audio/track.mp3"
FINAL="$EXPORTS_DIR/workconnect-pitch.mp4"

mkdir -p "$FRAMES_DIR" "$CLIPS_DIR" "$EXPORTS_DIR"

# ============== ETAPA 2: PNG -> CLIP ==============
echo "ETAPA 2 — Convertendo PNGs em clipes de vídeo..."

scenes_count=$(jq '.scenes | length' "$EDL")

for i in $(seq 0 $((scenes_count - 1))); do
    id=$(jq -r ".scenes[$i].id" "$EDL")
    dur=$(jq -r ".scenes[$i].duration" "$EDL")
    png="$FRAMES_DIR/scene_${id}.png"
    clip="$CLIPS_DIR/clip_${id}.mp4"
    if [ ! -f "$png" ]; then
        echo "  ! Frame ausente: $png — pulando."
        continue
    fi
    echo "  → $id (${dur}s)"
    fade_out_start=$(echo "$dur - 0.4" | bc)
    ffmpeg -y -hide_banner -loglevel error \
        -loop 1 -framerate 30 -t "$dur" \
        -i "$png" \
        -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=0.4,fade=t=out:st=${fade_out_start}:d=0.4" \
        -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p \
        "$clip"
done

# ============== ETAPA 3: CONCAT com xfade ==============
echo "ETAPA 3 — Concatenando clipes com cross-dissolve..."

inputs=()
filter_complex=""
prev=""
offset=0.0
last_index=-1

for i in $(seq 0 $((scenes_count - 1))); do
    id=$(jq -r ".scenes[$i].id" "$EDL")
    dur=$(jq -r ".scenes[$i].duration" "$EDL")
    clip="$CLIPS_DIR/clip_${id}.mp4"
    [ -f "$clip" ] || continue
    inputs+=(-i "$clip")
    last_index=$i
done

filter_complex=""
running_offset=0.0
chain_index=0
echo_inputs=()
prev_index=-1

# reconstrói inputs já filtrados
i_real=0
declare -A clip_index
for i in $(seq 0 $((scenes_count - 1))); do
    id=$(jq -r ".scenes[$i].id" "$EDL")
    clip="$CLIPS_DIR/clip_${id}.mp4"
    if [ -f "$clip" ]; then
        clip_index[$id]=$i_real
        i_real=$((i_real + 1))
    fi
done

# monta xfade
prev_real=0
running_offset=0.0
i_real=0
for i in $(seq 0 $((scenes_count - 1))); do
    id=$(jq -r ".scenes[$i].id" "$EDL")
    clip="$CLIPS_DIR/clip_${id}.mp4"
    [ -f "$clip" ] || continue
    if [ $i_real -eq 0 ]; then
        i_real=$((i_real + 1))
        prev_real=$i_real
        continue
    fi
    cur_dur=$(jq -r ".scenes[$i-1].duration" "$EDL")
    running_offset=$(echo "$running_offset + $cur_dur - 0.4" | bc)
    if [ $i_real -eq 1 ]; then
        filter_complex="${filter_complex}[0:v][1:v]xfade=transition=fade:duration=0.4:offset=${running_offset}[v1];"
    else
        prev_label=$((i_real - 1))
        filter_complex="${filter_complex}[v${prev_label}][${i_real}:v]xfade=transition=fade:duration=0.4:offset=${running_offset}[v${i_real}];"
    fi
    i_real=$((i_real + 1))
done

total_clips=$i_real
filter_complex="${filter_complex}[v$((total_clips - 1))]format=yuv420p[v]"

ffmpeg -y -hide_banner -loglevel error "${inputs[@]}" \
    -filter_complex "$filter_complex" \
    -map "[v]" \
    -c:v libx264 -preset slow -crf 18 -an \
    "$EXPORTS_DIR/workconnect-pitch-noaudio.mp4"

# ============== ETAPA 4: AUDIO MIX ==============
echo "ETAPA 4 — Mixando voz + trilha..."

audio_filter="[1:a]volume=1.0[voice];[2:a]volume=0.3,afade=t=in:st=0:d=1,afade=t=out:st=205:d=5[track];[voice][track]amerge=inputs=2[at];[at]loudnorm=I=-16:TP=-1.5:LRA=11[audio]"

ffmpeg -y -hide_banner -loglevel error \
    -i "$EXPORTS_DIR/workconnect-pitch-noaudio.mp4" \
    -i "$VOICE" \
    -i "$TRACK" \
    -filter_complex "$audio_filter" \
    -map "0:v" -map "[audio]" \
    -c:v copy -c:a aac -b:a 192k \
    -shortest \
    "$FINAL"

rm -f "$EXPORTS_DIR/workconnect-pitch-noaudio.mp4"

# ============== VERIFICA ==============
echo "VERIFICA — ffprobe do MP4 final..."
ffprobe -v error -select_streams v:0 \
    -show_entries stream=width,height,r_frame_rate,codec_name \
    -of default=noprint_wrappers=1 "$FINAL"
ffprobe -v error -show_entries format=duration,size,bit_rate \
    -of default=noprint_wrappers=1 "$FINAL"

echo
echo "✓ MP4 final em: $FINAL"