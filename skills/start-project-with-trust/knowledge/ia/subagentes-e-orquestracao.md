---
id: ia/subagentes-e-orquestracao
titulo: "Subagentes e orquestração"
seccao: "Construir com IA (Claude e Anthropic)"
paginas: [68]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Subagentes e orquestração

**Resumo:** Dividir o trabalho por subagentes só quando há leitura pesada ou trabalho independente, com modelos baratos na leitura.

## Conteúdo

- Separar o trabalho por subagentes (um líder com ajudantes, ou especialistas) quando um só encheria o contexto a ler, ou quando há trabalho paralelo independente.
- Usar um modelo mais barato (Haiku/Sonnet) nos subagentes de leitura; o subagente propõe e devolve, não decide sozinho o que é crítico.

**Para uma skill:** fan-out por subagentes só quando há trabalho independente ou leitura pesada; o modelo barato faz o trabalho de leitura.

Fonte: pág. 68 (Dicionario-Boas-Praticas.pdf)
