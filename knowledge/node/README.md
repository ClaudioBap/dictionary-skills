# Boas práticas de Node.js

⚠️ Esta secção não vem do PDF. Cada ponto liga à fonte oficial que o apoia (consulta a 2026-11-03). Os pontos marcados *(sem fonte oficial)* são convenções escritas pelo assistente a pedido do utilizador. As versões referidas são as da documentação v26.x.

Fonte: Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

## Entradas

- [Versões e runtime](versoes-e-runtime.md) — Usar uma versão Active ou Maintenance LTS, declarada no projeto, igual em todos os ambientes e atualizada antes do fim de suporte. *(fora do PDF)*
- [Gestão de pacotes](gestao-de-pacotes.md) — Lockfile versionado, `npm ci` no CI, sem dependências de dev em produção, scripts de instalação desligados e assinaturas verificadas. *(fora do PDF)*
- [Estrutura de projeto](estrutura-de-projeto.md) — Módulos ES com `type` declarado, imports internos com `#` e API pública declarada em `exports`. *(fora do PDF)*
- [Configuração e segredos](configuracao-e-segredos.md) — Segredos num serviço de gestão de segredos, `.env` só em desenvolvimento e `NODE_ENV=production` sempre em produção. *(fora do PDF)*
- [Event loop e trabalho pesado](event-loop-e-trabalho-pesado.md) — Nunca bloquear o event loop: sem APIs síncronas no servidor, streams para o que é grande e `worker_threads` para CPU. *(fora do PDF)*
- [Erros e processo](erros-e-processo.md) — Tratar todas as rejeições, encadear erros com `cause` e terminar o processo depois de uma exceção não apanhada. *(fora do PDF)*
- [Encerramento gracioso](encerramento-gracioso.md) — Ao receber `SIGTERM`, deixar de aceitar ligações, fechar as inativas e só forçar o fecho no fim do prazo. *(fora do PDF)*
- [Segurança em Node.js](seguranca-em-node.md) — Limitar pedidos, cabeçalhos de segurança, sem shell nem `vm` com dados externos, proteção contra prototype pollution e timeouts do servidor. *(fora do PDF)*
- [Permissões do processo](permissoes-do-processo.md) — Limitar o que o processo pode fazer com o Permission Model, sabendo que não protege contra código malicioso. *(fora do PDF)*
- [Logging e observabilidade](logging-e-observabilidade.md) — Logger estruturado com campos sensíveis ocultos, identificador de pedido com `AsyncLocalStorage` e OpenTelemetry carregado antes da aplicação. *(fora do PDF)*
- [Testes](testes.md) — Test runner nativo (`node:test`, Stable) ou Vitest/Jest, com mocks e snapshots nativos. *(fora do PDF)*
- [Desempenho e escala](desempenho-e-escala.md) — Aplicação sem estado em memória, ligações reutilizadas e otimização só depois de medir com os perfis nativos. *(fora do PDF)*
- [TypeScript nativo](typescript-nativo.md) — Executar `.ts` diretamente com type stripping (Stable), mantendo a verificação de tipos no CI. *(fora do PDF)*
- [Node.js em contentores](node-em-contentores.md) — Imagem fixada por digest, multi-stage, sem dependências de dev, utilizador `node`, `--init` e limites de memória. *(fora do PDF)*
