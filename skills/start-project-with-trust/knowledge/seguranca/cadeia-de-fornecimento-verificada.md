---
id: seguranca/cadeia-de-fornecimento-verificada
titulo: "Cadeia de fornecimento verificada"
seccao: "Segurança"
paginas: [7]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Cadeia de fornecimento verificada

**Resumo:** Dependências atualizadas e auditadas, análise estática, scan de imagens, SBOM e imagens assinadas por release.

## Conteúdo

- Atualização de dependências automatizada (Renovate/Dependabot) e auditoria de vulnerabilidades no CI.
- Análise estática (SAST: CodeQL/Semgrep) e scan das imagens (Trivy/Grype).
- SBOM por release e imagens assinadas (cosign) verificadas no deploy.

**Para uma skill:** dependências e imagens auditadas e fixadas; SBOM e assinatura por release.

## Ver também

- [Ferramentas: dependências (auditoria e atualização)](../cicd/ferramentas-dependencias.md) (CI/CD e ferramentas)
- [Ferramentas: contentores (scan, SBOM, assinatura)](../cicd/ferramentas-contentores.md) (CI/CD e ferramentas)
- [Ferramentas: análise estática de segurança (SAST)](../cicd/ferramentas-sast.md) (CI/CD e ferramentas)

Fonte: pág. 7 (Dicionario-Boas-Praticas.pdf)
