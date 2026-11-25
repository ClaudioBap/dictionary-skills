---
name: humanizar
description: Verifica tudo o que vai ser entregue (texto, código, interface, vídeo, commits, documentação, dados de exemplo) à procura das marcas que denunciam que foi feito por uma ferramenta, mostra cada achado com o que uma pessoa faria no lugar e só corrige com autorização, categoria a categoria. Usar antes de qualquer entrega, como última sessão da orquestração, ou sobre um trabalho que já existe. É uma sub skill, que faz uma parte do trabalho, sozinha ou chamada por uma skill mãe.
argument-hint: "Pasta, ficheiros ou «diff» a verificar; junta «commits» para ver também as mensagens de commit"
metadata:
  estado: produção
  tipo: sub
  usa: []
  impacto: { ia: 0, seguranca: 0, nuvem: 0, desenvolvimento: 10, web: 10 }
---

# Humanizar

O objetivo é que ninguém consiga distinguir se o trabalho foi feito por uma pessoa da equipa ou por uma ferramenta. Vale para o desenvolvimento, para o design e para os vídeos (guião, voz e ações no ecrã).

**Menos é mais.** Uma ferramenta tende a mostrar tudo o que sabe; uma pessoa mostra o que quem usa precisa. Num ecrã, cada dado aparece uma vez, o que é novo vem primeiro, um gráfico só fica se responder a uma pergunta de quem o vê, e a explicação de como se calcula fica para os programadores, fora do ecrã. Quem quer analisar prefere um gráfico a um parágrafo.

**Humanizar não é achatar.** Tirar as marcas (comprimidos, listas com bolas, tudo centrado, caixas iguais) não quer dizer tirar o movimento nem a forma. Uma interface toda reta e parada, com as ações em texto sublinhado, também denuncia ferramenta: é o que sai quando se corrige só por subtração. A interface mantém botões que se reconhecem como botões, transições ao passar, carregar e focar, a entrada das secções, micro-interações que respondem a cada ação e, onde ajuda a perceber o que se vê, algum 3D (three.js, pela `design-3d-motion`), sempre com `prefers-reduced-motion` respeitado. A base está em `knowledge/design/botoes-movimento-e-micro-interacoes.md` (o caminho do conhecimento dá-o `node ../orchestrate-sessions/scripts/conhecimento.mjs`).

O catálogo das marcas, por meio, está em `marcas.md`; o verificador em `scripts/humanizar.mjs`. Os caminhos são relativos à pasta deste `SKILL.md`.

## Âmbito

Sabe procurar as marcas de `marcas.md` no que vai ser entregue: texto, código, interface, guião, voz e ações de um vídeo, commits, documentação e dados de exemplo. Aponta cada uma com o que uma pessoa faria no lugar e corrige só o que for autorizado. Para a interface, lê `knowledge/design/botoes-movimento-e-micro-interacoes.md`.

Não sabe:

