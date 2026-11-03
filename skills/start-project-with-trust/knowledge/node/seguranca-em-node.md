---
id: node/seguranca-em-node
titulo: "Segurança em Node.js"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# Segurança em Node.js

**Resumo:** Validar entradas, cabeçalhos de segurança, sem shell com dados externos e proteção contra prototype pollution e path traversal.

## Conteúdo

- Validar todas as entradas com um esquema na fronteira; limitar o tamanho dos pedidos.
- Cabeçalhos de segurança (ex.: helmet) e rate limit nos caminhos sensíveis.
- `child_process` sem shell (`execFile`/`spawn` com lista de argumentos) quando há dados externos; nunca `eval` nem `vm` com dados de fora.
- Proteger contra prototype pollution (rejeitar chaves como `__proto__` e `constructor`, usar `Map` ou `Object.create(null)`) e contra path traversal (resolver o caminho e confirmar que fica dentro da pasta permitida).

**Para uma skill:** nenhum dado externo chega a uma shell, a `eval` ou a um caminho de ficheiro sem validação.

## Ver também

- [Validação de entradas](../seguranca/validacao-de-entradas.md) (Segurança)
- [Rate limit e WAF](../seguranca/rate-limit-e-waf.md) (Segurança)

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.
