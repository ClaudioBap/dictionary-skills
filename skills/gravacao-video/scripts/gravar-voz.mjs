// Página local para narrar o vídeo com a voz de uma pessoa em vez de uma voz sintética. Mostra cada
// frase do guião em letra grande, grava pelo microfone do browser, deixa ouvir e repetir, e guarda cada
// frase em audio/gravada/<passo>-<n>.wav (numa língua que não é a principal, dentro de <lingua>/). Com
// "motorVoz": "gravada" no guião, o narrar.mjs trata estas gravações como trata as tomadas de uma voz
// sintética: corta o silêncio, nivela o volume e confere as palavras com o reconhecimento de fala.
//
//   node gravar-voz.mjs                  abre a página em http://localhost:8795 (só neste PC)
//   node gravar-voz.mjs --lingua en      a mesma página, para as frases em inglês
import ffmpeg from 'ffmpeg-static';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { pasta, lerGuiao, lingua, principal, naLingua, dividirFrases, lerWav } from './comum.mjs';

const guiao = lerGuiao();
const PASTA = join(pasta, naLingua('audio/gravada'));
mkdirSync(PASTA, { recursive: true });

// As frases numeradas como na folha de escuta e no narrar.mjs.
const frases = [];
for (const passo of guiao.passos) {
  for (const [n, texto] of dividirFrases(passo.narracao).entries()) frases.push({ numero: frases.length + 1, passo: passo.id, chave: `${passo.id}-${n + 1}`, texto });
}
const ficheiro = (chave) => join(PASTA, `${chave}.wav`);
const segundosDe = (chave) => (existsSync(ficheiro(chave)) ? Number(lerWav(ficheiro(chave)).segundos.toFixed(1)) : null);

const LIMITE = 50 * 1024 * 1024; // uma frase gravada tem poucas centenas de KB
const lerCorpo = (req) => new Promise((ok, falha) => {
  const partes = []; let total = 0;
  req.on('data', (c) => { total += c.length; if (total > LIMITE) { req.destroy(); falha(new Error('gravação grande demais')); } else partes.push(c); });
  req.on('end', () => ok(Buffer.concat(partes)));
  req.on('error', falha);
});
const json = (res, estado, dados) => { res.writeHead(estado, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(dados)); };

const servidor = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(PAGINA);
  }
  if (req.method === 'GET' && url.pathname === '/frases') return json(res, 200, frases.map((f) => ({ ...f, segundos: segundosDe(f.chave) })));
  const f = frases.find((x) => x.chave === url.searchParams.get('chave'));
  if (!f) return json(res, 404, { erro: 'frase desconhecida' });
  if (req.method === 'GET' && url.pathname === '/audio') {
    if (!existsSync(ficheiro(f.chave))) return json(res, 404, { erro: 'ainda não gravada' });
    res.writeHead(200, { 'Content-Type': 'audio/wav', 'Cache-Control': 'no-store' });
    return res.end(readFileSync(ficheiro(f.chave)));
  }
  if (req.method === 'POST' && url.pathname === '/gravar') {
    const webmRecebido = join(PASTA, `_${f.chave}.webm`);
    try {
      writeFileSync(webmRecebido, await lerCorpo(req));
      // Saem os primeiros 150 ms e os últimos 300 ms: é aí que fica o clique do rato ou da tecla.
      const r = spawnSync(ffmpeg, ['-y', '-i', webmRecebido, '-af', 'atrim=start=0.15,areverse,atrim=start=0.3,areverse', '-ac', '1', '-ar', '48000', '-c:a', 'pcm_s16le', ficheiro(f.chave)], { encoding: 'utf8' });
      if (r.status !== 0) throw new Error(r.stderr.split('\n').filter(Boolean).at(-1) ?? 'o ffmpeg falhou');
      console.log(`Frase ${f.numero} (${f.chave}) gravada: ${segundosDe(f.chave)} s`);
      return json(res, 200, { segundos: segundosDe(f.chave) });
    } catch (erro) {
      return json(res, 500, { erro: String(erro.message ?? erro) });
    } finally {
      rmSync(webmRecebido, { force: true });
    }
  }
  return json(res, 404, { erro: 'não existe' });
});

