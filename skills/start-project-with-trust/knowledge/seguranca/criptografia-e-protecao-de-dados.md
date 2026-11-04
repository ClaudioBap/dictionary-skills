---
id: seguranca/criptografia-e-protecao-de-dados
titulo: "Criptografia e proteção de dados"
seccao: "Segurança"
paginas: [8]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Criptografia e proteção de dados

**Resumo:** Dados cifrados em trânsito e em repouso, chaves num cofre com rotação e criptografia só de bibliotecas.

## Conteúdo

- **Em trânsito:** TLS moderno em todo o lado, inclusive entre serviços internos.
- **Em repouso:** cifra do disco ou da base de dados; para dados sensíveis, cifra ao nível do campo e pseudonimização.
- **Chaves:** num cofre, com rotação e revogação; nunca no código; separar a chave dos dados.
- **Hashing:** passwords com argon2id/bcrypt; integridade com HMAC; usar bibliotecas, nunca cripto caseira.

**Para uma skill:** dados sensíveis cifrados em trânsito e em repouso, com chaves num cofre e rotação.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OWASP Cryptographic Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html) — cifra em repouso, sem algoritmos caseiros, chaves separadas dos dados
- [OWASP Key Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Key_Management_Cheat_Sheet.html) — rotação, revogação e armazenamento de chaves em cofre/HSM
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) — Argon2id primeiro; bcrypt só em sistemas legados

> **Nota (fonte oficial):** A OWASP recomenda Argon2id (mín. 19 MiB, 2 iterações, paralelismo 1) e reserva o bcrypt para sistemas legados sem Argon2/scrypt; a entrada põe ambos ao mesmo nível.

Fonte: pág. 8 (Dicionario-Boas-Praticas.pdf)
