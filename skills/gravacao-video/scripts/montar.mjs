// Junta a gravação, a narração, a música e as legendas, aplica o zoom marcado na gravação, põe por
// cima o nome da secção e a frase-chave de cada passo, e exporta em MP4. No fim escreve o pacote
// para publicar: as legendas em ficheiro, a miniatura e a descrição com capítulos e créditos.
// Precisa de gravacao/bruto.webm, gravacao/tempos.json e audio/*.wav com audio/duracoes.json
// (numa língua que não é a principal, dentro de <lingua>/; corre-se com --lingua en).
import ffmpeg from 'ffmpeg-static';
import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';
import { pasta, lerJson, lerWav, cabecalhoWav, lerGuiao, lingua, linguas, principal, naLingua } from './comum.mjs';

const guiao = lerGuiao();
const G = naLingua('gravacao'), A = naLingua('audio');
const tempos = lerJson(`${G}/tempos.json`);
const duracoes = lerJson(`${A}/duracoes.json`);
mkdirSync(join(pasta, 'final'), { recursive: true });

const FPS = 25;
const escala = tempos.escala ?? 1;
const saida = guiao.saida ?? { largura: guiao.largura, altura: guiao.altura };
const nome = guiao.nome ?? basename(pasta);
const nomeBase = linguas.length > 1 ? `${nome}-${lingua}` : nome;
const SUFIXO = principal ? '' : ` --lingua ${lingua}`;
const emPortugues = lingua.startsWith('pt');
const cores = { fundo: '#0b1f33', realce: '#e8601c', ...guiao.cores };

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
const capituloTempo = (ms) => `${Math.floor(ms / 60000)}:${String(Math.floor((ms % 60000) / 1000)).padStart(2, '0')}`;

// 1. Alinhar o relógio do script com o do vídeo. O script anotou quando o ecrã ficou escuro
// (cartão de abertura, cortinas, cartão de fecho); o ffmpeg encontra cada um desses momentos no
// vídeo e a diferença é o desvio. O cartão de abertura manda, porque a sua marca é a primeira
// pintura do documento; as outras servem de confirmação.
const BRUTO = `${G}/bruto.webm`;
const videoMs = duracaoVideo(BRUTO) * 1000;
const escuros = momentosEscuros(BRUTO);
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
  if (!frases) throw new Error(`${A}/duracoes.json não tem as frases de ${p.id}; corre narrar.mjs${SUFIXO} outra vez`);
  for (const f of t.frases) {
    const info = frases[f.n];
    if (!info) throw new Error(`A frase ${f.n + 1} de ${p.id} não existe no áudio; a narração mudou depois de gravar?`);
    clips.push({ id: `${p.id}/${f.n + 1}`, narracao: info.texto, info, wav: lerWav(join(pasta, A, info.ficheiro)), inicio: aFinal(f.em) });
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
  if (fimAudio > proximo) console.warn(`Aviso: a frase ${c.id} entra ${(fimAudio - proximo).toFixed(0)} ms pela seguinte, que a corta. Corre node gravar.mjs${SUFIXO} para lhe dar espaço.`);
  linhas.push(`${i + 1}\n${tempoSrt(c.inicio)} --> ${tempoSrt(Math.min(fimAudio + 300, proximo - 100))}\n${c.narracao}\n`);
}
const LEGENDAS = naLingua('legendas.srt');
writeFileSync(join(pasta, A, 'narracao.wav'), Buffer.concat([cabecalhoWav(taxa, canais, pcm.length), pcm]));
writeFileSync(join(pasta, LEGENDAS), linhas.join('\n'));

