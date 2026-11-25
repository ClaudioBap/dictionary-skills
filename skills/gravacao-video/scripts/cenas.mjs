// Cenas que ocupam o ecrã inteiro durante a gravação, entre momentos do site: um gancho com
// capturas do site a flutuar em 3D, um diagrama de ligações, uma frase que entra linha a linha,
// uma grelha de cartões, um apelo com contactos e o fecho da marca com um globo de pontos.
// Correm dentro da página (page.evaluate) e desenham-se num shadow root, para o CSS do site não
// lhes tocar. Tudo o que usam está dentro da função, porque o Playwright só envia o seu texto.
// O ritmo segue a duração da narração do passo (duracao, em ms), que o estúdio calcula.
export function mostrarCena({ tipo, dados, cores, fonte, duracao, imediato }) {
  const dg = window.__dg;
  // Cada cena tem o seu elemento: uma cena nova entra por cima da anterior, que só sai depois,
  // para a página não espreitar entre duas cenas seguidas.
  const anteriores = [...document.querySelectorAll('.dg-cena')];
  const host = dg.el('div', 'dg-cena', `dg-cena-${Date.now()}`);
  host.style.cssText = 'position:fixed;inset:0;z-index:2147483646;pointer-events:none;opacity:0;transition:opacity .6s ease,transform .6s ease;';
  const raiz = host.attachShadow({ mode: 'open' });
  const seg = Math.max(3, (duracao || 4000) / 1000);
  const h = (tag, cls, texto) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (texto !== undefined && texto !== null) el.textContent = texto;
    return el;
  };
  const entrar = (el, atraso, classe = 'subir') => { el.classList.add(classe); el.style.animationDelay = `${atraso}s`; return el; };

  raiz.innerHTML = `<style>
:host { all: initial; }
.cena { position: absolute; inset: 0; overflow: hidden; background: ${cores.fundo}; color: #fff;
  font-family: ${fonte ? `'${fonte}', ` : ''}"Segoe UI", system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
.luz { position: absolute; width: 1000px; height: 1000px; left: -260px; top: -420px; border-radius: 50%;
  background: radial-gradient(closest-side, color-mix(in srgb, ${cores.realce} 20%, transparent), transparent);
  animation: vaguear 16s ease-in-out infinite alternate; }
.forma { position: absolute; width: 520px; height: 520px; right: -140px; bottom: -220px; border-radius: 48px;
  border: 1px solid color-mix(in srgb, #fff 7%, transparent); transform: rotate(28deg); animation: rodar 30s linear infinite; }
@keyframes vaguear { to { transform: translate(420px, 260px); } }
@keyframes rodar { to { transform: rotate(388deg); } }
.subir { opacity: 0; transform: translateY(18px); animation: subir .75s cubic-bezier(.2,.7,.2,1) forwards; }
@keyframes subir { to { opacity: 1; transform: none; } }
.surgir { opacity: 0; animation: surgir .6s ease forwards; }
@keyframes surgir { to { opacity: 1; } }
.rotulo { font-size: 15px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: ${cores.realce}; }
.suave { color: color-mix(in srgb, #fff 68%, transparent); }

/* Gancho: capturas do site num campo 3D que avança para quem vê, e a pergunta por cima. */
.campo { position: absolute; inset: 0; perspective: 1100px; perspective-origin: 50% 45%; }
.mundo { position: absolute; inset: 0; transform-style: preserve-3d; animation: avancar ${seg + 1.5}s cubic-bezier(.3,.1,.3,1) forwards; }
@keyframes avancar { from { transform: translateZ(-260px) rotateY(-7deg) rotateX(3deg); } to { transform: translateZ(240px) rotateY(5deg) rotateX(-2deg); } }
.janela { position: absolute; width: 352px; height: 198px; transform-style: preserve-3d; }
.janela div { width: 100%; height: 100%; border-radius: 10px; background: #fff center top / cover no-repeat;
  box-shadow: 0 18px 50px -12px #000c, 0 0 0 1px #ffffff1f; opacity: 0; animation: chegar .9s cubic-bezier(.2,.7,.2,1) forwards; }
@keyframes chegar { from { opacity: 0; transform: translateZ(-180px) scale(.92); } to { opacity: 1; transform: none; } }
.veu { position: absolute; inset: 0; background: color-mix(in srgb, ${cores.fundo} 62%, transparent); opacity: 0; animation: surgir .8s ease forwards; }
.pergunta { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 980px; text-align: center; }
.pergunta h1 { margin: 14px 0 0; font-size: 62px; line-height: 1.12; font-weight: 750; letter-spacing: -.02em; }
.pergunta h1 span { display: inline-block; margin-right: .26em; }

/* Ligações: vários pontos de partida que convergem num só. */
.no { position: absolute; top: 196px; transform: translateX(-50%); padding: 10px 18px; border-radius: 8px; font-size: 18px; font-weight: 650;
  background: color-mix(in srgb, #fff 6%, ${cores.fundo}); border: 1px solid color-mix(in srgb, ${cores.realce} 45%, transparent); white-space: nowrap; }
svg.linhas { position: absolute; inset: 0; width: 1280px; height: 720px; overflow: visible; }
svg.linhas path { fill: none; stroke: ${cores.realce}; stroke-width: 2; stroke-dasharray: 1; stroke-dashoffset: 1; animation: tracar .9s cubic-bezier(.4,0,.2,1) forwards; }
@keyframes tracar { to { stroke-dashoffset: 0; } }
.centro { position: absolute; left: 640px; top: 392px; width: 16px; height: 16px; margin: -8px 0 0 -8px; border-radius: 50%; background: ${cores.realce};
  opacity: 0; animation: surgir .3s ease forwards; }
.centro::after { content: ''; position: absolute; inset: -6px; border-radius: 50%; border: 2px solid ${cores.realce}; animation: onda 1.8s ease-out infinite; animation-delay: inherit; }
@keyframes onda { from { opacity: .9; transform: scale(.6); } to { opacity: 0; transform: scale(2.6); } }
.conclusao { position: absolute; left: 0; right: 0; top: 440px; text-align: center; }
.conclusao h2 { margin: 0; font-size: 56px; font-weight: 750; letter-spacing: -.02em; }
.conclusao p { margin: 12px 0 0; font-size: 22px; }

/* Frase: linhas que entram uma a uma, a última na cor de realce. */
.bloco { position: absolute; left: 120px; top: 50%; transform: translateY(-50%); padding-left: 30px; max-width: 980px; }
.bloco .barra { position: absolute; left: 0; top: 6px; bottom: 6px; width: 4px; border-radius: 2px; background: ${cores.realce};
  transform-origin: top; transform: scaleY(0); animation: crescer .9s cubic-bezier(.4,0,.2,1) .2s forwards; }
@keyframes crescer { to { transform: scaleY(1); } }
.bloco .linha { font-size: 44px; line-height: 1.28; font-weight: 700; letter-spacing: -.01em; }
.bloco .linha.realce { color: ${cores.realce}; }
.marca-topo { position: absolute; left: 120px; top: 84px; font-size: 34px; font-weight: 800; letter-spacing: -.01em; }
.marca-topo img { height: 40px; display: block; }

/* Grelha: cartões que entram em escada. */
.grelha-titulo { position: absolute; left: 0; right: 0; top: 64px; text-align: center; font-size: 40px; font-weight: 750; letter-spacing: -.01em; }
.grelha { position: absolute; left: 50%; top: 150px; transform: translateX(-50%); display: grid; gap: 22px; width: 1040px; }
.cartao { position: relative; padding: 22px 24px; border-radius: 14px; background: color-mix(in srgb, #fff 5%, ${cores.fundo});
  border: 1px solid color-mix(in srgb, #fff 9%, transparent); box-shadow: 0 20px 40px -24px #000a; overflow: hidden; }
.cartao.destaque { border-color: ${cores.realce}; }
.cartao img { display: block; width: 100%; height: 118px; object-fit: cover; border-radius: 8px; margin-bottom: 16px; }
.cartao .numero { font-size: 14px; font-weight: 800; letter-spacing: .1em; color: ${cores.realce}; }
.cartao h3 { margin: 6px 0 8px; font-size: 25px; font-weight: 750; }
.cartao p { margin: 0; font-size: 16px; line-height: 1.45; }
.rodape { position: absolute; left: 0; right: 0; bottom: 52px; text-align: center; font-size: 17px; }
.rodape b { color: ${cores.realce}; font-weight: 750; margin-right: 10px; letter-spacing: .08em; text-transform: uppercase; font-size: 14px; }

/* Apelo: a pergunta final, o botão e os contactos. */
.apelo { position: absolute; left: 120px; top: 50%; transform: translateY(-46%); max-width: 1040px; }
.apelo .titulo { position: relative; padding-left: 30px; }
.apelo .titulo .barra { position: absolute; left: 0; top: 8px; bottom: 8px; width: 4px; border-radius: 2px; background: ${cores.realce};
  transform-origin: top; transform: scaleY(0); animation: crescer .8s cubic-bezier(.4,0,.2,1) .15s forwards; }
.apelo h2 { margin: 0; font-size: 54px; line-height: 1.15; font-weight: 750; letter-spacing: -.02em; white-space: pre-line; }
.apelo .acoes { display: flex; align-items: center; gap: 34px; margin: 40px 0 0 30px; }
.apelo .botao { padding: 15px 28px; border-radius: 8px; background: ${cores.realce}; color: ${cores.fundo}; font-size: 20px; font-weight: 750;
  box-shadow: 0 10px 30px -10px color-mix(in srgb, ${cores.realce} 70%, transparent); }
.apelo .contactos { font-size: 19px; line-height: 1.6; }
.rodape-esq { position: absolute; left: 120px; bottom: 52px; font-size: 15px; }

/* Marca: nome, assinatura e um globo de pontos que roda devagar. */
.marca { position: absolute; left: 120px; top: 50%; transform: translateY(-50%); max-width: 560px; }
.marca .nome { font-size: 88px; font-weight: 800; letter-spacing: -.03em; line-height: 1; }
.marca .nome img { height: 96px; display: block; }
.marca .slogan { margin-top: 26px; font-size: 34px; line-height: 1.2; font-weight: 700; }
.marca .sub { margin-top: 14px; font-size: 19px; line-height: 1.45; }
canvas.globo { position: absolute; right: 40px; top: 50%; width: 560px; height: 560px; margin-top: -280px; opacity: 0;
  animation: surgir 1.4s ease .1s forwards; }
</style>`;

  const cena = h('div', 'cena');
  cena.append(h('div', 'luz'), h('div', 'forma'));
  raiz.appendChild(cena);

  if (tipo === 'pergunta') {
    const imagens = dados.imagens ?? [];
    const campo = h('div', 'campo');
    const mundo = h('div', 'mundo');
    // Posições fixas, espalhadas à volta do centro e a profundidades diferentes (sem aleatório:
    // duas gravações do mesmo guião dão o mesmo vídeo).
    const lugares = [[-470, -250, -520], [10, -300, -760], [450, -220, -430], [-560, 40, -260], [520, 70, -620],
      [-240, 250, -480], [260, 260, -300], [-30, 10, -980], [-620, -330, -880], [640, -360, -980], [-700, 300, -720], [700, 320, -860]];
    imagens.slice(0, lugares.length).forEach((src, i) => {
      const [x, y, z] = lugares[i];
      const janela = h('div', 'janela');
      janela.style.left = `${640 + x - 176}px`; janela.style.top = `${360 + y - 99}px`;
      janela.style.transform = `translateZ(${z}px) rotateY(${((i * 7) % 11) - 5}deg) rotateX(${((i * 5) % 7) - 3}deg)`;
      const foto = h('div');
      foto.style.backgroundImage = `url(${src})`;
      foto.style.animationDelay = `${0.08 + i * 0.11}s`;
      janela.appendChild(foto);
      mundo.appendChild(janela);
    });
    campo.appendChild(mundo);
    cena.appendChild(campo);
    const veu = h('div', 'veu'); veu.style.animationDelay = `${imagens.length ? 0.9 : 0}s`;
    cena.appendChild(veu);
    const bloco = h('div', 'pergunta');
    if (dados.rotulo) bloco.appendChild(entrar(h('div', 'rotulo', dados.rotulo), 0.9));
    const titulo = h('h1');
    String(dados.texto ?? '').split(/\s+/).filter(Boolean).forEach((palavra, i) => titulo.appendChild(entrar(h('span', '', palavra), 1.05 + i * 0.075)));
    bloco.appendChild(titulo);
    if (dados.subtitulo) bloco.appendChild(entrar(h('p', 'suave', dados.subtitulo), 1.6));
    cena.appendChild(bloco);
  }

  if (tipo === 'ligacoes') {
    const nos = dados.nos ?? [];
    const passo = Math.min(240, 1060 / Math.max(1, nos.length));
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'linhas'); svg.setAttribute('viewBox', '0 0 1280 720');
    nos.forEach((nome, i) => {
      const x = 640 + (i - (nos.length - 1) / 2) * passo;
      const no = entrar(h('div', 'no', nome), 0.15 + i * 0.12);
      no.style.left = `${x}px`;
      cena.appendChild(no);
      const linha = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      linha.setAttribute('d', `M ${x} 244 C ${x} 330, 640 312, 640 392`);
      linha.setAttribute('pathLength', '1');
      linha.style.animationDelay = `${0.65 + i * 0.1}s`;
      svg.appendChild(linha);
    });
    cena.appendChild(svg);
    const tFim = 0.65 + nos.length * 0.1 + 0.8;
    const centro = h('div', 'centro'); centro.style.animationDelay = `${tFim}s`;
    cena.appendChild(centro);
    const conclusao = h('div', 'conclusao');
    conclusao.appendChild(entrar(h('h2', '', dados.titulo), tFim + 0.15));
    if (dados.subtitulo) conclusao.appendChild(entrar(h('p', 'suave', dados.subtitulo), tFim + 0.35));
    cena.appendChild(conclusao);
  }

  if (tipo === 'frase') {
    if (dados.marca || dados.logo) {
      const m = entrar(h('div', 'marca-topo', dados.logo ? undefined : dados.marca), 0.1);
      if (dados.logo) { const img = h('img'); img.src = dados.logo; m.appendChild(img); }
      cena.appendChild(m);
    }
    const linhas = dados.linhas ?? [];
    const destaque = dados.destaque ?? linhas.length - 1;
    const bloco = h('div', 'bloco');
    bloco.appendChild(h('div', 'barra'));
    // As linhas repartem-se por 70% da narração, para a última chegar antes de a voz acabar.
    const intervalo = Math.min(1.8, Math.max(0.55, (seg * 0.7) / Math.max(1, linhas.length)));
    linhas.forEach((texto, i) => bloco.appendChild(entrar(h('div', `linha${i === destaque ? ' realce' : ''}`, texto), 0.35 + i * intervalo)));
    cena.appendChild(bloco);
  }

  if (tipo === 'grelha') {
    cena.appendChild(entrar(h('div', 'grelha-titulo', dados.titulo ?? ''), 0.1));
    const cartoes = dados.cartoes ?? [];
    const grelha = h('div', 'grelha');
    const colunas = cartoes.length === 4 ? 2 : Math.min(3, Math.max(1, cartoes.length));
    grelha.style.gridTemplateColumns = `repeat(${colunas}, 1fr)`;
    if (colunas === 2) grelha.style.width = '900px';
    cartoes.forEach((c, i) => {
      const cartao = entrar(h('div', `cartao${dados.destaque === i ? ' destaque' : ''}`), 0.4 + i * 0.16);
      if (c.imagem) { const img = h('img'); img.src = c.imagem; cartao.appendChild(img); }
      cartao.appendChild(h('div', 'numero', c.numero ?? String(i + 1).padStart(2, '0')));
      cartao.appendChild(h('h3', '', c.titulo));
      if (c.texto) cartao.appendChild(h('p', 'suave', c.texto));
      grelha.appendChild(cartao);
    });
    cena.appendChild(grelha);
    if (dados.rodape) {
      const rodape = entrar(h('div', 'rodape suave'), 0.6 + cartoes.length * 0.16);
      if (dados.rotuloRodape) rodape.appendChild(h('b', '', dados.rotuloRodape));
      rodape.appendChild(document.createTextNode(dados.rodape));
      cena.appendChild(rodape);
    }
  }

  if (tipo === 'apelo') {
    if (dados.marca || dados.logo) {
      const m = entrar(h('div', 'marca-topo', dados.logo ? undefined : dados.marca), 0.05);
      if (dados.logo) { const img = h('img'); img.src = dados.logo; m.appendChild(img); }
      cena.appendChild(m);
    }
    const apelo = h('div', 'apelo');
    const titulo = h('div', 'titulo');
    titulo.append(h('div', 'barra'), entrar(h('h2', '', dados.titulo), 0.25));
    apelo.appendChild(titulo);
    const acoes = h('div', 'acoes');
    if (dados.botao) acoes.appendChild(entrar(h('div', 'botao', dados.botao), 0.75));
    if (dados.contactos?.length) {
      const contactos = entrar(h('div', 'contactos'), 0.95);
      for (const c of dados.contactos) contactos.appendChild(h('div', '', c));
      acoes.appendChild(contactos);
    }
    apelo.appendChild(acoes);
    cena.appendChild(apelo);
    if (dados.rodape) cena.appendChild(entrar(h('div', 'rodape-esq suave', dados.rodape), 1.2));
  }

  if (tipo === 'marca') {
    const canvas = h('canvas', 'globo');
    cena.appendChild(canvas);
    const marca = h('div', 'marca');
    const nome = entrar(h('div', 'nome', dados.logo ? undefined : dados.nome), 0.3);
    if (dados.logo) { const img = h('img'); img.src = dados.logo; nome.appendChild(img); }
    // Um nome comprido desce de tamanho para caber em 540 px e não chegar ao globo, que começa a 680 px
    // (a letra ocupa cerca de meio em por carácter; «dados.gov.pt» a 88 px mediu 533 px).
    else nome.style.fontSize = `${Math.max(44, Math.min(88, Math.round(540 / ((dados.nome ?? '').length * 0.5 || 1))))}px`;
    marca.appendChild(nome);
    if (dados.slogan) marca.appendChild(entrar(h('div', 'slogan', dados.slogan), 0.55));
    if (dados.subtitulo) marca.appendChild(entrar(h('div', 'sub suave', dados.subtitulo), 0.75));
    cena.appendChild(marca);
    // Globo: pontos numa esfera (espiral de Fibonacci), em perspetiva, mais claros à frente.
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 560 * dpr; canvas.height = 560 * dpr;
    const ctx = canvas.getContext('2d');
    const N = 1200, R = 220, D = 900;
    const pontos = Array.from({ length: N }, (_, i) => {
      const y = 1 - (2 * (i + 0.5)) / N, r = Math.sqrt(1 - y * y), a = i * Math.PI * (3 - Math.sqrt(5));
      return [Math.cos(a) * r, y, Math.sin(a) * r];
    });
    const inclinacao = 0.38, t0 = performance.now();
    const desenhar = (t) => {
      if (!host.isConnected) return;
      const ang = ((t - t0) / 1000) * 0.22;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, 560, 560);
      ctx.fillStyle = cores.realce;
      for (const [x0, y0, z0] of pontos) {
        const x1 = x0 * Math.cos(ang) + z0 * Math.sin(ang), z1 = -x0 * Math.sin(ang) + z0 * Math.cos(ang);
        const y2 = y0 * Math.cos(inclinacao) - z1 * Math.sin(inclinacao), z2 = y0 * Math.sin(inclinacao) + z1 * Math.cos(inclinacao);
        const esc = D / (D + z2 * R);
        const frente = (1 - z2) / 2; // 0 atrás, 1 à frente
        ctx.globalAlpha = 0.12 + frente * 0.88;
        ctx.beginPath();
        ctx.arc(280 + x1 * R * esc, 280 + y2 * R * esc, 0.7 + frente * 1.9, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(desenhar);
    };
    requestAnimationFrame(desenhar);
  }

  document.documentElement.appendChild(host);
  // Imediata quando entra por baixo do cartão de abertura: não há meio desvanecer com a página a espreitar.
  if (imediato) { host.style.transition = 'none'; host.style.opacity = '1'; void host.offsetHeight; host.style.transition = 'opacity .6s ease,transform .6s ease'; }
  else { void host.offsetHeight; host.style.opacity = '1'; }
  for (const el of anteriores) dg.largarDepois(el, 700);
  dg.semCena = () => {
    const todas = [...document.querySelectorAll('.dg-cena')];
    for (const el of todas) { el.style.opacity = '0'; el.style.transform = 'scale(1.03)'; dg.largarDepois(el, 650); }
    return todas.length > 0;
  };
}
