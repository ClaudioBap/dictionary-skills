---
id: portais-de-agentes/agente-local-licenca-e-emparelhamento
titulo: "Licença, emparelhamento e cofre do agente local"
seccao: "Portais e mundos de agentes"
paginas: []
fonte: "https://code.claude.com/docs/en/legal-and-compliance"
data_lancamento: null
confianca: media
verificado_em: 2026-11-18
---

# Licença, emparelhamento e cofre do agente local

**Resumo:** Para conduzir o Claude Code a partir de um portal, um agente em cada PC corre o binário `claude` oficial, sem o modificar, como subprocesso e com o login que a própria pessoa fez; nunca toca nas credenciais do Claude, só faz ligações de saída, só executa pedidos assinados por um browser emparelhado com um código mostrado no PC, guarda as chaves num cofre cifrado pelo sistema (DPAPI no Windows) e só trabalha nas pastas autorizadas no próprio PC. O telemóvel faz tudo menos instalar.

## Conteúdo

Origem: o projeto de origem, um portal que manda trabalhar o PC de cada pessoa da equipa a partir do browser e do telemóvel. O agente, o emparelhamento, os pedidos assinados, o cofre e as verificações foram construídos e postos à prova a 2026-11-17; abrir sessões e o modo de permissões ficaram desenhados e por construir. O que vem só dessa experiência está marcado *(experiência do projeto)*; o resto foi confirmado nas fontes oficiais lidas a 2026-11-18.

### A licença vem antes do código

O que a página de condições do Claude Code diz hoje, em «Authentication and credential use»:

- O login com a conta (OAuth) é para quem tem uma subscrição e serve o uso normal do Claude Code e das aplicações da Anthropic.
- Quem desenvolve produtos ou serviços, também com o Agent SDK, usa chaves de API. A Anthropic não deixa terceiros oferecer o login claude.ai nas suas aplicações nem encaminhar pedidos pelas credenciais de planos Free, Pro, Max ou Ultra em nome dos seus utilizadores; e quem desenvolve não pode recolher, guardar nem intermediar credenciais ou tokens de sessão do claude.ai. O login faz-se sempre pelo fluxo da própria Anthropic.
- Nada disto impede uma pessoa de entrar com a sua subscrição no binário do Claude Code sem modificações.
- A página do Agent SDK acrescenta: sem aprovação prévia, terceiros não podem oferecer o login claude.ai nem os limites de uso do claude.ai nos seus produtos, incluindo agentes feitos com o Agent SDK.
- A Anthropic reserva-se o direito de fazer cumprir estas regras sem aviso.

As regras que o código do agente tem de cumprir para ficar do lado permitido:

1. **Correr o `claude` tal como está instalado**, sem o modificar, como subprocesso, com o login que a pessoa fez no seu PC.
2. **Nunca ler, guardar nem enviar credenciais do Claude.** No Windows o login fica em `%USERPROFILE%\.claude\.credentials.json`; o agente nunca abre esse ficheiro. Para saber se há login usa `claude auth status`, que devolve JSON e sai com 0 com login e com 1 sem ele, e lê só `loggedIn` e `authMethod`. O resto da saída traz o email e não se guarda.
3. **Não usar o Agent SDK com credenciais de subscrição.**
4. **Tirar `ANTHROPIC_API_KEY` do ambiente** de tudo o que o agente lança. Numa corrida `-p`, a chave é sempre usada quando existe, e ganha ao login da subscrição: a sessão passava a faturar à API sem ninguém dar por isso. `ANTHROPIC_AUTH_TOKEN`, um `apiKeyHelper` e `CLAUDE_CODE_OAUTH_TOKEN` também ganham ao login; o projeto de origem só tirava a primeira e apanhava as outras pelo `authMethod` *(experiência do projeto)*.

Os três caminhos, para o dono escolher antes de construir:

| Caminho | O que é | Custo | Risco |
|---|---|---|---|
| A. Agente local com a subscrição de cada pessoa | O desta entrada: o agente conduz o `claude` oficial no PC de cada pessoa, com o login dela | Nada além das subscrições | Depende da leitura de «intermediar» (abaixo). Se a da Anthropic for outra, a conta pode ser limitada |
| B. Chave de API | O mesmo agente, mas as sessões lançadas pelo portal usam uma chave de API da organização | Paga-se por utilização, à parte das subscrições | Sem dúvida de licença: é o caminho que a página indica a quem desenvolve |
| C. Remote Control oficial | O chat e as sessões fazem-se em claude.ai/code ou na aplicação Claude, ligados à sessão que corre no PC. O portal fica com o resto (eventos, Caixa, notas), porque os hooks correm na mesma | Nada além das subscrições (Pro, Max, Ultra, Team ou Enterprise; chaves de API não servem) | Sem dúvida de licença. O chat fica fora do portal |

