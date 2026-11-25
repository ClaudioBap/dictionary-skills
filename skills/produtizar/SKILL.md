---
name: produtizar
description: Mini skill para transformar o que foi feito para um caso (um cliente, uma área, um conjunto de dados) em algo que se transporta para o caso seguinte mudando só configuração e conhecimento. Separa o núcleo do específico, põe o que varia em configuração, versiona o núcleo e prova a modularidade instanciando um segundo caso. Quando o produto se vende por partes (plano, funcionalidade, separador, ecrã, API ou módulo), segmenta-o com o direito verificado no servidor, sem entregar a ninguém o que não comprou. Usar quando a decisão «Específico ou modular» escolheu núcleo com adaptadores ou produto, quando se quer reutilizar um projeto que já existe, ou quando se quer vender um produto por partes. É uma sub skill, que faz uma parte do trabalho, sozinha ou chamada por uma skill mãe.
argument-hint: "Pasta do projeto a produtizar e o segundo caso a instanciar"
metadata:
  estado: produção
  tipo: sub
  usa: [humanizar]
  impacto: { ia: 0, seguranca: 0, nuvem: 3, desenvolvimento: 10, web: 0 }
---

# Produtizar

O caminho do conhecimento obtém-se com `node ../orchestrate-sessions/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/produto/`. Lê o `README.md` e as entradas antes de começar. Se `~/.start-project-with-trust/knowledge/produto/` tiver uma entrada com o mesmo caminho, vale a pessoal.

## Regras

- Seguem-se as regras de `../orchestrate-sessions/regras.md`, incluindo a autonomia depois da decisão: o que só o utilizador pode dar fica «Por preencher», e o resto continua.
- A fronteira entre núcleo e específico é uma decisão de arquitetura: segue a linha «Rever e decidir com risco» de `../orchestrate-sessions/modelo-e-effort.md`. O resto é construção.
- O núcleo nunca contém nada de um caso concreto: nem nomes, nem dados, nem textos de um cliente.
- Num produto que se vende por partes, cada parte vendável é um módulo com fronteira própria (as outras partes só lhe chegam pela interface dele) e o direito a ela verifica-se no servidor, para se poder vender uma parte sem expor as outras. Base: `segmentar-em-partes-vendaveis.md`, `direitos-por-plano-no-servidor.md`.

## Âmbito

Sabe fazer, com `knowledge/produto/`: separar o núcleo do específico, pôr o que varia em configuração, versionar o núcleo, dar a um cliente uma funcionalidade por flag, escolher entre um modelo de projeto e um produto multi-inquilino, segmentar um produto em partes vendáveis com o direito verificado no servidor, dizer se o Cyber Resilience Act se aplica ao produto e provar tudo com um segundo caso.

Não faz, e para onde vai:
- o desenho da API e do esquema multi-inquilino, e a ligação a um sistema de faturação: `backend-dados`;
- a interface do que não está incluído no plano: `design-ux`;
- auditar o isolamento entre clientes ou entre planos: `seguranca`;
- publicar uma instalação por cliente: `infra-deploy`;
- organizar melhor o código de um caso só, sem segundo caso nem venda: `boas-praticas-codigo`;
- o preço de cada plano é decisão comercial do utilizador, e os termos jurídicos da licença ficam fora da base: a skill aponta a obrigação com a fonte oficial, pelo procedimento «Quando falta conhecimento» de `../update-knowledge/SKILL.md`, e não dá parecer jurídico.

Pedidos que se confundem:
- «Vender por planos ou por módulos»: sim, é o passo 3. «Esconder um botão a quem não pagou»: também, mas esconder não protege nada; o direito verifica-se no servidor.
- «Modularizar este código» num projeto de um caso só: não é desta skill, sem segundo caso a modularidade não se prova; é da `boas-praticas-codigo`.

Quando parte do pedido é de outra skill, diz qual e porquê, como manda `../orchestrate-sessions/regras.md`.

## 1. O que se quer

Se o pedido, o questionário da `orchestrate-sessions` ou a mãe que te chamou já dizem o projeto, até onde ir e o segundo caso, não perguntes de novo: confirma numa frase e passa ao passo 2. O que se vê no repositório verificas tu. Ao que falta, pergunta uma coisa de cada vez, no formato das perguntas de `../orchestrate-sessions/regras.md`, e pára quando tens a resposta. No máximo estas quatro:

1. **Que projeto e que caso.** A pasta e o caso para que foi feito (um cliente, uma área ou um conjunto de dados).
2. **Até onde ir.** A pergunta P16 de `../orchestrate-sessions/PERGUNTAS.md`, com as quatro opções de `especifico-ou-modular.md`, da mais barata à mais cara. Se a escolha for «específico», esta skill não é precisa: diz-lo e pára.
3. **O segundo caso.** Outro cliente, outra área ou outros dados que vão servir de prova: sem um segundo caso concreto, a modularidade não se prova.
4. **Por onde se vende**, só se a escolha foi «produto». Opções, da mais barata à mais cara *(estimativa)*: não segmentar, por plano, por funcionalidade, pela API, por separador, janela ou ecrã, por bloco ou módulo. Recomenda a mais barata que serve o que o cliente quer comprar.

## 2. Inventário

