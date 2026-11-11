// Estúdio de gravação da mini skill gravacao-video.
// Abre o browser a gravar e dá as ações que ficam na própria gravação: cursor com movimento
// suave e clique, escrita, scroll suave, caixa de destaque, título em terço inferior, cartões
// de abertura e fecho, dissolve entre páginas e marcas de zoom para a montagem.
// A narração é por frases: cada chamada a narrar() encaixa a frase seguinte no momento em que
// é feita, e a montagem coloca o áudio e as legendas nesses tempos.
// Lê guiao.json; escreve gravacao/bruto.webm, gravacao/<passo>.png e gravacao/tempos.json.
import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { pasta, lerJson, escreverJson, dividirFrases } from './comum.mjs';

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const CARACTERES_POR_SEGUNDO = 13; // estimativa quando ainda não há áudio

function estilo(cores) {
  return `
@keyframes dg-subir { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
@keyframes dg-descer { to { opacity: 0; transform: translateY(10px); } }
@keyframes dg-caixa { from { opacity: 0; transform: scale(1.04); } to { opacity: 1; transform: none; } }
@keyframes dg-pulsar { 0%, 100% { box-shadow: 0 0 0 0 ${cores.realce}73; } 50% { box-shadow: 0 0 0 10px ${cores.realce}00; } }
@keyframes dg-onda { from { opacity: .9; transform: translate(-50%, -50%) scale(.2); } to { opacity: 0; transform: translate(-50%, -50%) scale(1.5); } }
.dg-titulo { position: fixed; left: 32px; bottom: 24px; z-index: 2147482000; max-width: 720px; padding: 10px 18px;
  background: ${cores.fundo}eb; color: #fff; font: 600 24px/1.25 "Segoe UI", system-ui, sans-serif;
  border-left: 4px solid ${cores.realce}; border-radius: 4px; animation: dg-subir .4s ease-out both; pointer-events: none; }
.dg-titulo.dg-sair { animation: dg-descer .3s ease-in both; }
.dg-caixa { position: fixed; z-index: 2147482000; border: 3px solid ${cores.realce}; border-radius: 6px; pointer-events: none;
  animation: dg-caixa .35s ease-out both, dg-pulsar 1.6s ease-out .35s 2; }
.dg-cortina { position: fixed; inset: 0; z-index: 2147483645; background: ${cores.fundo}; pointer-events: none; transition: opacity .4s ease; }
.dg-ponte { position: fixed; inset: 0; z-index: 2147483645; background: #fff center / cover no-repeat; pointer-events: none;
  transition: opacity .55s ease, transform .55s ease; }
.dg-ponte.dg-sair { opacity: 0; transform: scale(1.05); }
.dg-cartao { position: fixed; inset: 0; z-index: 2147483647; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 18px; padding: 0 80px; text-align: center; pointer-events: none; color: #fff; font-family: "Segoe UI", system-ui, sans-serif;
  background: radial-gradient(ellipse at 30% 20%, ${cores.realce}26, transparent 55%), ${cores.fundo}; transition: opacity .6s ease, transform .6s ease; }
.dg-cartao.dg-sair { opacity: 0; transform: scale(1.04); }
.dg-cartao h1 { margin: 0; font-weight: 700; font-size: 56px; line-height: 1.1; letter-spacing: -.5px; color: #fff; animation: dg-subir .6s ease-out both; }
.dg-cartao i { display: block; width: 64px; height: 4px; background: ${cores.realce}; border-radius: 2px; animation: dg-subir .6s ease-out .15s both; }
.dg-cartao p { margin: 0; font-weight: 400; font-size: 24px; line-height: 1.3; color: #ffffffc0; animation: dg-subir .6s ease-out .3s both; }
.dg-rato { position: fixed; left: 0; top: 0; z-index: 2147483647; pointer-events: none; opacity: 0; transition: opacity .3s ease;
  filter: drop-shadow(0 1px 2px #0006); transform-origin: 2px 2px; }
.dg-rato.dg-ver { opacity: 1; }
.dg-rato.dg-premido svg { transform: scale(.88); transform-origin: 2px 2px; }
.dg-rato svg { display: block; transition: transform .1s ease; }
.dg-onda { position: fixed; z-index: 2147483644; width: 44px; height: 44px; border: 3px solid ${cores.fundo}99; border-radius: 50%;
  pointer-events: none; animation: dg-onda .5s ease-out both; }
.dg-fixo, .dg-fixo * { animation: none !important; }
`;
}

