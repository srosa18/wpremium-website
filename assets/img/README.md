# assets/img/ — imagens do site

Fotografia e imagens reais (hoje tudo é placeholder cinza). Sem build step:
referência direta no HTML/CSS.

## Formato
- **`.webp`** preferido (universal hoje, ~30% menor que JPG). `.jpg` alta
  qualidade também serve.
- sRGB, qualidade ~80. PNG só para gráficos com transparência (logo etc.).
- Exportar em **2×** (retina) — tamanhos sugeridos na tabela.

## Estrutura
```
assets/img/
  home/    ← imagens específicas da Home
  salas/   ← capas das salas (reusadas depois nas landings sala-*.html)
```

## ▶ PRIORIDADE 1 — desbloqueia o hero agora
`assets/img/home/home-hero.webp` — paisagem ~16:9, **2560×1440**.
Direção do briefing: ambiente sereno e vazio, repouso; luz quente, contraste
editorial; nada de pessoas olhando pra câmera. Pode mandar 2–3 opções que eu
testo no comp.

## Inventário completo da Home
(prepare em lote quando puder — só o hero trava o próximo passo)

| Slot | Pasta | Arquivo | Proporção | Export 2× |
|------|-------|---------|-----------|-----------|
| Hero | home/ | home-hero.webp | 16:9 | 2560×1440 |
| Verify ("Você tem acesso?") | home/ | home-verify.webp | 5:4 | 1400×1120 |
| Editorial em destaque | home/ | editorial-futuro-repouso.webp | 4:3 | 1600×1200 |
| Artigo · F&B | home/ | artigo-fnb.webp | 3:2 | 1200×800 |
| Artigo · Recife 24h | home/ | artigo-recife-24h.webp | 3:2 | 1200×800 |
| Artigo · Wellness | home/ | artigo-wellness.webp | 3:2 | 1200×800 |
| B2B callout | home/ | home-b2b.webp | 4:3 | 1600×1200 |
| Sala · 5th Avenue | salas/ | 5th-avenue.webp | 16:10 | 1200×750 |
| Sala · Frevo | salas/ | frevo.webp | 16:10 | 1200×750 |
| Sala · Green Park | salas/ | green-park.webp | 16:10 | 1200×750 |
| Sala · Ocean View | salas/ | ocean-view.webp | 16:10 | 1200×750 |

> As proporções saem direto do `wireframe.css` (ex.: `.sala-card .ph` é 16/10,
> `.article-card .ph` é 3/2, o Verify é 5/4). Se você preferir outra proporção
> em algum slot, me fala que eu ajusto o CSS — a foto manda.
