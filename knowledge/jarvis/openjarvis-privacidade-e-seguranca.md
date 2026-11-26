---
id: jarvis/openjarvis-privacidade-e-seguranca
titulo: "O que sai da máquina no OpenJarvis e como o fechar"
seccao: "Jarvis open source (OpenJarvis e Microsoft JARVIS)"
paginas: []
fonte: "Documentação oficial do OpenJarvis (segurança, fronteiras dos dados, conectores), ligada em cada ponto; consultada a 2026-11-26. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# O que sai da máquina no OpenJarvis e como o fechar

**Resumo:** Depois do `jarvis init`, o servidor escuta em todas as interfaces (`0.0.0.0`) e a telemetria fica ligada. O `jarvis scan --data-boundaries` mostra por onde os dados podem sair, e a lista «estritamente local» da documentação fecha esses caminhos. A confirmação antes de usar ferramentas ainda não é aplicada, por isso um agente que lê email ou páginas web não deve ter ferramentas que escrevem, executam ou enviam.

## Conteúdo

### Ver o que pode sair

- `jarvis scan --data-boundaries` lista os caminhos por onde os dados podem sair da máquina (motores na nuvem, pesquisa web, canais, MCP, entre outros); com `--strict`, termina com erro enquanto houver avisos. Mostra o que a configuração permite, não prova o que aconteceu numa execução. Fonte: [fronteiras dos dados](https://open-jarvis.github.io/OpenJarvis/user-guide/data-boundary-scan/)
- Numa configuração acabada de criar pelo `jarvis init`, os avisos habituais são `server.host = "0.0.0.0"` e `telemetry.enabled = true`. Fonte: [fronteiras dos dados](https://open-jarvis.github.io/OpenJarvis/user-guide/data-boundary-scan/)

### Fechar

- A lista «estritamente local» da documentação desliga analytics, traces, telemetria, memória no contexto, ferramentas, MCP, canais, aprendizagem e A2A, usa um motor local, põe `server.host = "127.0.0.1"` e o perfil de segurança `personal`, e tira do ambiente as credenciais da nuvem e dos canais. Fonte: [fronteiras dos dados](https://open-jarvis.github.io/OpenJarvis/user-guide/data-boundary-scan/)
- Guardrails nos modos `warn`, `redact` e `block`, com detetores de segredos e de dados pessoais e um registo de auditoria em `~/.openjarvis/audit.db`; a documentação aconselha começar em `warn` e apertar depois. Fonte: [segurança](https://open-jarvis.github.io/OpenJarvis/user-guide/security/)
- `enforce_tool_confirmation` é aceite na configuração, mas a documentação diz que não é aplicado. Fonte: [segurança](https://open-jarvis.github.io/OpenJarvis/user-guide/security/)

### Conectores

- Google Drive, Calendar e Contactos ligam-se por OAuth só de leitura; Gmail e Outlook por IMAP, com palavra-passe de aplicação. Fonte: [canais e conectores](https://open-jarvis.github.io/OpenJarvis/user-guide/channels-and-connectors/). Confiança: media (a página não diz se o conteúdo indexado chega a um modelo na nuvem).
- Email e páginas web são entradas em que o agente não pode confiar: alguém pode escrever lá instruções para ele. Ver [Injeção de prompt: ameaças e mitigações](../ia/seguranca/injecao-de-prompt-mitigacoes.md). *(interpretação)*

**Para uma skill:** um OpenJarvis instalado para alguém prova-se com `jarvis scan --data-boundaries --strict` a terminar sem erro (ou com cada aviso que fica aceite por escrito pelo utilizador), o servidor a escutar só em `127.0.0.1` (visto com `netstat` ou `ss`), e nenhum agente que leia email ou a web com ferramentas que escrevem, executam código ou enviam mensagens.

## Ver também

- [OpenJarvis, o assistente pessoal que corre no próprio computador](openjarvis.md) (Jarvis open source)
- [OWASP Top 10 para aplicações com LLM](../ia/seguranca/owasp-top-10-llm.md) (Construir com IA)

Fonte: Documentação oficial do OpenJarvis (segurança, fronteiras dos dados, conectores), ligada em cada ponto; consultada a 2026-11-26. Não vem do PDF.
