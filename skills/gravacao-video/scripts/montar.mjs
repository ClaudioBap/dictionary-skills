// Junta a gravação, a narração e as legendas, aplica o zoom marcado na gravação e exporta em MP4.
// Precisa de gravacao/bruto.webm, gravacao/tempos.json e audio/*.wav com audio/duracoes.json.
import ffmpeg from 'ffmpeg-static';
import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';
import { pasta, lerJson, lerWav, cabecalhoWav } from './comum.mjs';

const guiao = lerJson('guiao.json');
const tempos = lerJson('gravacao/tempos.json');
const duracoes = lerJson('audio/duracoes.json');
mkdirSync(join(pasta, 'final'), { recursive: true });

const FPS = 25;
const escala = tempos.escala ?? 1;
const saida = guiao.saida ?? { largura: guiao.largura, altura: guiao.altura };
const nome = guiao.nome ?? basename(pasta);

// O ffmpeg escreve o progresso e os erros no stderr, com ou sem sucesso.
function correrFfmpeg(args) {
  const r = spawnSync(ffmpeg, args, { cwd: pasta, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (r.status !== 0) throw new Error(`ffmpeg saiu com ${r.status}:\n${r.stderr.slice(-2000)}`);
  return r.stderr;
}

// Duração real de um ficheiro de vídeo: o ffmpeg descodifica tudo e diz onde parou.
function duracaoVideo(ficheiro) {
  const texto = correrFfmpeg(['-i', ficheiro, '-f', 'null', '-']);
  const marcas = [...texto.matchAll(/time=(\d+):(\d+):(\d+)\.(\d+)/g)];
  if (!marcas.length) throw new Error(`Não li a duração de ${ficheiro}`);
  const [, h, m, s, c] = marcas.at(-1);
  return Number(h) * 3600 + Number(m) * 60 + Number(s) + Number(`0.${c}`);
}

// Momentos em que o ecrã fica escuro (cartões e cortinas), em ms do vídeo bruto.
function momentosEscuros(ficheiro) {
  const texto = correrFfmpeg(['-i', ficheiro, '-vf', 'blackdetect=d=0.15:pix_th=0.25:pic_th=0.95', '-an', '-f', 'null', '-']);
  return [...texto.matchAll(/black_start:(\d+(?:\.\d+)?)/g)].map((m) => Number(m[1]) * 1000);
}

function tempoSrt(ms) {
  const t = Math.max(0, Math.round(ms));
  const h = Math.floor(t / 3600000), m = Math.floor((t % 3600000) / 60000), s = Math.floor((t % 60000) / 1000), c = t % 1000;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(c).padStart(3, '0')}`;
}
const mmss = (ms) => `${Math.floor(ms / 60000)}:${String(Math.floor((ms % 60000) / 1000)).padStart(2, '0')}.${String(Math.round(ms % 1000)).padStart(3, '0')}`;

// 1. Alinhar o relógio do script com o do vídeo. O script anotou quando o ecrã ficou escuro
// (cartão de abertura, cortinas, cartão de fecho); o ffmpeg encontra cada um desses momentos no
// vídeo e a diferença é o desvio. O cartão de abertura manda, porque a sua marca é a primeira
// pintura do documento; as outras servem de confirmação.
const videoMs = duracaoVideo('gravacao/bruto.webm') * 1000;
const escuros = momentosEscuros('gravacao/bruto.webm');
const encontradas = (tempos.marcas ?? []).map((m) => {
  const perto = escuros.map((t) => t - m.em).filter((d) => Math.abs(d) < 3000).sort((a, b) => Math.abs(a) - Math.abs(b))[0];
  return perto === undefined ? null : { nome: m.nome, desvio: perto };
}).filter(Boolean);
let desvioMs, origem;
if (encontradas.length) {
  const capa = encontradas.find((d) => d.nome === 'capa');
  const ordenados = encontradas.map((d) => d.desvio).sort((a, b) => a - b);
  desvioMs = capa ? capa.desvio : ordenados[Math.floor(ordenados.length / 2)];
  origem = encontradas.map((d) => `${d.nome} ${d.desvio.toFixed(0)}`).join(', ');
  if (ordenados.at(-1) - ordenados[0] > 300) console.warn(`Aviso: as marcas discordam em ${(ordenados.at(-1) - ordenados[0]).toFixed(0)} ms; confirma a sincronização à mão.`);
} else {
  desvioMs = videoMs - tempos.fechoEm;
  origem = 'diferença de durações, sem marcas encontradas no vídeo';
}
const corteMs = tempos.inicioVideo + desvioMs;
console.log(`Vídeo bruto: ${(videoMs / 1000).toFixed(2)} s; relógio do script: ${(tempos.fechoEm / 1000).toFixed(2)} s; desvio ${desvioMs.toFixed(0)} ms (${origem}); corte inicial ${corteMs.toFixed(0)} ms`);
if (Math.abs(desvioMs) > 1500) console.warn('Aviso: desvio acima de 1,5 s entre o vídeo e o script; confirma a sincronização à mão.');

// Tempos mortos (página lenta debaixo do cartão ou da cortina) saem do vídeo. Daqui em diante,
// os tempos do script convertem-se para o tempo do vídeo final com aFinal().
const esperas = (tempos.esperas ?? [])
  .map((x) => ({ de: x.de + desvioMs - corteMs, ate: x.ate + desvioMs - corteMs }))
  .filter((x) => x.ate > x.de + 40)
  .sort((a, b) => a.de - b.de);
const removidoMs = esperas.reduce((s, x) => s + (x.ate - x.de), 0);
function noFinal(t) {
  let r = t;
  for (const x of esperas) { if (t >= x.ate) r -= x.ate - x.de; else if (t > x.de) r -= t - x.de; }
  return r;
}
const aFinal = (tScript) => noFinal(tScript + desvioMs - corteMs);
if (esperas.length) console.log(`Tempos mortos retirados: ${esperas.map((x) => `${(x.de / 1000).toFixed(2)}–${(x.ate / 1000).toFixed(2)} s`).join(', ')} (${(removidoMs / 1000).toFixed(1)} s)`);

// 2. Narração num único WAV, frase a frase no tempo em que a gravação a encaixou, e uma legenda por frase.
const clips = [];
for (const p of guiao.passos) {
  const t = tempos.passos.find((x) => x.id === p.id);
  if (!t) throw new Error(`O passo ${p.id} não foi gravado`);
  const frases = duracoes[p.id]?.frases;
  if (!frases) throw new Error(`audio/duracoes.json não tem as frases de ${p.id}; corre narrar.mjs outra vez`);
  for (const f of t.frases) {
    const info = frases[f.n];
    if (!info) throw new Error(`A frase ${f.n + 1} de ${p.id} não existe no áudio; a narração mudou depois de gravar?`);
    clips.push({ id: `${p.id}/${f.n + 1}`, narracao: info.texto, info, wav: lerWav(join(pasta, 'audio', info.ficheiro)), inicio: aFinal(f.em) });
  }
}
const { taxa, canais } = clips[0].wav;
const totalMs = videoMs - corteMs - removidoMs;
const pcm = Buffer.alloc(Math.ceil((totalMs / 1000) * taxa) * canais * 2);
const linhas = [];
for (const [i, c] of clips.entries()) {
  if (c.wav.taxa !== taxa || c.wav.canais !== canais) throw new Error(`Formato diferente em ${c.id}`);
  const offset = Math.round((c.inicio / 1000) * taxa) * canais * 2;
  const bytes = Math.min(c.wav.dados.length, pcm.length - offset);
  if (bytes < c.wav.dados.length) console.warn(`Aviso: ${c.id} cortado em ${((c.wav.dados.length - bytes) / (taxa * canais * 2)).toFixed(2)} s`);
  c.wav.dados.copy(pcm, offset, 0, bytes);
  const fimAudio = c.inicio + c.wav.segundos * 1000;
  const proximo = clips[i + 1]?.inicio ?? totalMs;
  if (fimAudio > proximo) console.warn(`Aviso: a frase ${c.id} entra ${(fimAudio - proximo).toFixed(0)} ms pela seguinte, que a corta. Corre node gravar.mjs para lhe dar espaço.`);
  linhas.push(`${i + 1}\n${tempoSrt(c.inicio)} --> ${tempoSrt(Math.min(fimAudio + 300, proximo - 100))}\n${c.narracao}\n`);
}
writeFileSync(join(pasta, 'audio', 'narracao.wav'), Buffer.concat([cabecalhoWav(taxa, canais, pcm.length), pcm]));
writeFileSync(join(pasta, 'legendas.srt'), linhas.join('\n'));

// 3. Zoom em pós-produção: as marcas da gravação viram fotogramas-chave e o zoompan do ffmpeg
// interpola entre eles com uma curva suave. Sem marcas, só escala para a saída.
function filtroZoom() {
  const iw = tempos.largura * escala, ih = tempos.altura * escala;
  const chaves = [];
  let z = 1, fx = iw / 2, fy = ih / 2;
  for (const ev of tempos.zooms ?? []) {
    const t = aFinal(ev.em) / 1000;
    chaves.push({ t, z, fx, fy });
    if (ev.tipo === 'in') { z = ev.fator; fx = ev.x * escala; fy = ev.y * escala; } else z = 1;
    chaves.push({ t: t + ev.ms / 1000, z, fx, fy });
  }
  if (!chaves.length) return `scale=${saida.largura}:${saida.altura}:flags=lanczos`;
  const quadro = (t) => (t * FPS).toFixed(2);
  const expressao = (campo) => {
    let e = String(chaves.at(-1)[campo]);
    for (let i = chaves.length - 1; i >= 1; i--) {
      const a = chaves[i - 1], b = chaves[i];
      const largura = Math.max(0.01, (b.t - a.t) * FPS);
      const troco = a[campo] === b[campo]
        ? String(a[campo])
        : `${a[campo]}+(${b[campo] - a[campo]})*(st(1,clip((in-${quadro(a.t)})/${largura.toFixed(2)},0,1))*ld(1)*(3-2*ld(1)))`;
      e = `if(lt(in,${quadro(b.t)}),${troco},${e})`;
    }
    return `if(lt(in,${quadro(chaves[0].t)}),${chaves[0][campo]},${e})`;
  };
  return `zoompan=z='${expressao('z')}':x='clip(${expressao('fx')}-iw/(2*zoom),0,iw-iw/zoom)':y='clip(${expressao('fy')}-ih/(2*zoom),0,ih-ih/zoom)':d=1:s=${saida.largura}x${saida.altura}:fps=${FPS}`;
}

// 4. Exportar: ritmo fixo, tempos mortos fora, zoom, legendas.
const ficheiro = `final/${nome}-${saida.largura}x${saida.altura}.mp4`;
const estiloLegendas = 'FontName=Segoe UI,FontSize=13,PrimaryColour=&H00FFFFFF,OutlineColour=&H80000000,Outline=1,Shadow=0,MarginV=96';
const filtros = [`fps=${FPS}`];
if (esperas.length) {
  filtros.push(`select='${esperas.map((x) => `not(between(t,${(x.de / 1000).toFixed(3)},${(x.ate / 1000).toFixed(3)}))`).join('*')}'`, `setpts=N/(${FPS}*TB)`);
}
filtros.push(filtroZoom(), `subtitles=legendas.srt:force_style='${estiloLegendas}'`);
writeFileSync(join(pasta, 'gravacao', 'filtro.txt'), filtros.join(',\n') + '\n');
const args = [
  '-y', '-ss', (corteMs / 1000).toFixed(3), '-i', 'gravacao/bruto.webm', '-i', 'audio/narracao.wav',
  '-filter_script:v', 'gravacao/filtro.txt', '-map', '0:v', '-map', '1:a',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', String(FPS),
  // Volume de vídeo para a web (-16 LUFS) e 48 kHz estéreo, que qualquer leitor aceita.
  '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', '48000', '-ac', '2',
  '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', '-shortest', ficheiro,
];
console.log('ffmpeg ' + args.join(' '));
correrFfmpeg(args);

// 5. Folha de escuta: quem ouve aponta cada problema pelo número da frase ou pelo tempo.
const notas = (i) => [i.fimCortado ? 'o modelo cortou o fim; levou desvanecer longo' : '', i.ruidoRetirado ? 'ruído retirado antes da fala' : ''].filter(Boolean).join('; ');
writeFileSync(join(pasta, 'escuta.md'), [
  `# Folha de escuta de ${nome}`,
  '',
  `Vídeo: \`${ficheiro}\`. Ouve-o com esta folha ao lado e aponta cada problema pelo número da frase ou pelo tempo. As tomadas de cada frase estão em \`audio/tomadas/<passo>-<frase>/\`, numeradas, para as ouvires uma a uma.`,
  '',
  '| N.º | Tempo | Frase | Texto | Dito à voz como | Tomada | Notas |',
  '|---|---|---|---|---|---|---|',
  ...clips.map((c, i) => `| ${i + 1} | ${mmss(c.inicio).slice(0, -2)} | ${c.id} | ${c.narracao} | ${c.info.dito ?? ''} | ${c.info.tomada ? `${c.info.tomada} de ${c.info.tomadas}` : ''} | ${notas(c.info)} |`),
  '',
  '## Como corrigir',
  '',
  '| O que ouviste | Comando, nesta pasta |',
  '|---|---|',
  '| Uma palavra mal dita, ou um termo estrangeiro | `node narrar.mjs --lacuna 9 pronuncia "palavra=como se diz"` (ou `estrangeirismo`) |',
  '| A entoação errada num trecho | `node narrar.mjs --lacuna 9 entoacao "trecho=o trecho com outra pontuação"` |',
  '| Uma palavra comida | `node narrar.mjs --lacuna 9 palavra-comida palavra` |',
  '| O fim cortado, ou ruído antes da fala | `node narrar.mjs --lacuna 9 fim-cortado` ou `node narrar.mjs --lacuna 9 ruido` |',
  '| Uma frase que saiu mal só desta vez | `node narrar.mjs --frase 9`, que gera tomadas novas só para ela |',
  '| Preferes outra tomada de uma frase | `node narrar.mjs --frase 9 --tomada 3` |',
  '',
  'Cada lacuna fica em `~/.start-project-with-trust/voz.json` e corrige-se sozinha nos vídeos seguintes. Depois de cada correção, `node montar.mjs` refaz o vídeo; se o `narrar.mjs` disser que a frase nova não cabe no tempo gravado, corre antes `node gravar.mjs`.',
  '',
].join('\n'));

