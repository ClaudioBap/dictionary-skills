---
id: python/seguranca-em-python
titulo: "Segurança em Python"
seccao: "Boas práticas de Python"
paginas: [33]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Segurança em Python

**Resumo:** Sem `eval`, `shell=True` nem `pickle` sobre dados externos, e SQL sempre parametrizado.

## Conteúdo

- Nunca `eval` / `exec` sobre dados de fora; `subprocess` sem `shell=True` e com lista de argumentos; não desserializar `pickle` de fontes não confiáveis.
- SQL sempre parametrizado; segredos fora do código; validar e limitar entradas.

**Para uma skill:** sem `eval` / `shell=True` / `pickle` de dados externos; SQL parametrizado.

Fonte: pág. 33 (Dicionario-Boas-Praticas.pdf)
