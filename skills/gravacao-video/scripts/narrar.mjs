// Gera um ficheiro de áudio por frase do guião, para a gravação poder encaixar cada frase no
// momento certo. Por omissão usa o Piper (voz pt_PT, local e gratuita); com "motorVoz": "azure"
// usa o Azure AI Speech (variáveis AZURE_SPEECH_KEY e AZURE_SPEECH_REGION).
//
// Cada frase passa por quatro cuidados, porque uma voz sintética crua nota-se:
// 1. Pronúncia: siglas, endereços e termos estrangeiros dizem-se pelo dicionário "pronuncias"
//    (as legendas ficam com o texto original); o que parecer estrangeirismo sem pronúncia dá aviso.
// 2. Várias tomadas (só Piper, que não é determinista): gera-se a frase várias vezes e fica a
//    tomada sem ruído no arranque, com o fim menos cortado e com a duração mais próxima da mediana.
// 3. Limpeza: corta-se o que vem antes da fala, entra-se e sai-se com um desvanecer curto (mais
//    longo quando o modelo cortou a última vogal) e nivela-se o volume.
// 4. Ritmo da fala pelo formato: um teaser fala depressa, uma demonstração ou explicação não.
//
// Caminhos do Piper em PIPER_EXE, PIPER_MODELO e PIPER_ESPEAK; sem eles, usa ferramentas/piper/ na raiz do projeto.
import { execFileSync, execSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { pasta, lerJson, escreverJson, lerWav, cabecalhoWav, dividirFrases } from './comum.mjs';

const guiao = lerJson('guiao.json');
const motor = guiao.motorVoz ?? 'piper';
const FALA = { teaser: 1.0, demonstracao: 1.08, explicacao: 1.12 }; // duração dos fonemas no Piper
const opcoes = { length_scale: FALA[guiao.formato] ?? FALA.demonstracao, noise_w: 0.6, noise_scale: 0.667, tomadas: 4, ...guiao.vozOpcoes };

// --- 1. Pronúncia ---------------------------------------------------------------------------
const LETRAS = { a: 'á', b: 'bê', c: 'cê', d: 'dê', e: 'é', f: 'éfe', g: 'gê', h: 'agá', i: 'i', j: 'jota', k: 'capa', l: 'éle', m: 'éme', n: 'éne', o: 'ó', p: 'pê', q: 'quê', r: 'érre', s: 'ésse', t: 'tê', u: 'u', v: 'vê', w: 'dâblio', x: 'xis', y: 'ípsilon', z: 'zê' };
const soletrar = (t) => [...t.toLowerCase()].map((c) => LETRAS[c] ?? c).join(' ');
// Siglas que em português se soletram. O resto entra em "pronuncias" no guiao.json.
const PRONUNCIAS = { CSV: soletrar('csv'), PDF: soletrar('pdf'), URL: soletrar('url'), HTML: soletrar('html'), XML: soletrar('xml'), SMS: soletrar('sms'), API: 'á pê i', APIs: 'á pê is', ...guiao.pronuncias };
const SUSPEITAS = new Set(['online', 'offline', 'site', 'sites', 'website', 'email', 'e-mail', 'link', 'links', 'login', 'logout', 'download', 'downloads', 'upload', 'software', 'hardware', 'web', 'dashboard', 'feedback', 'open', 'creative', 'commons', 'stories', 'story', 'cloud', 'backup', 'design', 'layout', 'post', 'chat', 'bot', 'app', 'apps', 'smartphone', 'tablet', 'streaming', 'marketing', 'performance', 'deploy', 'release', 'bug', 'token', 'cookie', 'cookies', 'browser', 'desktop', 'mobile', 'plugin', 'template', 'workflow', 'pipeline', 'ranking', 'input', 'output', 'default', 'standard', 'premium', 'newsletter', 'podcast', 'startup', 'hub', 'tag', 'tags', 'like', 'likes', 'ok', 'ticket', 'check', 'checkout', 'scroll', 'zoom', 'click', 'teaser', 'demo', 'business', 'insight', 'insights', 'report', 'reports', 'frontend', 'backend', 'server', 'host', 'home', 'homepage', 'search', 'share', 'status', 'update', 'upgrade', 'user', 'users', 'view', 'views', 'widget', 'wifi', 'wi-fi']);
const fronteira = (chave) => new RegExp(`(?<![\\p{L}\\p{N}])${chave.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}\\p{N}])`, 'gu');

// Só o que vai para a voz muda; as legendas ficam com o texto original do guião.
function comoSeDiz(texto) {
  let dito = texto;
  const avisos = [];
  for (const chave of Object.keys(PRONUNCIAS).sort((a, b) => b.length - a.length)) dito = dito.replace(fronteira(chave), PRONUNCIAS[chave]);
  // Endereços: «dados.gov.pt» diz-se «dados ponto gov ponto pê tê».
  dito = dito.replace(/(?<![\p{L}\p{N}@])((?:[a-z0-9-]+\.)+[a-z]{2,})(?![\p{L}\p{N}])/giu, (endereco) =>
    endereco.split('.').map((parte, i, todas) => (i === todas.length - 1 && parte.length === 2 ? soletrar(parte) : parte)).join(' ponto '));
  for (const palavra of dito.match(/[\p{L}][\p{L}\p{N}'-]*/gu) ?? []) {
    const p = palavra.toLowerCase();
    if (/^\p{Lu}{2,}s?$/u.test(palavra)) avisos.push(`«${palavra}» é uma sigla sem pronúncia`);
    else if (SUSPEITAS.has(p) || /[kwy]|th|sh|ck|tion$|ing$/.test(p)) avisos.push(`«${palavra}» parece um estrangeirismo`);
  }
  return { dito, avisos };
}

// --- 2 e 3. Analisar e limpar ---------------------------------------------------------------
// Envelope em janelas de 5 ms, em dB relativos à janela mais forte.
function analisar(s, taxa) {
  const n = Math.round(taxa * 0.005);
  const env = [];
  for (let i = 0; i + n <= s.length; i += n) { let q = 0; for (let k = i; k < i + n; k++) q += s[k] * s[k]; env.push(Math.sqrt(q / n)); }
  const pico = Math.max(1, ...env);
  const rel = env.map((x) => (x <= 0 ? -99 : 20 * Math.log10(x / pico)));
  // A fala começa na primeira janela forte, recuando enquanto houver som contínuo (um «v» ou um «s» fracos).
  let ini = Math.max(0, rel.findIndex((x) => x >= -20));
  while (ini > 0 && rel[ini - 1] > -37) ini--;
  let fim = rel.length - 1;
  while (fim > ini && rel[fim] <= -37) fim--;
  const ruidoAntes = Math.max(-99, ...rel.slice(0, ini)); // rajada solta antes da fala
  const nivelFim = Math.max(...rel.slice(Math.max(ini, fim - 5), fim + 1)); // os últimos 30 ms de fala
  const cauda = (rel.length - 1 - fim) * 5; // silêncio que o próprio modelo deixou depois da fala
  return { n, env, rel, ini, fim, ruidoAntes, nivelFim, cauda, abrupto: cauda < 40 && nivelFim > -32, fala: (fim - ini + 1) * 0.005 };
}

const ALVO_RMS = 0.1 * 32768; // -20 dBFS na fala
const ALVO_PICO = 0.84 * 32767; // -1,5 dBFS
function limpar(s, taxa, a) {
  const margem = Math.round(taxa * 0.01);
  const de = Math.max(0, a.ini * a.n - margem);
  const ate = Math.min(s.length, (a.fim + 1) * a.n + margem);
  const f = Float64Array.from(s.subarray(de, ate));
  const nEntrada = Math.min(f.length, Math.round(taxa * 0.01));
  for (let i = 0; i < nEntrada; i++) f[i] *= 0.5 * (1 - Math.cos((Math.PI * i) / nEntrada));
  // Quando o modelo corta a última vogal, um desvanecer de 90 ms devolve-lhe a descida; senão bastam 30 ms.
  const nSaida = Math.min(f.length, Math.round(taxa * (a.abrupto ? 0.09 : 0.03)));
  for (let i = 0; i < nSaida; i++) f[f.length - 1 - i] *= 0.5 * (1 - Math.cos((Math.PI * i) / nSaida));
  let q = 0, k = 0, pico = 1;
  for (let j = a.ini; j <= a.fim; j++) if (a.rel[j] > -25) { q += a.env[j] * a.env[j]; k++; }
  for (const x of f) if (Math.abs(x) > pico) pico = Math.abs(x);
  const ganho = Math.min(ALVO_RMS / Math.sqrt(q / Math.max(1, k)), ALVO_PICO / pico);
  const antes = Math.round(taxa * 0.03), depois = Math.round(taxa * 0.08);
  const saida = new Int16Array(antes + f.length + depois);
  for (let i = 0; i < f.length; i++) saida[antes + i] = Math.round(f[i] * ganho);
  return saida;
}
const amostras = (wav) => new Int16Array(wav.dados.buffer.slice(wav.dados.byteOffset, wav.dados.byteOffset + wav.dados.length - (wav.dados.length % 2)));
function gravarWav(caminho, s, taxa) {
  const dados = Buffer.from(s.buffer, s.byteOffset, s.byteLength);
  writeFileSync(caminho, Buffer.concat([cabecalhoWav(taxa, 1, dados.length), dados]));
}

// --- Motores --------------------------------------------------------------------------------
mkdirSync(join(pasta, 'audio'), { recursive: true });

// O Piper 2023.11 em Windows não lê caminhos com acentos. Converte para o nome curto 8.3, que só tem ASCII.
function caminhoAscii(caminho) {
  if (process.platform !== 'win32' || /^[\x00-\x7F]*$/.test(caminho)) return caminho;
  return execSync(`cmd /c for %I in ("${caminho}") do @echo %~sI`, { encoding: 'utf8' }).trim();
}

let piper;
function prepararPiper() {
  const voz = guiao.voz ?? 'pt_PT-tugao-medium';
  const exe = process.env.PIPER_EXE ?? resolve(pasta, '../../ferramentas/piper/piper/piper.exe');
  const modelo = process.env.PIPER_MODELO ?? resolve(pasta, `../../ferramentas/piper/${voz}.onnx`);
  const espeak = process.env.PIPER_ESPEAK ?? join(dirname(exe), 'espeak-ng-data');
  for (const f of [exe, modelo, espeak]) {
    if (!existsSync(f)) { console.error(`Não encontrei ${f}. Define PIPER_EXE, PIPER_MODELO e PIPER_ESPEAK.`); process.exit(1); }
  }
  // O nome curto esconde a extensão .onnx, por isso o ficheiro de configuração vai explícito.
  // Sem silêncio no fim: vê-se assim se o modelo deixou a frase acabar ou a cortou.
  piper = {
    exe: caminhoAscii(exe), pastaAudio: caminhoAscii(join(pasta, 'audio')),
    args: ['--model', caminhoAscii(modelo), '--config', caminhoAscii(`${modelo}.json`), '--espeak_data', caminhoAscii(espeak), '--sentence_silence', '0',
      '--length_scale', String(opcoes.length_scale), '--noise_w', String(opcoes.noise_w), '--noise_scale', String(opcoes.noise_scale)],
  };
}
function tomadaPiper(dito, nome) {
  execFileSync(piper.exe, [...piper.args, '--output_file', join(piper.pastaAudio, nome)], { input: dito + '\n', stdio: ['pipe', 'ignore', 'inherit'] });
  return lerWav(join(pasta, 'audio', nome));
}

// Azure AI Speech, API REST de texto para voz. A chave só vem do ambiente.
async function tomadaAzure(dito, nome) {
  const chave = process.env.AZURE_SPEECH_KEY, regiao = process.env.AZURE_SPEECH_REGION;
  if (!chave || !regiao) { console.error('Faltam as variáveis de ambiente AZURE_SPEECH_KEY e AZURE_SPEECH_REGION.'); process.exit(1); }
  const voz = guiao.voz ?? 'pt-PT-RaquelNeural';
  const xml = dito.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const r = await fetch(`https://${regiao}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: 'POST',
    headers: { 'Ocp-Apim-Subscription-Key': chave, 'Content-Type': 'application/ssml+xml', 'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm', 'User-Agent': 'gravacao-video' },
    body: `<speak version='1.0' xml:lang='pt-PT'><voice name='${voz}'>${xml}</voice></speak>`,
  });
  if (!r.ok) throw new Error(`O Azure respondeu ${r.status}: ${(await r.text()).slice(0, 300)}`);
  writeFileSync(join(pasta, 'audio', nome), Buffer.from(await r.arrayBuffer()));
  return lerWav(join(pasta, 'audio', nome));
}

if (motor === 'piper') prepararPiper();
else if (motor !== 'azure') { console.error(`Motor de voz desconhecido: ${motor}. Usa "piper" ou "azure".`); process.exit(1); }
const nTomadas = motor === 'piper' ? Math.max(1, opcoes.tomadas) : 1;

// --- Narrar ---------------------------------------------------------------------------------
const duracoes = {};
const avisos = [];
let cortadas = 0, comRuido = 0, nFrases = 0;
for (const passo of guiao.passos) {
  const frases = [];
  for (const [n, texto] of dividirFrases(passo.narracao).entries()) {
    const { dito, avisos: daFrase } = comoSeDiz(texto);
    for (const a of daFrase) avisos.push(`${passo.id}, frase ${n + 1}: ${a}`);
    const tomadas = [];
    for (let t = 0; t < nTomadas; t++) {
      const nome = `_tomada-${t}.wav`;
      const wav = motor === 'piper' ? tomadaPiper(dito, nome) : await tomadaAzure(dito, nome);
      if (wav.canais !== 1) throw new Error(`Esperava áudio mono em ${passo.id}`);
      const s = amostras(wav);
      tomadas.push({ s, taxa: wav.taxa, a: analisar(s, wav.taxa) });
      rmSync(join(pasta, 'audio', nome), { force: true });
    }
    // Fica a tomada com menos defeitos; em caso de empate, a de duração mais próxima da mediana
    // (uma tomada curta engoliu sílabas, uma longa arrastou-se).
    const ordenadas = tomadas.map((t) => t.a.fala).sort((x, y) => x - y);
    const mediana = ordenadas[Math.floor(ordenadas.length / 2)];
    const defeitos = (t) => (t.a.abrupto ? 2 : 0) + (t.a.ruidoAntes > -45 ? 1 : 0) + (Math.abs(t.a.fala - mediana) / mediana) * 4;
    const melhor = tomadas.reduce((m, t) => (defeitos(t) < defeitos(m) ? t : m));
    const limpo = limpar(melhor.s, melhor.taxa, melhor.a);
    const ficheiro = `${passo.id}-${n + 1}.wav`;
    gravarWav(join(pasta, 'audio', ficheiro), limpo, melhor.taxa);
    nFrases++; if (melhor.a.abrupto) cortadas++; if (melhor.a.ruidoAntes > -45) comRuido++;
    frases.push({ texto, dito: dito === texto ? undefined : dito, ficheiro, segundos: Number((limpo.length / melhor.taxa).toFixed(3)), taxa: melhor.taxa, canais: 1,
      fimCortado: melhor.a.abrupto || undefined, ruidoRetirado: melhor.a.ruidoAntes > -45 || undefined });
  }
  const segundos = frases.reduce((s, f) => s + f.segundos, 0);
  duracoes[passo.id] = { segundos: Number(segundos.toFixed(3)), caracteres: passo.narracao.length, frases };
  console.log(`${passo.id}: ${segundos.toFixed(2)} s em ${frases.length} frase(s)`);
}

escreverJson('audio/duracoes.json', duracoes);
const total = Object.values(duracoes).reduce((s, d) => s + d.segundos, 0);
const caracteres = Object.values(duracoes).reduce((s, d) => s + d.caracteres, 0);
console.log(`\nNarração: ${total.toFixed(1)} s, ${nFrases} frases, ${caracteres} caracteres, motor ${motor}${motor === 'piper' ? `, ${nTomadas} tomadas por frase, fala a ${opcoes.length_scale}x` : ''}`);
console.log(`Fins que o modelo cortou e levaram desvanecer longo: ${cortadas} de ${nFrases}. Ruído retirado antes da fala: ${comRuido} de ${nFrases}.`);
if (avisos.length) {
  console.log('\nPronúncia a rever (reescreve em português ou junta a "pronuncias" no guiao.json):');
  for (const a of avisos) console.log(`  ${a}`);
}
