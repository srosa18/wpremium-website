# W Premium · Concierge Digital — Website (High-Fidelity)

Camada visual (high-fidelity) do **Concierge Digital W Premium**, construída
sobre a arquitetura validada no wireframe.

## Sobre

Este repositório parte do **snapshot do wireframe aprovado** (74 páginas,
sitemap Fase 03) e aplica a **direção visual final**: tipografia, paleta,
fotografia, motion e refinamento de cada componente.

- **Modo:** High-fidelity (visual final aplicado sobre estrutura validada)
- **Origem:** snapshot do wireframe `wpremium-concierge` (estrutura intocada)
- **Stack:** HTML estático · CSS3 puro (sem framework) · Vanilla JS
- **Deploy:** GitHub Pages
- **Relação com o wireframe:** o wireframe continua existindo como spec
  arquitetural; este repo é o produto visual que evolui em paralelo.

## Diferença para o wireframe

| | Wireframe (`wpremium-concierge`) | Website (este repo) |
|---|---|---|
| Fidelidade | Baixa · greyscale · placeholders | Alta · visual final |
| Propósito | Validar IA, fluxos, copy, CRO | Definir e aplicar linguagem visual |
| QA do cliente | QA widget (comentários por dobra) | Apresentação em call |
| Estado | Congelado como referência | Em desenvolvimento ativo |

## Por onde começar

Veja **`BRIEFING-VISUAL.md`** — é o documento que orienta as decisões de
design system e a ordem de ataque (Home primeiro, tokens extraídos a partir dela).

Abra `index.html` no navegador — ou use o link do GitHub Pages.

## Stack

- **HTML5** semântico (herdado do wireframe)
- **CSS3 puro** com design tokens (CSS Variables) — `css/wireframe.css` é o ponto
  de partida; tokens visuais serão extraídos para `css/tokens.css`
- **Vanilla JS** — nav/footer/modal injetados globalmente (`js/app.js`)
- **Inter** (Google Fonts) — provisório; tipografia final a definir
- **Sem build step** · roda direto no navegador

## Estrutura de arquivos

```
.
├── index.html                  # Home (primeira a receber visual)
├── salas.html                  # Hub L2
├── aeroporto-{iata}.html       # 14 hubs de aeroporto
├── sala-{slug}.html            # 19 landings de sala (12 blocos)
├── ...                         # 74 páginas total
├── css/wireframe.css           # Design tokens + components (base)
├── js/app.js                   # Nav/footer/modal/interactions
├── assets/                     # placeholder.svg · qr-code.svg
├── in-lounge/                  # 5 telas mobile pós-QR
└── BRIEFING-VISUAL.md          # Direção do design system + ordem de trabalho
```

---

**W Premium Group · Concierge Digital · Camada Visual**
