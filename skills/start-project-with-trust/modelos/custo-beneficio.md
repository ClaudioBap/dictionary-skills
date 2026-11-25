# Plano custo-benefício (<projeto>)

> Saída da Fase 3. Custos em dinheiro só com fonte (cliente ou `knowledge/`). Caso contrário, escala relativa marcada como *(estimativa)*.

## Decisões

### D1. <decisão>

**Responde a:** _por definir_ <!-- IDs de objetivo.md, ex.: P8, S2 -->

| Opção | Custo | Benefício | Risco | Base no conhecimento |
|-------|-------|-----------|-------|----------------------|

**Recomendação:** _por definir_

### D2. Publicação e exposição

**Responde a:** _por definir_ <!-- normalmente P14, P8 e P11 -->

<!-- Alojamento, domínio, certificado TLS, borda/WAF e acesso à área de administração, do grátis ao empresarial (knowledge/publicacao/). -->

| Opção | Custo | Benefício | Risco | Base no conhecimento |
|-------|-------|-----------|-------|----------------------|

**Recomendação:** _por definir_

### D3. Adotar ou construir

**Responde a:** _por definir_ <!-- normalmente P1, P5 e P10 -->

<!-- Para cada necessidade funcional: adotar plataforma open source, ligar plataformas (API, webhooks, MCP, automação), adotar e estender, ou desenvolver de raiz (knowledge/plataformas/ e «Plataformas candidatas» de plano.md). -->

| Opção | Custo | Benefício | Risco | Base no conhecimento |
|-------|-------|-----------|-------|----------------------|

**Recomendação:** _por definir_

### D4. Execução em paralelo e agentes

**Responde a:** _por definir_ <!-- normalmente P7 (prazo), P8 (orçamento) e as perguntas de seguimento sobre o número de sessões e os agentes -->

<!-- Quantas sessões em paralelo e onde se usam subagentes: sem agentes, só no orquestrador, em cada sessão ou em todas (../orchestrate-sessions/SKILL.md, passos 2 e 3). -->

| Opção | Custo | Benefício | Risco | Base no conhecimento |
|-------|-------|-----------|-------|----------------------|

**Recomendação:** _por definir_

### D5. Específico ou modular

**Responde a:** _por definir_ <!-- normalmente P16 (reutilização), P5 (âmbito) e P8 (orçamento) -->

<!-- Do mais barato ao mais caro: específico; específico com o variável em configuração; núcleo partilhado com adaptadores; produto (modelo de projeto atualizável ou multi-inquilino). «Específico» é uma resposta válida: regista-a e justifica. Base: knowledge/produto/especifico-ou-modular.md. -->

| Opção | Custo | Benefício | Risco | Base no conhecimento |
|-------|-------|-----------|-------|----------------------|

**Recomendação:** _por definir_

## Orquestrador

- **Responde a:** _por definir_ <!-- normalmente P13 e P9 -->
- **Quem ou o quê coordena:** _por definir_ <!-- por omissão: sessão 0, a sessão que corre esta skill -->
- **Sessões que pede para abrir em paralelo:** _por definir_
- **O que decide:** _por definir_
- **Como aprova:** _por definir_
- **Como acompanha as sessões:** _por definir_

## Tarefas

<!-- Uma linha por ação de plano.md. Tipo, nível (simples | profissional | topo), modelo e effort segundo ../orchestrate-sessions/modelo-e-effort.md; mini skill segundo ../orchestrate-sessions/catalogo.md. «Quem executa»: sessão <n> ou subagente da sessão <n>. -->

| Ação | Tipo | Nível | Mini skill | Sessão | Quem executa | Modelo | Effort |
|------|------|-------|------------|--------|--------------|--------|--------|

## Sessões

| # | Tipo | Objetivo | Mini skill | Modelo | Effort | Subagentes | Entra | Sai | Em paralelo com | Como abrir | Quem participa | Critério de fim |
|---|------|----------|------------|--------|--------|------------|-------|-----|-----------------|------------|----------------|-----------------|
| 0 | orquestrador | Coordenar, preparar briefings, integrar saídas | — | _por definir_ | _por definir_ | _por definir_ | _por definir_ | _por definir_ | — | É a sessão que corre esta skill | _por definir_ | _por definir_ |

## Recomendação final
_por definir_

## Validação
- [ ] Validado pelo utilizador em _por definir_
