---
id: java/seguranca-em-java
titulo: "Segurança em Java"
seccao: "Boas práticas de Java"
paginas: [37]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Segurança em Java

**Resumo:** `PreparedStatement` sempre, sem desserializar dados não confiáveis e sem cripto caseira.

## Conteúdo

- `PreparedStatement` sempre (nunca concatenar SQL); validar entradas; não desserializar dados não confiáveis.
- Segredos fora do código; criptografia da biblioteca padrão, não caseira.

**Para uma skill:** SQL parametrizado; sem desserialização de fontes não confiáveis.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OWASP SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html) — PreparedStatement como defesa principal
- [OWASP Deserialization](https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html) — filtros de serialização; não tornam seguros dados não confiáveis
- [JCA Reference Guide](https://docs.oracle.com/en/java/javase/25/security/java-cryptography-architecture-jca-reference-guide.html) — usar serviços criptográficos da plataforma

> **Nota (fonte oficial):** Ver também JEP 290 (https://openjdk.org/jeps/290): filtros de dados de serialização.

Fonte: pág. 37 (Dicionario-Boas-Praticas.pdf)