O Remote Control é a referência para o desenho de A: a sessão corre no PC, que só faz pedidos HTTPS de saída, nunca abre portas, regista-se na API da Anthropic e consulta-a à espera de trabalho.

No projeto de origem, o dono escolheu o caminho A e registou o risco *(experiência do projeto)*.

**Ponto em aberto: «intermediar».** A página usa a palavra em dois sítios: quem desenvolve não pode «collect, store, or intermediate Claude.ai credentials or session tokens», e quem oferece o Claude Code num produto não pode «pay for, resell, or intermediate Claude usage on their end users' behalf». No caminho A, o portal não toca em credenciais: entrega à sessão de cada pessoa, no PC dela e com o login dela, os pedidos que ela própria fez. Se isto conta como intermediar o uso, a página não o diz. Quem decide essa leitura é a Anthropic, e a página manda as dúvidas sobre métodos de autenticação para o contacto comercial. Até haver resposta, o risco fica escrito e a decisão é do dono.

### Só ligações de saída

- O agente não abre portas. Dá sinal ao portal de minuto a minuto e espera pelo trabalho com um pedido que fica aberto até 25 s: o trabalho chega em menos de 2 s, com cerca de 3500 pedidos por máquina e por dia, mais 1440 sinais *(experiência do projeto)*.
- Fala com o portal com a credencial de máquina da conta da pessoa, só por https, sem seguir desvios. O segredo dessa credencial nunca viaja por http.
- O sinal leva o nome que a pessoa deu à máquina, a versão, o resultado das verificações, quantas pastas estão autorizadas e os browsers em que o agente confia (impressão e nome). Nunca emails, tokens, caminhos nem o nome de utilizador do sistema.
- No Windows arranca com uma tarefa agendada ao entrar, na sessão da pessoa: é aí que o cofre abre e que estão o `PATH` e os logins do `gh` e do `claude`. Uma tarefa que corre sem sessão iniciada não abria o cofre *(experiência do projeto)*, o que bate com a documentação: o DPAPI guarda as chaves no perfil do utilizador e falha com o perfil por carregar.

### Emparelhar um browser

1. O browser gera um par ECDSA P-256 com `extractable: false` e guarda-o no IndexedDB. Num par de chaves, `extractable` decide sobre a chave privada; a pública exporta-se sempre. Exportar uma chave não exportável dá `InvalidAccessError`. Um `CryptoKey` guarda-se no IndexedDB sem expor o material da chave ao JavaScript.
2. No PC, o agente mostra um código de 16 carateres em base 32 sem letras ambíguas (80 bits), que vale 10 minutos e uma vez. O código só existe na memória desse processo: fechar o terminal anula-o.
3. A pessoa escreve-o no portal. O browser calcula `HMAC-SHA256(código, rótulo + conta + máquina + chave pública)` e manda ao portal a chave pública, o nome do browser e essa prova. O código não sai do browser.
4. O agente vai buscar o pedido, confere que a impressão é o SHA-256 da chave e que a chave é um ponto da curva, refaz a prova com o seu código e compara em tempo constante. Igual: guarda a chave no cofre, diz ao portal que aceitou, e o código deixa de valer. Ao fim de 10 provas erradas anula o código e avisa no PC que alguém com acesso à conta está a tentar.
5. O PC e o browser mostram a mesma impressão curta (seis bytes em hexadecimal), para a pessoa conferir.

Cada browser emparelha-se à parte, o do telemóvel incluído. No telemóvel, um QR no ecrã do PC leva o código no fragmento do endereço (depois de `#`), que o browser não manda ao servidor; a página tira-o do histórico assim que o lê *(experiência do projeto)*.

Porquê 80 bits e não seis algarismos: um portal comprometido vê a prova e pode tentar todos os códigos. Com 80 bits a força bruta não acaba nos 10 minutos, mesmo com muitas placas gráficas; um código curto precisava de uma função lenta e era pior de escrever no telemóvel *(estimativa do projeto)*.

### Pedidos assinados, verificados pelo agente

