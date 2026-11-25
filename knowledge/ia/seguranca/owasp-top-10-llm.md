---
id: ia/seguranca/owasp-top-10-llm
titulo: "OWASP Top 10 para aplicações com LLM"
seccao: "Construir com IA"
paginas: []
fonte: "Páginas oficiais do OWASP GenAI Security Project, ligadas em cada ponto; consultadas a 2026-11-10. Não vem do PDF."
data_lancamento: 2025-12-09
confianca: media
verificado_em: 2026-11-25
editado_em: 2026-11-25
---

# OWASP Top 10 para aplicações com LLM

**Resumo:** A lista de referência dos dez riscos de uma aplicação com LLM, na versão de 2025, e os dez riscos de uma aplicação agêntica, na versão de 2026; serve de lista de verificação na revisão de segurança.

## Conteúdo

- Versão em vigor: «OWASP Top 10 for LLM Applications, 2025 version». Os dez riscos, com o identificador e o nome da fonte (a explicação em português é *(interpretação)* do texto de apresentação de cada risco). Fonte: [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/)
  - LLM01:2025 Prompt Injection: a entrada do utilizador altera o comportamento do modelo.
  - LLM02:2025 Sensitive Information Disclosure: o modelo ou a aplicação expõe dados confidenciais.
  - LLM03:2025 Supply Chain: componentes, modelos ou dados de terceiros trazem vulnerabilidades.
  - LLM04:2025 Data and Model Poisoning: dados de treino, de fine-tuning ou de embeddings adulterados corrompem o comportamento.
  - LLM05:2025 Improper Output Handling: a saída do modelo passa a outros sistemas sem validação.
  - LLM06:2025 Excessive Agency: o modelo tem mais permissões ou autonomia do que precisa.
  - LLM07:2025 System Prompt Leakage: o prompt de sistema fica exposto.
  - LLM08:2025 Vector and Embedding Weaknesses: falhas nos sistemas de recuperação (RAG).
  - LLM09:2025 Misinformation: informação falsa em que a aplicação confia.
  - LLM10:2025 Unbounded Consumption: consumo sem limite de recursos (negação de serviço, custo).