// 6. Prova.
const finalS = duracaoVideo(ficheiro);
console.log(`\nFinal: ${ficheiro}, ${finalS.toFixed(2)} s, ${(statSync(join(pasta, ficheiro)).size / 1024 / 1024).toFixed(1)} MB`);
console.log('Pontos de sincronização (tempo no vídeo final em que cada narração começa):');
for (const c of clips) console.log(`  ${mmss(c.inicio)}  ${c.id}  (${c.wav.segundos.toFixed(2)} s)  «${c.narracao.slice(0, 50)}»`);
const silencios = clips.slice(1).map((c, i) => (c.inicio - (clips[i].inicio + clips[i].wav.segundos * 1000)) / 1000);
if (silencios.length) console.log(`Silêncios entre frases (s): ${silencios.map((s) => s.toFixed(1)).join(', ')}`);
console.log(`Scrolls: ${tempos.scrolls?.length ?? 0}${tempos.scrolls?.length ? ` (${tempos.scrolls.map((s) => `${mmss(aFinal(s.em))} ${s.passo}`).join(', ')})` : ''}`);
if (tempos.zooms?.length) {
  console.log('Zoom:');
  for (const z of tempos.zooms) console.log(`  ${mmss(aFinal(z.em))}  ${z.tipo === 'in' ? `${z.fator}x em (${z.x}, ${z.y})` : 'volta a 1x'}`);
}
