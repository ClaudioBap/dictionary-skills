---
id: portais-de-agentes/caixa-de-perguntas-a-distancia
titulo: "Responder às sessões à distância"
seccao: "Portais e mundos de agentes"
paginas: []
fonte: "https://code.claude.com/docs/en/hooks"
data_lancamento: null
confianca: media
verificado_em: 2026-11-18
editado_em: 2026-11-22
---

# Responder às sessões à distância

**Resumo:** As perguntas (`AskUserQuestion`) e os pedidos de permissão de uma sessão do Claude Code chegam ao portal por um hook `PermissionRequest` síncrono, com timeout longo, que espera sem prazo enquanto o diálogo local também está aberto; ganha a primeira resposta, dada no portal ou no Claude Code. A Caixa separa as perguntas por projeto, avisa por Web Push sem conteúdo, desenha-se primeiro para o telemóvel e só mostra cada pergunta a quem a fez.

## Conteúdo

Origem: o projeto de origem, um portal onde cada pessoa da equipa responde pelo telemóvel às sessões do Claude Code que tem abertas no PC, construído e posto à prova entre 2026-11-16 e 2026-11-18 com o Claude Code 2.1.325. O que vem só dessa experiência está marcado *(experiência do projeto)*; o resto foi confirmado nas fontes oficiais lidas a 2026-11-18. Os eventos sem conteúdo que mostram o estado das sessões estão em [Eventos das sessões e origem das skills](eventos-e-origem-das-skills.md).

### O caminho de uma pergunta

1. A sessão precisa de uma resposta: uma permissão para usar uma ferramenta ou uma pergunta do `AskUserQuestion`. O Claude Code corre o hook `PermissionRequest`.
2. O hook publica a pergunta no portal com um id gerado por ele e lança um vigia (um processo à parte, sem os canais do hook) que a retira do portal se a sessão fechar a meio da espera *(experiência do projeto)*.
3. O hook consulta o portal de 3 em 3 s. Ao mesmo tempo, o Claude Code mostra o diálogo no computador *(experiência do projeto)*.
4. Se a resposta vier do portal, o hook devolve a decisão e o Claude Code fecha o diálogo. Se vier do computador, o hook vê-a e retira a pergunta do portal. Ganha a primeira.

O hook é síncrono e decide, ao contrário dos hooks de eventos: um hook `async` não devolve decisões. A saída tem esta forma:

- permissão: `hookSpecificOutput.decision.behavior` com `allow` ou `deny`, e com `deny` uma `message` que diz ao Claude porquê;
- pergunta: `allow` com `updatedInput`, que é o pedido original com `answers` preenchido. `answers` é um objeto que liga o texto de cada pergunta à opção escolhida, e várias opções juntam-se com vírgulas. `allow` sozinho não chega para o `AskUserQuestion`.

Um `allow` do hook não passa por cima de uma regra de recusa (`deny`) das definições: as regras continuam a valer.

### Sem prazo, nos dois lados

- A pergunta espera até ser respondida, até o hook a retirar ou até a sessão fechar. O que ficar para trás (o PC desligou-se a meio) sai com a sessão, aos 7 dias na origem *(experiência do projeto)*.
- O `timeout` por omissão de um hook de comando é de 600 s, e a documentação não dá teto. Na origem, o registo leva 7 dias e 10 minutos, e o hook desiste aos 7 dias, abaixo do registo *(experiência do projeto)*. Esperas de 7 dias não foram provadas até ao fim.
- Uma falha passageira do portal não acaba com a espera. Dois minutos seguidos sem resposta do portal, sim: o hook sai sem decisão e fica só o diálogo local *(experiência do projeto)*.
- Um interruptor por pessoa (o «modo remoto») decide se as perguntas vão para o portal. Desligado, o portal recusa-as e a sessão fica só com o diálogo local.

### Como o hook sabe que a pessoa respondeu no computador