- Um pedido é o JSON canónico (chaves por ordem, sem espaços) de `{ conta, maquina, tipo, conteudo, nonce, instante }`, assinado pelo browser com ECDSA P-256 e SHA-256.
- O portal confere a forma, a conta e a máquina, guarda o texto tal como veio e entrega-o uma vez. Não verifica a assinatura: quem decide é o agente, e assim os pedidos recusados também chegam ao registo local.
- O agente decide por esta ordem: a assinatura tem 64 bytes; a chave está no cofre; a assinatura confere sobre os bytes recebidos; o texto é o canónico e tem só os seis campos; a máquina é esta; a conta é a da chave; o instante está entre 5 minutos para trás e 2 para a frente; o `nonce` nunca foi aceite. Só depois guarda o `nonce`, para um pedido mal assinado nunca gastar um. Os `nonce` lembram-se o tempo da janela.
- Cada pedido aceite ou recusado, e cada emparelhamento, fica numa linha do registo local, com o motivo e sem o conteúdo, rodado por tamanho.
- Só se executam tipos conhecidos; o resto é recusado. Desemparelhar faz-se no PC ou a partir de outro browser emparelhado, com um pedido assinado.

| Ameaça | O que a trava | O que fica por travar |
|---|---|---|
| Login do portal roubado | Sem o código do PC, a prova não confere; com a chave do browser do atacante, «chave desconhecida»; um pedido apanhado e repetido dá «nonce repetido» ou «fora de tempo» | Tudo o que ainda chega às sessões por outro canal sem assinatura. Na origem, as respostas da Caixa iam pelos hooks e estavam protegidas só pelo login |
| Portal comprometido | Pedido inventado ou alterado: a assinatura não confere. Repetido: `nonce`. Atrasado: a janela. Trocar a chave a meio de um emparelhamento: precisa do código de 80 bits em 10 minutos | JavaScript alterado servido pelo portal assina o que quiser com a chave do browser enquanto a página está aberta (a chave não se exporta, mas usa-se); um instalador alterado. Valem os tipos aceites, as pastas autorizadas e o registo local |
| PC perdido | O cofre só abre na sessão dessa pessoa nesse PC; revoga-se a credencial de máquina no portal | As credenciais de git e SSH que estavam no PC trocam-se, como em qualquer PC perdido |
| Browser perdido | Desemparelhar no PC ou noutro browser: o pedido seguinte dele dá «chave desconhecida» | Fechar também a sessão do login no aparelho perdido |
| Rede local | O agente não abre portas; tudo por https, e o segredo da credencial de máquina nunca viaja por http | Nenhum conhecido |

### O cofre

- Um ficheiro cifrado com o DPAPI no âmbito do utilizador (`DataProtectionScope.CurrentUser`), com entropia própria. Em regra, só quem tem as mesmas credenciais de login decifra, e no mesmo computador; um perfil itinerante é a exceção que a documentação aponta.
- Nunca no âmbito da máquina (`CRYPTPROTECT_LOCAL_MACHINE`): qualquer utilizador desse computador decifrava.
- A entropia tem de ser a mesma para decifrar: outro programa do mesmo utilizador que chame o DPAPI sem ela não abre o cofre.
- O DPAPI chama-se pelo PowerShell (`ProtectedData`, do .NET), sem dependências. O texto passa pelo stdin e pelo stdout, nunca pela linha de comandos, que outros processos conseguem ler *(experiência do projeto)*.
- `ProtectedData` só existe no Windows; noutros sistemas lança `PlatformNotSupportedException`. Fora do Windows, o agente recusa guardar segredos, diz porquê e não emparelha. O equivalente noutros sistemas fica por fazer.
- Guarda as chaves públicas dos browsers emparelhados e a conta de cada uma; depois, as credenciais de SSH e de VM. O portal só conhece nomes («VM de testes»), nunca os segredos.
- Cada chamada ao DPAPI pelo PowerShell custou cerca de meio segundo, por isso o cofre fica em memória enquanto o ficheiro não muda *(experiência do projeto)*. Pelo mesmo custo, a credencial de máquina que os hooks leem em cada chamada ficou num ficheiro em claro na pasta do utilizador: é um compromisso conhecido, e deve ficar escrito.

Regras gerais em [Segredos num cofre, fora do código e do disco](../seguranca/segredos-num-cofre.md).

### Pastas autorizadas

- A lista vive só no PC e muda-se no PC, nunca a partir do portal. O portal só sabe quantas são.
- O agente recusa qualquer pedido fora delas. Compara caminhos verdadeiros: resolve `..`, segue atalhos (um atalho dentro da pasta que aponta para fora fica fora), trata outro disco como fora e, no Windows, ignora maiúsculas e iguala nomes curtos e compridos da mesma pasta *(experiência do projeto)*.

### Verificações antes de libertar as ferramentas

