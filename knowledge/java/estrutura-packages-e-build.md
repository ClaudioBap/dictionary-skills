---
id: java/estrutura-packages-e-build
titulo: "Estrutura, packages e build"
seccao: "Boas práticas de Java"
paginas: [35]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Estrutura, packages e build

**Resumo:** Pacotes por domínio invertido e build Maven ou Gradle com versões geridas centralmente.

## Conteúdo

- Pacotes por domínio invertido (`pt.empresa.projeto`); um tipo público por ficheiro; visibilidade mínima.
- Build com Maven ou Gradle; gerir versões com BOM; separar módulos por responsabilidade.
- Projeto novo: a LTS atual, Java SE 25. A Oracle prevê a próxima LTS no Java 29, em setembro de 2027.

**Para uma skill:** dependências geridas centralmente; sem versões soltas por módulo.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Naming a Package](https://docs.oracle.com/javase/tutorial/java/package/namingpkgs.html) — pacotes em minúsculas com domínio invertido
- [Introduction to the Dependency Mechanism](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html) — dependencyManagement e BOM com scope import
- [Gradle platforms](https://docs.gradle.org/current/userguide/platforms.html) — platforms/BOM e version catalogs para centralizar versões

> **Nota (fonte oficial):** Visibilidade mínima: https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html («use private unless you have a good reason not to»).

Fonte: pág. 35 (Dicionario-Boas-Praticas.pdf)
