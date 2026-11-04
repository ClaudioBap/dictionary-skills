---
id: cicd/estrategias-de-deploy
titulo: "Estratégias de deploy"
seccao: "CI/CD e ferramentas"
paginas: [46]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Estratégias de deploy

**Resumo:** Rolling, blue-green ou canary e feature flags, escolhidos pela tolerância ao risco.

## Conteúdo

- **Rolling:** substituir instâncias aos poucos. **Blue-green:** duas versões, trocar o tráfego de uma para a outra. **Canary:** mandar uma fração do tráfego à versão nova e observar.
- Feature flags para separar «implantar» de «ativar»; ligar a funcionalidade sem novo deploy.
- Escolher pela tolerância ao risco e pela capacidade de observar.

**Para uma skill:** mudanças arriscadas vão por canary ou flag, não big-bang.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Blue Green Deployment](https://martinfowler.com/bliki/BlueGreenDeployment.html) — Dois ambientes de produção; trocar o tráfego para a versão nova
- [Canary Release](https://martinfowler.com/bliki/CanaryRelease.html) — Encaminhar gradualmente uma fração de utilizadores para a versão nova
- [Feature Toggles](https://martinfowler.com/articles/feature-toggles.html) — Release toggles separam a ativação da implantação do código

> **Nota (fonte oficial):** O artigo de Feature Toggles nota que, com configuração em ficheiro, mudar uma flag pode ainda exigir redeploy; ativar sem deploy depende de configuração dinâmica.

Fonte: pág. 46 (Dicionario-Boas-Praticas.pdf)