Com o Claude Code 2.1.325, responder no diálogo local não termina o hook *(experiência do projeto)*. O hook lê o fim da transcrição (os últimos 512 KiB), encontra a chamada de ferramenta que pediu e procura o resultado dela; se existe, a pessoa respondeu no computador.

É frágil por natureza: a documentação diz que o formato das linhas da transcrição é interno e muda entre versões. Duas regras para o tornar aceitável:

- Se não encontrar a chamada, o hook diz «ainda não» e continua à espera. Uma leitura falhada nunca dá uma resposta inventada.
- Há um limite conhecido: o pedido de um subagente escreve noutra transcrição, e uma permissão de subagente respondida no computador fica na Caixa até sair *(experiência do projeto)*.

Antes de construir isto, confirma na referência de hooks da versão em uso se já há outra forma de saber que o diálogo foi respondido.

### Evitar a mesma pergunta duas vezes

O `PermissionRequest` dispara também para o `AskUserQuestion` *(experiência do projeto)*. Se houver outro hook a levar as perguntas (por exemplo um `PreToolUse` com matcher `AskUserQuestion`), a mesma pergunta aparece duas vezes na Caixa.

- Regra: um só hook leva as perguntas. Na origem ficou o `PermissionRequest`, porque é o único ponto em que o Claude Code mostra o diálogo e espera pelo hook ao mesmo tempo *(experiência do projeto)*. O `PreToolUse` segurava a sessão sem mostrar o diálogo, que só abria quando o hook desistia.
- Quem mantiver o `PreToolUse` para as perguntas faz o `PermissionRequest` ignorar o `AskUserQuestion`.
- Ao trocar de desenho, o instalador tira o registo antigo, e o script antigo fica a sair sem fazer nada enquanto houver máquinas por atualizar *(experiência do projeto)*.
- O `ExitPlanMode` fica só no computador: um plano não se aprova sem o ler *(experiência do projeto)*.

### O que vai para o portal

- Numa permissão: o nome da ferramenta, o comando e o endereço sem os segredos que se reconhecem (`Bearer`, `user:senha@`, chaves privadas, formatos de tokens conhecidos, `password=`), o caminho a partir da pasta do projeto e o nome da pasta. Nunca `content`, `old_string` nem `new_string`.
- Numa pergunta: a pergunta com as opções, tal como vem.
- A limpeza dos segredos é por padrões: um segredo num formato que não se reconhece passa. Por isso o texto das perguntas fica guardado o mínimo de tempo e só a dona o lê *(experiência do projeto)*.
- Tetos no servidor: perguntas à espera por pessoa (20 na origem), tamanho de cada resposta (2000 carateres) e de cada pedido (64 KiB) *(experiência do projeto)*.

### Quem vê e quem responde

- Só quem fez a pergunta a vê e lhe responde. A pergunta de outra conta responde 404, também a um administrador: ver o espaço de outra pessoa não é mexer nele, e o 404 não confirma que a pergunta existe *(experiência do projeto)*.
- Numa sala partilhada por várias pessoas, os eventos de pergunta, resposta, instrução e notificação não saem da conta de quem os gerou *(experiência do projeto)*.
- O PC entra no portal com uma credencial de máquina só sua, que publica perguntas e lê as respostas delas, e nunca responde nem aprova. Assim, uma credencial roubada no PC não aprova nada. Com o Cloudflare Access à frente, é um service token por PC: ver [Service tokens do Cloudflare Access](../publicacao/service-tokens-do-cloudflare-access.md).
- O login de quem responde passa a ser a chave das ações no PC. Exige dois fatores, de preferência impostos pelo fornecedor de identidade ([MFA imposto pelo fornecedor de identidade](../seguranca/mfa-imposto-pelo-fornecedor-de-identidade.md)). No projeto de origem, este canal continuou protegido só pelo login, sem a assinatura do browser que protege o agente local ([Licença, emparelhamento e cofre do agente local](agente-local-licenca-e-emparelhamento.md)).

### Separada por projeto

