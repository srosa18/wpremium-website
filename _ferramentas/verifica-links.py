# -*- coding: utf-8 -*-
"""
Verificador de links e cards — Site W Premium

Atende ao pedido do cliente (17/08/2026): garantir que nenhum card aponte
para pagina inexistente, que o nome do card corresponda a pagina aberta e
que nao existam links quebrados ou 404.

Uso:   py _ferramentas/verifica-links.py
Saida: codigo 0 = tudo certo | 1 = ha problema
"""
import os, re, sys, glob, io

sys.stdout.reconfigure(encoding='utf-8')
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

RE_HREF = re.compile(r'href="([^"#?][^"]*?)"')
RE_CARD = re.compile(
    r'<article class="card sala-card".*?<h3 class="sala-title">(.*?)</h3>.*?'
    r'href="(sala-[^"]+\.html)"', re.S)
RE_TITULO = re.compile(r'<h2 class="h-display">(.*?)</h2>', re.S)


def texto(s):
    return re.sub(r'<[^>]+>', '', s).replace('&amp;', '&').strip()


def paginas():
    for p in sorted(glob.glob(os.path.join(RAIZ, '*.html'))):
        yield p


def main():
    problemas = []

    # ---------- 1. links quebrados ----------
    print("=" * 68)
    print("1 · LINKS INTERNOS")
    print("=" * 68)
    total = quebrados = 0
    for p in paginas():
        nome = os.path.basename(p)
        html = io.open(p, encoding='utf-8', errors='replace').read()
        for href in RE_HREF.findall(html):
            if href.startswith(('http', 'mailto:', 'tel:', 'javascript:', 'data:')):
                continue
            alvo = href.split('#')[0].split('?')[0]
            if not alvo or not alvo.endswith('.html'):
                continue
            total += 1
            if not os.path.exists(os.path.join(RAIZ, alvo)):
                quebrados += 1
                problemas.append("link quebrado: %s -> %s" % (nome, alvo))
                print("   XX %-34s -> %s  (nao existe)" % (nome, alvo))
    print("   %d links verificados · %d quebrados" % (total, quebrados))

    # ---------- 2. nome do card == titulo da pagina ----------
    print("\n" + "=" * 68)
    print("2 · CARDS DE SALA · nome do card confere com a pagina aberta?")
    print("=" * 68)
    titulos = {}
    for p in glob.glob(os.path.join(RAIZ, 'sala-*.html')):
        html = io.open(p, encoding='utf-8', errors='replace').read()
        m = RE_TITULO.search(html)
        if m:
            titulos[os.path.basename(p)] = texto(m.group(1))

    checados = divergentes = 0
    for p in paginas():
        nome = os.path.basename(p)
        html = io.open(p, encoding='utf-8', errors='replace').read()
        for rotulo, destino in RE_CARD.findall(html):
            rotulo = texto(rotulo)
            if rotulo.lower().startswith('veja todas'):
                continue
            checados += 1
            real = titulos.get(destino)
            if real is None:
                divergentes += 1
                problemas.append("card sem pagina: %s · '%s' -> %s" % (nome, rotulo, destino))
                print("   XX %-26s card '%s' -> %s (pagina nao existe)" % (nome, rotulo, destino))
            elif real != rotulo:
                divergentes += 1
                problemas.append("card divergente: %s · '%s' abre '%s'" % (nome, rotulo, real))
                print("   XX %-26s card '%s' abre a pagina de '%s'" % (nome, rotulo, real))
    print("   %d cards verificados · %d divergentes" % (checados, divergentes))

    # ---------- 3. paginas orfas ----------
    print("\n" + "=" * 68)
    print("3 · PAGINAS DE SALA SEM NENHUM LINK APONTANDO")
    print("=" * 68)
    todos_hrefs = set()
    for p in paginas():
        html = io.open(p, encoding='utf-8', errors='replace').read()
        todos_hrefs.update(h.split('#')[0] for h in RE_HREF.findall(html))
    js = os.path.join(RAIZ, 'js', 'app.js')
    if os.path.exists(js):
        todos_hrefs.update(re.findall(r"'([a-z0-9\-]+\.html)'",
                                      io.open(js, encoding='utf-8', errors='replace').read()))
    orfas = 0
    for p in sorted(glob.glob(os.path.join(RAIZ, 'sala-*.html'))):
        nome = os.path.basename(p)
        if nome not in todos_hrefs:
            orfas += 1
            problemas.append("pagina orfa: %s" % nome)
            print("   XX %s  (nenhuma pagina linka para ela)" % nome)
    if not orfas:
        print("   nenhuma pagina orfa")

    print("\n" + "=" * 68)
    if not problemas:
        print("RESULTADO: OK. Sem links quebrados, cards conferem, sem orfas.")
    else:
        print("RESULTADO: %d PROBLEMA(S)." % len(problemas))
    print("=" * 68)
    return 1 if problemas else 0


if __name__ == '__main__':
    sys.exit(main())
