---
id: portais-de-agentes/espaco-por-pessoa-e-projeto-por-repositorio
titulo: "Um espaço por pessoa, um projeto por repositório"
seccao: "Portais e mundos de agentes"
paginas: []
fonte: "https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/"
data_lancamento: null
confianca: alta
verificado_em: 2026-11-18
---

# Um espaço por pessoa, um projeto por repositório

**Resumo:** A pessoa é a identidade que o fornecedor de acesso já valida e cada PC entra com um token próprio; o projeto é o repositório git, identificado pelo endereço do `origin` normalizado ou, sem ele, pelo primeiro commit, e nunca pela pasta; só aparecem sessões em repositórios que a pessoa adicionou, e quem adicionou o mesmo repositório partilha a sala, com perguntas, permissões e instruções sempre privadas.

## Conteúdo

Origem: o projeto de origem passou de uma sala única, alimentada por um PC, a um espaço por pessoa com um projeto por repositório, e depois a salas partilhadas *(experiência do projeto)*. O que se diz do Cloudflare Access, do git e dos hooks do Claude Code vem das fontes oficiais em baixo, lidas a 2026-11-18.

### A pessoa

- A conta é a identidade que o fornecedor de acesso entrega. No Cloudflare Access, o token que chega ao servidor (cabeçalho `Cf-Access-Jwt-Assertion`) traz `email`, descrito como o endereço do utilizador autenticado, verificado pelo fornecedor de identidade. O servidor valida a assinatura com as chaves públicas da equipa, o `aud` da aplicação, o `iss` e a validade, e só depois usa o email.
- Não há tabela de contas própria. Duplicava a identidade que o fornecedor já guarda e podia divergir dela *(experiência do projeto)*.
- Quem entra decide-o a política do fornecedor (no Access, uma regra Allow com o seletor Emails). Depois o servidor compara o email com os papéis que conhece: administrador e equipa.
- O que a pessoa escolhe mostrar aos outros (um nome, uma cor) guarda-se no portal, à parte da identidade. Para os colegas, a pessoa é um identificador opaco, um hash do email com um prefixo fixo, e o email de um colega nunca chega ao browser de outro *(experiência do projeto)*.

### O PC

- Um token de serviço por PC, e nunca um para a equipa toda. O PC manda `CF-Access-Client-Id` e `CF-Access-Client-Secret`, a aplicação aceita-o numa regra Service Auth, e o token que chega ao servidor traz em `common_name` o Client ID e em `sub` um texto vazio. O servidor associa cada Client ID a uma conta, e o que esse PC publica fica nessa conta.
- Cada token revoga-se sozinho: perder um PC não mexe nos outros.
- Recusado no projeto de origem: um token para toda a equipa, com a conta mandada pelo hook. Qualquer PC podia publicar em nome de outra pessoa.
- O papel de PC só entra nas rotas do PC, e as rotas das pessoas nunca aceitam o token de um PC.

### O projeto é o repositório git

Pastas com o mesmo nome (`api`, `site`) são repositórios diferentes, e dois clones ou duas worktrees do mesmo repositório estão em pastas diferentes. Por isso o projeto nunca é a pasta. Uma pasta que não é repositório git não tem projeto.

Como o hook chega ao identificador:

1. Recebe `cwd` na entrada, como todos os hooks, e sobe as pastas até encontrar `.git`. Numa worktree ligada, `.git` é um ficheiro que aponta para a pasta privada dessa worktree; o ficheiro de configuração do repositório é, por omissão, partilhado por todas as worktrees.
2. Lê o endereço do remoto `origin`, com `git remote get-url origin` (que já aplica as regras `insteadOf`) ou na variável `remote.origin.url` da configuração.
3. Normaliza. O git aceita o mesmo repositório em várias formas: `https://anfitriao/dono/nome.git`, `ssh://git@anfitriao/dono/nome` e a forma curta `git@anfitriao:dono/nome.git`. Tira-se o esquema, o utilizador, as credenciais e o `.git` final, e o anfitrião passa a minúsculas; fica `anfitriao/dono/nome`. Passar também o caminho a minúsculas é uma decisão por alojamento (só se ele não distinguir maiúsculas); o projeto de origem passa tudo.
4. Sem `origin`, o identificador é `commit:` seguido do primeiro commit, que `git rev-list --max-parents=0 HEAD` devolve. A documentação fala em «todas as raízes»: um repositório pode ter mais de uma, e por isso fixa-se uma regra (a menor por ordem alfabética, por exemplo).
5. Só o identificador sai do PC. O endereço completo pode trazer credenciais (`https://utilizador:token@anfitriao/…`).