// Corre dentro da página, em cada documento novo (addInitScript) e sempre que falte (evaluate).
function instalarNaPagina({ css, capa }) {
  if (window.__dg) return;
  const guardar = (k, v) => { try { v === null ? sessionStorage.removeItem(k) : sessionStorage.setItem(k, v); } catch {} };
  const ler = (k) => { try { return sessionStorage.getItem(k); } catch { return null; } };
  const raiz = () => document.documentElement;
  const dg = (window.__dg = {});

  // Elementos que devem estar na página. Alguns sites limpam os filhos de <html> que não conhecem
  // quando acabam de carregar; o observador (em instalar) repõe o que faltar antes do próximo frame.
  dg.vivos = new Map();
  dg.el = (tag, cls, id) => {
    dg.vivos.delete(id); document.getElementById(id)?.remove();
    const el = document.createElement(tag); el.className = cls; el.id = id;
    dg.vivos.set(id, el);
    return el;
  };
  dg.largar = (id) => { dg.vivos.delete(id); document.getElementById(id)?.remove(); };
  // Tira um elemento depois da sua animação de saída, a não ser que entretanto tenha sido substituído.
  dg.largarDepois = (el, ms) => setTimeout(() => { if (dg.vivos.get(el.id) === el) dg.vivos.delete(el.id); el.remove(); }, ms);

  dg.titulo = (texto) => { const el = dg.el('div', 'dg-titulo', 'dg-titulo'); el.textContent = texto; raiz().appendChild(el); };
  dg.esconderTitulo = () => { const el = document.getElementById('dg-titulo'); if (!el) return false; el.classList.add('dg-sair'); dg.largarDepois(el, 320); return true; };

  dg.caixa = (alvo, margem) => {
    const r = alvo.getBoundingClientRect();
    const el = dg.el('div', 'dg-caixa', 'dg-caixa');
    el.style.left = `${r.left - margem}px`; el.style.top = `${r.top - margem}px`;
    el.style.width = `${r.width + margem * 2}px`; el.style.height = `${r.height + margem * 2}px`;
    raiz().appendChild(el);
  };
  dg.semCaixa = () => dg.largar('dg-caixa');

  // Cortina escura (estilo sóbrio) entre páginas.
  dg.cortina = () => {
    guardar('dg-cortina', '1');
    const el = dg.el('div', 'dg-cortina', 'dg-cortina');
    el.style.opacity = '0'; raiz().appendChild(el); void el.offsetHeight; el.style.opacity = '1';
  };
  dg.semCortina = () => {
    guardar('dg-cortina', null);
    const el = document.getElementById('dg-cortina'); if (!el) return;
    el.style.opacity = '0'; dg.largarDepois(el, 450);
  };

  // Ponte (estilo apresentação): a última imagem da página antiga cobre a nova até ela estar pronta
  // e depois desvanece com um leve zoom. Desenha-se logo no documento atual (numa SPA a navegação
  // não cria documento novo) e, numa navegação completa, o documento novo recebe-a por init script.
  dg.ponte = (imagem) => {
    const el = dg.el('div', 'dg-ponte', 'dg-ponte');
    el.style.backgroundImage = `url(${imagem})`;
    raiz().appendChild(el);
  };
  dg.semPonte = () => {
    const el = document.getElementById('dg-ponte'); if (!el) return false;
    void el.offsetHeight; el.classList.add('dg-sair'); dg.largarDepois(el, 600);
    return true;
  };

  dg.cartao = ({ titulo, subtitulo }, imediato) => {
    // Diálogos modais e popovers do site vivem na camada de topo, acima de qualquer z-index;
    // enquanto o cartão está no ecrã ficam transparentes (e o Playwright continua a poder clicá-los).
    if (!dg.tapar) {
      dg.tapar = document.createElement('style'); dg.tapar.id = 'dg-tapar';
      dg.tapar.textContent = 'dialog:not(.dg-cartao), [popover] { opacity: 0 !important; } dialog::backdrop { opacity: 0 !important; }';
    }
    if (!dg.tapar.isConnected) document.head.appendChild(dg.tapar);
    const el = dg.el('div', 'dg-cartao', 'dg-cartao');
    el.innerHTML = '<h1></h1><i></i><p></p>';
    el.querySelector('h1').textContent = titulo ?? '';
    el.querySelector('p').textContent = subtitulo ?? '';
    if (!subtitulo) el.querySelector('p').remove();
    if (!imediato) { el.style.opacity = '0'; raiz().appendChild(el); void el.offsetHeight; el.style.opacity = '1'; } else raiz().appendChild(el);
  };
  dg.semCartao = () => {
    guardar('dg-capa-feita', '1');
    const el = document.getElementById('dg-cartao'); if (!el) return;
    el.classList.add('dg-sair'); dg.largarDepois(el, 650);
    setTimeout(() => { if (!document.getElementById('dg-cartao')) { dg.tapar?.remove(); dg.tapar = null; } }, 650);
  };

  const SETA = '<svg width="22" height="30" viewBox="0 0 22 30"><path d="M2 2 L2 24 L8 18.5 L12 27 L16 25.2 L12 17 L20 17 Z" fill="#fff" stroke="#1a1a1a" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  dg.rato = (x, y, visivel) => {
    let el = document.getElementById('dg-rato');
    if (!el) { el = dg.el('div', 'dg-rato', 'dg-rato'); el.innerHTML = SETA; raiz().appendChild(el); }
    el.style.transform = `translate(${x - 2}px, ${y - 2}px)`;
    if (visivel !== undefined) { void el.offsetHeight; el.classList.toggle('dg-ver', visivel); }
    const ver = visivel === undefined ? el.classList.contains('dg-ver') : visivel;
    guardar('dg-rato', `${x},${y},${ver ? 1 : 0}`);
  };
  dg.onda = (x, y) => {
    const el = document.createElement('div'); el.className = 'dg-onda';
    el.style.left = `${x}px`; el.style.top = `${y}px`;
    raiz().appendChild(el); setTimeout(() => el.remove(), 550);
  };
  window.addEventListener('mousemove', (e) => { const el = document.getElementById('dg-rato'); if (el) el.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`; }, true);
  window.addEventListener('mousedown', (e) => { document.getElementById('dg-rato')?.classList.add('dg-premido'); dg.onda(e.clientX, e.clientY); }, true);
  window.addEventListener('mouseup', () => document.getElementById('dg-rato')?.classList.remove('dg-premido'), true);

  // O que faz scroll: o primeiro antepassado com overflow e conteúdo a mais, senão o documento.
  dg.contentor = (el) => {
    for (let n = el; n && n !== document.body && n !== document.documentElement; n = n.parentElement) {
      const o = getComputedStyle(n).overflowY;
      if ((o === 'auto' || o === 'scroll') && n.scrollHeight > n.clientHeight + 10) return n;
    }
    return document.scrollingElement ?? document.documentElement;
  };
  // Scroll animado com aceleração e travagem. «instant» ignora o scroll-behavior: smooth do site,
  // que de outro modo atrasa cada passo e deixa o scroll a acabar depois da promessa.
  dg.percorrer = (dy, ms, el) => new Promise((fim) => {
    const c = dg.contentor(el ?? document.elementFromPoint(innerWidth / 2, innerHeight / 2) ?? document.body);
    const y0 = c.scrollTop; const t0 = performance.now();
    const passo = (t) => {
      const p = Math.min(1, (t - t0) / ms);
      const s = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      c.scrollTo({ top: y0 + dy * s, behavior: 'instant' });
      if (p < 1) requestAnimationFrame(passo); else fim();
    };
    requestAnimationFrame(passo);
  });
  dg.percorrerAte = (el, bloco, ms) => {
    const c = dg.contentor(el);
    const r = el.getBoundingClientRect();
    const documento = c === document.scrollingElement || c === document.documentElement;
    const topo = documento ? 0 : c.getBoundingClientRect().top;
    const altura = documento ? innerHeight : c.clientHeight;
    const dy = Math.round(bloco === 'center' ? r.top + r.height / 2 - (topo + altura / 2) : r.top - topo - 24);
    return Math.abs(dy) > 4 ? dg.percorrer(dy, ms, el).then(() => dy) : Promise.resolve(0);
  };

  // Quando corre como init script ainda não há <head>: espera por ele.
  const instalar = () => {
    if (!document.head) { setTimeout(instalar, 0); return; }
    dg.estilo = document.getElementById('dg-estilo');
    if (!dg.estilo) { dg.estilo = document.createElement('style'); dg.estilo.id = 'dg-estilo'; dg.estilo.textContent = css; document.head.appendChild(dg.estilo); }
    if (location.href === 'about:blank') return;
    const manter = () => {
      if (!dg.estilo.isConnected) document.head.appendChild(dg.estilo);
      if (dg.tapar && !dg.tapar.isConnected) document.head.appendChild(dg.tapar);
      for (const el of dg.vivos.values()) if (!el.isConnected) { el.classList.add('dg-fixo'); raiz().appendChild(el); }
    };
    new MutationObserver(manter).observe(document.documentElement, { childList: true });
    new MutationObserver(manter).observe(document.head, { childList: true });
    if (ler('dg-cortina') === '1') { const el = dg.el('div', 'dg-cortina', 'dg-cortina'); raiz().appendChild(el); }
    if (window.__dgPonte) dg.ponte(window.__dgPonte);
    if (capa && ler('dg-capa-feita') !== '1') dg.cartao(capa, true);
    const r = ler('dg-rato'); if (r) { const [x, y, v] = r.split(',').map(Number); dg.rato(x, y, v === 1); }
  };
  instalar();
}

export async function abrirEstudio(opcoes = {}) {
  const guiao = lerJson('guiao.json');
  const escala = guiao.escala ?? 2;
  const apresentacao = (guiao.estilo ?? 'apresentacao') === 'apresentacao';
  const cores = { fundo: '#0b1f33', realce: '#e8601c', ...guiao.cores };
  const css = estilo(cores);
  const duracoes = existsSync(join(pasta, 'audio/duracoes.json')) ? lerJson('audio/duracoes.json') : null;
  // O ritmo segue o formato: um teaser é rápido; uma demonstração ou uma explicação dão tempo de olhar.
  // pausaFrases: entre frases seguidas; folga: depois da última frase de cada passo;
  // ritmo: multiplica a duração dos movimentos do cursor, do scroll, da escrita e do zoom.
  const RITMOS = {
    teaser: { pausaFrases: 0.25, folga: 0.4, ritmo: 1 },
    demonstracao: { pausaFrases: 0.5, folga: 0.9, ritmo: 1.3 },
    explicacao: { pausaFrases: 0.7, folga: 1.2, ritmo: 1.5 },
  };
  const base = RITMOS[guiao.formato] ?? RITMOS.demonstracao;
  const folgaMs = Math.round((guiao.folga ?? base.folga) * 1000);
  const pausaMs = Math.round((guiao.pausaFrases ?? base.pausaFrases) * 1000);
  const ritmo = guiao.ritmo ?? base.ritmo;
  mkdirSync(join(pasta, 'gravacao'), { recursive: true });

  const browser = await chromium.launch({ args: escala !== 1 ? [`--force-device-scale-factor=${escala}`] : [] });
  const context = await browser.newContext({
    viewport: { width: guiao.largura, height: guiao.altura },
    deviceScaleFactor: escala,
    recordVideo: { dir: join(pasta, 'gravacao'), size: { width: guiao.largura * escala, height: guiao.altura * escala } },
    locale: guiao.locale ?? 'pt-PT',
    timezoneId: guiao.fuso ?? 'Europe/Lisbon',
  });

  const aceitarCookies = async (page) => {
    const botao = page.getByRole('button', { name: /aceitar|aceito|concordo|accept/i }).first();
    await botao.waitFor({ state: 'visible', timeout: 1500 }).then(() => botao.click()).catch(() => {});
  };

  // Aquecer: a primeira visita carrega a cache e aceita os cookies, para a gravação não mostrar esperas.
  if (opcoes.aquecer ?? true) {
    const p = await context.newPage();
    await p.goto(guiao.url, { waitUntil: 'load', timeout: 30000 }).catch(() => {});
    await aceitarCookies(p);
    const v = p.video();
    await p.close();
    await v?.delete();
  }

  const capa = apresentacao && guiao.capa ? { titulo: guiao.capa.titulo, subtitulo: guiao.capa.subtitulo } : null;
  await context.addInitScript(instalarNaPagina, { css, capa });
  const page = await context.newPage();
  const t0 = Date.now();
  const agora = () => Date.now() - t0;

  const e = {
    page, guiao, agora, apresentacao,
    tempos: [], marcas: [], zooms: [], esperas: [], scrolls: [],
    rato: { x: Math.round(guiao.largura * 0.58), y: Math.round(guiao.altura * 0.55) },
    ratoVisivel: false, zoomAtivo: false, passoAtual: null, inicioVideo: 0,
  };

  const garantir = () => page.evaluate(instalarNaPagina, { css, capa });
  const dg = async (fn, arg) => { await garantir(); return page.evaluate(fn, arg); };

  e.pausa = esperar;

  // Frases de um passo, com a duração de cada uma (do áudio, ou estimada pelo texto).
  function frasesDe(passo) {
    const d = duracoes?.[passo.id];
    if (d?.frases) return d.frases.map((f) => ({ texto: f.texto, ms: Math.round(f.segundos * 1000) }));
    return dividirFrases(passo.narracao).map((t) => ({ texto: t, ms: Math.round((t.length / CARACTERES_POR_SEGUNDO + 0.4) * 1000) }));
  }
  const fimAgendado = () => {
    const p = e.passoAtual; const u = p.agenda.at(-1);
    return u ? u.em + p.frases[u.n].ms : null;
  };
  // Encaixa a frase seguinte agora. Se a anterior ainda não acabou, espera por ela e pela pausa.
  e.narrar = async () => {
    const p = e.passoAtual;
    if (p.agenda.length >= p.frases.length) { console.warn(`Aviso: ${p.passo.id} não tem mais frases para narrar`); return; }
    const fim = fimAgendado();
    if (fim !== null && agora() < fim + pausaMs) await esperar(fim + pausaMs - agora());
    p.agenda.push({ n: p.agenda.length, em: agora() });
  };
  // As frases que o script não encaixou seguem-se à última, com a pausa entre elas.
  const encadearRestantes = () => {
    const p = e.passoAtual;
    while (p.agenda.length < p.frases.length) {
      const fim = fimAgendado();
      p.agenda.push({ n: p.agenda.length, em: fim === null ? p.inicio : fim + pausaMs });
    }
  };
  // Espera até acabarem as frases já encaixadas (margem negativa: um pouco antes).
  e.ateFrase = async (margemMs = 0) => {
    const fim = fimAgendado();
    if (fim !== null && agora() < fim + margemMs) await esperar(fim + margemMs - agora());
  };
  // Espera até acabar toda a narração do passo.
  e.ateNarracao = async (margemMs = 0) => { encadearRestantes(); await e.ateFrase(margemMs); };

  e.passo = async (id, fn) => {
    const passo = guiao.passos.find((p) => p.id === id);
    if (!passo) throw new Error(`O passo ${id} não está no guiao.json`);
    const inicio = agora();
    e.passoAtual = { passo, inicio, frases: frasesDe(passo), agenda: [] };
    await fn(e);
    encadearRestantes();
    const fimPrevisto = fimAgendado() + folgaMs;
    if (agora() < fimPrevisto) await esperar(fimPrevisto - agora());
    // À escala do dispositivo: com scale 'css' o Playwright muda a escala para 1x durante a captura
    // e a gravação apanha fotogramas pequenos com cinzento à volta.
    await page.screenshot({ path: join(pasta, 'gravacao', `${id}.jpg`), type: 'jpeg', quality: 85 });
    const fim = agora();
    e.tempos.push({ id, inicio, fim, frases: e.passoAtual.agenda });
    console.log(`${id}: ${(inicio / 1000).toFixed(2)} s a ${(fim / 1000).toFixed(2)} s; frases aos ${e.passoAtual.agenda.map((f) => (f.em / 1000).toFixed(2)).join(', ')} s`);
  };

  // Abre a primeira página. Com cartão de abertura, a página carrega tapada; a primeira frase
  // começa ainda sobre o cartão e a página revela-se enquanto a voz fala.
  e.abrir = async (url = guiao.url) => {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
    await aceitarCookies(page);
    if (capa) {
      const pintura = await page.evaluate(() => {
        const p = performance.getEntriesByType('paint').find((x) => x.name === 'first-paint');
        return performance.timeOrigin + (p ? p.startTime : 0);
      });
      e.inicioVideo = Math.round(pintura - t0);
      e.marcas.push({ nome: 'capa', em: e.inicioVideo });
      const segundos = Math.round((guiao.capa.segundos ?? 2.5) * 1000);
      const antes = Math.min(Math.round((guiao.capa.narrarAntes ?? 1.5) * 1000), segundos - 900);
      const minimo = e.inicioVideo + segundos - antes; // o cartão já esteve parado o tempo que devia
      if (agora() < minimo) await esperar(minimo - agora());
      // Se a página demorou mais, o excesso sai na montagem: o cartão está parado desde o fim da entrada.
      if (agora() > minimo + 40) e.esperas.push({ de: minimo, ate: agora() });
      await e.narrar();
      await esperar(antes);
      await dg(() => window.__dg.semCartao());
      await esperar(650);
    } else {
      e.inicioVideo = agora();
      await e.narrar();
    }
    if (apresentacao) await e.mostrarCursor();
  };

  e.mostrarCursor = async () => {
    await dg(({ x, y }) => window.__dg.rato(x, y, true), e.rato);
    await page.mouse.move(e.rato.x, e.rato.y);
    e.ratoVisivel = true;
    await esperar(350);
  };
  e.esconderCursor = async () => {
    await dg(({ x, y }) => window.__dg.rato(x, y, false), e.rato);
    e.ratoVisivel = false;
    await esperar(320);
  };

  // Ponto de um alvo (locator ou {x, y}) no viewport, em píxeis CSS.
  e.ponto = async (alvo) => {
    if (alvo && typeof alvo.x === 'number') return alvo;
    const caixa = await alvo.boundingBox();
    if (!caixa) throw new Error('O alvo não está visível');
    return { x: Math.round(caixa.x + caixa.width / 2), y: Math.round(caixa.y + caixa.height / 2) };
  };

  // Move o cursor numa curva suave, com aceleração e travagem, e o rato real segue-o.
  e.mover = async (alvo, { ms } = {}) => {
    if (alvo && typeof alvo.x !== 'number') {
      // Só há scroll se menos de 70% do alvo estiver à vista: um botão encostado à margem aponta-se onde está.
      const caixa = await alvo.boundingBox();
      const aVista = caixa ? (Math.min(caixa.y + caixa.height, guiao.altura) - Math.max(caixa.y, 0)) / Math.max(1, caixa.height) : 1;
      if (aVista < 0.7) await e.percorrerAte(alvo, { forcar: true });
    }
    const destino = await e.ponto(alvo);
    if (apresentacao && !e.ratoVisivel) await e.mostrarCursor();
    const de = e.rato;
    const dist = Math.hypot(destino.x - de.x, destino.y - de.y);
    if (dist < 2) return destino;
    const duracao = ms ?? Math.round(Math.min(1100, Math.max(380, 320 + dist * 0.9)) * ritmo);
    const ctrl = { x: (de.x + destino.x) / 2 - (destino.y - de.y) * 0.12, y: (de.y + destino.y) / 2 + (destino.x - de.x) * 0.12 };
    const inicio = Date.now();
    for (;;) {
      const p = Math.min(1, (Date.now() - inicio) / duracao);
      const s = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      const x = (1 - s) ** 2 * de.x + 2 * (1 - s) * s * ctrl.x + s ** 2 * destino.x;
      const y = (1 - s) ** 2 * de.y + 2 * (1 - s) * s * ctrl.y + s ** 2 * destino.y;
      await page.mouse.move(x, y);
      if (p >= 1) break;
      await esperar(16);
    }
    e.rato = destino;
    await dg(({ x, y }) => window.__dg.rato(x, y), destino).catch(() => {});
    return destino;
  };

  e.clicar = async (alvo, { ms } = {}) => {
    const p = await e.mover(alvo, { ms });
    await esperar(140);
    await page.mouse.down();
    await esperar(90);
    await page.mouse.up();
    await esperar(220);
    return p;
  };

  e.escrever = async (texto) => {
    for (const ch of texto) {
      await page.keyboard.type(ch);
      await esperar(Math.round((ch === ' ' ? 140 : 70 + Math.random() * 50) * ritmo));
    }
  };
  e.tecla = (tecla) => page.keyboard.press(tecla);

  // Cada scroll fica registado com o passo em que aconteceu, para a prova os poder contar.
  const registarScroll = (pixeis) => e.scrolls.push({ passo: e.passoAtual?.passo.id ?? null, em: agora(), pixeis });
  e.percorrer = async (pixeis, { ms } = {}) => {
    registarScroll(pixeis);
    await dg(([dy, t]) => window.__dg.percorrer(dy, t), [pixeis, ms ?? Math.round(Math.min(2500, Math.max(600, Math.abs(pixeis) * 1.6)) * ritmo)]);
  };
  // Só faz scroll se o alvo não estiver já à vista: scroll sem propósito cansa quem vê.
  e.percorrerAte = async (locator, { bloco = 'center', ms, forcar = false } = {}) => {
    await garantir();
    if (!forcar) {
      const c = await locator.boundingBox();
      if (c && c.y >= 60 && c.y + c.height <= guiao.altura - 60) return;
    }
    const handle = await locator.elementHandle();
    const em = agora();
    const dy = await handle.evaluate((el, [b, t]) => window.__dg.percorrerAte(el, b, t), [bloco, ms ?? Math.round(1200 * ritmo)]);
    if (dy) e.scrolls.push({ passo: e.passoAtual?.passo.id ?? null, em, pixeis: dy });
  };

  e.destacar = async (locator, { margem = 8 } = {}) => {
    await garantir();
    const handle = await locator.elementHandle();
    await handle.evaluate((el, m) => window.__dg.caixa(el, m), margem);
  };
  e.retirarDestaque = () => dg(() => window.__dg.semCaixa());

  e.titulo = async (texto) => {
    if (e.zoomAtivo) console.warn(`Aviso: título «${texto}» com zoom ativo; pode ficar fora do enquadramento.`);
    await dg((t) => window.__dg.titulo(t), texto);
  };
  e.esconderTitulo = async () => { if (await dg(() => window.__dg.esconderTitulo())) await esperar(330); };

  // Zoom: só marcas para a montagem; a imagem não muda durante a gravação.
  e.zoom = async (alvo, { fator = 1.6, ms = Math.round(700 * ritmo) } = {}) => {
    const p = await e.ponto(alvo);
    e.zooms.push({ tipo: 'in', em: agora(), x: p.x, y: p.y, fator, ms });
    e.zoomAtivo = true;
    await esperar(ms);
    e.zoomDesde = agora();
  };
  // Um zoom que entra e sai logo a seguir incomoda: fica pelo menos 1,5 s antes de recuar.
  e.zoomFora = async ({ ms = Math.round(600 * ritmo) } = {}) => {
    if (!e.zoomAtivo) return;
    const falta = 1500 - (agora() - (e.zoomDesde ?? 0));
    if (falta > 0) await esperar(falta);
    e.zooms.push({ tipo: 'out', em: agora(), ms });
    e.zoomAtivo = false;
    await esperar(ms);
  };

  // Muda de página. No estilo apresentação, a última imagem da página antiga fica no ecrã e
  // desvanece sobre a nova (ponte); no sóbrio, uma cortina escura. A ação começa meio segundo
  // antes de a frase em curso acabar, e o tempo a mais à espera da página nova sai na montagem.
  // Devolve assim que o desvanecer começa, para a frase seguinte entrar com a página nova.
  e.navegar = async (acao, { url, visivel, timeout = 15000 } = {}) => {
    if (e.zoomAtivo) { e.zooms.push({ tipo: 'out', em: agora(), ms: 600 }); e.zoomAtivo = false; } // sai em paralelo
    await e.retirarDestaque();
    await e.esconderTitulo();
    await e.ateFrase(-500);
    if (apresentacao) {
      const foto = await page.screenshot({ type: 'jpeg', quality: 82 });
      const dado = `data:image/jpeg;base64,${foto.toString('base64')}`;
      await page.addInitScript((d) => { window.__dgPonte = d; }, dado); // numa navegação completa
      await dg((d) => window.__dg.ponte(d), dado); // na mesma página (SPA) e até o documento mudar
    }
    const parado = agora();
    if (!apresentacao) {
      await dg(() => window.__dg.cortina());
      e.marcas.push({ nome: 'cortina', em: parado + 400 });
    }
    await acao();
    if (url) await page.waitForURL(url, { waitUntil: 'domcontentloaded', timeout });
    if (visivel) await page.locator(visivel).first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    await esperar(apresentacao ? 100 : 400);
    const pronto = agora();
    if (apresentacao) {
      await dg(() => window.__dg.semPonte());
      await page.addInitScript(() => { window.__dgPonte = null; });
      await esperar(150);
    } else {
      await dg(() => window.__dg.semCortina());
      await esperar(450);
    }
    const margem = apresentacao ? 600 : 250; // deixa ver o clique (e o fim da frase) antes do corte
    if (pronto - parado > margem + 300) e.esperas.push({ de: parado + margem, ate: pronto - 100 });
  };

  // Cartão de fecho: o zoom sai, o cursor some e o cartão entra, tudo em sobreposição.
  e.fecho = async (cartao = guiao.fecho) => {
    await e.retirarDestaque();
    await e.esconderTitulo();
    if (e.zoomAtivo) { e.zooms.push({ tipo: 'out', em: agora(), ms: 600 }); e.zoomAtivo = false; }
    if (e.ratoVisivel) await e.esconderCursor();
    await dg((c) => window.__dg.cartao(c, false), { titulo: cartao?.titulo ?? '', subtitulo: cartao?.subtitulo ?? '' });
    e.marcas.push({ nome: 'fecho', em: agora() + 600 });
    await esperar(200);
  };

  e.terminar = async () => {
    await e.zoomFora();
    await esperar(800);
    const fechoEm = agora();
    const video = page.video();
    await context.close();
    await video.saveAs(join(pasta, 'gravacao', 'bruto.webm'));
    await video.delete();
    await browser.close();
    escreverJson('gravacao/tempos.json', {
      gravado_em: new Date(t0).toISOString(),
      largura: guiao.largura, altura: guiao.altura, escala,
      estilo: apresentacao ? 'apresentacao' : 'sobrio',
      inicioVideo: e.inicioVideo, fechoEm, comAudio: Boolean(duracoes),
      marcas: e.marcas, esperas: e.esperas, zooms: e.zooms, scrolls: e.scrolls, passos: e.tempos,
    });
    console.log(`Gravação: gravacao/bruto.webm, ${(fechoEm / 1000).toFixed(1)} s de relógio do script`);
    console.log(`Scrolls: ${e.scrolls.length}${e.scrolls.length ? ` (${e.scrolls.map((s) => `${s.passo} ${s.pixeis > 0 ? '+' : ''}${s.pixeis} px`).join(', ')})` : ''}`);
  };

  return e;
}
