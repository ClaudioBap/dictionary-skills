---
id: ia/multimodal/musica-para-videos
titulo: "Música para vídeos"
seccao: "Construir com IA"
paginas: []
fonte: "Páginas de licença das fontes e metadados do Wikimedia Commons, ligados em cada ponto; consultados a 2026-11-25. A mistura vem de um teste de 2026-11-25. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-25
editado_em: 2026-11-25
---

# Música para vídeos

**Resumo:** A música de um vídeo de empresa vem de uma fonte com a licença lida (o Wikimedia Commons mostra-a por ficheiro, também pela API), entra com o crédito que a licença pede e mistura-se por baixo da voz, a descer quando ela fala.

## Conteúdo

- Wikimedia Commons: a API devolve, por ficheiro, a licença (`LicenseShortName`, `LicenseUrl`), o autor, se a atribuição é obrigatória (`AttributionRequired`) e o texto de atribuição, com `action=query&prop=imageinfo&iiprop=url|size|mime|extmetadata`. Fonte: [API do Commons, ficheiro de exemplo](https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata&titles=File:Inspired_(ISRC_USUAN1600022).mp3)
- Kevin MacLeod (incompetech.com) no Commons: «Inspired» e «Carefree» com CC BY 3.0, «Wholesome» com CC BY 4.0, atribuição obrigatória. O texto pedido em «Carefree»: «Carefree Kevin MacLeod (incompetech.com) Licensed under Creative Commons: By Attribution 3.0 License https://creativecommons.org/licenses/by/3.0/». A descrição de «Inspired» diz que serve «for corporate films». Fonte: [Inspired](https://commons.wikimedia.org/wiki/File:Inspired_(ISRC_USUAN1600022).mp3), [Carefree](https://commons.wikimedia.org/wiki/File:Carefree_(ISRC_USUAN1400037).mp3), [Wholesome](https://commons.wikimedia.org/wiki/File:Wholesome_by_Kevin_MacLeod.ogg)
- Incompetech: a música tem duas licenças, a «Creative Commons — Free», que «Requires that you credit the music», e a «Standard License», paga, para quando o crédito não é possível («radio/TV ads, corporate presentations, on-hold music»). Fonte: [incompetech: licenças](https://incompetech.com/music/royalty-free/licenses/)
- Scott Buckley, «Wanderlust»: CC BY 4.0 no Commons, atribuição obrigatória. Fonte: [Wanderlust](https://commons.wikimedia.org/wiki/File:Scott_Buckley_-_Wanderlust.oga)
- Pixabay: uso comercial permitido e atribuição não obrigatória; é proibido vender o conteúdo tal como está, usá-lo de forma enganosa, como parte de uma marca ou num contexto político. Os termos avisam que um uso comercial pode precisar de outra autorização, porque a Pixabay não garante direitos de terceiros. As duas páginas não falam de Content ID nem do YouTube. Fonte: [Pixabay: resumo da licença](https://pixabay.com/service/license-summary/), [termos](https://pixabay.com/service/terms/)
- FreePD fechou: a página diz que o serviço (2008 a 2025) «is now permanently closed». Fonte: [freepd.com](https://freepd.com/)
- Mistura com a voz, em ffmpeg: a música normaliza-se à parte (`loudnorm=I=-27`), ajusta-se à duração do vídeo (`-stream_loop -1` e `atrim`), entra e sai com `afade`, e desce quando a voz fala com `sidechaincompress` (a narração como sinal de controlo, `threshold=0.02`, `ratio=6`, `attack=40`, `release=700`). Junta-se à voz com `amix=normalize=0` antes da normalização final a −16 LUFS. Num vídeo de 74 s, a música ficou a −38,8 dBFS com voz (18,8 dB abaixo da fala a −20 dBFS) e a −28,3 dBFS nas pausas. *(verificado em teste, 2026-11-25; quem decide se está alta ou baixa é o ouvido)*

**Para uma skill:** a música de um vídeo vem de uma fonte com a licença lida e registada no guião (ficheiro, autor, licença, página da licença e texto de atribuição); com atribuição obrigatória, o crédito vai para a descrição do vídeo. Mistura-se por baixo da voz, a descer quando ela fala, e o nível mede-se com voz e nas pausas. Sem licença confirmada, a música não entra.

Fonte: páginas ligadas em cada ponto; o ponto da mistura vem de um teste de 2026-11-25. Não vem do PDF.
