---
id: python/ambientes-e-dependencias
titulo: "Ambientes e dependências"
seccao: "Boas práticas de Python"
paginas: [31, 32]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Ambientes e dependências

**Resumo:** Ambiente isolado, dependências fixadas com lock e auditadas.

## Conteúdo

- Ambiente isolado (`venv` / `uv`); dependências fixadas com ficheiro de lock; separar runtime de dev.
- Fixar versões; auditar vulnerabilidades (`pip-audit`); atualizar com Renovate/Dependabot.

**Para uma skill:** build reprodutível a partir do lock; dependências auditadas.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [venv](https://docs.python.org/3/library/venv.html) — ambientes isolados, recriados a partir de ficheiro de requisitos
- [uv – Locking and syncing](https://docs.astral.sh/uv/concepts/projects/sync/) — uv.lock reprodutível; grupo dev separado
- [Tool recommendations](https://packaging.python.org/en/latest/guides/tool-recommendations/) — ferramentas oficiais para ambientes, instalação e lock

> **Nota (fonte oficial):** pip-audit não tem página em domínio aprovado verificada; o guia PyPA cita pip-tools/Pipenv para lock e não recomenda ferramenta de auditoria.

Fonte: págs. 31, 32 (Dicionario-Boas-Praticas.pdf)
