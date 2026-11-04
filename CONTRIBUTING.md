# Contribuir

Obrigado por quereres melhorar estas skills. Há três formas de contribuir, cada uma com um modelo de issue próprio:

- **Fonte nova:** uma fonte oficial que devia estar em [`FONTES.md`](skills/start-project-with-trust/knowledge/FONTES.md) ou um ponto que devia passar a «A vigiar».
- **Correção ao conhecimento:** uma entrada de `knowledge/` que está errada ou desatualizada face a uma fonte oficial.
- **Problema ou melhoria na skill:** algo nas instruções, nos verificadores ou nos hooks que não funciona como devia.

Para mudanças pequenas e claras podes abrir diretamente um pull request. Para o resto, abre primeiro um issue, para combinarmos a abordagem.

## Regras do conhecimento

A base de conhecimento só vale se cada afirmação puder ser verificada. Por isso:

- **Fonte oficial primária.** O próprio fornecedor, o organismo ou o autor do standard. Blogues, fóruns e artigos de terceiros não chegam para alterar o conhecimento.
- **Data como a fonte a indica.** Se a fonte não tiver data, escreve «data não indicada».
- **Nível de confiança**, com os critérios da [`update-knowledge`](skills/update-knowledge/SKILL.md): `alta` (fonte oficial primária, lida diretamente, com data), `media` (indireta, lida em parte ou sem data) ou `baixa` (não oficial). Contribuições `baixa` não entram no conhecimento.
- **O texto que veio do PDF não se reescreve.** As novidades entram no `ATUALIZACOES.md` da secção ou como entradas novas. Uma correção ao texto existente mostra o antes e o depois, e o texto original fica citado.
- **Uma linha no [`CHANGELOG.md`](skills/start-project-with-trust/knowledge/CHANGELOG.md) por alteração.** O registo é só de acrescentar.
- **Nada de dados de clientes**, nomes, segredos ou informação interna de empresas.

## Pull requests

1. Faz as alterações num ramo próprio.
2. Se mudaste `knowledge/`, acrescenta a linha ao `CHANGELOG.md` e corre os verificadores (Node.js 22.20 ou superior):
   ```bash
   node skills/update-knowledge/scripts/indice.mjs skills/start-project-with-trust/knowledge
   node skills/update-knowledge/scripts/verificar-alteracoes.mjs .
   ```
   O segundo comando tem de terminar com `✓`.
3. Se mudaste os verificadores ou os hooks, diz no pull request como os testaste.
4. Escreve sem marcas de texto gerado por IA, com as regras da secção «Regras em todas as fases» do [`SKILL.md`](skills/start-project-with-trust/SKILL.md): sem travessões a ligar frases, sem emojis, sem fórmulas feitas, em português de Portugal.
5. Mensagens de commit curtas, no estilo das que já existem.

## Segurança

Não reportes falhas de segurança em issues públicos. Segue [SECURITY.md](SECURITY.md).
