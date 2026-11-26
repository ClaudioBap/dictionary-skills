# Jarvis open source (OpenJarvis e Microsoft JARVIS)

⚠️ Esta secção não vem do PDF. Foi acrescentada a pedido do utilizador (2026-11-26), que quis conhecer os dois projetos open source com este nome: o OpenJarvis, da Stanford, para ter um assistente pessoal que corre no próprio computador, e o Microsoft JARVIS (HuggingGPT), um projeto de investigação de 2023 em que um modelo de linguagem escolhe e encadeia outros modelos. A sub skill `jarvis` usa estas entradas. Há muitos repositórios de terceiros com «Jarvis» no nome; estas entradas tratam só destes dois.

Fonte: sites, documentação, repositórios e artigos oficiais de cada projeto, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF.

## Entradas

- [Microsoft JARVIS (HuggingGPT)](microsoft-jarvis-hugginggpt.md) — Projeto de investigação da Microsoft (2023, licença MIT) em que um LLM planeia a tarefa, escolhe modelos do Hugging Face, executa-os e junta a resposta. O repositório não publica versões, o último commit é de 2025-07-29 e a pilha é de 2023, por isso serve para estudar o padrão e os benchmarks (TaskBench, EasyTool), não para pôr em produção. *(fora do PDF)*
- [OpenJarvis, o assistente pessoal que corre no próprio computador](openjarvis.md) — O OpenJarvis (Stanford, Apache 2.0) monta agentes pessoais sobre modelos locais (Ollama, vLLM, llama.cpp e outros) ou, se se configurar, sobre modelos na nuvem como o Claude. Recomenda o modelo pela memória da máquina, agenda agentes (como um resumo da manhã), liga-se a servidores MCP e aprende com os registos das próprias execuções. *(fora do PDF)*
- [O que sai da máquina no OpenJarvis e como o fechar](openjarvis-privacidade-e-seguranca.md) — Depois do `jarvis init`, o servidor escuta em todas as interfaces (`0.0.0.0`) e a telemetria fica ligada. O `jarvis scan --data-boundaries` mostra por onde os dados podem sair, e a lista «estritamente local» da documentação fecha esses caminhos. A confirmação antes de usar ferramentas ainda não é aplicada, por isso um agente que lê email ou páginas web não deve ter ferramentas que escrevem, executam ou enviam. *(fora do PDF)*
