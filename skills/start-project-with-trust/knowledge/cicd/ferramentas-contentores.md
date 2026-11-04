---
id: cicd/ferramentas-contentores
titulo: "Ferramentas: contentores (scan, SBOM, assinatura)"
seccao: "CI/CD e ferramentas"
paginas: [49]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Ferramentas: contentores (scan, SBOM, assinatura)

**Resumo:** Scan de vulnerabilidades, SBOM e assinatura das imagens.

## Conteúdo

- **Scan de vulnerabilidades:** `Trivy`, `Grype`. **SBOM:** `Syft`, formatos `CycloneDX` / `SPDX`. **Assinatura:** `cosign` (Sigstore).

**Para uma skill:** a imagem é escaneada, tem SBOM e é assinada e verificada no deploy.

## Ver também

- [Cadeia de fornecimento verificada](../seguranca/cadeia-de-fornecimento-verificada.md) (Segurança)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Trivy](https://trivy.dev/latest/docs/) — Scan de vulnerabilidades em imagens e geração de SBOM
- [Syft](https://github.com/anchore/syft) — Gera SBOM em CycloneDX ou SPDX; integra com Grype
- [Cosign signing overview](https://docs.sigstore.dev/cosign/signing/overview/) — Assinatura de imagens (keyless) verificável no registo Rekor

Fonte: pág. 49 (Dicionario-Boas-Praticas.pdf)
