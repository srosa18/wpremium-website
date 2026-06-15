# Briefing · Camada Visual W Premium (High-Fidelity)

> Este documento é a **memória transferida** do chat onde o wireframe e o
> design system foram concebidos. Lê isto primeiro: ele te dá todo o
> contexto sem precisar do histórico daquele chat.

---

## 1. O que é este repositório

Snapshot do wireframe aprovado da **W Premium · Concierge Digital** (74 páginas,
arquitetura Fase 03 validada com o cliente). O wireframe vive em outro repo
(`wpremium-concierge`) e está **congelado como spec**. Aqui a gente aplica a
**direção visual final** por cima dessa estrutura — sem mexer em IA, fluxos ou
conteúdo, que já passaram por QA.

**O que mudou em relação ao wireframe:** o QA widget (comentários por dobra)
foi removido. Esta fase é apresentada ao cliente em call, não por comentário
assíncrono.

---

## 2. A marca

**W Premium Concierge Digital** — rede de salas VIP premium em aeroportos
brasileiros (e alguns internacionais). Posicionamento: **luxo silencioso**
(*quiet luxury*). Não é ostentação — é repouso, curadoria, discrição.

Conceitos editoriais que guiam o produto (já aplicados no conteúdo):
1. Cada sala é um **produto**, não um item de menu
2. Cada landing **carrega sua cidade junto** (Frevo = Recife, Cerrado = Brasília…)
3. **Menos é mais** — o que existe precisa ser impecável
4. A conversão **respeita a respiração editorial** — nada grita
5. O produto fala, a marca escuta

---

## 3. Direção estética já estabelecida (ponto de partida)

O wireframe já carrega decisões que devem ser **elevadas, não descartadas**:

- **Quiet Luxury** — muito respiro, hierarquia clara, zero ruído visual
- **Grid 8pt** — todos os espaçamentos são múltiplos de 8 (8/16/24/32/48/64…).
  Manter rígido.
