<#
  build-pitch.ps1 — pipeline FFmpeg para o pitch WorkConnect.
  Pré-requisitos:
    - FFmpeg 8.1.2+ (winget install Gyan.FFmpeg)
    - ImageMagick (scoop install imagemagick)
    - 28 PNGs em build/frames/ (1920×1080)
    - build/audio/voice.mp3 e build/audio/track.mp3
  Uso:
    pwsh -ExecutionPolicy Bypass -File build/build-pitch.ps1
#>

$ErrorActionPreference = "Stop"
Set-Location -Path (Split-Path -Parent $PSScriptRoot)

# ============== CONFIG ==============
$FFMPEG = "C:\Users\mathe\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffmpeg.exe"
$FFPROBE = "C:\Users\mathe\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffprobe.exe"
$EDL = "build\EDL.json"
$FRAMES_DIR = "build\frames"
$CLIPS_DIR = "build\clips"
$EXPORTS_DIR = "build\exports"
$VOICE = "build\audio\voice.mp3"
$TRACK = "build\audio\track.mp3"
$FINAL = "$EXPORTS_DIR\workconnect-pitch.mp4"

# Cria diretórios
New-Item -Force -ItemType Directory -Path $FRAMES_DIR,$CLIPS_DIR,$EXPORTS_DIR | Out-Null

# ============== ETAPA 2: PNG -> CLIP ==============
Write-Host "ETAPA 2 — Convertendo PNGs em clipes de vídeo..." -ForegroundColor Cyan

$scenes = Get-Content $EDL -Raw | ConvertFrom-Json
$filter = $scenes.scenes

foreach ($s in $filter) {
    $png = "$FRAMES_DIR\scene_$($s.id).png"
    $clip = "$CLIPS_DIR\clip_$($s.id).mp4"
    if (-not (Test-Path $png)) {
        Write-Warning "Frame ausente: $png — pulando."
        continue
    }
    Write-Host "  → $($s.id) ($($s.duration)s)"
    & $FFMPEG -y -hide_banner -loglevel error `
        -loop 1 -framerate 30 -t $s.duration `
        -i $png `
        -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=0.4,fade=t=out:st=$($s.duration - 0.4):d=0.4" `
        -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p `
        $clip
}

# ============== ETAPA 3: CONCAT com xfade ==============
Write-Host "ETAPA 3 — Concatenando clipes com cross-dissolve..." -ForegroundColor Cyan

$inputs = @()
$filterComplex = ""
$prev = ""
$offset = 0.0

for ($i = 0; $i -lt $filter.Count; $i++) {
    $s = $filter[$i]
    $clip = "$CLIPS_DIR\clip_$($s.id).mp4"
    if (-not (Test-Path $clip)) { continue }
    $inputs += "-i `"$clip`""
    if ($i -eq 0) { continue }
    $offset += [double]$filter[$i - 1].duration - 0.4
    $tail = if ($i -eq $filter.Count - 1) { "format=yuv420p[v]" } else { "[v$i]" }
    if ($i -eq 1) {
        $filterComplex += "[0:v][1:v]xfade=transition=fade:duration=0.4:offset=$offset[v1];"
    } else {
        $filterComplex += "[v$($i-1)][$i:v]xfade=transition=fade:duration=0.4:offset=$offset[v$i];"
    }
}
$filterComplex += "[v$($filter.Count-1)]format=yuv420p[v]"

$cmd = "$FFMPEG -y -hide_banner -loglevel error $($inputs -join ' ') -filter_complex `"$filterComplex`" -map `"[v]`" -c:v libx264 -preset slow -crf 18 -an $EXPORTS_DIR\workconnect-pitch-noaudio.mp4"
Invoke-Expression $cmd

# ============== ETAPA 4: AUDIO MIX ==============
Write-Host "ETAPA 4 — Mixando voz + trilha..." -ForegroundColor Cyan

$audioFilter = "[1:a]volume=1.0[voice];[2:a]volume=0.3,afade=t=in:st=0:d=1,afade=t=out:st=205:d=5[track];[voice][track]amerge=inputs=2[at];[at]loudnorm=I=-16:TP=-1.5:LRA=11[audio]"

& $FFMPEG -y -hide_banner -loglevel error `
    -i $EXPORTS_DIR\workconnect-pitch-noaudio.mp4 `
    -i $VOICE `
    -i $TRACK `
    -filter_complex $audioFilter `
    -map "0:v" -map "[audio]" `
    -c:v copy -c:a aac -b:a 192k `
    -shortest `
    $FINAL

# Cleanup intermediário
Remove-Item "$EXPORTS_DIR\workconnect-pitch-noaudio.mp4" -ErrorAction SilentlyContinue

# ============== VERIFICA ==============
Write-Host "VERIFICA — ffprobe do MP4 final..." -ForegroundColor Green
& $FFPROBE -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,codec_name -of default=noprint_wrappers=1 $FINAL
& $FFPROBE -v error -show_entries format=duration,size,bit_rate -of default=noprint_wrappers=1 $FINAL

Write-Host "`n✓ MP4 final em: $FINAL" -ForegroundColor Green