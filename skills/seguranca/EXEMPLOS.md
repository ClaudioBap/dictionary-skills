# Exemplos: seguranca

## O que faz

Audita ou protege um site ou uma aplicação. Em auditoria corre o verificador de publicação quando há URL público, usa a linha «Para uma skill» de cada entrada da base como item de uma lista de verificação e devolve as falhas por ordem de risco, cada uma com a correção e a entrada que a sustenta. Em construção aplica as práticas de segurança e privacidade ao que se está a fazer, com prova. Nunca explora uma falha: verifica, e o que pede autorização do dono pára e vai ao utilizador.

## Quando usar

- Rever a segurança e a privacidade antes de publicar.
- Auditar um site que já está no ar, a partir do URL.
- Construir login, sessões e formulários com as práticas certas desde o início.
- Rever os acessos SSH e RDP a servidores, sem segredos no inventário.
- Uma aplicação com LLM, contra a injeção de prompt.

## Quando não usar

- Testes de intrusão ou ataques reais: a skill não os faz, e qualquer teste ativo pede autorização do dono.
- Montar o pipeline e o alojamento: `infra-deploy`, que também corre o verificador de publicação no fim.
- Testes a uma firewall de rede ou à rede de um escritório: a skill nunca explora, e a base não cobre firewalls de rede nem segmentação.

## Exemplo: revisão antes de publicar

**Pedido:** «Revisão de segurança e privacidade: token do repositório, área de admin, votos e bots, RGPD e DPIA.»

**O que a skill faz:**

1. Escolhe o modo auditoria e regista o que está em jogo: dados pessoais (os votos e o email do admin), exposição pública e nenhum LLM.
2. Sem URL público, não corre o verificador de publicação e deixa-o na lista do que fica por verificar.
3. Percorre as entradas como lista de verificação e regista, para cada item, a prova ou a falha, com o ficheiro e a linha.
4. Ordena as 11 falhas por risco: nenhuma alta e três médias, entre elas o voto que aceitava pedidos vindos de outros sites e a falta de limite de taxa.
5. Mostra a lista e deixa ao dono a decisão de por onde começar a corrigir.

**Resultado:** Foi a tarefa T9 do site de notícias, que deixou também o `DPIA.md` escrito. As falhas de risco médio passaram à tarefa seguinte, no exemplo abaixo.

## Exemplo: corrigir as falhas encontradas

**Pedido:** «Corrige as falhas 1, 2, 3, 4, 5, 7 e 9 da revisão de segurança.»

**O que a skill faz:**

1. O voto passa a recusar pedidos de outra origem (403) e corpos que não são JSON (400), com testes que provam que nada se grava.
2. O identificador do visitante passa a HMAC-SHA-256 com sal, diferente por novidade e só com o prefixo /64 no IPv6; o IP nunca se guarda.
3. Entram o limite de 10 votos por minuto, o apagamento dos votos quando a decisão fica aplicada e o `/health` da administração sem a versão.
4. As ações do CI ficam fixadas por SHA e o `npm audit` passa a correr no pipeline.
5. Volta a correr as verificações: lint, tipos, 165 testes e a corrida local a passar.

**Resultado:** Foi a tarefa T9b do site de notícias. O contacto para os direitos dos titulares ficou «Por preencher».

## Exemplo: rever os acessos aos servidores

**Pedido:** «Revê quem tem acesso SSH aos nossos servidores.»

**O que a skill faz:**

1. Escolhe o modo de revisão de acessos e lê `acesso-remoto/` inteira, `seguranca/contentores-endurecidos.md` e `seguranca/menor-privilegio-na-base-de-dados.md`.
2. Monta o inventário de acessos só com a referência ao cofre onde está cada chave, nunca com a chave.
3. Antes de entrar num servidor para confirmar a configuração, pára e pede autorização ao dono.
4. Devolve as falhas por risco, cada uma com a correção e a entrada que a sustenta.

**Resultado:** O inventário revisto, sem segredos, e a lista do que corrigir por ordem de risco.
