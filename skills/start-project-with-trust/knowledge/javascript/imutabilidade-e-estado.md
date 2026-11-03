---
id: javascript/imutabilidade-e-estado
titulo: "Imutabilidade e estado"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# Imutabilidade e estado

**Resumo:** Não mutar argumentos nem estado partilhado; criar cópias em vez de alterar.

## Conteúdo

- Não mutar argumentos de funções; devolver novos valores (spread, `map`, `filter`, `structuredClone` para cópias profundas).
- Estado da interface num só sítio, alterado de forma previsível.
- `Object.freeze` para constantes de configuração que não devem mudar.

**Para uma skill:** as funções não mutam os argumentos que recebem.

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.