- dizer se um trabalho de outra pessoa foi feito por uma IA. Aponta marcas, não prova autoria: fica fora da base, e a skill diz que não o faz;
- reescrever um texto inteiro, mudar o tom ou traduzir, porque só mexe no que apontou. Isso fica fora da base, e a skill diz que não o faz;
- rever a ortografia e a gramática por completo, que fica fora da base. Numa dúvida de língua ou de pontuação, vai ao Código de Redação Interinstitucional da UE, em português (https://style-guide.europa.eu/pt/content/), e regista o que encontrar como diz a `update-knowledge`;
- avaliar a acessibilidade, o contraste e a usabilidade de uma interface: é da `design-ux`;
- procurar erros e falhas de segurança no código, além das marcas: é da `boas-praticas-codigo` e da `seguranca`;
- procurar segredos e dados pessoais num documento: é da `seguranca`.

Pedidos que se confundem:

- «Humaniza este texto», aqui, quer dizer tirar as marcas com autorização, não reescrevê-lo.
- «Vê se isto parece feito por IA»: sobre um trabalho nosso, sim; para provar a autoria de um trabalho de terceiros, não.
- «Revê a interface»: é desta skill se a pergunta é se parece feita por uma ferramenta, e da `design-ux` se é se funciona para quem a usa.

Quando parte do pedido é de outra skill, diz qual e porquê. Se foi chamada por uma skill mãe, devolve-lhe essa parte no relatório; se está sozinha, recomenda a skill pelo nome. O padrão comum está em `../orchestrate-sessions/regras.md`.

## Regras

- Seguem-se as regras comuns de `../orchestrate-sessions/regras.md`.
- **Nunca corrigir sem autorização.** O verificador não altera ficheiros. A skill mostra os achados e pergunta, por categoria, o que corrigir. Uma categoria autorizada corrige-se inteira; o resto fica como está e é registado.
- **Só o que foi apontado.** Corrigir uma marca não é reescrever o parágrafo, o componente ou a função. O sentido, os factos, os nomes do domínio e as citações entre «» ficam iguais. Uma citação de uma fonte mantém a pontuação original, mesmo com travessões. Numa interface, corrigir troca a forma genérica por uma com intenção e nunca a tira: um filtro em comprimido passa a lista pendente, um botão em pílula passa a botão com cantos ligeiramente arredondados, a mesma animação em tudo passa a transição onde algo muda. Estados, transições e profundidade que já serviam ficam.
- **O estilo do projeto manda.** Formatter, linter, convenção de aspas e de commits do repositório valem mais do que qualquer regra daqui. Se o design do cliente pede emojis, os emojis ficam.
- Trabalho de leitura e correção mecânica: `sonnet`, `low` ou `medium`. A decisão sobre uma interface genérica ou sobre o tom de um texto é «Rever e decidir com risco» em `../orchestrate-sessions/modelo-e-effort.md`.

## 1. O que verificar

Se o pedido diz o que verificar, para quê e até onde, segue para o passo 2. Se não diz, pergunta só o que falta, uma coisa de cada vez e no formato de `../orchestrate-sessions/regras.md`, e pára quando tiver as respostas:

1. **O quê:** só os ficheiros alterados (`git diff --name-only`, recomendado antes de uma entrega), uma pasta ou um conjunto de ficheiros, ou o projeto inteiro. E se as mensagens de commit entram.
2. **Para quê:** só apontar, sem mexer; apontar e corrigir com autorização (recomendado); ou também deixar as marcas de gravidade `alta` verificadas sempre, no hook ou no CI (passo 5).
3. **Até onde,** do mais barato ao mais caro: só o verificador, e o passo 3 não se faz; o verificador e a leitura do que está marcado com **L** em `marcas.md` (recomendado); ou isto mais, numa interface ou num vídeo, a leitura com capturas de cada ecrã ou com o vídeo à frente.

## 2. Verificador

```
node <pasta desta skill>/scripts/humanizar.mjs <caminhos> [--commits 20] [--json] [--permitir <ids>] [--gravidade alta]
```

Por omissão não entra na pasta `knowledge/` (as entradas citam fontes com a pontuação delas) e apanha emojis em todo o lado (`--permitir-emojis` desliga isso quando o design os pede). `--permitir <ids>`, separados por vírgula, deixa de fora as marcas que são convenção do projeto (as deste repositório estão em «Convenções da casa» de `marcas.md`). `--gravidade alta` mostra só as de gravidade `alta`, como no CI. Cola a saída completa. Cada achado tem o ficheiro e a linha, o identificador da marca, a gravidade (`alta` é quase sempre marca; `media` depende do contexto) e o que uma pessoa faria.

## 3. Leitura

O verificador apanha o que se reconhece por padrão. Lê depois o que está marcado com **L** em `marcas.md`, no que foi entregue:

- no texto: ritmo das frases, enumerações de três, paralelismos, resumos finais, títulos a mais, números sem fonte;
- no código: abstrações para um uso só, verificações impossíveis, `utils` onde cai tudo, mensagens de erro genéricas, testes que não testam;
- na interface: alinhamento genérico (tudo centrado, caixas todas iguais, campos todos da mesma largura, espaçamentos todos iguais), página inicial de modelo, paleta e tipografia por omissão, estados vazios e de erro iguais em todo o lado. O que uma pessoa faz à mão é alinhar a uma grelha e ao conteúdo: larguras que seguem o que recebem, números à direita, mais espaço entre grupos do que dentro deles, assimetrias com intenção. Lê também o contrário, a interface achatada: tudo reto e parado, ações em links sublinhados, nada que responda ao passar, carregar ou focar, e a página inteira feita de blocos brancos da largura toda empilhados, que parece feita por um júnior (secção «Interface achatada» de `marcas.md`). Nem 8 nem 80: o meio de uma aplicação de trabalho bem feita;
- nas listas, filtros e tabelas: listas com bolas onde cabia uma tabela, filtros em comprimidos redondos em vez de listas pendentes retas, tabelas sem ordenar nem filtrar pelo cabeçalho como no Excel, secções sem separadores nem cartões de resumo, componentes inventados em vez dos de uma biblioteca conhecida;
- na informação a mais, com capturas de cada ecrã à frente: o mesmo dado em dois sítios, metadados com o mesmo valor em todas as linhas, gráficos que não respondem a nada, explicações para programadores, texto onde um gráfico chegava, o que é novo perdido no meio do resto. Para cada bloco pergunta «quem usa precisa disto para decidir ou agir?»; se não precisa, sai;
- no vídeo: o guião, a narração e as ações do cursor, com a secção «Vídeo e voz»;
- nos commits e na documentação: mensagens que repetem o diff, documentação que explica o óbvio e cala o difícil.

Regista cada achado de leitura no mesmo formato do verificador: onde, o que é, o que uma pessoa faria.

## 4. Pedir autorização

Mostra os achados agrupados por categoria (Pontuação, Fórmulas, Estrutura, Língua, Código, Interface, Informação a mais, Vídeo, Dados, Commits), com o antes e o depois de um exemplo de cada, e pergunta categoria a categoria, uma de cada vez:

```
❓ **Pontuação (9 achados)**: corrigir?

1. **Todos**: aplico as 9 correções desta categoria.
2. **Só alguns**: diz-me quais ficam.
3. **Nenhum**: fica como está, e registo porquê.
```

As categorias de gravidade `media` levam a nota «confirmar a ler» e um exemplo onde a marca pode ser legítima. Mensagens de commit já publicadas não se reescrevem: o achado fica registado para os commits seguintes.

## 5. Corrigir e voltar a verificar

Aplica só o autorizado, corre o formatter do projeto se o houver, e volta a correr o verificador até a saída ser `✓` ou só restarem achados que o utilizador decidiu manter. Numa entrega da `start-project-with-trust`, a saída final vai para «Verificação» de `entrega.md` como prova do critério «sem marcas de escrita de IA».

Se o projeto tem CI e o verificador ainda não está lá, oferece pô-lo, numa pergunta. As marcas voltam quando ninguém corre o verificador: foi assim que 176 pontos médios chegaram a um portal publicado. Uma regra que importa vive no CI, e não só nas instruções ao agente (`knowledge/governacao/regras-no-ci-nao-so-no-agente.md`). Começa pelas marcas de gravidade `alta`:

1. copia `scripts/humanizar.mjs` para o repositório do projeto (para o mesmo sítio do hook, se já o tiver);
2. junta ao pipeline um passo que corre `node <caminho>/humanizar.mjs <pastas entregues> --gravidade alta`. O passo falha quando há achados, porque o verificador sai com 1;
3. para travar o merge, põe esse passo nas verificações obrigatórias da branch.

As de gravidade `media` só entram depois de o projeto as limpar, com `--permitir` para as convenções dele. Só se instala com autorização, como o hook.

## Hook opcional

Para ver as marcas à medida que os ficheiros são escritos, e não só no fim, copia `scripts/humanizar.mjs` para `.claude/hooks/humanizar/` no projeto e junta a entrada de `scripts/hooks-settings.json` a `hooks.PostToolUse` em `.claude/settings.json`. Depois de cada escrita, o hook devolve os achados desse ficheiro e manda perguntar antes de corrigir. Só se instala com autorização do utilizador, como os hooks da `start-project-with-trust`.

## Relatório

- Achados por categoria: corrigidos, mantidos por decisão do utilizador, e os de leitura.
- A saída final do verificador.
- O que ficou para os próximos trabalhos (por exemplo, o estilo de commit a seguir).


## Documentação

Quando outra skill te chama, o que encontraste entra no relatório de processo dela. Quando corres sozinha sobre um trabalho e corriges alguma coisa, escreve o teu, como diz o modo «processo» da skill `documentacao`, se ela estiver instalada (existe `../documentacao/SKILL.md`).
