// generate-voice.mjs — gera os 6 blocos de narração via ElevenLabs API
// Uso: ELEVENLABS_API_KEY=sk_xxx node generate-voice.mjs

import { writeFile, readdir, unlink } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error('❌ ELEVENLABS_API_KEY não definida. Use: ELEVENLABS_API_KEY=sk_xxx node generate-voice.mjs');
  process.exit(1);
}

const VOICE_ID = 'onwK4e9ZLuTAKqWW03F9'; // Daniel - PT-BR friendly
// Alternatives: ErXwobaYiN019PkySvjV (Antoni), AZnzlk1XvdvUeBnXmlld (Adam)
const MODEL_ID = 'eleven_multilingual_v2';

// 6 blocos de locução
const BLOCOS = [
  {
    id: 'bloco-1-cold',
    text: `Uma em cada três pequenas empresas… perde dinheiro em estoque parado.
Quase metade… não sabe o que vence amanhã.
Sessenta por cento… ainda controla tudo em planilha.
E no fim do mês… sobra menos do que deveria.

Existe um jeito melhor.
WorkConnect.`,
  },
  {
    id: 'bloco-2-tour',
    text: `Tudo que importa — em uma tela.
O que fazer primeiro… já está aqui.

Cada produto. Quantidade. Mínimo. Status. Em uma linha.

Capital por categoria — em um clique.

Na prática — conferir, separar, reabastecer — sem planilha.

Top entrega em cinco. Pior — em dez.
Isso é prazo de produção.

Cada entrada. Cada saída. Cada NF — registrada com timestamp.

Quatro críticos. Resolvidos em um clique.
Fila por urgência — não por alfabeto.

Sem superlotar um. Sem ocioso o outro.
Cada pedido — no endereço certo.

Vence amanhã — vendo hoje. Em vez de perder.

Em noventa dias — ruptura caiu oitenta por cento.
Capital liberado. Quase dez mil.`,
  },
  {
    id: 'bloco-3-plot',
    text: `Doze abaixo do mínimo — hoje, um.

Dez mil reais — de volta ao caixa.

Cada clique deixa rastro.

Catorze horas livres — por semana.`,
  },
  {
    id: 'bloco-4-selo',
    text: `E quando o alerta chega — a equipe age. Não espera segunda.

Cada acesso — registrado.
Cada exportação — consentida.
Você sabe quem viu o quê, quando.
Isso vale ouro… numa auditoria.`,
  },
  {
    id: 'bloco-5-endcard',
    text: `O dado do seu cliente — protegido.
Não como letra miúda. Como arquitetura.

Quatorze horas por semana — é o que a burocracia devolve.
Tempo de dono. Não de planilha.

WorkConnect — a gestão de estoque que o seu negócio merece.
Pensada para a realidade da pequena e média empresa brasileira.
Conformidade LGPD desde o primeiro clique.

workconnect.app.br`,
  },
];

async function generateBloco(bloco) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
  const body = {
    text: bloco.text,
    model_id: MODEL_ID,
    voice_settings: {
      stability: 0.50,
      similarity_boost: 0.78,
      style: 0.15,
      use_speaker_boost: true,
    },
  };

  console.log(`[voice] gerando ${bloco.id} (${bloco.text.length} chars)...`);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': API_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ElevenLabs error ${res.status}: ${err}`);
  }

  const buf = Buffer.from(await res.arrayBuffer());
  const out = resolve(__dirname, `audio/${bloco.id}.mp3`);
  await writeFile(out, buf);
  console.log(`[voice] ✓ ${bloco.id}.mp3 (${(buf.length / 1024).toFixed(1)} KB)`);
  return out;
}

async function main() {
  // Limpa arquivos antigos do diretório
  try {
    const files = await readdir(resolve(__dirname, 'audio'));
    for (const f of files) {
      if (f.endsWith('.mp3') || f.endsWith('.json')) {
        await unlink(resolve(__dirname, 'audio', f));
      }
    }
  } catch {}

  // Gera todos os 6 blocos em série (não paralelo, para não estourar rate limit)
  const paths = [];
  for (const bloco of BLOCOS) {
    paths.push(await generateBloco(bloco));
    // Pausa de 800ms entre chamadas (rate limit safety)
    await new Promise(r => setTimeout(r, 800));
  }

  // Concatena em um único voice.mp3
  const concatList = paths.map(p => `file '${p.replace(/\\/g, '/')}'`).join('\n');
  const listFile = resolve(__dirname, 'audio/_concat.txt');
  await writeFile(listFile, concatList);

  const finalOut = resolve(__dirname, 'audio/voice.mp3');
  execSync(
    `ffmpeg -y -f concat -safe 0 -i "${listFile}" -c copy "${finalOut}"`,
    { stdio: 'pipe' }
  );

  // Validação
  const probe = execSync(
    `ffprobe -v error -show_entries format=duration,bit_rate -of default=noprint_wrappers=1 "${finalOut}"`,
    { encoding: 'utf-8' }
  );
  console.log(`\n[voice] ✓ voice.mp3 gerado`);
  console.log(`[voice] ${probe.trim()}`);
  console.log(`[voice] caminho: ${finalOut}`);

  // Cleanup list file
  await unlink(listFile);
}

main().catch(err => {
  console.error('[voice] ❌ erro:', err.message);
  process.exit(1);
});