Lança um subagente (`haiku`, `low`) que lista os módulos, ficheiros e tabelas do projeto e marca cada um como `núcleo` (igual em todos os casos), `específico` (só deste caso) ou `misto` (os dois juntos), com a razão. Base: `nucleo-e-adaptadores.md`. Mostra a lista e pede validação. Os `misto` são decisões do utilizador: pergunta um de cada vez, no formato das perguntas de `../orchestrate-sessions/regras.md`.

## 3. Segmentar

Só quando o passo 1 disse que o produto se vende por partes; com «não segmentar», passa ao passo 4. Por onde se vende é uma escolha comercial do utilizador; o método decorre dela. Base: `segmentar-em-partes-vendaveis.md`.

| Por onde se vende | Método |
|---|---|
| Plano | Direitos por plano: o servidor sabe que direitos dá cada plano e verifica-os em cada pedido, a negar por omissão. Esconder na interface não é proteção. Base: `direitos-por-plano-no-servidor.md`, `knowledge/seguranca/autorizacao-no-servidor.md`. |
| Funcionalidade | Flag de permissão ligada ao plano, avaliada no servidor a partir dos direitos, nunca decidida pelo browser. Base: `feature-flags.md`, `direitos-por-plano-no-servidor.md`. |
| API | Cada endpoint da parte declara o direito que exige e recusa sem ele. Base: `direitos-por-plano-no-servidor.md`. |
| Separador, janela ou ecrã | A rota e os dados verificam o direito no servidor, e o código desse ecrã fica num ficheiro à parte que o servidor só entrega a quem tem o direito; um ficheiro estático público descarrega-o quem souber o endereço *(interpretação)*. Base: `nao-entregar-o-que-nao-se-comprou.md`. |
| Bloco ou módulo | Módulo ou pacote à parte, que só se instala ou carrega para quem o comprou. Numa instalação no cliente, cada módulo comprado leva a sua licença e o que não se comprou não se instala. Base: `nao-entregar-o-que-nao-se-comprou.md`. |

Antes de construir, regista uma linha por parte: o que inclui, o método e o direito que a abre. A construção segue a regra das partes vendáveis (secção «Regras»); a API da parte é da `backend-dados` e a interface do que não está incluído é da `design-ux`.

## 4. Isolar o que varia

Tudo o que mudou de caso para caso no inventário sai do código do núcleo: para variáveis de ambiente, ficheiros de configuração ou dados. O repositório ganha um `.env.example` com cada variável, para quê e o formato. Base: `configuracao-fora-do-codigo.md`. O conhecimento do caso (por exemplo, os emails de um departamento, o vocabulário, as regras de acesso) é dado, não código.

## 5. Núcleo versionado e adaptadores

- O núcleo passa a módulo ou pacote com versão própria (SemVer), mensagens de commit convencionais e registo de alterações. Base: `versionamento-e-registo-de-alteracoes.md`.
- Cada caso é um adaptador mais configuração, que fala com o núcleo por uma interface que não muda de caso para caso. Base: `nucleo-e-adaptadores.md`.
- Uma funcionalidade que só um caso quer fica atrás de uma flag de permissão, não num ramo do código. Base: `feature-flags.md`.
- Se a decisão foi «produto»: um modelo de projeto atualizável (Copier) ou a escolha do modelo multi-inquilino, que é também uma decisão comercial e vai ao utilizador. Base: `modelos-de-projeto-reutilizaveis.md`, `multi-inquilino.md`.
- Se a decisão foi «produto», lê `knowledge/seguranca/cyber-resilience-act.md` e regista no relatório se o regulamento se aplica ao produto e, se sim, as obrigações, com a entrada. O âmbito e as datas estão na entrada, não nesta skill.

## 6. Prova

Instancia o segundo caso só com configuração e conhecimento novos, e corre os testes. O critério de fim é duplo: o segundo caso funciona, e o núcleo não mudou (a diferença no núcleo entre os dois casos é vazia).

Se o produto se vende por partes, a prova inclui uma conta de teste com o plano mais baixo: a parte que não comprou não abre pela interface nem pelo endereço direto, a API dessa parte recusa o pedido, e nos ficheiros que o browser recebeu não aparece o código dela (procura um nome de rota ou um texto que só ela tem). Cola os pedidos e as respostas.

Regista a prova no relatório e, se o projeto tiver `entrega.md`, em «Verificação»; o que faltou fica em «Por preencher».

O núcleo, a configuração e a documentação de como se instancia um caso novo não podem deixar perceber que foram feitos por uma IA. Antes de fechar, corre a mini skill `humanizar` (ou `node ../humanizar/scripts/humanizar.mjs <pastas tocadas> --commits <n>`) e relê o que o verificador não apanha com as secções «Código» e «Commits, documentação e dados» de `../humanizar/marcas.md`. Corriges só com autorização, categoria a categoria, e a saída final vai também para «Verificação».

## Relatório

- O que é núcleo e o que é específico, com a lista de ficheiros.
- Como se instancia o terceiro caso: passos e variáveis.
- Se se vende por partes: cada parte, o método, o direito que a abre e a prova com o plano mais baixo.
- A versão do núcleo e o registo de alterações.
- A saída final do verificador da `humanizar`, com os achados que ficaram e porquê.
- O que ficou por preencher.


## Documentação

Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), no fim de um trabalho com resultado escreve o relatório do processo, como diz o modo «processo» dela. Uma consulta sem alterações não leva relatório.
