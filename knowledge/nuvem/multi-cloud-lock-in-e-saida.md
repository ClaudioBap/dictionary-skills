---
id: nuvem/multi-cloud-lock-in-e-saida
titulo: "Multi-cloud, lock-in e saída"
seccao: "Nuvem e identidade (AWS, Azure, Microsoft, OVH)"
paginas: [62]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# Multi-cloud, lock-in e saída

**Resumo:** Preferir peças portáveis e ser capaz de migrar, mais do que correr em duas nuvens.

## Conteúdo

- Quanto mais serviços proprietários usas, mais caro é sair; preferir o que é portável (contentores, PostgreSQL, S3-compatível, OIDC).
- Multi-cloud real é caro e complexo; mais útil é ser capaz de migrar (portabilidade) do que correr em dois ao mesmo tempo.
- AWS: dá saída de dados gratuita para a internet a clientes elegíveis que tiram todos os dados da AWS ou de um serviço; os clientes da UE podem pedir tarifas de transferência reduzidas ao abrigo do Data Act europeu, pelo suporte da AWS.
- Azure: saída gratuita para quem sai do Azure para outro fornecedor de nuvem ou para um centro de dados próprio; acima de 100 GB por mês pede-se o crédito pelos passos da página de preços de largura de banda.
- Peças portáveis com saída barata: o Object Storage da OVHcloud é compatível com S3 e não cobra dados de saída; o Secret Manager da OVHcloud tem API compatível com Vault KV2, e a OVHcloud diz que isso permite reverter a migração.

**Para uma skill:** as peças críticas usam padrões portáveis; a estratégia de saída da nuvem está escrita e testada. A estratégia diz quanto custa hoje tirar os dados, se o fornecedor dá saída gratuita a quem muda e como se pede.

## Ver também

- [Estratégia de saída](../soberania/estrategia-de-saida.md) (Soberania digital)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Build hybrid and multicloud architectures](https://docs.cloud.google.com/architecture/hybrid-multicloud-patterns) — multicloud para evitar compromisso com um único fornecedor; desafios de desenho
- [OVHcloud Object Storage](https://www.ovhcloud.com/en/public-cloud/object-storage/) — exemplo de armazenamento S3-compatível, peça portável entre fornecedores

Fonte: pág. 62 (Dicionario-Boas-Praticas.pdf)
