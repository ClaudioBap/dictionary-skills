#!/usr/bin/env node
// Verifica um site publicado: HTTP redireciona para HTTPS, certificado válido, TLS 1.2 ou superior,
// cabeçalhos de segurança e área de administração fechada sem login. Sem dependências.
// Base: knowledge/publicacao/certificados-tls.md, knowledge/seguranca/tls-e-cabecalhos-versionados.md,
//       knowledge/publicacao/acesso-restrito-a-area-de-administracao.md.
// Uso: node verificar-publicacao.mjs <https://dominio> [--admin <caminho sem barra inicial | URL completo>]
//      Ex.: --admin admin  ou  --admin https://admin.dominio.pt  (no Git Bash, «/admin» é convertido num caminho do Windows)
// Sai com 0 se tudo passa; com 1 e a lista de falhas, se não.

import tls from 'node:tls';

const USO = 'Uso: node verificar-publicacao.mjs <https://dominio> [--admin <caminho sem barra inicial | URL completo>]';
const alvo = process.argv[2];
const i = process.argv.indexOf('--admin');
const admin = i > 0 ? process.argv[i + 1] : null;
if (!alvo || !/^https:\/\//i.test(alvo)) { console.error(USO); process.exit(2); }
if (admin && /^[A-Za-z]:[\\/]/.test(admin)) { console.error(`O shell converteu o caminho da administração em «${admin}». Usa o caminho sem barra inicial (ex.: --admin admin) ou o URL completo.`); process.exit(2); }

const url = new URL(alvo);
const ok = [], falhas = [], avisos = [];
const pedir = (u) => fetch(u, { redirect: 'manual', signal: AbortSignal.timeout(20000) });

// 1. HTTP -> HTTPS
try {
  const r = await pedir(`http://${url.host}${url.pathname}`);
  const destino = r.headers.get('location') || '';
  if (r.status >= 300 && r.status < 400 && /^https:\/\//i.test(new URL(destino, `http://${url.host}`).href)) ok.push(`HTTP redireciona para HTTPS (${r.status})`);
  else falhas.push(`HTTP não redireciona para HTTPS (estado ${r.status}${destino ? `, Location ${destino}` : ''})`);
} catch (e) { avisos.push(`HTTP (porta 80) sem resposta: ${e.cause?.code || e.message}. Se a porta 80 está fechada de propósito, confirma que o HSTS está ativo.`); }

// 2. Certificado e versão de TLS
await new Promise((fim) => {
  const s = tls.connect({ host: url.hostname, port: Number(url.port) || 443, servername: url.hostname, rejectUnauthorized: false }, () => {
    const cert = s.getPeerCertificate();
    const dias = Math.floor((new Date(cert.valid_to) - Date.now()) / 86400000);
    if (!s.authorized) falhas.push(`certificado inválido: ${s.authorizationError}`);
    else if (dias < 7) falhas.push(`certificado expira em ${dias} dia(s) (${cert.valid_to}): a renovação automática não está a funcionar?`);
    else ok.push(`certificado válido, emitido por ${cert.issuer?.O || cert.issuer?.CN || '?'}, expira em ${dias} dias`);
    const versao = s.getProtocol();
    if (/^TLSv1(\.[01])?$/.test(versao)) falhas.push(`negociou ${versao}; mínimo TLS 1.2`);
    else ok.push(`protocolo ${versao}`);
    s.end(); fim();
  });
  s.setTimeout(20000, () => { falhas.push('TLS: sem resposta na porta 443'); s.destroy(); fim(); });
  s.on('error', (e) => { falhas.push(`TLS: ${e.code || e.message}`); fim(); });
});

// 3. Cabeçalhos de segurança
try {
  let r = await pedir(alvo), saltos = 0;
  while (r.status >= 300 && r.status < 400 && r.headers.get('location') && saltos++ < 5) r = await pedir(new URL(r.headers.get('location'), alvo));
  const h = (n) => r.headers.get(n) || '';
  const csp = h('content-security-policy');
  const hsts = h('strict-transport-security');
  const idade = Number((hsts.match(/max-age=(\d+)/i) || [])[1] || 0);
  const exigidos = [
    ['Strict-Transport-Security', idade > 0, hsts ? `${hsts}${/includesubdomains/i.test(hsts) ? '' : ' (sem includeSubDomains)'}` : ''],
    ['Content-Security-Policy', !!csp, csp ? 'presente' : (h('content-security-policy-report-only') ? 'só em modo report-only' : '')],
    ['X-Content-Type-Options: nosniff', /nosniff/i.test(h('x-content-type-options')), h('x-content-type-options')],
    ['frame-ancestors (CSP) ou X-Frame-Options', /frame-ancestors/i.test(csp) || !!h('x-frame-options'), /frame-ancestors/i.test(csp) ? 'frame-ancestors na CSP' : h('x-frame-options')],
    ['Referrer-Policy', !!h('referrer-policy'), h('referrer-policy')],
    ['Permissions-Policy', !!h('permissions-policy'), h('permissions-policy') ? 'presente' : ''],
  ];
  for (const [nome, passa, valor] of exigidos) (passa ? ok : falhas).push(passa ? `${nome}: ${valor}` : `cabeçalho em falta ou inválido: ${nome}${valor ? ` (${valor})` : ''}`);
} catch (e) { falhas.push(`HTTPS: pedido falhou (${e.cause?.code || e.message})`); }

// 4. Área de administração sem sessão
if (admin) {
  try {
    const u = new URL(admin, alvo);
    const r = await pedir(u);
    const destino = r.headers.get('location') || '';
    const paraLogin = destino && (new URL(destino, u).host !== u.host || /login|signin|sign-in|auth|sso|cdn-cgi\/access/i.test(destino));
    if (r.status === 401 || r.status === 403) ok.push(`administração ${u.pathname} recusa sem login (${r.status})`);
    else if (r.status >= 300 && r.status < 400 && paraLogin) ok.push(`administração ${u.pathname} redireciona para login (${destino.split('?')[0]})`);
    else if (r.status === 404) falhas.push(`administração ${u.pathname} devolve 404: confirma o caminho`);
    else falhas.push(`administração ${u.pathname} responde ${r.status} sem login${destino ? ` (Location ${destino})` : ''}: está aberta`);
  } catch (e) { falhas.push(`administração: pedido falhou (${e.cause?.code || e.message})`); }
} else {
  avisos.push('sem --admin: a área de administração não foi verificada. Se não existe, regista-o no relatório ou em entrega.md.');
}

console.log(`Verificação de ${alvo} a ${new Date().toISOString()}`);
for (const l of ok) console.log(`  ✓ ${l}`);
for (const l of avisos) console.log(`  ! ${l}`);
for (const l of falhas) console.log(`  ✗ ${l}`);
if (falhas.length) { console.log(`✗ Publicação com falhas (${falhas.length})`); process.exit(1); }
console.log('✓ Publicação verificada');