// 3. Música por baixo da voz. Só entra com a licença e a fonte escritas no guião; desce sozinha
// quando a voz fala (sidechaincompress, com a narração como sinal de controlo), entra e sai em
// desvanecer, e ajusta-se à duração do vídeo. Mede-se no fim quanto ficou abaixo da voz.
let audioFinal = `${A}/narracao.wav`;
let medidaMusica = null;
const musica = guiao.musica;
if (musica) {
  if (!musica.ficheiro || !existsSync(join(pasta, musica.ficheiro))) throw new Error(`A música não está em ${musica.ficheiro ?? '(sem "ficheiro")'}.`);
  if (!musica.licenca || !musica.fonte) throw new Error('Música sem licença confirmada: escreve "licenca" e "fonte" (a página onde a leste) em "musica" no guiao.json, ou tira a música.');
  const T = (totalMs / 1000).toFixed(3);
  const entrada = musica.entrada ?? 1.5, saidaS = musica.saida ?? 3;
  const filtroMusica = [
    `[1:a]aresample=48000,aformat=channel_layouts=stereo,atrim=0:${T},asetpts=N/SR/TB,loudnorm=I=${musica.nivel ?? -27}:TP=-3:LRA=11,aresample=48000,`
      + `afade=t=in:st=0:d=${entrada},afade=t=out:st=${Math.max(0, totalMs / 1000 - saidaS).toFixed(3)}:d=${saidaS}[m]`,
    '[0:a]aresample=48000,aformat=channel_layouts=stereo,asplit=2[v][sc]',
    `[m][sc]sidechaincompress=threshold=${musica.limiar ?? 0.02}:ratio=${musica.reducao ?? 6}:attack=40:release=700:knee=3[md]`,
    '[md]asplit=2[md1][md2]',
    '[v][md1]amix=inputs=2:duration=first:normalize=0[mix]',
  ].join(';');
  correrFfmpeg(['-y', '-i', `${A}/narracao.wav`, ...(musica.inicio ? ['-ss', String(musica.inicio)] : []), '-stream_loop', '-1', '-i', musica.ficheiro,
    '-filter_complex', filtroMusica, '-map', '[mix]', '-c:a', 'pcm_s16le', `${A}/mistura.wav`, '-map', '[md2]', '-c:a', 'pcm_s16le', `${A}/musica-baixada.wav`]);
  audioFinal = `${A}/mistura.wav`;
  // Prova: nível da música em janelas de 400 ms, com voz e nas pausas.
  const m = lerWav(join(pasta, A, 'musica-baixada.wav'));
  const s = new Int16Array(m.dados.buffer.slice(m.dados.byteOffset, m.dados.byteOffset + m.dados.length - (m.dados.length % 2)));
  const janela = Math.round(m.taxa * 0.4) * m.canais;
  const comVoz = [], semVoz = [];
  for (let i = 0; i + janela <= s.length; i += janela) {
    const t = (i / m.canais / m.taxa) * 1000;
    if (t < 1500 || t > totalMs - 3500) continue; // fora dos desvaneceres
    let q = 0; for (let k = i; k < i + janela; k++) q += s[k] * s[k];
    const db = 20 * Math.log10(Math.max(1, Math.sqrt(q / janela)) / 32768);
    const fala = clips.some((c) => t + 400 > c.inicio && t < c.inicio + c.wav.segundos * 1000);
    (fala ? comVoz : semVoz).push(db);
  }
  const media = (l) => (l.length ? l.reduce((a, b) => a + b, 0) / l.length : null);
  medidaMusica = { comVoz: media(comVoz), semVoz: media(semVoz) };
}