- Git: `git --version` e `gh auth status --json hosts`, contando as contas com `state` igual a `success`. Com `--json`, o `gh` sai sempre com 0, por isso não se lê o código de saída.
- Claude Code: `claude --version` e `claude auth status`, só `loggedIn` e `authMethod`. O `authMethod` é um de `none`, `claude.ai`, `oauth_token`, `api_key`, `api_key_helper` ou `third_party`; com os três últimos, a verificação passa com um aviso: as sessões faturam à parte da subscrição.
- Os comandos correm sem `ANTHROPIC_API_KEY` e com argumentos fixos, nunca vindos de fora.
- Enquanto este browser não estiver emparelhado com uma máquina cujas verificações passam, as ferramentas que mandam trabalho ficam inativas, com uma frase que leva ao ecrã de entrada. Ver e responder continua livre. No projeto de origem o bloqueio era só da interface; o servidor também o deve exigir.

### Sessões e modo de permissões (desenho)

Desenhado no projeto de origem e por construir quando esta entrada foi escrita. O que a documentação confirma:

- A primeira mensagem abre `claude -p` numa pasta autorizada; as seguintes continuam com `--resume <id>`. As sessões abertas com `-p` não aparecem na lista do `/resume` nem no `--continue`, mas retomam-se pelo id. Com `--output-format stream-json` a saída chega mensagem a mensagem, e com `--include-partial-messages` chega também o texto a meio.
- `--permission-mode` aceita `default` (com o nome `manual`), `acceptEdits`, `plan`, `auto`, `dontAsk` e `bypassPermissions`.
- Automático (`auto`): um segundo modelo, o classificador, revê cada ação antes de correr e trava o que vai além do pedido, o que mexe em infraestrutura que não reconhece ou o que parece vir de conteúdo hostil que o Claude leu. Diminui as perguntas e não garante segurança.
- Manual numa corrida `-p` (Claude Code 2.1.302 ou mais recente): o que precisa de aprovação é recusado, a não ser que uma regra de permissão, um hook, o `canUseTool` ou `--permission-prompt-tool` o aprove. O modo manual a partir do portal precisa do hook que leva a permissão ao telemóvel ([Responder às sessões à distância](caixa-de-perguntas-a-distancia.md)); sem ele, tudo o que pede aprovação é recusado.
- `auto` e `bypassPermissions` em `permissions.defaultMode` não valem nas definições do projeto nem nas locais: o agente passa `--permission-mode` em cada corrida.

### O telemóvel faz tudo menos instalar

- No telemóvel: entrar, emparelhar, abrir uma sessão, conversar, responder a perguntas e permissões, receber avisos e ver as notas.
- Só no PC: instalar o agente, gerir o cofre e as pastas autorizadas.
- O PC (ou a VM) tem de estar ligado e com o agente a correr: o telemóvel não corre sessões, manda trabalhar a máquina onde está a pasta. O portal mostra, por máquina, há quanto tempo deu sinal.

### O instalador

- Um só ficheiro de texto, legível, servido pelo próprio portal atrás do login. O portal e o instalador mostram o SHA-256; para fechar o risco de um portal comprometido servir outro, o SHA-256 de cada versão publica-se noutro canal e quem instala confere *(experiência do projeto)*.
- Escreve os ficheiros numa pasta estável do utilizador, fora de qualquer repositório, regista os hooks a partir de lá (tira os de uma instalação antiga sem os deixar a dobrar e não mexe nos de outras ferramentas), guarda uma cópia do `settings.json` antes de escrever e cria a tarefa de arranque. Correr outra vez atualiza; desinstalar tira tudo. Nunca pede nem lê credenciais do Claude.
- Ver [Cadeia de fornecimento verificada](../seguranca/cadeia-de-fornecimento-verificada.md).

### O que verificar

- Os casos de recusa, cada um registado com o motivo: sem assinatura, chave desconhecida, assinatura inválida, `nonce` repetido, fora de tempo.
- Dez provas erradas anulam o código; um browser desemparelhado deixa de ser aceite no pedido seguinte.
- O ficheiro do cofre não tem nada em claro e não abre estragado.
- O instalador numa pasta pessoal temporária deixa o `settings.json` e a configuração verdadeiros iguais byte a byte.
- Nenhum ficheiro de credenciais do Claude é aberto, nenhum módulo do Agent SDK é importado, e o ambiente dos processos lançados não tem `ANTHROPIC_API_KEY`.
- Num telemóvel real: emparelhar e mandar um pedido que o agente aceita.

### Por reconfirmar na fonte