- Agentes: a 2025-12-09 o OWASP anunciou um Top 10 de riscos para IA agêntica. A página do anúncio nomeia três: «Agent Behavior Hijacking», «Tool Misuse and Exploitation» e «Identity and Privilege Abuse». A lista completa saiu como «OWASP Top 10 for Agentic Applications 2026» (versão 2026, dezembro de 2025), e o primeiro risco tem lá o nome «Agent Goal Hijack». Os dez riscos, com o identificador e o nome da fonte (o que é e o que se verifica, em português, é *(interpretação)* da descrição e das orientações de prevenção de cada risco no PDF). Fontes: [OWASP Top 10 for Agentic Applications for 2026 (publicada a 2025-12-09; PDF lido a 2026-11-25)](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/), [lista no site do OWASP](https://genai.owasp.org/top-10-for-agentic-applications-2026/)
  - ASI01 Agent Goal Hijack: o atacante muda o objetivo, as tarefas ou o plano do agente com texto, documentos, saídas de ferramentas ou mensagens de outros agentes. Verifica-se que todo o conteúdo externo é tratado como não confiável, que as ações de impacto ou que mudam o objetivo pedem aprovação humana, que o prompt de sistema está versionado e que uma mudança de objetivo fica registada e gera alerta.
  - ASI02 Tool Misuse and Exploitation: o agente usa uma ferramenta legítima, dentro das permissões que tem, de forma insegura (apagar, exfiltrar, encadear chamadas). Verifica-se o perfil de menor privilégio de cada ferramenta (âmbito, taxa, destinos de rede permitidos), a confirmação humana antes de apagar, transferir ou publicar, a execução em sandbox, os limites de custo ou de taxa e o registo de cada chamada.
  - ASI03 Identity and Privilege Abuse: o agente herda ou reutiliza credenciais e delegações para chegar a acessos que a tarefa não justifica. Verifica-se que cada agente tem identidade própria, que os tokens são de curta duração e por tarefa, que cada ação privilegiada é autorizada de novo, que não há herança de privilégios entre agentes e que escalar pede aprovação humana.
  - ASI04 Agentic Supply Chain Vulnerabilities: modelos, ferramentas, plug-ins, servidores MCP, outros agentes ou registos de terceiros chegam maliciosos ou adulterados, também quando se carregam em execução. Verifica-se o inventário dos componentes (SBOM e AIBOM), as versões fixadas por hash, a proveniência confirmada antes de instalar, os prompts e as definições de ferramentas em controlo de versões com revisão, e um interruptor que desliga de imediato uma ferramenta comprometida.
  - ASI05 Unexpected Code Execution (RCE): o código que o agente gera ou corre transforma-se em execução remota ou em abuso local. Verifica-se que não há eval em produção, que o código corre em contentor isolado, sem root, com rede limitada e só na pasta de trabalho, que há análise estática antes de correr, aprovação humana para execuções elevadas e nenhum caminho direto do agente para produção.
  - ASI06 Memory & Context Poisoning: alguém mete dados falsos ou maliciosos na memória, nos resumos, nos embeddings ou no RAG, e o agente decide mal nas tarefas seguintes. Verifica-se a validação do que se escreve na memória, a memória separada por utilizador e por inquilino, só fontes autenticadas, a proveniência de cada entrada, que o agente não volta a ingerir as próprias saídas como memória fiável e que se pode reverter.
  - ASI07 Insecure Inter-Agent Communication: mensagens entre agentes sem autenticação, integridade ou validação, que se intercetam, falsificam ou repetem. Verifica-se a cifra com autenticação mútua, as mensagens assinadas, a proteção contra repetição (nonce, sessão, carimbo temporal), as versões de protocolo fixadas (MCP, A2A) e esquemas tipados que rejeitam mensagens inválidas.
  - ASI08 Cascading Failures: uma falha (alucinação, entrada maliciosa, ferramenta ou memória corrompida) propaga-se entre agentes e ganha escala. Verifica-se o isolamento e o menor privilégio entre agentes, uma política externa que valida as ações de alto impacto antes de executarem, limites de taxa, quotas e disjuntores entre quem planeia e quem executa, e registos com a linhagem de cada ação.
  - ASI09 Human-Agent Trust Exploitation: a fluência e a autoridade aparente do agente levam a pessoa a aprovar ações ou a dar dados sem validar. Verifica-se a confirmação explícita antes de dados sensíveis ou ações de risco, a pré-visualização sem efeitos, as ações de alto risco destacadas na interface, o registo imutável e uma forma de o utilizador assinalar comportamento suspeito.
  - ASI10 Rogue Agents: um agente comprometido ou desalinhado sai da função ou do âmbito autorizado, com ações que, uma a uma, parecem legítimas. Verifica-se o registo assinado de todas as ações e mensagens, zonas de confiança e sandboxes, a deteção de comportamento fora do declarado, um interruptor com revogação de credenciais para o desligar logo, e a reintegração só com nova verificação e aprovação humana. Fonte: [anúncio do OWASP GenAI Security Project](https://genai.owasp.org/2025/12/09/owasp-genai-security-project-releases-top-10-risks-and-mitigations-for-agentic-ai-security/)
- O mesmo anúncio liga a recursos de apoio: «Agentic AI Threats and Mitigations», «The State of Agentic Security and Governance 1.0», «A Practical Guide to Securing Agentic Applications» e uma aplicação de referência (OWASP FinBot CTF). Fonte: o mesmo anúncio.

**Para uma skill:** a revisão de segurança de uma aplicação com LLM percorre os dez riscos LLM01 a LLM10 e regista, para cada um, a mitigação aplicada ou porque não se aplica; num agente, percorre também os dez riscos ASI01 a ASI10 da mesma forma.

## Ver também

- [Injeção de prompt: ameaças e mitigações](injecao-de-prompt-mitigacoes.md) (Construir com IA)
- [Segurança e governação de IA](../seguranca-e-governacao-de-ia.md) (Construir com IA)

Fonte: páginas oficiais do OWASP GenAI Security Project, ligadas em cada ponto; consultadas a 2026-11-10. Não vem do PDF.

## Histórico

- **2025-12-09**: antes, no «Resumo», «e os primeiros riscos publicados para agentes»; no «Conteúdo», «A lista completa («OWASP Top 10 for Agentic Applications for 2026») não foi lida e fica por confirmar.»; e, em «Para uma skill», «num agente, verifica também os três riscos agênticos nomeados.» (anúncio do OWASP GenAI Security Project, lido a 2026-11-10). Mudou porque a lista completa, ASI01 a ASI10, foi lida no PDF oficial; o primeiro risco chama-se lá «Agent Goal Hijack» e não «Agent Behavior Hijacking», como no anúncio. Fonte: [OWASP Top 10 for Agentic Applications for 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/). Editado a 2026-11-25.