Três cuidados:

- `origin` é só o nome que o `git clone` dá ao remoto por omissão (muda com `--origin` ou `clone.defaultRemoteName`). Decide o que fazer quando o remoto tem outro nome. O projeto de origem usa só `origin` e, sem ele, o primeiro commit.
- Ler a configuração diretamente evita lançar o git em cada evento e deixa o hook rápido, que foi o que o projeto de origem fez. Em troca, as worktrees e as regras `insteadOf` tratam-se à mão.
- O identificador muda quando o repositório muda de nome ou ganha um `origin`. O portal tem de saber passar a sala, as sessões e as notas para o identificador novo. No projeto de origem isto apareceu ao mudar o nome do repositório a partir do portal.

### Só aparece o que a pessoa adicionou

- Um projeto entra no espaço da pessoa quando ela o adiciona. As sessões num repositório por adicionar não aparecem em nenhuma sala; ficam numa lista de candidatos que só a própria pessoa vê, de onde se adicionam com um toque.
- As sessões fora de repositórios git não aparecem em lado nenhum.
- Arquivar tira o projeto do espaço e guarda o histórico e as notas.
- Porquê *(experiência do projeto)*: sem isto, qualquer pasta onde se abre uma sessão virava sala, e o administrador passava a ver o que a pessoa não decidiu mostrar.
- Se uma pessoa precisar de separar trabalho, vida pessoal e clientes, dá-lhe vários espaços com nome, e escolhe-se em qual fica cada projeto.

### Cada pedido lê pela conta de quem pede

- Sessões, eventos, perguntas, projetos e notas leem-se pela conta de quem pede ([Autorização no servidor, negar por omissão](../seguranca/autorizacao-no-servidor.md)).
- Se o administrador puder ver o espaço de outra pessoa, isso é um pedido explícito (por exemplo `?conta=`) que a equipa não consegue fazer. A equipa sabe que o administrador vê o seu trabalho antes de instalar os hooks.
- Escrever é só no que é da própria conta. O que é de outra conta responde 404, também ao administrador: ver o espaço de outra pessoa não é mexer nele, e um 404 não confirma a quem pergunta que o recurso existe.

### Salas partilhadas por repositório

- Quando duas contas adicionaram o mesmo repositório e nenhuma o arquivou, cada uma vê na sala dele o trabalho da outra. O consentimento é implícito: adicionar um repositório é aceitar que os colegas que também o adicionaram vejam o que lá se faz. Quem não o adicionou não aparece na sala de ninguém, e quem o arquiva deixa de ver e de ser visto.
- Partilha-se o que se veria a passar no corredor: as sessões (nome, estado, atividade), as skills chamadas e de onde vêm, os subagentes, as paragens e as notas do projeto, com a pessoa.
- Fica privado: as perguntas e as permissões, as mensagens às sessões, as instruções e o rasto delas, a pasta onde corre a sessão do colega e se ela está à escuta. A caixa de perguntas só mostra as sessões da própria conta.
- Cada skill tem um boneco por pessoa que a usou ([Papéis e aspeto dos agentes na cena](papeis-e-aspeto-dos-agentes.md)).
- A regra da partilha fica escrita onde a equipa a vê antes de adicionar um repositório (no projeto de origem, no rodapé da administração).

### O que verificar

