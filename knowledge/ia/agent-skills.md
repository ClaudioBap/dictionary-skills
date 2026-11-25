---
id: ia/agent-skills
titulo: "Agent skills"
seccao: "Construir com IA"
paginas: [68]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# Agent skills

**Resumo:** Pacotes de instruções e recursos carregados para uma tarefa, que mantêm o contexto limpo e o comportamento reutilizável.

## Conteúdo

- «Skills» são pacotes de instruções e recursos que o modelo carrega para uma tarefa específica (ex.: gerar um documento, seguir um procedimento), em vez de encher o prompt base.
- Mantêm o contexto limpo e tornam o comportamento reutilizável e versionável.
- Régua de autoria da Anthropic (página sem data, lida a 2026-11-25). Fonte: [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
  - Concisão: parte-se de que o modelo já sabe muito («Default assumption: Claude is already very smart») e cada parágrafo tem de justificar os tokens que gasta.
  - `name`: até 64 caracteres, só minúsculas, números e hífenes, sem etiquetas XML e sem as palavras reservadas «anthropic» e «claude».
  - `description`: não vazia, até 1024 caracteres, sem etiquetas XML, escrita na terceira pessoa, e diz o que a skill faz e quando se usa.
  - O corpo do SKILL.md fica abaixo de 500 linhas. O resto vai para ficheiros à parte, ligados diretamente a partir do SKILL.md (um só nível de referências). Um ficheiro de referência com mais de 100 linhas abre com um índice.
  - Nada de informação que caduca com o tempo. A que for mesmo precisa fica numa secção de padrões antigos.
  - Os caminhos usam sempre barras normais (`reference/guide.md`), nunca as do Windows.
  - Uma tarefa em que a qualidade é crítica tem um ciclo de verificação: corre o verificador, corrige e volta a correr.
  - «Build evaluations first»: as avaliações fazem-se antes de escrever muita documentação, e a lista de verificação da página pede pelo menos três. A skill testa-se com todos os modelos com que vai ser usada.
- No Claude Code (página sem data, lida a 2026-11-25). Fonte: [Skills (Claude Code)](https://code.claude.com/docs/en/skills)
  - Todos os campos do frontmatter são opcionais, e só a `description` é recomendada. Sem `name`, a skill fica com o nome da pasta.
  - A `description` e o `when_to_use` juntos são cortados a 1536 caracteres na lista de skills, por isso o caso de uso principal vem primeiro.
  - Com `disable-model-invocation: true`, só a pessoa chama a skill, com `/nome`. Com `user-invocable: false`, só o Claude a chama, e a skill sai do menu `/`.
  - `allowed-tools` dá ferramentas sem pedir permissão no turno em que a skill é chamada. `argument-hint` mostra os argumentos esperados. `context: fork` corre a skill num subagente à parte, que não vê a conversa. `model` e `effort` mudam o modelo e o esforço desse turno. `paths` limita os ficheiros que ativam a skill.
  - Antes de correr o Claude Code num repositório, revê-se o `allowed-tools` das skills dele: o campo aplica-se mesmo num `-p` corrido numa pasta que nunca foi aprovada.

**Para uma skill:** comportamento repetível vive numa skill carregada quando é precisa, não no prompt de sistema. Uma skill nova ou editada cumpre a régua acima: description com o que faz e quando se usa, dentro dos limites; SKILL.md abaixo de 500 linhas; referências a um só nível; nada que caduque com o tempo; um ciclo de verificação nas tarefas críticas; e avaliações feitas antes da documentação longa.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) — instruções e recursos carregados a pedido (divulgação progressiva), reutilizáveis
- [Skills (Claude Code)](https://code.claude.com/docs/en/skills) — corpo da skill só carregado quando usado, ao contrário do CLAUDE.md
- [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices): régua de autoria e lista de verificação, lida a 2026-11-25, página sem data

Fonte: pág. 68 (Dicionario-Boas-Praticas.pdf)
