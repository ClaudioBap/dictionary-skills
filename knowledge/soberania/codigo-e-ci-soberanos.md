---
id: soberania/codigo-e-ci-soberanos
titulo: "Código e CI soberanos"
seccao: "Soberania digital"
paginas: [57]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# Código e CI soberanos

**Resumo:** Git e CI em infraestrutura europeia ou self-hosted, com espelho do repositório.

## Conteúdo

- Preferir Git e CI em infraestrutura europeia ou self-hosted; runners self-hosted para o código e as credenciais não saírem da jurisdição.
- Espelho do repositório fora do fornecedor principal.
- Runners self-hosted só em repositórios privados. O GitHub diz que quase nunca se devem usar em repositórios públicos, porque qualquer pessoa pode abrir um pull request e comprometer o ambiente do runner (a 2026-11-25).

**Para uma skill:** nenhuma credencial real corre num runner fora da jurisdição escolhida.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Self-hosted runners](https://docs.github.com/en/actions/concepts/runners/self-hosted-runners) — O cliente escolhe o hardware e a localização dos runners
- [Repository mirroring (GitLab)](https://docs.gitlab.com/user/project/repository/mirror/) — Push/pull mirroring do repositório para outro local
- [Secure use reference (GitHub Actions)](https://docs.github.com/en/actions/reference/security/secure-use) — Runners self-hosted quase nunca em repositórios públicos (consultada a 2026-11-25)

Fonte: pág. 57 (Dicionario-Boas-Praticas.pdf)
