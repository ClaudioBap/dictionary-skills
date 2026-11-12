---
id: ia/multimodal/montagem-e-exportacao-com-ffmpeg
titulo: "Montagem e exportação de vídeo com ffmpeg"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação dos filtros do ffmpeg, a ajuda do próprio binário (ffmpeg -h filter=...) e o README do pacote ffmpeg-static, ligados em cada ponto, e testes feitos a 2026-11-10 com o ffmpeg-static 5.3 em Windows 11, marcados como tal. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Montagem e exportação de vídeo com ffmpeg

**Resumo:** Sem instalar nada no sistema, o pacote npm `ffmpeg-static` traz o ffmpeg que alinha o áudio com a gravação pelos momentos escuros, corta os tempos mortos, faz o zoom em pós-produção, grava as legendas na imagem e exporta em MP4; a narração monta-se em Node a partir dos WAV de cada passo.

## Conteúdo

- `ffmpeg-static` (5.3.0) descarrega na instalação o binário do ffmpeg para o sistema (release `b6.1.1` do próprio projeto) e exporta o caminho (`import ffmpeg from 'ffmpeg-static'`). O pacote tem licença GPL-3.0-or-later e o README diz que «use and distribution of the binary releases of ffmpeg are covered by their respective license». Fonte: [eugeneware/ffmpeg-static](https://github.com/eugeneware/ffmpeg-static) (lido no `package.json` e no README do pacote instalado; a página npm recusou a leitura automática)
- Duração sem `ffprobe`: `ffmpeg -i f -f null -` descodifica tudo e a última marca `time=` no stderr é a duração. O ffmpeg escreve progresso e erros no stderr com ou sem sucesso, por isso um `spawnSync` que lê o stderr e olha ao código de saída é mais fiável do que `execFileSync`. *(verificado em teste, 2026-11-10)*
- Momentos escuros: `blackdetect=d=0.15:pix_th=0.25:pic_th=0.95` imprime `black_start` e `black_end` de cada troço em que 95% dos píxeis têm luma abaixo de 25% (por omissão: `d` 2 s, `pic_th` 0.98, `pix_th` 0.1, segundo `ffmpeg -h filter=blackdetect`). Com `pix_th=0.15` um cartão com gradiente e texto branco não conta como escuro; uma cortina lisa conta. Fonte: [blackdetect](https://ffmpeg.org/ffmpeg-filters.html#blackdetect); limiares *(verificado em teste, 2026-11-10)*
- Alinhar o áudio: cada marca do script (cartão, cortina) procura o `black_start` mais próximo a menos de 3 s; a mediana das diferenças é o desvio entre o relógio do script e o do vídeo, e todos os tempos do script passam a tempos de vídeo somando-o.
- Tempos mortos: `fps=25,select='not(between(t,a,b))*not(between(t,c,d))',setpts=N/(25*TB)` deita fora os fotogramas entre `a` e `b` e renumera os restantes, sem reencodar por troços; o áudio monta-se com os tempos já descontados. Com `-ss` antes de `-i`, os tempos recomeçam em 0 no ponto de corte. Fonte: [select](https://ffmpeg.org/ffmpeg-filters.html#select_002c-aselect), [setpts](https://ffmpeg.org/ffmpeg-filters.html#setpts_002c-asetpts)
- Zoom em pós-produção: `zoompan` com `d=1`, `s=1920x1080` e `fps=25`, com `z`, `x` e `y` em função de `in` (o número do fotograma de entrada); `zoom` está disponível em `x` e `y` para centrar o recorte (`clip(fx-iw/(2*zoom),0,iw-iw/zoom)`). Uma curva suave entre fotogramas-chave faz-se com `st`/`ld` e `clip` (smoothstep). Precisa de ritmo fixo antes (`fps=25`) e de uma gravação a 2x para o recorte não perder nitidez. Um ficheiro `-filter_script:v` evita os limites e as aspas da linha de comandos. Fonte: [zoompan](https://ffmpeg.org/ffmpeg-filters.html#zoompan); comportamento *(verificado em teste, 2026-11-10)*
- Legendas gravadas na imagem: `subtitles=legendas.srt:force_style='FontName=Segoe UI,FontSize=13,PrimaryColour=&H00FFFFFF,OutlineColour=&H80000000,Outline=1,Shadow=0,MarginV=96'`. O tamanho é em unidades de estilo ASS, que a libass escala ao fotograma, por isso o mesmo `FontSize` fica proporcional a 720p e a 1080p. Fonte: [subtitles](https://ffmpeg.org/ffmpeg-filters.html#subtitles-1)
- Narração: os WAV PCM de 16 bits de cada passo copiam-se para um só buffer no tempo certo (Node, sem ffmpeg), com silêncio entre eles, e escreve-se um cabeçalho RIFF de 44 bytes; as legendas SRT nascem da mesma lista de tempos, cada uma até 300 ms depois do fim do áudio ou 100 ms antes da seguinte.
- Exportar: `-c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p -r 25 -af loudnorm=I=-16:TP=-1.5:LRA=11 -ar 48000 -ac 2 -c:a aac -b:a 160k -movflags +faststart -shortest`. `yuv420p` e `faststart` são o que os reprodutores e os browsers esperam; o `loudnorm` põe a narração a −16 LUFS e precisa de `-ar` explícito, porque trabalha internamente a 192 kHz. Um vídeo de 45 s a 1080p ficou com cerca de 6 MB e um de 90 s com cerca de 20 MB.
- Remotion e Motion Canvas não foram precisos para títulos, cartões, caixas, cursor e transições: tudo isso desenha-se na página durante a gravação e o zoom faz-se no ffmpeg. As licenças deles não foram lidas; ficam por confirmar se um vídeo precisar de animação além disto.

**Para uma skill:** a montagem de um vídeo de site usa o ffmpeg do `ffmpeg-static`, alinha o áudio pela mediana das diferenças entre as marcas escuras do script e o `blackdetect`, corta tempos mortos com `select` e `setpts`, faz o zoom com `zoompan` a partir de uma gravação a 2x, grava as legendas com `subtitles` e exporta em H.264 e AAC com `faststart`; a narração monta-se em Node a partir dos WAV de cada passo.

Fonte: documentação dos filtros do ffmpeg e página do `ffmpeg-static` ligadas em cada ponto; os pontos marcados *(verificado em teste)* vêm de testes feitos a 2026-11-10 com o ffmpeg-static 5.3 em Windows 11 e não da documentação. Não vem do PDF.
