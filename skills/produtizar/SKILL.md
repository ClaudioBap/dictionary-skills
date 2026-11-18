---
name: produtizar
description: Mini skill para transformar o que foi feito para um caso (um cliente, uma área, um conjunto de dados) em algo que se transporta para o caso seguinte mudando só configuração e conhecimento. Separa o núcleo do específico, põe o que varia em configuração, versiona o núcleo e prova a modularidade instanciando um segundo caso. Usar quando a decisão «Específico ou modular» escolheu núcleo com adaptadores ou produto, ou quando se quer reutilizar um projeto que já existe.
argument-hint: "Pasta do projeto a produtizar e o segundo caso a instanciar"
---

# Produtizar

O caminho do conhecimento obtém-se com `node ../start-project-with-trust/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/produto/`. Lê o `README.md` e as entradas antes de começar. Se `~/.start-project-with-trust/knowledge/produto/` tiver uma entrada com o mesmo caminho, vale a pessoal.

## Regras

- Seguem-se as regras da secção «Regras em todas as fases» de `../start-project-with-trust/SKILL.md`, incluindo a autonomia depois da decisão: o que só o utilizador pode dar fica «Por preencher», e o resto continua.
- A fronteira entre núcleo e específico é uma decisão de arquitetura: segue a linha «Rever e decidir com risco» de `../orchestrate-sessions/modelo-e-effort.md`. O resto é construção.
- O núcleo nunca contém nada de um caso concreto: nem nomes, nem dados, nem textos de um cliente.

## 1. Inventário

Lança um subagente (`haiku`, `low`) que lista os módulos, ficheiros e tabelas do projeto e marca cada um como `núcleo` (igual em todos os casos), `específico` (só deste caso) ou `misto` (os dois juntos), com a razão. Base: `nucleo-e-adaptadores.md`. Mostra a lista e pede validação. Os `misto` são decisões do utilizador: pergunta um de cada vez, no formato da Fase 1 da `start-project-with-trust`.

## 2. Até onde ir

Se a decisão «Específico ou modular» ainda não foi tomada, faz a pergunta P16 e a decisão D5 como na `start-project-with-trust`, com as opções de `especifico-ou-modular.md`. Pergunta também qual é o segundo caso que vai servir de prova (outro cliente, outra área, outros dados): sem um segundo caso concreto, a modularidade não se prova.

## 3. Isolar o que varia

Tudo o que mudou de caso para caso no inventário sai do código do núcleo: para variáveis de ambiente, ficheiros de configuração ou dados. O repositório ganha um `.env.example` com cada variável, para quê e o formato. Base: `configuracao-fora-do-codigo.md`. O conhecimento do caso (por exemplo, os emails de um departamento, o vocabulário, as regras de acesso) é dado, não código.

## 4. Núcleo versionado e adaptadores

- O núcleo passa a módulo ou pacote com versão própria (SemVer), mensagens de commit convencionais e registo de alterações. Base: `versionamento-e-registo-de-alteracoes.md`.
- Cada caso é um adaptador mais configuração, que fala com o núcleo por uma interface que não muda de caso para caso. Base: `nucleo-e-adaptadores.md`.
- Uma funcionalidade que só um caso quer fica atrás de uma flag de permissão, não num ramo do código. Base: `feature-flags.md`.
- Se a decisão foi «produto»: um modelo de projeto atualizável (Copier) ou a escolha do modelo multi-inquilino, que é também uma decisão comercial e vai ao utilizador. Base: `modelos-de-projeto-reutilizaveis.md`, `multi-inquilino.md`.

## 5. Prova

Instancia o segundo caso só com configuração e conhecimento novos, e corre os testes. O critério de fim é duplo: o segundo caso funciona, e o núcleo não mudou (a diferença no núcleo entre os dois casos é vazia). Regista a prova em `entrega.md` («Verificação») e o que faltou em «Por preencher».

O núcleo, a configuração e a documentação de como se instancia um caso novo não podem deixar perceber que foram feitos por uma IA. Antes de fechar, corre a mini skill `humanizar` (ou `node ../humanizar/scripts/humanizar.mjs <pastas tocadas> --commits <n>`) e relê o que o verificador não apanha com as secções «Código» e «Commits, documentação e dados» de `../humanizar/marcas.md`. Corriges só com autorização, categoria a categoria, e a saída final vai também para «Verificação».

## Relatório

- O que é núcleo e o que é específico, com a lista de ficheiros.
- Como se instancia o terceiro caso: passos e variáveis.
- A versão do núcleo e o registo de alterações.
- A saída final do verificador da `humanizar`, com os achados que ficaram e porquê.
- O que ficou por preencher.


## Documentação

Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), no fim de um trabalho com resultado escreve o relatório do processo, como diz o modo «processo» dela. Uma consulta sem alterações não leva relatório.
