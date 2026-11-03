---
id: seguranca/criptografia-e-protecao-de-dados
titulo: "Criptografia e proteção de dados"
seccao: "Segurança"
paginas: [8]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Criptografia e proteção de dados

**Resumo:** Dados cifrados em trânsito e em repouso, chaves num cofre com rotação e criptografia só de bibliotecas.

## Conteúdo

- **Em trânsito:** TLS moderno em todo o lado, inclusive entre serviços internos.
- **Em repouso:** cifra do disco ou da base de dados; para dados sensíveis, cifra ao nível do campo e pseudonimização.
- **Chaves:** num cofre, com rotação e revogação; nunca no código; separar a chave dos dados.
- **Hashing:** passwords com argon2id/bcrypt; integridade com HMAC; usar bibliotecas, nunca cripto caseira.

**Para uma skill:** dados sensíveis cifrados em trânsito e em repouso, com chaves num cofre e rotação.

Fonte: pág. 8 (Dicionario-Boas-Praticas.pdf)
