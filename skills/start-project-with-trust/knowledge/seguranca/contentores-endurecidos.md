---
id: seguranca/contentores-endurecidos
titulo: "Contentores endurecidos"
seccao: "Segurança"
paginas: [6]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Contentores endurecidos

**Resumo:** Imagens fixadas por digest, non-root, só-leitura e com o mínimo de capacidades; só o proxy exposto.

## Conteúdo

- Imagens fixadas por digest; non-root; sistema de ficheiros só-leitura; `cap_drop: [ALL]`; `no-new-privileges`.
- Só o proxy exposto; os serviços internos só na rede privada.
- Cada contentor com o mínimo de capacidades e serviços.

**Para uma skill:** nenhum contentor corre root nem com imagem por etiqueta móvel; só o proxy publica portas.

## Ver também

- [Imagem endurecida](../docker/imagem-endurecida.md) (Docker e orquestração)
- [Redes do Docker](../docker/redes-do-docker.md) (Docker e orquestração)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OWASP Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html) — non-root, só-leitura, drop de capacidades, no-new-privileges, redes próprias
- [Docker Compose: services](https://docs.docker.com/reference/compose-file/services/) — cap_drop, read_only, security_opt, user e imagem por @digest
- [NIST SP 800-190](https://csrc.nist.gov/pubs/sp/800/190/final) — guia oficial de segurança de contentores aplicacionais

Fonte: pág. 6 (Dicionario-Boas-Praticas.pdf)
