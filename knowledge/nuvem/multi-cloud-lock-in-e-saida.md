---
id: nuvem/multi-cloud-lock-in-e-saida
titulo: "Multi-cloud, lock-in e saída"
seccao: "Nuvem e identidade (AWS, Azure, Microsoft, OVH)"
paginas: [62]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Multi-cloud, lock-in e saída

**Resumo:** Preferir peças portáveis e ser capaz de migrar, mais do que correr em duas nuvens.

## Conteúdo

- Quanto mais serviços proprietários usas, mais caro é sair; preferir o que é portável (contentores, PostgreSQL, S3-compatível, OIDC).
- Multi-cloud real é caro e complexo; mais útil é ser capaz de migrar (portabilidade) do que correr em dois ao mesmo tempo.

**Para uma skill:** as peças críticas usam padrões portáveis; a estratégia de saída da nuvem está escrita e testada.

## Ver também

- [Estratégia de saída](../soberania/estrategia-de-saida.md) (Soberania digital)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Build hybrid and multicloud architectures](https://docs.cloud.google.com/architecture/hybrid-multicloud-patterns) — multicloud para evitar compromisso com um único fornecedor; desafios de desenho
- [OVHcloud Object Storage](https://www.ovhcloud.com/en/public-cloud/object-storage/) — exemplo de armazenamento S3-compatível, peça portável entre fornecedores

Fonte: pág. 62 (Dicionario-Boas-Praticas.pdf)