// 4. Zoom em pós-produção: as marcas da gravação viram fotogramas-chave e o zoompan do ffmpeg
// interpola entre eles com uma curva suave. Sem marcas, só escala para a saída.
function filtroZoom() {
  const iw = tempos.largura * escala, ih = tempos.altura * escala;
  const chaves = [];
  let z = 1, fx = iw / 2, fy = ih / 2;
  for (const ev of tempos.zooms ?? []) {
    const t = aFinal(ev.em) / 1000;
    // A partir de 1x, o zoom vai direito ao alvo novo. Antes partia do alvo do zoom anterior e
    // deslizava para o novo: a imagem ia primeiro para um lado e depois para o outro.
    if (ev.tipo === 'in' && z === 1) { fx = ev.x * escala; fy = ev.y * escala; }
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

// 5. Nome da secção e frase-chave: desenhados pelo Chromium como PNG transparente, à resolução de
// saída, e postos por cima do vídeo já com zoom, com entrada e saída suaves.
async function desenharGraficos() {
  const lista = (tempos.graficos ?? []).filter((g) => g.texto)
    .map((g) => ({ ...g, de: aFinal(g.de) / 1000, ate: aFinal(g.ate) / 1000 }))
    .filter((g) => g.ate - g.de > 0.6);
  if (!lista.length) return [];
  const { chromium } = await import('playwright');
  const fator = saida.largura / tempos.largura;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: tempos.largura, height: tempos.altura }, deviceScaleFactor: fator });
  const letra = `${guiao.fonte ? `'${guiao.fonte}', ` : ''}"Segoe UI", system-ui, sans-serif`;
  const fonteLink = guiao.fonte ? `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(guiao.fonte)}:wght@400;600;700;800&display=swap">` : '';
  const css = `html,body{margin:0;background:transparent} .moldura{position:absolute;top:0;padding:14px 18px 26px}
    .moldura.esq{left:8px} .moldura.dir{right:8px}
    .g{font-family:${letra};color:#fff;background:${cores.fundo}eb;border-radius:10px;box-shadow:0 12px 30px -12px #000b;-webkit-font-smoothing:antialiased}
    .etiqueta{padding:9px 16px 10px 14px;border-left:3px solid ${cores.realce}}
    .etiqueta .sobre{display:block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${cores.realce}}
    .etiqueta .nome{display:block;margin-top:1px;font-size:20px;font-weight:700;letter-spacing:-.01em}
    .manchete{padding:11px 16px;font-size:17px;font-weight:600;border-left:3px solid ${cores.realce};max-width:520px}`;
  const desenhados = [];
  for (const [i, g] of lista.entries()) {
    const corpo = g.tipo === 'etiqueta'
      ? `<div class="moldura esq"><div class="g etiqueta">${g.sobre ? '<span class="sobre"></span>' : ''}<span class="nome"></span></div></div>`
      : `<div class="moldura dir"><div class="g manchete"></div></div>`;
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8">${fonteLink}<style>${css}</style></head><body>${corpo}</body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(({ texto, sobre }) => {
      const nome = document.querySelector('.nome, .manchete'); nome.textContent = texto;
      const s = document.querySelector('.sobre'); if (s) s.textContent = sobre;
      return document.fonts.ready;
    }, { texto: g.texto, sobre: g.sobre ?? '' });
    const moldura = page.locator('.moldura');
    const caixa = await moldura.boundingBox();
    const ficheiro = `${G}/grafico-${i + 1}.png`;
    await moldura.screenshot({ path: join(pasta, ficheiro), omitBackground: true });
    desenhados.push({ ...g, ficheiro, x: Math.round(caixa.x * fator), y: Math.round(caixa.y * fator) });
  }
  await browser.close();
  return desenhados;
}
const graficos = await desenharGraficos();

