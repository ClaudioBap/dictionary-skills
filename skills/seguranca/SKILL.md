---
name: seguranca
description: Mini skill para auditar ou proteger um site ou aplicação. Em modo auditoria corre o verificador de publicação, percorre os critérios da base de conhecimento como lista de verificação e devolve as falhas por ordem de risco, cada uma com a correção e a entrada que a sustenta. Em modo construção aplica as práticas de segurança, privacidade e acesso remoto ao que se está a construir, com prova. Nunca explora falhas, só verifica. Usar sozinha ou numa sessão lançada pela orchestrate-sessions.
argument-hint: "URL ou pasta a auditar, ou o que se vai construir"
metadata:
  estado: produção
---

# Segurança

O caminho do conhecimento obtém-se com `node ../start-project-with-trust/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/`: `seguranca/`, `privacidade/`, `acesso-remoto/` e, para aplicações com LLM, `ia/seguranca/`. Lê o `README.md` de cada secção que o pedido toca. Se `~/.start-project-with-trust/knowledge/` tiver uma entrada com o mesmo caminho, vale a pessoal: é a versão já atualizada.

## Regras

- Seguem-se as regras da secção «Regras em todas as fases» de `../start-project-with-trust/SKILL.md`, incluindo a autonomia depois da decisão: o que só o utilizador pode dar (chaves, certificados, contas) fica «Por preencher», e o resto continua.
- Modelo e effort segundo `../orchestrate-sessions/modelo-e-effort.md`: a auditoria e as decisões de segurança são «Rever e decidir com risco»; aplicar uma correção já decidida é «Construir»; recolher cabeçalhos e configurações é «Ler».
- Nunca explorar, só verificar. Não se testa uma falha com dados reais nem se tenta entrar onde não há autorização. Tudo o que exige autorização do dono (testes ativos, acesso a servidores, dados pessoais) pára e vai ao utilizador antes de continuar. Base: `seguranca/testes-de-seguranca-ativos.md`.
- Segredos nunca ficam em documentos nem no repositório: só a referência ao cofre. Base: `seguranca/segredos-num-cofre.md`, `acesso-remoto/inventario-de-acessos-sem-segredos.md`.

## 1. Auditar ou construir?

Se o pedido já o diz, passa ao passo 2. Se não, pergunta no formato da Fase 1 da `start-project-with-trust`, com estas opções:

1. **Auditar** o que já existe (um URL, um repositório, um servidor). O resultado é uma lista de falhas por risco.
2. **Construir** com segurança desde o início. O resultado são as práticas aplicadas ao que se está a fazer, com prova.
3. **Rever acessos remotos** (SSH, RDP, contas). O resultado é o inventário revisto, sem segredos.

Pergunta também o que está em jogo, se ainda não se sabe: dados pessoais (P11 da `start-project-with-trust`), exposição pública (P14), LLM na aplicação. É isso que decide que entradas se leem.

## 2. Ler só o que interessa

- Sempre: `seguranca/owasp-como-referencial.md`, `seguranca/tls-e-cabecalhos-versionados.md`, `seguranca/autenticacao-forte.md`, `seguranca/autorizacao-no-servidor.md`, `seguranca/segredos-num-cofre.md`, `seguranca/ambientes-seguros-por-omissao.md`.
- Com dados pessoais: `privacidade/` inteira, `seguranca/criptografia-e-protecao-de-dados.md`, `seguranca/dados-de-teste-sinteticos-e-minimizacao.md`, `seguranca/auditoria-append-only.md`.
- Com emails (convites, aceitação de contas, avisos, recuperação): `seguranca/links-por-email-sem-sessao.md`. Nenhum link enviado por email abre sessão.
- Com exposição pública: `seguranca/rate-limit-e-waf.md`, `seguranca/defesa-contra-xss.md`, `seguranca/csrf-verificar-a-origem.md`, `seguranca/validacao-de-entradas.md`, `seguranca/queries-parametrizadas.md`, `seguranca/seguranca-de-api.md`, `seguranca/sessoes-robustas.md`, `seguranca/endpoints-de-saude-discretos.md`.
- Com servidores ou máquinas: `acesso-remoto/` inteira, `seguranca/contentores-endurecidos.md`, `seguranca/menor-privilegio-na-base-de-dados.md`.
- Com LLM: `ia/seguranca/owasp-top-10-llm.md`, `ia/seguranca/injecao-de-prompt-mitigacoes.md`.
- Com um portal que recebe eventos de sessões de agentes ou as conduz: `portais-de-agentes/espaco-por-pessoa-e-projeto-por-repositorio.md`, `portais-de-agentes/caixa-de-perguntas-a-distancia.md`, `portais-de-agentes/agente-local-licenca-e-emparelhamento.md`.
- Com pipeline e dependências: `seguranca/ci-como-portao-do-deploy.md`, `seguranca/cadeia-de-fornecimento-verificada.md`, `seguranca/integridade-e-migracoes-aditivas.md`.
- Para detetar e reagir: `seguranca/observabilidade-e-alertas.md`, `seguranca/detecao-e-resposta-a-incidentes.md`.

