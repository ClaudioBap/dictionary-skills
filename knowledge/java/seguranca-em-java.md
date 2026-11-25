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
- Dependências: o OWASP Dependency-Check procura nas dependências vulnerabilidades publicadas (CVE). No Maven, o objetivo `check` do plugin `dependency-check-maven` corre com `mvn verify`; no Gradle, corre-se `./gradlew dependencyCheckAnalyze`. Por omissão o `failBuildOnCVSS` vale 11 e o build nunca falha, por isso o limiar tem de ser definido (os exemplos da documentação usam 8 e 9). A primeira descarga dos dados do NVD pode levar dez minutos ou mais. Correr pelo menos uma vez a cada sete dias mantém a cópia local com uma descarga pequena. A chave da API do NVD (`nvdApiKey`) fica num segredo, porque com `-X` o Maven escreve-a na saída.

**Para uma skill:** SQL parametrizado; sem desserialização de fontes não confiáveis; Dependency-Check com `failBuildOnCVSS` definido e sem achados acima do limiar, com o comando e a saída na prova.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OWASP SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html) — PreparedStatement como defesa principal
- [OWASP Deserialization](https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html) — filtros de serialização; não tornam seguros dados não confiáveis
- [JCA Reference Guide](https://docs.oracle.com/en/java/javase/25/security/java-cryptography-architecture-jca-reference-guide.html) — usar serviços criptográficos da plataforma

- [OWASP Dependency-Check](https://owasp.org/www-project-dependency-check/) — análise das dependências contra CVE publicadas, com dados do NVD
- [dependency-check-maven: Configuration](https://dependency-check.github.io/DependencyCheck/dependency-check-maven/configuration.html) — `failBuildOnCVSS` (11 por omissão: nunca falha) e `nvdApiKey` (publicado a 2026-08-03)
- [dependency-check-gradle](https://dependency-check.github.io/DependencyCheck/dependency-check-gradle/index.html) — tarefa `dependencyCheckAnalyze`

> **Nota (fonte oficial):** Ver também JEP 290 (https://openjdk.org/jeps/290): filtros de dados de serialização.

## Histórico

- **2026-08-03**: antes, «SQL parametrizado; sem desserialização de fontes não confiáveis.» (PDF pág. 37). Mudou porque a prova da boas-praticas-codigo pede os comandos da verificação de segurança, e o Dependency-Check só falha o build com `failBuildOnCVSS` definido. Fonte: [dependency-check-maven: Configuration](https://dependency-check.github.io/DependencyCheck/dependency-check-maven/configuration.html). Editado a 2026-11-25.

Fonte: pág. 37 (Dicionario-Boas-Praticas.pdf)
