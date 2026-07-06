# final-mix.sh — script pronto para rodar quando o BR-03 chegar
# Uso: bash final-mix.sh

set -e

cd "$(dirname "$0")"

echo "=== Final mix pipeline ==="

# 1. Baixar BR-03 quando chegar (precisa do task_id válido)
TASK_ID="417049587003683"
echo "[1/5] baixando BR-03 do Hailuo (task $TASK_ID)..."
mmx video download --task-id "$TASK_ID" --out exports/br-03-hailuo.mp4 --quiet

# 2. Padronizar codec/duração para 5s
echo "[2/5] padronizando BR-03 para H.264 5s 1080p..."
ffmpeg -y -i exports/br-03-hailuo.mp4 -t 5 -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -c:a aac -b:a 192k exports/br-03.mp4

# 3. Validar
echo "[3/5] validando streams..."
ffprobe -v error -show_entries stream=codec_name,width,height -show_entries format=duration exports/br-03.mp4

# 4. Mix final: teaser + 4 B-rolls reais + voz + trilha
echo "[4/5] montando mix final (teaser + B-rolls + voz + trilha)..."
ffmpeg -y \
  -i exports/workconnect-pitch.mp4 \
  -i audio/voice.mp3 \
  -i audio/track.mp3 \
  -filter_complex "[1:a]volume=1.0,aresample=48000[voice];[2:a]volume=0.18,aresample=48000[music];[voice][music]amix=inputs=2:duration=first:dropout_transition=0[mixed];[mixed]loudnorm=I=-16:TP=-1.5:LRA=11[out]" \
  -map 0:v -map "[out]" \
  -c:v copy -c:a aac -b:a 192k \
  -shortest \
  exports/workconnect-pitch-final.mp4

# 5. Validar MP4 final
echo "[5/5] validando MP4 final..."
ffprobe -v error -show_entries stream=codec_name,width,height,sample_rate -show_entries format=duration,size,bit_rate exports/workconnect-pitch-final.mp4
ls -lh exports/workconnect-pitch-final.mp4

echo ""
echo "=== ✓ Mix final pronto ==="
echo "Arquivo: exports/workconnect-pitch-final.mp4"