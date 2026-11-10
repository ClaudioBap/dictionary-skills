---
name: humanizar
description: Verifica tudo o que vai ser entregue (texto, código, interface, commits, documentação, dados de exemplo) à procura das marcas que denunciam que foi feito por uma ferramenta, mostra cada achado com o que uma pessoa faria no lugar e só corrige com autorização, categoria a categoria. Usar antes de qualquer entrega, como última sessão da orquestração, ou sobre um trabalho que já existe.
argument-hint: "Pasta, ficheiros ou «diff» a verificar; junta «commits» para ver também as mensagens de commit"
---

# Humanizar

O objetivo é que ninguém consiga distinguir se o trabalho foi feito por uma pessoa da equipa ou por uma ferramenta. O catálogo das marcas, por meio, está em `marcas.md`; o verificador em `scripts/humanizar.mjs`. Os caminhos são relativos à pasta deste `SKILL.md`.

## Regras

- Seguem-se as regras da secção «Regras em todas as fases» de `../start-project-with-trust/SKILL.md`.
- **Nunca corrigir sem autorização.** O verificador não altera ficheiros. A skill mostra os achados e pergunta, por categoria, o que corrigir. Uma categoria autorizada corrige-se inteira; o resto fica como está e é registado.
- **Só o que foi apontado.** Corrigir uma marca não é reescrever o parágrafo, o componente ou a função. O sentido, os factos, os nomes do domínio e as citações entre «» ficam iguais. Uma citação de uma fonte mantém a pontuação original, mesmo com travessões.
- **O estilo do projeto manda.** Formatter, linter, convenção de aspas e de commits do repositório valem mais do que qualquer regra daqui. Se o design do cliente pede emojis, os emojis ficam.
- Trabalho de leitura e correção mecânica: `sonnet`, `low` ou `medium`. A decisão sobre uma interface genérica ou sobre o tom de um texto é «Rever e decidir com risco» em `../orchestrate-sessions/modelo-e-effort.md`.

## 1. Âmbito

Se o pedido não diz o que verificar, pergunta, no formato da Fase 1 da `start-project-with-trust`: a pasta do projeto, só os ficheiros alterados (`git diff --name-only`), ou um conjunto de ficheiros. Pergunta também se as mensagens de commit entram.

## 2. Verificador

```
node <pasta desta skill>/scripts/humanizar.mjs <caminhos> [--commits 20] [--json]
```

Por omissão não entra na pasta `knowledge/` (as entradas citam fontes com a pontuação delas) e apanha emojis em todo o lado (`--permitir-emojis` desliga isso quando o design os pede). Cola a saída completa. Cada achado tem o ficheiro e a linha, o identificador da marca, a gravidade (`alta` é quase sempre marca; `media` depende do contexto) e o que uma pessoa faria.

## 3. Leitura

O verificador apanha o que se reconhece por padrão. Lê depois o que está marcado com **L** em `marcas.md`, no que foi entregue:

- no texto: ritmo das frases, enumerações de três, paralelismos, resumos finais, títulos a mais, números sem fonte;
- no código: abstrações para um uso só, verificações impossíveis, `utils` onde cai tudo, mensagens de erro genéricas, testes que não testam;
- na interface: alinhamento genérico (tudo centrado, caixas todas iguais, campos todos da mesma largura, espaçamentos todos iguais), página inicial de modelo, paleta e tipografia por omissão, estados vazios e de erro iguais em todo o lado. O que uma pessoa faz à mão é alinhar a uma grelha e ao conteúdo: larguras que seguem o que recebem, números à direita, mais espaço entre grupos do que dentro deles, assimetrias com intenção;
- nos commits e na documentação: mensagens que repetem o diff, documentação que explica o óbvio e cala o difícil.

Regista cada achado de leitura no mesmo formato do verificador: onde, o que é, o que uma pessoa faria.

## 4. Pedir autorização

Mostra os achados agrupados por categoria (Pontuação, Fórmulas, Estrutura, Língua, Código, Interface, Dados, Commits), com o antes e o depois de um exemplo de cada, e pergunta categoria a categoria, uma de cada vez:

```
❓ **Pontuação (9 achados)**: corrigir?

1. **Todos**: aplico as 9 correções desta categoria.
2. **Só alguns**: diz-me quais ficam.
3. **Nenhum**: fica como está, e registo porquê.
```

As categorias de gravidade `media` levam a nota «confirmar a ler» e um exemplo onde a marca pode ser legítima. Mensagens de commit já publicadas não se reescrevem: o achado fica registado para os commits seguintes.

## 5. Corrigir e voltar a verificar

Aplica só o autorizado, corre o formatter do projeto se o houver, e volta a correr o verificador até a saída ser `✓` ou só restarem achados que o utilizador decidiu manter. Numa entrega da `start-project-with-trust`, a saída final vai para «Verificação» de `entrega.md` como prova do critério «sem marcas de escrita de IA».

## Hook opcional

Para ver as marcas à medida que os ficheiros são escritos, e não só no fim, copia `scripts/humanizar.mjs` para `.claude/hooks/humanizar/` no projeto e junta a entrada de `scripts/hooks-settings.json` a `hooks.PostToolUse` em `.claude/settings.json`. Depois de cada escrita, o hook devolve os achados desse ficheiro e manda perguntar antes de corrigir. Só se instala com autorização do utilizador, como os hooks da `start-project-with-trust`.

## Relatório

- Achados por categoria: corrigidos, mantidos por decisão do utilizador, e os de leitura.
- A saída final do verificador.
- O que ficou para os próximos trabalhos (por exemplo, o estilo de commit a seguir).