- Um separador por projeto (o repositório da sessão), com o número de perguntas à espera, e um «Sem projeto» para sessões fora de um repositório *(experiência do projeto)*.
- O endereço diz o separador e a pergunta aberta, para um aviso abrir logo a pergunta certa e o botão de recuar do telemóvel funcionar.

### Avisos

O aviso só acorda o telemóvel: vai por Web Push sem corpo e mostra um texto fixo («Há uma pergunta à espera»). A pergunta lê-se na Caixa, depois do login, por isso o conteúdo não passa pelos serviços de push nem aparece no ecrã bloqueado. A Push API entrega a mensagem com a aplicação fechada, desde que haja um service worker ativo. O protocolo (VAPID, `TTL`, subscrições mortas, iPhone só com a aplicação no ecrã principal) está em [Avisos Web Push com VAPID, sem corpo](../design/avisos-web-push-com-vapid.md) e não se repete aqui.

Os avisos nunca são necessários: com a Caixa aberta, as perguntas aparecem na mesma pela consulta.

### O telemóvel é o ecrã principal

Quem responde à distância responde no telemóvel. Desenha-se primeiro a 390 px e prova-se lá:

- primeiro a lista do que espera resposta; tocar numa pergunta abre-a em ecrã inteiro, com «Voltar»;
- botões de resposta com 44 px no mínimo, texto legível sem zoom, sem scroll horizontal;
- o teclado não tapa o campo onde se escreve uma recusa ou uma resposta livre;
- a consulta faz-se de 3 em 3 s com trabalho em curso e de 15 em 15 s em repouso, e para com o separador escondido *(experiência do projeto)*.

Regras gerais em [Design responsivo e multi-dispositivo](../design/design-responsivo-e-multi-dispositivo.md).

### Publicar com um toque, de A a Z

«Atualizar e publicar» o repositório das skills é um só toque, nas páginas do conhecimento e das skills, onde o repositório se vê *(experiência do projeto, decisão do Cláudio de 2026-11-22)*.

- **Quem faz o trabalho.** Não se abre uma sessão nova. O trabalho vai para uma sessão já aberta que tenha o repositório, em qualquer PC da pessoa: a sessão pode estar na pasta do repositório ou numa pasta acima, com vários repositórios dentro.
- **Que sessão.** Primeiro uma que está à escuta, parada e viva, porque a escuta em fundo consultou o portal há pouco. Depois uma a trabalhar, que recebe o pedido na ação seguinte. Uma parada sem escuta pode já não existir, por isso não conta. Uma com perguntas por responder fica para o fim.
- **Pô-la a ouvir.** Se a sessão não estava ao serviço, o portal põe-na. A escuta em fundo corre em todas as sessões, mas, fora de serviço, consulta o portal de minuto a minuto e não pega no trabalho.
- **Onde se vê.** O browser abre a interação nessa sessão, a trabalhar.
- **Sem nenhuma sessão,** diz para abrir o Claude Code numa pasta com o repositório, num PC com o agente.
- **O pedido vai de A a Z e sem perguntas pelo caminho.** Entra na pasta do repositório e traz o que há de novo. Segue o procedimento de publicação do próprio repositório e corrige o que falhar. Faz commit do que está pronto, faz push e acompanha o CI e o deploy até ao fim. Só pára numa falha que não consegue resolver, e diz qual.
- **Sem confirmação no browser.** Carregar no botão é a autorização: uma confirmação a seguir não acrescenta segurança, só um passo.

### O que verificar

- «Atualizar e publicar» com uma sessão do repositório à escuta: o pedido chega a essa sessão e o browser abre-a. Sem nenhuma, aparece o aviso para abrir uma.
- Uma pergunta e uma permissão respondidas no portal: o diálogo local fecha e a sessão segue com a resposta.
- As mesmas respondidas no computador: saem da Caixa em poucos segundos.
- A sessão fechada a meio da espera: a pergunta sai da Caixa.
- Modo remoto desligado e portal em baixo: fica só o diálogo local, sem atraso visível.
- Uma pergunta só aparece uma vez.
- Duas contas de teste: a pergunta de uma não aparece nem conta na Caixa da outra, e pedi-la dá 404.
- Um aviso recebido num telemóvel real com o ecrã bloqueado, sem texto da pergunta.
- Capturas da Caixa a 390 px, em claro e escuro, abertas uma a uma.

