---
id: java/logging
titulo: "Logging"
seccao: "Boas práticas de Java"
paginas: [37]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Logging

**Resumo:** SLF4J com mensagens parametrizadas, nunca `System.out`, sem segredos.

## Conteúdo

- SLF4J como fachada, nunca `System.out`; mensagens parametrizadas (`log.info("x={}", x)`); níveis corretos.
- Não registar segredos nem dados pessoais.

**Para uma skill:** zero `System.out`; logs parametrizados, sem segredos.

Fonte: pág. 37 (Dicionario-Boas-Praticas.pdf)
