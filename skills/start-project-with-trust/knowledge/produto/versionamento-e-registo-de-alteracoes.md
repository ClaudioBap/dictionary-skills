---
id: produto/versionamento-e-registo-de-alteracoes
titulo: "Versionamento e registo de alterações (SemVer, Conventional Commits, Keep a Changelog)"
seccao: "Modularização e produtização"
paginas: []
fonte: "semver.org, conventionalcommits.org e keepachangelog.com, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Versionamento e registo de alterações (SemVer, Conventional Commits, Keep a Changelog)

**Resumo:** Um núcleo partilhado por vários casos precisa de um número de versão que diga se uma atualização parte alguma coisa, de commits que permitam derivar esse número e de um registo de alterações escrito para pessoas.

## Conteúdo

- Semantic Versioning 2.0.0, as três regras: «Patch version Z (x.y.Z | x > 0) MUST be incremented if only backward compatible bug fixes are introduced»; a versão menor «MUST be incremented if new, backward compatible functionality is introduced to the public API»; «Major version X (X.y.z | X > 0) MUST be incremented if any backward incompatible changes are introduced to the public API». Fonte: [Semantic Versioning 2.0.0](https://semver.org)
- Conventional Commits 1.0.0, a estrutura: `<type>[optional scope]: <description>`, depois `[optional body]` e `[optional footer(s)]`. «Commits MUST be prefixed with a type, which consists of a noun, feat, fix, etc.» «Breaking changes MUST be indicated in the type/scope prefix of a commit, or as an entry in the footer.» Fonte: [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- Ligação ao SemVer, nas perguntas frequentes da especificação: os commits `fix` «should be translated to PATCH releases», os `feat` «should be translated to MINOR releases» e um `BREAKING CHANGE` «should be translated to MAJOR releases». Fonte: a mesma página.
- Keep a Changelog 1.1.0, os princípios: «Changelogs are for humans, not machines»; «There should be an entry for every single version»; «The same types of changes should be grouped»; «Versions and sections should be linkable»; «The latest version comes first»; «The release date of each version is displayed»; e indicar se se segue o Semantic Versioning. Fonte: [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/)
- Para a reutilização *(interpretação)*: cada instalação do núcleo sabe pela versão se pode atualizar sem alterações; os commits com tipo permitem derivar a versão do histórico, e o registo de alterações diz a quem opera cada caso o que mudou.

**Para uma skill:** um núcleo partilhado tem versão SemVer, commits com tipo e um registo de alterações por versão; uma alteração incompatível sobe a versão maior.

## Ver também

- [Registo de alterações (o sentido da mudança)](../estrutura/registo-de-alteracoes.md) (Estrutura e documentação)
- [Versão de uma só fonte](../governacao/versao-de-uma-so-fonte.md) (Governação e processo)
- [Específico ou modular](especifico-ou-modular.md) (Modularização e produtização)

Fonte: semver.org, conventionalcommits.org e keepachangelog.com, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF.