### Por reconfirmar na fonte

- O `PermissionRequest` a disparar para o `AskUserQuestion` e o diálogo local aberto ao mesmo tempo que o hook corre: vistos com o Claude Code 2.1.325. A referência lida hoje diz que o `AskUserQuestion` precisa de `updatedInput` com `allow`, mas não descreve o diálogo e o hook em paralelo numa sessão interativa (só fala de quem decide primeiro com `--permission-prompt-tool` ou com o `canUseTool` do Agent SDK).
- Responder no computador não termina o hook: visto com o Claude Code 2.1.325.
- Não há teto documentado para o `timeout` de um hook.

**Para uma skill:** perguntas e permissões vão ao portal por um só hook `PermissionRequest` síncrono, que espera sem prazo enquanto o diálogo local está aberto, devolve `allow` ou `deny` (e, numa pergunta, `updatedInput` com `answers`), retira a pergunta quando a resposta vem do computador e sai sem decisão com o modo remoto desligado ou o portal calado; a Caixa separa por projeto, avisa por Web Push sem corpo, mostra cada pergunta só a quem a fez e prova-se a 390 px e num telemóvel real.

## Ver também

- [Eventos das sessões e origem das skills](eventos-e-origem-das-skills.md) (Portais e mundos de agentes)
- [Licença, emparelhamento e cofre do agente local](agente-local-licenca-e-emparelhamento.md) (Portais e mundos de agentes)
- [Avisos Web Push com VAPID, sem corpo](../design/avisos-web-push-com-vapid.md) (Design e experiência de utilizador)
- [Service tokens do Cloudflare Access](../publicacao/service-tokens-do-cloudflare-access.md) (Publicação e alojamento web)
- [MFA imposto pelo fornecedor de identidade, não pela aplicação](../seguranca/mfa-imposto-pelo-fornecedor-de-identidade.md) (Segurança)
- [Design responsivo e multi-dispositivo](../design/design-responsivo-e-multi-dispositivo.md) (Design e experiência de utilizador)

## Fontes oficiais

*Lidas a 2026-11-18.*

- [Claude Code: referência de hooks](https://code.claude.com/docs/en/hooks): `PermissionRequest` e a sua decisão (`behavior`, `updatedInput`, `message`), `answers` do `AskUserQuestion`, regras de recusa que continuam a valer, `async` sem decisões, `timeout` de 600 s por omissão
- [Claude Code: sessões](https://code.claude.com/docs/en/sessions): o formato da transcrição é interno e muda entre versões
- [MDN: Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API): mensagens recebidas com a aplicação fechada, com um service worker ativo
- [RFC 8292 (VAPID)](https://www.rfc-editor.org/rfc/rfc8292): JWT `ES256` com `exp` até 24 horas; o serviço recusa mensagens sem token válido
- [RFC 8030 (Web Push)](https://www.rfc-editor.org/rfc/rfc8030): `TTL` obrigatório; 201 quer dizer aceite, não entregue
- [Cloudflare Access: service tokens](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/): credencial de um programa, regra «Service Auth», revogação apagando o token

## Histórico

- **2026-11-22**: acrescentada a secção «Publicar com um toque, de A a Z», e uma linha em «O que verificar». O texto que já lá estava não mudou. Antes, o botão estava na interação de cada projeto, abria sempre uma sessão nova e pedia confirmação. O Cláudio pediu-o no conhecimento e nas skills, numa sessão já aberta e de A a Z. Experiência do projeto. Editado a 2026-11-22.

Fonte: experiência do projeto de origem e as fontes acima. Não vem do PDF.
