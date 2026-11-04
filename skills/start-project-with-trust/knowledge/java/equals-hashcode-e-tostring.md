---
id: java/equals-hashcode-e-tostring
titulo: "equals, hashCode e toString"
seccao: "Boas práticas de Java"
paginas: [36]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# equals, hashCode e toString

**Resumo:** `equals` e `hashCode` coerentes e `toString` útil, sem dados sensíveis.

## Conteúdo

- Reimplementar `equals` e `hashCode` juntos e coerentes; `record` dá-os de graça.
- `toString` útil para logs; não incluir dados sensíveis.

**Para uma skill:** qualquer tipo usado em coleções tem `equals` / `hashCode` coerentes.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Object](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Object.html) — contrato equals/hashCode; toString conciso e informativo
- [java.lang.Record](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Record.html) — equals/hashCode/toString gerados implicitamente

Fonte: pág. 36 (Dicionario-Boas-Praticas.pdf)
