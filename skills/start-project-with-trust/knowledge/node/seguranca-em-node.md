---
id: node/seguranca-em-node
titulo: "Segurança em Node.js"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Segurança em Node.js

**Resumo:** Limitar pedidos, cabeçalhos de segurança, sem shell nem `vm` com dados externos, proteção contra prototype pollution e timeouts do servidor.

## Conteúdo

- Validar entradas e definir limites de tamanho dos pedidos por tipo de conteúdo. — [OWASP Node.js Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)
- Cabeçalhos de segurança com helmet e rate limit contra força bruta. — [helmet.js.org](https://helmet.js.org/), [OWASP Node.js Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)
- `execFile`/`spawn` não usam shell por omissão; nunca passar dados não saneados a `exec`. O `node:vm` não é mecanismo de segurança: não correr código não confiável. — [nodejs.org/api/child_process.html](https://nodejs.org/api/child_process.html), [nodejs.org/api/vm.html](https://nodejs.org/api/vm.html)
- Prototype pollution: usar `Map`/`Set` ou `Object.create(null)`, verificar com `Object.hasOwn`, considerar `--disable-proto=delete`. — [OWASP Prototype Pollution Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Prototype_Pollution_Prevention_Cheat_Sheet.html), [nodejs.org: Security best practices](https://nodejs.org/en/learn/getting-started/security-best-practices)
- Configurar os timeouts do servidor (`requestTimeout`, `headersTimeout`) para largar ligações lentas ou inativas. — [nodejs.org: Security best practices](https://nodejs.org/en/learn/getting-started/security-best-practices), [nodejs.org/api/http.html](https://nodejs.org/api/http.html)
- Path traversal: resolver o caminho e confirmar que fica dentro da pasta permitida. *(sem fonte oficial para a técnica; o risco está na OWASP Node.js Security Cheat Sheet)*

**Para uma skill:** nenhum dado externo chega a uma shell, ao `vm` ou a um caminho de ficheiro sem validação; os pedidos têm limites de tamanho e de tempo.

## Ver também

- [Validação de entradas](../seguranca/validacao-de-entradas.md) (Segurança)
- [Rate limit e WAF](../seguranca/rate-limit-e-waf.md) (Segurança)
- [Permissões do processo](../node/permissoes-do-processo.md) (Boas práticas de Node.js)

Fonte: Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.