const PAGINA = `<!doctype html>
<html lang="pt-PT"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gravar a narração</title>
<style>
  :root { --fundo: #f4f5f7; --papel: #fff; --tinta: #16202b; --suave: #5d6b7a; --linha: #d9dee4; --realce: #0f5fa8; --gravar: #b3261e; }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--fundo); color: var(--tinta); font: 16px/1.45 "Segoe UI", system-ui, sans-serif; }
  main { max-width: 1100px; margin: 0 auto; padding: 24px 16px 48px; }
  header { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; flex-wrap: wrap; margin-bottom: 16px; }
  h1 { font-size: 20px; margin: 0; }
  .suave { color: var(--suave); }
  .frase { background: var(--papel); border: 1px solid var(--linha); border-radius: 8px; padding: 24px 28px; }
  .onde { font-size: 14px; color: var(--suave); }
  #texto { font-size: clamp(26px, 4vw, 40px); line-height: 1.3; margin: 10px 0 14px; font-weight: 600; }
  #proxima { font-size: 15px; color: var(--suave); min-height: 22px; }
  .comandos { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin: 18px 0 8px; }
  button { font: inherit; font-size: 15px; padding: 9px 16px; border-radius: 6px; border: 1px solid var(--linha); background: var(--papel); color: var(--tinta); cursor: pointer; }
  button:hover:not(:disabled) { border-color: var(--realce); }
  button:disabled { opacity: .45; cursor: default; }
  #gravar { background: var(--gravar); border-color: var(--gravar); color: #fff; min-width: 170px; font-weight: 600; }
  #gravar.a-gravar { background: var(--papel); color: var(--gravar); }
  #estado { margin-left: 8px; font-size: 15px; }
  .nivel { height: 6px; background: var(--linha); border-radius: 3px; overflow: hidden; margin-top: 6px; }
  #nivel { height: 100%; width: 0; background: var(--realce); transition: width 60ms linear; }
  #nivel.alto { background: var(--gravar); }
  .dica { font-size: 14px; color: var(--suave); margin: 10px 0 0; }
  table { width: 100%; border-collapse: collapse; margin-top: 24px; background: var(--papel); border: 1px solid var(--linha); font-size: 15px; }
  th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--linha); vertical-align: top; }
  th { font-size: 13px; color: var(--suave); font-weight: 600; background: #fafbfc; }
  td.curta, th.curta { width: 1%; white-space: nowrap; }
  tr { cursor: pointer; }
  tr.atual td { background: #eef4fb; }
  tr.atual td:first-child { box-shadow: inset 3px 0 0 var(--realce); }
  @media (max-width: 640px) { .frase { padding: 18px; } td.passo, th.passo { display: none; } }
</style></head>
<body><main>
  <header><h1>Gravar a narração</h1><span class="suave" id="progresso"></span></header>
  <section class="frase">
    <div class="onde" id="onde"></div>
    <div id="texto"></div>
    <div id="proxima"></div>
    <div class="comandos">
      <button id="gravar">Gravar (espaço)</button>
      <button id="ouvir">Ouvir (O)</button>
      <button id="anterior">Anterior</button>
      <button id="seguinte">Seguinte</button>
      <span id="estado" class="suave"></span>
    </div>
    <div class="nivel"><div id="nivel"></div></div>
    <p class="dica">Diz a frase ao teu ritmo e espera meio segundo antes de parar. Podes gravar a mesma frase as vezes que quiseres: fica a última. O nível deve chegar a meio da barra sem ficar vermelho.</p>
  </section>
  <table><thead><tr><th class="curta">N.º</th><th class="curta passo">Passo</th><th>Frase</th><th class="curta">Duração</th></tr></thead><tbody id="lista"></tbody></table>
</main>
<script>
const $ = (id) => document.getElementById(id);
let frases = [], i = 0, fluxo = null, analisador = null, gravador = null, pedacos = [], aGravar = false, aGuardar = false;
const duracao = (s) => s === null ? 'por gravar' : s.toFixed(1).replace('.', ',') + ' s';

async function carregar() {
  frases = await (await fetch('/frases')).json();
  const falta = frases.findIndex((f) => f.segundos === null);
  i = falta < 0 ? 0 : falta;
  desenhar();
}
function desenhar() {
  const f = frases[i], seguinte = frases[i + 1];
  $('onde').textContent = 'Frase ' + f.numero + ' de ' + frases.length + ', passo ' + f.passo;
  $('texto').textContent = f.texto;
  $('proxima').textContent = seguinte ? 'A seguir: ' + seguinte.texto : 'É a última frase.';
  $('progresso').textContent = frases.filter((x) => x.segundos !== null).length + ' de ' + frases.length + ' gravadas';
  $('gravar').textContent = aGravar ? 'Parar (espaço)' : (f.segundos === null ? 'Gravar (espaço)' : 'Gravar outra vez (espaço)');
  $('gravar').classList.toggle('a-gravar', aGravar);
  $('gravar').disabled = aGuardar;
  $('ouvir').disabled = aGravar || f.segundos === null;
  $('anterior').disabled = aGravar || i === 0;
  $('seguinte').disabled = aGravar || i === frases.length - 1;
  if (!aGravar && !aGuardar) $('estado').textContent = f.segundos === null ? 'Por gravar' : 'Gravada, ' + duracao(f.segundos);
  $('lista').innerHTML = '';
  frases.forEach((x, k) => {
    const tr = document.createElement('tr');
    if (k === i) tr.className = 'atual';
    for (const [valor, classe] of [[x.numero, 'curta'], [x.passo, 'curta passo'], [x.texto, ''], [duracao(x.segundos), 'curta']]) {
      const td = document.createElement('td'); td.textContent = valor; if (classe) td.className = classe; tr.appendChild(td);
    }
    tr.onclick = () => { if (!aGravar) { i = k; desenhar(); } };
    $('lista').appendChild(tr);
  });
}
async function microfone() {
  if (fluxo) return;
  fluxo = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: false, noiseSuppression: true, autoGainControl: false } });
  const ctx = new AudioContext();
  analisador = ctx.createAnalyser(); analisador.fftSize = 2048;
  ctx.createMediaStreamSource(fluxo).connect(analisador);
  const d = new Float32Array(analisador.fftSize);
  (function medir() {
    analisador.getFloatTimeDomainData(d);
    let q = 0; for (const x of d) q += x * x;
    const db = 20 * Math.log10(Math.sqrt(q / d.length) + 1e-9);
    $('nivel').style.width = Math.max(0, Math.min(100, ((db + 60) / 60) * 100)) + '%';
    $('nivel').classList.toggle('alto', db > -6);
    requestAnimationFrame(medir);
  })();
}
async function alternar() {
  if (aGuardar) return;
  if (aGravar) { gravador.stop(); aGravar = false; aGuardar = true; $('estado').textContent = 'A guardar…'; desenhar(); return; }
  try { await microfone(); } catch (e) { $('estado').textContent = 'Sem acesso ao microfone: ' + e.message; return; }
  pedacos = [];
  gravador = new MediaRecorder(fluxo, { mimeType: 'audio/webm;codecs=opus' });
  gravador.ondataavailable = (e) => pedacos.push(e.data);
  gravador.onstop = guardar;
  gravador.start();
  aGravar = true; $('estado').textContent = 'A gravar…'; desenhar();
}
async function guardar() {
  const f = frases[i];
  const r = await fetch('/gravar?chave=' + encodeURIComponent(f.chave), { method: 'POST', body: new Blob(pedacos, { type: 'audio/webm' }) });
  const j = await r.json();
  aGuardar = false;
  if (!r.ok) { $('estado').textContent = 'Não guardou: ' + j.erro; desenhar(); return; }
  f.segundos = j.segundos; desenhar(); ouvir();
}
function ouvir() { const f = frases[i]; if (f.segundos !== null) new Audio('/audio?chave=' + encodeURIComponent(f.chave) + '&t=' + Date.now()).play(); }
function mudar(d) { if (aGravar || aGuardar) return; i = Math.max(0, Math.min(frases.length - 1, i + d)); desenhar(); }
$('gravar').onclick = alternar; $('ouvir').onclick = ouvir; $('anterior').onclick = () => mudar(-1); $('seguinte').onclick = () => mudar(1);
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') { e.preventDefault(); alternar(); }
  else if (e.key === 'ArrowRight') mudar(1);
  else if (e.key === 'ArrowLeft') mudar(-1);
  else if (e.key.toLowerCase() === 'o') ouvir();
});
carregar();
</script></body></html>`;

// Só neste PC: o servidor fica em 127.0.0.1 e não se vê na rede.
let porta = Number(process.env.PORTA ?? 8795);
servidor.on('error', (erro) => {
  if (erro.code === 'EADDRINUSE' && porta < 8799) { porta++; servidor.listen(porta, '127.0.0.1'); } else throw erro;
});
servidor.on('listening', () => {
  const feitas = frases.filter((f) => segundosDe(f.chave) !== null).length;
  console.log(`Página de gravação (${lingua}): http://localhost:${porta} (${feitas} de ${frases.length} frases gravadas, em ${naLingua('audio/gravada')}/)`);
  console.log('Abre-a no browser, grava as frases e fecha este processo com Ctrl+C. Depois: node narrar.mjs' + (principal ? '' : ` --lingua ${lingua}`));
});
servidor.listen(porta, '127.0.0.1');
