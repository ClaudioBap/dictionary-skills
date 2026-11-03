# Boas práticas de Node.js

⚠️ Esta secção não vem do PDF. Foi escrita pelo assistente a pedido do utilizador e deve ser confirmada contra fontes oficiais (por exemplo a documentação do Node.js e a OWASP Node.js Security Cheat Sheet).

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.

## Entradas

- [Versões e runtime](versoes-e-runtime.md) — Usar uma versão LTS, fixada no projeto, e atualizar antes do fim de suporte. *(fora do PDF)*
- [Gestão de pacotes](gestao-de-pacotes.md) — Lockfile versionado, `npm ci` no CI, dependências de dev separadas e scripts de instalação vigiados. *(fora do PDF)*
- [Estrutura de projeto](estrutura-de-projeto.md) — Módulos ES, camadas separadas (rotas, serviços, acesso a dados) e um módulo por responsabilidade. *(fora do PDF)*
- [Configuração e segredos](configuracao-e-segredos.md) — Configuração por variáveis de ambiente, validada no arranque e lida num só módulo; segredos fora do repositório. *(fora do PDF)*
- [Event loop e trabalho pesado](event-loop-e-trabalho-pesado.md) — Nunca bloquear o event loop: I/O assíncrono, streams para ficheiros grandes e `worker_threads` ou filas para CPU. *(fora do PDF)*
- [Erros e processo](erros-e-processo.md) — Tratar todas as rejeições, distinguir erros operacionais de bugs e deixar o processo terminar quando o estado é incerto. *(fora do PDF)*
- [Encerramento gracioso](encerramento-gracioso.md) — Ao receber `SIGTERM`, deixar de aceitar pedidos, terminar os em curso e fechar ligações, com tempo limite. *(fora do PDF)*
- [Segurança em Node.js](seguranca-em-node.md) — Validar entradas, cabeçalhos de segurança, sem shell com dados externos e proteção contra prototype pollution e path traversal. *(fora do PDF)*
- [Logging e observabilidade](logging-e-observabilidade.md) — Logger estruturado com identificador de pedido, sem `console.log` em produção nem segredos. *(fora do PDF)*
- [Testes](testes.md) — Testes rápidos com `node:test` ou Vitest/Jest, testes HTTP sem rede real e base de dados descartável. *(fora do PDF)*
- [Desempenho e escala](desempenho-e-escala.md) — Processos sem estado e várias réplicas atrás de um proxy, ligações reutilizadas e otimização só depois de medir. *(fora do PDF)*
- [Node.js em contentores](node-em-contentores.md) — Imagem oficial por digest, multi-stage, sem dependências de dev, a correr como utilizador sem privilégios. *(fora do PDF)*