- **Container** — largura máx. 1360px, gutter lateral de 40px (32 tablet, 20 mobile)
- **Tipografia fluida** — `clamp()` para escalar entre breakpoints
- **Paleta atual (greyscale + 1 acento)** — definida em `css/wireframe.css`:
  - Cinzas: `--g900` (#1A1A18, quase preto) até `--g100` (#EEEDE9)
  - Acento: `--accent` (#C1594A, terracota) — usado com parcimônia
  - Fundo: off-white quente (#FAFAF8)
- **Tipo atual:** Inter (provisório — forte candidato a troca na fase visual)
- **Raios:** `--r-md` (8px), `--r-lg` (16px), `--r-pill` (999px)

> Estes tokens estão em `css/wireframe.css`. **Não reescrever do zero** — a
> estratégia é extrair e elevar (ver seção 5).

---

## 4. Decisões visuais a tomar (a carne desta fase)

Estas são as escolhas que definem o salto wireframe → high-fi. Tomar **na ordem**,
testando na Home:

1. **Tipografia**
   - Display/títulos: serifada editorial? grotesca de luxo? (candidatas a discutir:
     uma serif tipo *Canela / Reckless / GT Sectra* pra dar tom editorial premium;
     ou uma sans refinada tipo *Söhne / Neue Haas*). Inter pode ficar só no corpo.
   - Corpo: legibilidade + elegância
   - Escala tipográfica final (manter fluида com clamp)

2. **Paleta cromática**
   - Manter a lógica greyscale + 1 acento, ou introduzir uma cor de marca?
   - Definir o acento final (terracota atual? dourado? verde profundo?)
   - Tons de fundo, superfícies, bordas

3. **Fotografia / imagem** (o maior salto visual)
   - Hoje são placeholders. Definir: fotografia real? Qual direção — ambientes
     vazios e serenos? detalhes de materiais (mármore, madeira, linho)? pessoas?
   - Tratamento: cor quente? dessaturado? contraste editorial?
   - Aspect ratios e grid de galeria (já existe estrutura de galeria nas salas)

4. **Motion / microinterações**
   - Linguagem de transição (fade suave? reveal on scroll?)
   - Hover states refinados
   - Manter discreto — quiet luxury não tem animação chamativa

5. **Componentes** (refinar um a um, a partir do que a Home exigir)
   - Nav, hero, cards de sala, ficha técnica, galeria, pricing, footer

---

## 5. Ordem de trabalho · HOME PRIMEIRO

**Decisão tomada:** atacar a **Home (`index.html`) primeiro** como prova de
conceito, e **extrair os tokens à medida que a Home ganha forma** — não criar
um design system no vácuo antes.

Sequência recomendada:

1. **Abrir a Home** e ler a estrutura atual (seções, hierarquia)
2. **Decidir tipografia + paleta** testando direto no hero da Home
3. **Aplicar visual seção por seção** na Home inteira
4. **Extrair os tokens** que emergiram para `css/tokens.css` (cor, tipo,
   espaçamento, sombra, motion) — o design system vira **subproduto** da Home
5. **Validar a Home com o cliente** (apresentação)
6. Aprovada → **propagar para as outras 73 páginas**, que herdam `tokens.css`
   e viram aplicação, não recriação

> Por que Home primeiro: ela força todas as decisões de uma vez (tipo, cor, foto,
> motion, respiro) vendo o resultado real. Um style guide isolado deixaria isso
> no abstrato — e abstrato é onde projeto trava.

---

## 6. Regras de execução

- **Não tocar na arquitetura/conteúdo** — IA, copy, fluxos e links já foram
  validados no wireframe. Esta fase é puramente visual.
- **Manter o grid 8pt** rígido em todo espaçamento novo.
- **Extrair tokens, não hardcodar** — cor/tipo/espaço novos vão pra
  `css/tokens.css` com CSS variables, pra propagar pras 73 páginas depois.
- **Mobile-first sempre** — testar cada decisão em 375px antes de desktop.
- **Sem build step** — continua HTML/CSS/JS puro, edição direta.
- **Deploy** — GitHub Pages na branch `main` (já configurado).

---

## 7. Como começar o trabalho (primeira mensagem do chat novo)

Abra o Claude Code na pasta deste repo (`wpremium website`) e diga algo como:

> "Leia o BRIEFING-VISUAL.md. Vamos atacar o visual da Home (index.html).
> Comece lendo a estrutura atual da Home e do css/wireframe.css, e me proponha
> 2-3 direções de tipografia + paleta pro hero antes de aplicar qualquer coisa."

A partir daí o trabalho é interativo: decide tipografia → paleta → aplica seção
por seção → extrai tokens → valida → propaga.

---

## 8. Inventário de páginas (74)

- **Home:** `index.html`
- **Salas:** `salas.html` + 19 landings `sala-*.html` (12 blocos editoriais cada)
- **Aeroportos:** 14 hubs `aeroporto-*.html`
- **Serviços:** `airport-rooms.html` · `arrival-services.html` · `w-fast-pass.html`
  · `meet-assist.html` · `servicos.html`
- **Acesso:** `como-acessar.html` · `formas-de-acesso.html` · `verificador.html`
- **Editorial:** `editorial.html` · `diario.html` · `artigo.html`
- **Institucional:** `sobre.html` · `historia.html` · `premios.html`
- **B2B:** `b2b.html` · `reservas-grupo.html` · `parcerias-operadoras.html`
- **Contato:** `contato.html` · `imprensa.html` · `formulario.html` ·
  `trabalhe-conosco.html` · `faq.html`
- **Conta:** `login.html` · `dashboard.html` · `minhas-reservas.html` ·
  `historico.html` · `preferencias.html` · `perfil.html`
- **Utility:** `busca-global.html` · `termos.html` · `privacidade.html` ·
  `cookies.html` · `acessibilidade.html` · `404.html`
- **In-lounge mobile:** `in-lounge/` (welcome · cardapio · servico · voo · avaliacao)

Prioridade de propagação após a Home: **Salas (landing-âncora) → Aeroportos →
Serviços → resto.**
