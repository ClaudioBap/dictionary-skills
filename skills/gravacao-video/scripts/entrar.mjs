// Guarda a sessão de um site com login, para a gravação entrar sem escrever credenciais.
// Abre um browser à vista no endereço do guião (ou no que passares): entras com a conta de teste,
// com MFA se houver, abres também as outras aplicações que o vídeo vai mostrar, e carregas em Enter
// aqui. A sessão fica fora do projeto, em ~/.start-project-with-trust/sessoes/<site>.json (ou em
// SESSAO_GRAVACAO), e o guião usa-a com "sessao": true.
//
//   node entrar.mjs
//   node entrar.mjs https://outra.aplicacao.exemplo
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { lerGuiao } from './comum.mjs';
import { caminhoSessao } from './estudio.mjs';

const guiao = lerGuiao();
const url = process.argv.slice(2).find((a) => /^https?:\/\//.test(a)) ?? guiao.url;
const destino = caminhoSessao(guiao.url);

const browser = await chromium.launch({ headless: false });
const context = await browser.newContext({ viewport: { width: guiao.largura ?? 1280, height: guiao.altura ?? 720 } });
const page = await context.newPage();
await page.goto(url);
console.log('Entra com a conta de teste nesta janela. Abre também as outras aplicações que o vídeo vai mostrar.');
console.log('Quando a sessão estiver aberta em todas, volta aqui e carrega em Enter.');
const leitor = createInterface({ input: process.stdin, output: process.stdout });
await leitor.question('');
leitor.close();
mkdirSync(dirname(destino), { recursive: true });
await context.storageState({ path: destino });
await browser.close();
console.log(`Sessão guardada em ${destino}.`);
console.log('Tem cookies de sessão: não a partilhes nem a juntes ao repositório. Quando expirar, corre outra vez node entrar.mjs.');
