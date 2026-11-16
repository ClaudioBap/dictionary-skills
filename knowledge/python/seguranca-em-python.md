---
id: python/seguranca-em-python
titulo: "Segurança em Python"
seccao: "Boas práticas de Python"
paginas: [33]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Segurança em Python

**Resumo:** Sem `eval`, `shell=True` nem `pickle` sobre dados externos, e SQL sempre parametrizado.

## Conteúdo

- Nunca `eval` / `exec` sobre dados de fora; `subprocess` sem `shell=True` e com lista de argumentos; não desserializar `pickle` de fontes não confiáveis.
- SQL sempre parametrizado; segredos fora do código; validar e limitar entradas.

**Para uma skill:** sem `eval` / `shell=True` / `pickle` de dados externos; SQL parametrizado.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Built-in Functions – eval/exec](https://docs.python.org/3/library/functions.html) — executar input não confiável causa vulnerabilidades
- [pickle](https://docs.python.org/3/library/pickle.html) — não é seguro; nunca fazer unpickle de dados não confiáveis
- [sqlite3 – placeholders](https://docs.python.org/3/library/sqlite3.html) — usar placeholders, nunca formatação de strings, contra SQL injection

> **Nota (fonte oficial):** Ver também https://docs.python.org/3/library/subprocess.html (shell=True obriga a escapar; shell injection) e https://bandit.readthedocs.io/en/latest/ (análise estática de segurança).

Fonte: pág. 33 (Dicionario-Boas-Praticas.pdf)