- Uma conta nunca lê os dados de outra; o que é de outra conta responde 404 a quem tenta escrever, também ao administrador.
- Dois clones, uma worktree e uma subpasta do mesmo repositório caem no mesmo projeto. O mesmo repositório por `https` e por `ssh` dá o mesmo identificador. Duas pastas com o mesmo nome e repositórios diferentes ficam separadas.
- Um endereço com credenciais nunca sai do PC: o teste olha para o que o hook envia.
- Uma sessão num repositório por adicionar não aparece em nenhuma sala, só na lista de candidatos da própria pessoa.
- Duas contas com o mesmo repositório veem as duas sessões; uma terceira, sem ele, não vê nada; a pergunta de uma não aparece à outra.

**Para uma skill:** usa como conta a identidade validada pelo fornecedor de acesso e um token de serviço por PC, associado a essa conta; identifica o projeto pelo `origin` normalizado (ou pelo primeiro commit), nunca pela pasta, e deixa só o identificador sair do PC; mostra só os repositórios que a pessoa adicionou; partilha por repositório só o que não é pergunta, permissão, mensagem ou instrução, e responde 404 a quem tenta escrever no que é de outra conta.

## Ver também

- [Perguntas antes de construir um portal de agentes](perguntas-antes-de-construir.md) (Portais e mundos de agentes)
- [Quando compensa um portal de agentes e como se monta](portal-de-agentes-quando-e-como.md) (Portais e mundos de agentes)
- [Papéis e aspeto dos agentes na cena](papeis-e-aspeto-dos-agentes.md) (Portais e mundos de agentes)
- [Eventos das sessões e origem das skills](eventos-e-origem-das-skills.md) (Portais e mundos de agentes)
- [Responder às sessões à distância](caixa-de-perguntas-a-distancia.md) (Portais e mundos de agentes)
- [Licença, emparelhamento e cofre do agente local](agente-local-licenca-e-emparelhamento.md) (Portais e mundos de agentes)
- [Service tokens do Cloudflare Access (um programa a entrar numa aplicação protegida)](../publicacao/service-tokens-do-cloudflare-access.md) (Publicação e alojamento web)
- [Acesso restrito à área de administração](../publicacao/acesso-restrito-a-area-de-administracao.md) (Publicação e alojamento web)
- [Autorização no servidor, negar por omissão](../seguranca/autorizacao-no-servidor.md) (Segurança)
- [Minimização e retenção](../privacidade/minimizacao-e-retencao.md) (Privacidade e conformidade)
- [Multi-inquilino (modelos de tenancy)](../produto/multi-inquilino.md) (Modularização e produtização)

## Fontes oficiais

*Lidas a 2026-11-18.*

- [Cloudflare One: token da aplicação](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/): `email` verificado pelo fornecedor de identidade; num token de serviço, `common_name` com o Client ID e `sub` vazio
- [Cloudflare One: validar o JWT](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/): cabeçalho `Cf-Access-Jwt-Assertion`, chaves públicas da equipa, `aud`, `iss` e validade
- [Cloudflare One: service tokens](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/): `CF-Access-Client-Id` e `CF-Access-Client-Secret`, regra Service Auth, revogação de um token sozinho
- [Cloudflare One: políticas do Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/): ações Allow e Service Auth, seletores Emails e Service Token
- [Git: git-clone](https://git-scm.com/docs/git-clone): `origin` como nome por omissão (`--origin`, `clone.defaultRemoteName`), `remote.origin.url`, formas de endereço aceites
- [Git: git-remote](https://git-scm.com/docs/git-remote): `get-url`, com as regras `insteadOf` aplicadas
- [Git: git-worktree](https://git-scm.com/docs/git-worktree): configuração partilhada pelas worktrees; `.git` como ficheiro numa worktree ligada
- [Git: git-rev-list](https://git-scm.com/docs/git-rev-list): `--max-parents=0` devolve todas as raízes
- [Claude Code: referência de hooks](https://code.claude.com/docs/en/hooks): `cwd` na entrada de todos os hooks

Fonte: experiência do projeto de origem e as fontes acima. Não vem do PDF.