// 6. Exportar: ritmo fixo, tempos mortos fora, zoom, legendas, gráficos por cima e o áudio final.
const ficheiro = `final/${nomeBase}-${saida.largura}x${saida.altura}.mp4`;
const corAss = (hex, alfa) => { const h = hex.replace('#', ''); return `&H${alfa}${h.slice(4, 6)}${h.slice(2, 4)}${h.slice(0, 2)}`.toUpperCase(); };
// Legendas numa caixa escura da cor do vídeo (BorderStyle 3), legíveis sobre qualquer fundo.
const estiloLegendas = `FontName=${guiao.fonteLegendas ?? 'Segoe UI'},FontSize=11,Bold=0,PrimaryColour=&H00FFFFFF,OutlineColour=${corAss(cores.fundo, '30')},BackColour=${corAss(cores.fundo, '30')},BorderStyle=3,Outline=5,Shadow=0,MarginV=${guiao.margemLegendas ?? 22}`;
const legendasNaImagem = guiao.legendasNaImagem ?? true;
const base = [`fps=${FPS}`];
if (esperas.length) {
  base.push(`select='${esperas.map((x) => `not(between(t,${(x.de / 1000).toFixed(3)},${(x.ate / 1000).toFixed(3)}))`).join('*')}'`, `setpts=N/(${FPS}*TB)`);
}
base.push(filtroZoom());
if (legendasNaImagem) base.push(`subtitles=${LEGENDAS}:force_style='${estiloLegendas}'`);
const cadeia = [`[0:v]${base.join(',')}[b0]`];
graficos.forEach((g, i) => {
  const entrada = i + 2; // 0 vídeo, 1 áudio
  const lado = g.tipo === 'etiqueta' ? -1 : 1; // a etiqueta entra da esquerda, a manchete da direita
  const de = g.de.toFixed(3), sai = Math.max(g.de + 0.4, g.ate - 0.35).toFixed(3);
  cadeia.push(`[${entrada}:v]format=rgba,fade=t=in:st=${de}:d=0.35:alpha=1,fade=t=out:st=${sai}:d=0.35:alpha=1[g${i}]`);
  cadeia.push(`[b${i}][g${i}]overlay=x='${g.x}+${lado * 26}*max(0,1-(t-${de})/0.4)':y=${g.y}:enable='between(t,${de},${g.ate.toFixed(3)})':eval=frame[b${i + 1}]`);
});
const ultimo = `b${graficos.length}`;
writeFileSync(join(pasta, G, 'filtro.txt'), cadeia.join(';\n') + '\n');
const args = [
  '-y', '-ss', (corteMs / 1000).toFixed(3), '-i', BRUTO, '-i', audioFinal,
  ...graficos.flatMap((g) => ['-loop', '1', '-framerate', String(FPS), '-t', (totalMs / 1000).toFixed(3), '-i', g.ficheiro]),
  '-filter_complex_script', `${G}/filtro.txt`, '-map', `[${ultimo}]`, '-map', '1:a',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', String(FPS),
  // Volume de vídeo para a web (-16 LUFS) e 48 kHz estéreo, que qualquer leitor aceita.
  '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', '48000', '-ac', '2',
  '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', '-t', (totalMs / 1000).toFixed(3), ficheiro,
];
console.log('ffmpeg ' + args.join(' '));
correrFfmpeg(args);

