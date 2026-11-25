# Exemplos: produtizar

## O que faz

Pega no que foi feito para um caso (um cliente, uma área, um conjunto de dados) e transforma-o em algo que serve o caso seguinte mudando só configuração e conhecimento. Separa o núcleo, igual em todos os casos, do que é específico, tira do código o que varia e versiona o núcleo com SemVer. A modularidade só se dá por provada quando um segundo caso funciona sem nenhuma alteração ao núcleo.

## Quando usar

- A decisão «Específico ou modular» escolheu núcleo com adaptadores, ou produto.
- Um projeto feito para um cliente que outro cliente quer igual, com os seus dados.
- Uma ferramenta interna de uma área que outra área quer usar.
- Preparar um modelo de projeto atualizável (Copier) ou um produto multi-inquilino.
- Vender um produto por partes (por plano, funcionalidade, separador, ecrã, API ou módulo) sem que quem comprou uma parte receba as outras.

## Quando não usar

- Projetos de um caso só: «específico» é uma resposta válida, e foi a do site de notícias.
- Sem um segundo caso concreto à vista: a modularidade não se consegue provar.

## Exemplo: a triagem de emails para outro departamento

**Pedido:** «A triagem de emails que fizemos para os Recursos Humanos tem de servir também o Financeiro.»

**O que a skill faz:**

1. Um subagente `haiku` lista os módulos, os ficheiros e as tabelas e marca cada um como núcleo, específico ou misto, com a razão; os mistos vão ao utilizador, um de cada vez.
2. Confirma o segundo caso que serve de prova: o Financeiro, com os seus emails, o seu vocabulário e as suas regras.
3. Tira do código o que mudou de caso para caso: endereços, categorias e regras de encaminhamento passam a configuração e a dados, com cada variável explicada no `.env.example`.
4. Põe o núcleo num pacote com versão própria e registo de alterações, e cada departamento como um adaptador mais configuração; o que só o Financeiro quer fica atrás de uma flag.
5. Instancia o Financeiro só com configuração e conhecimento novos, corre os testes e confirma que a diferença no núcleo entre os dois casos é vazia.

**Resultado:** Dois departamentos sobre o mesmo núcleo, a prova em `entrega.md` e os passos e as variáveis para instanciar o terceiro.

## Exemplo: vender a ferramenta a outras clínicas

**Pedido:** «A ferramenta de marcações que fizemos para uma clínica pode ser vendida a outras. Prepara-a para isso.»

**O que a skill faz:**

1. Faz o inventário do núcleo e do específico, e confirma que no núcleo não fica o nome, os dados nem os textos da primeira clínica.
2. Como a decisão foi «produto», apresenta a escolha entre um modelo de projeto atualizável e um produto multi-inquilino; é também uma decisão comercial, por isso vai ao utilizador.
3. Com a escolha feita, versiona o núcleo e põe cada clínica como configuração e conhecimento próprios.
4. Instancia uma segunda clínica de teste e corre os testes sem mexer no núcleo.

**Resultado:** O núcleo versionado, a segunda clínica a funcionar, e a lista do que fica por preencher por cada clínica nova.