## 3. Se a biblioteca não tem a resposta

Quando nenhuma entrada cobre o que o utilizador precisa, ou a entrada está desatualizada face ao que ele descreve:

1. Escolhe as fontes oficiais primárias certas (OWASP, o fornecedor, o organismo) e lê-as. Não contornes bloqueios: se uma fonte recusar o acesso automático, pede ao utilizador o conteúdo ou regista-a como não lida.
2. Dá a cada facto a confiança segundo os critérios de `../update-knowledge/SKILL.md` (`alta`, `media`, `baixa`). Um facto `baixa` não serve de base.
3. Regista o que encontraste antes de responder: numa cópia git do repositório, propõe a entrada nova na secção certa, no formato do passo 3 de `../update-knowledge/SKILL.md`, e só a escreves com a aprovação do utilizador; fora disso, no conhecimento pessoal (`~/.start-project-with-trust/knowledge/<secção>/<slug>.md`, fonte em `FONTES.md` pessoal, linha no `CHANGELOG.md` pessoal). Se o que encontraste substitui o que uma entrada diz, segue a regra de edição da `update-knowledge`: a entrada passa a dizer o que vale hoje e o texto anterior fica no «Histórico» dela.
4. Diz ao utilizador que fontes leste e o que registaste.

## 4. Auditoria

1. Se há um URL público, corre a partir da pasta desta skill e cola a saída completa:

   ```
   node ../start-project-with-trust/scripts/verificar-publicacao.mjs https://<domínio> --admin <caminho da administração, sem barra inicial>
   ```

2. Para cada entrada lida, a linha «Para uma skill» é um item da lista de verificação. Para cada item regista uma de duas coisas: a prova de que se cumpre (comando e saída, cabeçalho devolvido, ficheiro de configuração), ou uma falha.
3. Cada falha leva o risco (alto, médio ou baixo, marcado *(estimativa)* quando não há fonte que o fixe), o que corrigir e a entrada que o sustenta.
4. Ordena as falhas por risco e mostra a lista. Corrigir é decisão do utilizador: pergunta por onde começar. Depois de ele decidir, aplicas a correção até ao fim, como no passo 5, e voltas a correr a verificação.

## 5. Construção

1. Para cada prática que se aplica, o critério de fim é a linha «Para uma skill» da entrada.
2. Aplica a prática no código e na configuração. Chaves, certificados e contas que só o utilizador pode criar ficam no `.env.example` e em «Por preencher» de `entrega.md`, e o resto continua.
3. Só dás a prática por feita com prova: um teste que passa, um cabeçalho que a resposta devolve, uma configuração que o verificador aceita.
4. No fim, se o projeto está exposto, corre o verificador de publicação e regista a saída em `entrega.md` («Publicação»).
5. **Check-up depois de definir a interface.** Quando a interface fica definida (maquetes aprovadas, páginas ou fluxos novos: entrar, convites, aceitação de contas, emails, partilhas, links públicos), corre a auditoria do passo 4 sobre esses fluxos antes de os publicar, com as entradas de autenticação, sessões e emails. Cada link que sai do sistema (email, atalho público, convite) responde a «quem o tiver na mão entra sem se autenticar?»; se a resposta for sim, é uma falha de risco alto.

## Relatório

- O modo (auditoria, construção ou acessos) e o que está em jogo (dados pessoais, exposição, LLM).
- A saída do verificador de publicação, se correu.
- As falhas por ordem de risco, cada uma com a correção e a entrada; as corrigidas, com a prova.
- O que parou por precisar de autorização do dono.
- O que ficou por preencher.
- As fontes que foste buscar, se a biblioteca não chegava.


## Documentação

Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), no fim de um trabalho com resultado escreve o relatório do processo, como diz o modo «processo» dela. Uma consulta sem alterações não leva relatório.