// 7. Folha de escuta: quem ouve aponta cada problema pelo número da frase ou pelo tempo.
const notas = (i) => [i.fimCortado ? 'o modelo cortou o fim; levou desvanecer longo' : '', i.ruidoRetirado ? 'ruído retirado antes da fala' : ''].filter(Boolean).join('; ');
writeFileSync(join(pasta, naLingua('escuta.md')), [
  `# Folha de escuta de ${nomeBase}`,
  '',
  `Vídeo: \`${ficheiro}\`. Ouve-o com esta folha ao lado e aponta cada problema pelo número da frase ou pelo tempo. As tomadas de cada frase estão em \`${A}/tomadas/<passo>-<frase>/\`, numeradas, para as ouvires uma a uma.`,
  '',
  '| N.º | Tempo | Frase | Texto | Dito à voz como | Tomada | Ouvido pelo reconhecimento | Notas |',
  '|---|---|---|---|---|---|---|---|',
  ...clips.map((c, i) => `| ${i + 1} | ${mmss(c.inicio).slice(0, -2)} | ${c.id} | ${c.narracao} | ${c.info.dito ?? ''} | ${c.info.tomada ? `${c.info.tomada} de ${c.info.tomadas}` : ''} | ${c.info.semelhanca === undefined ? '' : c.info.semelhanca >= 0.9 ? 'o texto todo' : `«${c.info.ouvido}» (${Math.round(c.info.semelhanca * 100)}%)`} | ${notas(c.info)} |`),
  '',
  '## Como corrigir',
  '',
  '| O que ouviste | Comando, nesta pasta |',
  '|---|---|',
  `| Uma palavra mal dita, ou um termo estrangeiro | \`node narrar.mjs${SUFIXO} --lacuna 9 pronuncia "palavra=como se diz"\` (ou \`estrangeirismo\`) |`,
  `| A entoação errada num trecho | \`node narrar.mjs${SUFIXO} --lacuna 9 entoacao "trecho=o trecho com outra pontuação"\` |`,
  `| Uma palavra comida | \`node narrar.mjs${SUFIXO} --lacuna 9 palavra-comida palavra\` |`,
  `| O fim cortado, ou ruído antes da fala | \`node narrar.mjs${SUFIXO} --lacuna 9 fim-cortado\` ou \`node narrar.mjs${SUFIXO} --lacuna 9 ruido\` |`,
  `| Uma frase que saiu mal só desta vez | \`node narrar.mjs${SUFIXO} --frase 9\`, que gera tomadas novas só para ela |`,
  `| Preferes outra tomada de uma frase | \`node narrar.mjs${SUFIXO} --frase 9 --tomada 3\` |`,
  ...(musica ? ['| A música alta ou baixa demais | `"nivel"` em `musica` no guiao.json (−27 por omissão; −30 mais baixa, −24 mais alta) e `node montar.mjs' + SUFIXO + '` |'] : []),
  '',
  `Cada lacuna fica em \`~/.start-project-with-trust/voz.json\` e corrige-se sozinha nos vídeos seguintes. Depois de cada correção, \`node montar.mjs${SUFIXO}\` refaz o vídeo; se o \`narrar.mjs\` disser que a frase nova não cabe no tempo gravado, corre antes \`node gravar.mjs${SUFIXO}\`.`,
  '',
].join('\n'));

// 8. Pacote para publicar: legendas em ficheiro (para carregar no YouTube ou no LinkedIn, que assim
// não as geram sozinhos), miniatura e descrição com capítulos e créditos da música.
const pub = guiao.publicar ?? {};
copyFileSync(join(pasta, LEGENDAS), join(pasta, 'final', `${nomeBase}.srt`));
const capitulos = tempos.passos.filter((t) => t.capitulo).map((t) => ({ titulo: t.capitulo, ms: Math.max(0, aFinal(t.inicio)) }));
if (capitulos.length) capitulos[0].ms = 0; // o YouTube só aceita capítulos que comecem em 0:00
const avisosCapitulos = [];
if (capitulos.length && capitulos.length < 3) avisosCapitulos.push('o YouTube pede pelo menos 3 capítulos');
capitulos.forEach((c, i) => { const fim = capitulos[i + 1]?.ms ?? totalMs; if (fim - c.ms < 10000) avisosCapitulos.push(`«${c.titulo}» dura menos de 10 s, o mínimo do YouTube`); });
const miniaturaEm = (() => {
  const passo = pub.miniatura && tempos.passos.find((t) => t.id === pub.miniatura);
  return passo ? aFinal(passo.inicio) + (pub.miniaturaEm ?? 1.5) * 1000 : 1000; // segundos depois do início do passo
})();
const miniatura = `final/${nomeBase}-miniatura.jpg`;
correrFfmpeg(['-y', '-ss', (miniaturaEm / 1000).toFixed(2), '-i', ficheiro, '-frames:v', '1', '-vf', 'scale=1280:720:flags=lanczos', '-q:v', '2', miniatura]);
const creditoMusica = musica && (musica.atribuicao ?? (emPortugues
  ? `Música: «${musica.titulo ?? basename(musica.ficheiro)}», de ${musica.autor ?? 'autor por indicar'}. Licença ${musica.licenca}${musica.licencaUrl ? ` (${musica.licencaUrl})` : ''}. Fonte: ${musica.fonte}`
  : `Music: "${musica.titulo ?? basename(musica.ficheiro)}" by ${musica.autor ?? 'author to be named'}. Licensed under ${musica.licenca}${musica.licencaUrl ? ` (${musica.licencaUrl})` : ''}. Source: ${musica.fonte}`));