- A leitura de «intermediar» (ponto em aberto acima): só a Anthropic a pode dar.
- A assinatura ECDSA do WebCrypto com 64 bytes (`r` e `s` seguidos), verificada no Node com `dsaEncoding: "ieee-p1363"`, e o par P-256 não exportável a funcionar em todos os browsers, incluindo o Safari do iPhone: vistos no projeto de origem, não lidos hoje.
- O fragmento do endereço (depois de `#`) não ir ao servidor: não lido hoje.
- O custo de meio segundo por chamada ao DPAPI pelo PowerShell e a tarefa sem sessão iniciada que não abre o cofre: medidos no projeto de origem.

**Para uma skill:** um agente local que conduz o Claude Code a partir de um portal corre o `claude` oficial sem modificações, com o login da pessoa, sem ler credenciais, sem Agent SDK e sem `ANTHROPIC_API_KEY` no ambiente, depois de o dono escolher entre subscrição, chave de API e Remote Control com o risco escrito; só faz ligações de saída, só executa pedidos assinados por um browser emparelhado com um código mostrado no PC e verificados pelo próprio agente, guarda as chaves num cofre do sistema no âmbito do utilizador e recusa tudo fora das pastas autorizadas no PC; a prova são os casos de recusa registados e um emparelhamento num telemóvel real.

## Ver também

- [Quando compensa um portal de agentes e como se monta](portal-de-agentes-quando-e-como.md) (Portais e mundos de agentes)
- [Responder às sessões à distância](caixa-de-perguntas-a-distancia.md) (Portais e mundos de agentes)
- [Claude Code e Claude Agent SDK](../ia/claude-code-e-claude-agent-sdk.md) (Construir com IA)
- [Acesso por identidade, sem portas abertas](../acesso-remoto/acesso-por-identidade-sem-portas-abertas.md) (Acesso remoto (SSH e RDP))
- [Segredos num cofre, fora do código e do disco](../seguranca/segredos-num-cofre.md) (Segurança)
- [Cadeia de fornecimento verificada](../seguranca/cadeia-de-fornecimento-verificada.md) (Segurança)

## Fontes oficiais

*Lidas a 2026-11-18.*

- [Claude Code: legal and compliance](https://code.claude.com/docs/en/legal-and-compliance): «Authentication and credential use», binário sem modificações, proibição de intermediar credenciais e uso
- [Claude Agent SDK: overview](https://code.claude.com/docs/en/agent-sdk/overview): sem aprovação prévia, nada de login claude.ai nem limites da subscrição em produtos de terceiros
- [Claude Code: authentication](https://code.claude.com/docs/en/authentication): ordem das credenciais, `ANTHROPIC_API_KEY` sempre usada em `-p`, onde fica o login no Windows
- [Claude Code: CLI reference](https://code.claude.com/docs/en/cli-reference): `claude auth status` (JSON, saída 0 ou 1, valores de `authMethod`), `-p`, `--resume`, `--output-format`, `--permission-mode`
- [Claude Code: Remote Control](https://code.claude.com/docs/en/remote-control): sessão local, só HTTPS de saída, sem portas abertas, só subscrições
- [Claude Code: permission modes](https://code.claude.com/docs/en/permission-modes): Manual e `auto`, o classificador, o que acontece em `-p`
- [Claude Code: definições](https://code.claude.com/docs/en/settings): `auto` e `bypassPermissions` em `defaultMode` não valem nas definições do projeto
- [Claude Code: sessões](https://code.claude.com/docs/en/sessions): sessões de `-p` fora da lista, retomadas pelo id
- [MDN: SubtleCrypto.generateKey()](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey): `extractable` decide sobre a chave privada; a pública exporta-se sempre
- [MDN: SubtleCrypto.exportKey()](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey): `InvalidAccessError` ao exportar uma chave não exportável
- [MDN: SubtleCrypto, «Storing keys»](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto): `CryptoKey` guardado no IndexedDB sem expor o material
- [Microsoft Learn: CryptProtectData](https://learn.microsoft.com/en-us/windows/win32/api/dpapi/nf-dpapi-cryptprotectdata): quem decifra, entropia, `CRYPTPROTECT_LOCAL_MACHINE`
- [Microsoft Learn: ProtectedData](https://learn.microsoft.com/en-us/dotnet/api/system.security.cryptography.protecteddata): DPAPI no .NET, só Windows, perfil carregado
- [GitHub CLI: gh auth status](https://cli.github.com/manual/gh_auth_status): `--json hosts` e saída sempre 0 com `--json`

Fonte: experiência do projeto de origem e as fontes acima. Não vem do PDF.
