---
id: cicd/estrategias-de-deploy
titulo: "Estratégias de deploy"
seccao: "CI/CD e ferramentas"
paginas: [46]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Estratégias de deploy

**Resumo:** Rolling, blue-green ou canary e feature flags, escolhidos pela tolerância ao risco.

## Conteúdo

- **Rolling:** substituir instâncias aos poucos. **Blue-green:** duas versões, trocar o tráfego de uma para a outra. **Canary:** mandar uma fração do tráfego à versão nova e observar.
- Feature flags para separar «implantar» de «ativar»; ligar a funcionalidade sem novo deploy.
- Escolher pela tolerância ao risco e pela capacidade de observar.

**Para uma skill:** mudanças arriscadas vão por canary ou flag, não big-bang.

Fonte: pág. 46 (Dicionario-Boas-Praticas.pdf)