writeFileSync(join(pasta, 'final', `${nomeBase}-publicar.md`), [
  `# Publicar ${nomeBase}`,
  '',
  `- Vídeo: \`${ficheiro}\``,
  `- Legendas (${lingua}): \`final/${nomeBase}.srt\``,
  `- Miniatura: \`${miniatura}\``,
  '',
  '## Título',
  '',
  pub.titulo ?? guiao.capa?.titulo ?? nome,
  '',
  '## Descrição',
  '',
  pub.descricao ?? '',
  '',
  ...(capitulos.length ? [emPortugues ? 'Capítulos:' : 'Chapters:', ...capitulos.map((c) => `${capituloTempo(c.ms)} ${c.titulo}`), ''] : []),
  ...(creditoMusica ? [creditoMusica, ''] : []),
  ...(pub.rodape ? [pub.rodape, ''] : []),
  '## Antes de carregar',
  '',
  `- Carrega \`final/${nomeBase}.srt\` como legendas em ${lingua}${legendasNaImagem ? ' só se exportares sem legendas na imagem ("legendasNaImagem": false); com elas gravadas, ficariam duas vezes' : ''}.`,
  ...(avisosCapitulos.length ? [`- Capítulos por rever: ${avisosCapitulos.join('; ')}.`] : []),
  ...(musica ? ['- A música tem licença com atribuição: o crédito acima tem de ficar na descrição.'] : []),
  '',
].join('\n'));

// 9. Prova.
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
  // Câmara calma: dois zooms seguidos em pontos afastados (mais de 40% da largura ou da altura), com menos
  // de 3 s entre o fim de um e o início do outro, parecem a imagem a ir para um lado e para o outro.
  const entradas = tempos.zooms.map((z, i) => ({ ...z, i })).filter((z) => z.tipo === 'in');
  for (let k = 1; k < entradas.length; k++) {
    const a = entradas[k - 1], b = entradas[k];
    const saida = tempos.zooms.slice(a.i + 1, b.i).find((z) => z.tipo === 'out');
    const intervalo = (aFinal(b.em) - aFinal(saida ? saida.em : a.em)) / 1000;
    const longe = Math.abs(b.x - a.x) > tempos.largura * 0.4 || Math.abs(b.y - a.y) > tempos.altura * 0.4;
    if (longe && intervalo < 3) console.warn(`Aviso: zoom aos ${mmss(aFinal(b.em))} salta de (${a.x}, ${a.y}) para (${b.x}, ${b.y}) ${intervalo.toFixed(1)} s depois do anterior; junta-os num só, aproxima os alvos ou deixa a imagem parada mais tempo.`);
  }
}
if (tempos.cenas?.length) console.log(`Cenas: ${tempos.cenas.map((c) => `${c.id} (${c.tipo}) ${mmss(aFinal(c.de))}–${mmss(aFinal(c.ate))}`).join(', ')}`);
if (graficos.length) console.log(`Gráficos por cima do vídeo: ${graficos.map((g) => `${g.tipo} «${g.texto}» ${g.de.toFixed(1)}–${g.ate.toFixed(1)} s`).join(', ')}`);
if (medidaMusica) {
  const voz = -20; // a narração fica a −20 dBFS de RMS na fala (narrar.mjs)
  console.log(`Música: ${medidaMusica.comVoz?.toFixed(1)} dBFS por baixo da voz (${(medidaMusica.comVoz - voz).toFixed(1)} dB face à voz) e ${medidaMusica.semVoz?.toFixed(1)} dBFS nas pausas, antes da normalização final.`);
}
console.log(`Pacote: final/${nomeBase}.srt, ${miniatura}, final/${nomeBase}-publicar.md${capitulos.length ? ` (${capitulos.length} capítulos)` : ''}`);
