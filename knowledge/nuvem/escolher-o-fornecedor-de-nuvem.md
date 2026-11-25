---
id: nuvem/escolher-o-fornecedor-de-nuvem
titulo: "Escolher o fornecedor de nuvem"
seccao: "Nuvem e identidade (AWS, Azure, Microsoft, OVH)"
paginas: [61]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# Escolher o fornecedor de nuvem

**Resumo:** Escolher a nuvem por jurisdição, custo, serviços, segurança e facilidade de saída, e registar o critério.

## Conteúdo

- Critérios: jurisdição e soberania, custo, os serviços geridos que precisas, maturidade de segurança, e facilidade de saída (lock-in).
- Os grandes (AWS, Azure, Google Cloud) têm tudo mas prendem; os europeus (OVHcloud, Scaleway, Hetzner) dão soberania e preço; muitas vezes o melhor é poucos serviços simples.
- Onde ficam os dados: na AWS o cliente escolhe a região e o conteúdo não sai dela sem acordo do cliente; na Microsoft, o EU Data Boundary (países da UE e da EFTA) abrange os serviços regionais do Azure instalados numa região desse limite, e os não regionais têm de ser configurados para ficar dentro dele.
- Custo de saída de dados: a AWS e o Azure dão os primeiros 100 GB por mês de saída para a internet; a AWS conta esse valor agregado por todas as regiões e serviços. No Object Storage da OVHcloud, as chamadas à API e os dados de entrada e de saída não são cobrados.
- Sair do fornecedor: a AWS e o Azure dizem dar saída de dados gratuita a quem leva os dados para outro lado, com condições e pedido ao fornecedor (ver [Multi-cloud, lock-in e saída](multi-cloud-lock-in-e-saida.md)).

**Para uma skill:** a escolha de nuvem está registada com o critério (soberania, custo, saída), não por hábito. O registo diz em que região da UE ficam os dados, quanto se prevê tirar por mês face aos 100 GB grátis e como se sai.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html) — decisões de arquitetura avaliadas por segurança, fiabilidade, custo e sustentabilidade
- [About us - OVHcloud](https://www.ovhcloud.com/en/about-us/) — OVHcloud como fornecedor europeu com missão de nuvem soberana
- [Hetzner Cloud](https://www.hetzner.com/cloud/) — nuvem europeia (Alemanha, Finlândia) com preços de entrada baixos

Fonte: pág. 61 (Dicionario-Boas-Praticas.pdf)
