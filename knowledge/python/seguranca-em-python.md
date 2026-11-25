---
id: python/seguranca-em-python
titulo: "Segurança em Python"
seccao: "Boas práticas de Python"
paginas: [33]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# Segurança em Python

**Resumo:** Sem `eval`, `shell=True` nem `pickle` sobre dados externos, e SQL sempre parametrizado.

## Conteúdo

- Nunca `eval` / `exec` sobre dados de fora; `subprocess` sem `shell=True` e com lista de argumentos; não desserializar `pickle` de fontes não confiáveis.
- SQL sempre parametrizado; segredos fora do código; validar e limitar entradas.
- Dependências: `pip-audit .` audita o projeto local, e `pip-audit -r requirements.txt` audita um ficheiro de requisitos. Sai com código 1 quando encontra vulnerabilidades conhecidas, por isso serve de portão no CI.
- Código: `bandit -r <pasta>` procura problemas de segurança no código Python. Com a configuração em `[tool.bandit]` do `pyproject.toml`, corre-se `bandit -c pyproject.toml -r .`. Um achado aceite marca-se na própria linha com `# nosec`.

**Para uma skill:** sem `eval` / `shell=True` / `pickle` de dados externos; SQL parametrizado; `pip-audit` e `bandit -r` sem achados por resolver no que mudou, com os comandos e a saída na prova.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Built-in Functions – eval/exec](https://docs.python.org/3/library/functions.html) — executar input não confiável causa vulnerabilidades
- [pickle](https://docs.python.org/3/library/pickle.html) — não é seguro; nunca fazer unpickle de dados não confiáveis
- [sqlite3 – placeholders](https://docs.python.org/3/library/sqlite3.html) — usar placeholders, nunca formatação de strings, contra SQL injection

- [pip-audit](https://pypi.org/project/pip-audit/) — auditoria das dependências; código de saída 1 com vulnerabilidades (2.10.1, 2026-06-10)
- [Bandit: Getting Started](https://bandit.readthedocs.io/en/latest/start.html) — `bandit -r` e filtros de severidade
- [Bandit: Configuration](https://bandit.readthedocs.io/en/latest/config.html) — `[tool.bandit]` no `pyproject.toml` e `# nosec`

> **Nota (fonte oficial):** Ver também https://docs.python.org/3/library/subprocess.html (shell=True obriga a escapar; shell injection) e https://bandit.readthedocs.io/en/latest/ (análise estática de segurança).

## Histórico

- **2026-06-10**: antes, «sem `eval` / `shell=True` / `pickle` de dados externos; SQL parametrizado.» (PDF pág. 33). Mudou porque a prova da boas-praticas-codigo pede os comandos da verificação de segurança, e o pip-audit e o Bandit dão-nos. Fonte: [pip-audit](https://pypi.org/project/pip-audit/). Editado a 2026-11-25.

Fonte: pág. 33 (Dicionario-Boas-Praticas.pdf)
