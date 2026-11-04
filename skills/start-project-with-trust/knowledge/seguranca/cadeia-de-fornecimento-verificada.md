---
id: seguranca/cadeia-de-fornecimento-verificada
titulo: "Cadeia de fornecimento verificada"
seccao: "Segurança"
paginas: [7]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
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

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OWASP Top 10:2025 A03](https://top10.owasp.org/2025/A03_2025-Software_Supply_Chain_Failures/) — SBOM, pacotes assinados, monitorização de dependências, CI/CD endurecido
- [OWASP Software Supply Chain Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Software_Supply_Chain_Security_Cheat_Sheet.html) — SBOM automatizado no CI, componentes assinados, versões fixadas
- [Sigstore: Cosign signing](https://docs.sigstore.dev/cosign/signing/overview/) — assinatura de imagens de contentor com cosign

> **Nota (fonte oficial):** Desde 2025 a cadeia de fornecimento é categoria própria do OWASP Top 10 (A03:2025 Software Supply Chain Failures).

Fonte: pág. 7 (Dicionario-Boas-Praticas.pdf)
