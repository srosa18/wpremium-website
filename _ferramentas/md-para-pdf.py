# -*- coding: utf-8 -*-
"""Markdown -> PDF com o look do projeto."""
import io, os, re, sys
import fitz
sys.stdout.reconfigure(encoding='utf-8')

MD = sys.argv[1]
PDF = sys.argv[2]
TITULO = sys.argv[3] if len(sys.argv) > 3 else ''

CSS = """
@page { margin: 54pt 52pt 58pt 52pt; }
body { font-family: Georgia, serif; font-size: 10.5pt; line-height: 1.62; color: #212222; }
h1 { font-family: Georgia, serif; font-size: 23pt; font-weight: normal; color: #212222;
     margin: 0 0 4pt 0; line-height: 1.2; }
h2 { font-family: Georgia, serif; font-size: 15pt; font-weight: normal; color: #212222;
     margin: 24pt 0 7pt 0; padding-top: 9pt; border-top: 1px solid #d8d4c8; line-height: 1.3; }
h3 { font-family: Helvetica, sans-serif; font-size: 10.5pt; font-weight: bold; color: #8A6F1E;
     letter-spacing: .06em; text-transform: uppercase; margin: 16pt 0 5pt 0; }
p  { margin: 0 0 8pt 0; }
ul, ol { margin: 0 0 9pt 0; padding-left: 15pt; }
li { margin-bottom: 4pt; }
strong { font-weight: bold; }
hr { border: none; border-top: 1px solid #d8d4c8; margin: 15pt 0; }
table { width: 100%; border-collapse: collapse; margin: 8pt 0 12pt 0; font-size: 9.5pt; }
th { text-align: left; font-family: Helvetica, sans-serif; font-size: 8pt; font-weight: bold;
     letter-spacing: .07em; text-transform: uppercase; color: #6b6b66;
     border-bottom: 1px solid #b9b4a6; padding: 5pt 8pt 5pt 0; }
td { padding: 5pt 8pt 5pt 0; border-bottom: 1px solid #e8e5db; vertical-align: top; }
.codigo { font-family: Courier, monospace; font-size: 9pt; background: #f4f1e8;
          padding: 7pt 9pt; margin: 5pt 0 9pt 0; color: #333; }
.lede { font-size: 11.5pt; color: #55554f; margin-bottom: 14pt; }
"""


def inline(t):
    t = (t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;'))
    t = re.sub(r'`([^`]+)`', r'<span style="font-family:Courier,monospace;font-size:9.2pt">\1</span>', t)
    t = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', t)
    return t


linhas = io.open(MD, encoding='utf-8').read().split('\n')
html = ['<html><head><meta charset="utf-8"><style>%s</style></head><body>' % CSS]
i = 0
lista = None
tabela = False
codigo = False
while i < len(linhas):
    l = linhas[i].rstrip()
    if l.startswith('```'):
        if codigo:
            html.append('</div>')
            codigo = False
        else:
            html.append('<div class="codigo">')
            codigo = True
        i += 1
        continue
    if codigo:
        html.append(inline(l) + '<br>')
        i += 1
        continue
    if not l.strip():
        if lista:
            html.append('</%s>' % lista)
            lista = None
        if tabela:
            html.append('</table>')
            tabela = False
        i += 1
        continue
    if l.startswith('|'):
        cels = [c.strip() for c in l.strip('|').split('|')]
        if all(set(c) <= set('-: ') for c in cels):
            i += 1
            continue
        if not tabela:
            html.append('<table>')
            tabela = True
            html.append('<tr>' + ''.join('<th>%s</th>' % inline(c) for c in cels) + '</tr>')
        else:
            html.append('<tr>' + ''.join('<td>%s</td>' % inline(c) for c in cels) + '</tr>')
        i += 1
        continue
    if tabela:
        html.append('</table>')
        tabela = False
    m = re.match(r'^(#{1,3}) (.*)', l)
    if m:
        if lista:
            html.append('</%s>' % lista)
            lista = None
        n = len(m.group(1))
        html.append('<h%d>%s</h%d>' % (n, inline(m.group(2)), n))
        i += 1
        continue
    if l.strip() == '---':
        if lista:
            html.append('</%s>' % lista)
            lista = None
        html.append('<hr>')
        i += 1
        continue
    m = re.match(r'^\s*[-*] \[[ x]\] (.*)', l)
    if m:
        if lista != 'ul':
            if lista:
                html.append('</%s>' % lista)
            html.append('<ul>')
            lista = 'ul'
        html.append('<li>%s</li>' % inline(m.group(1)))
        i += 1
        continue
    m = re.match(r'^\s*[-*] (.*)', l)
    if m:
        if lista != 'ul':
            if lista:
                html.append('</%s>' % lista)
            html.append('<ul>')
            lista = 'ul'
        html.append('<li>%s</li>' % inline(m.group(1)))
        i += 1
        continue
    m = re.match(r'^\s*\d+\. (.*)', l)
    if m:
        if lista != 'ol':
            if lista:
                html.append('</%s>' % lista)
            html.append('<ol>')
            lista = 'ol'
        html.append('<li>%s</li>' % inline(m.group(1)))
        i += 1
        continue
    # linha indentada dentro de lista: continua o mesmo <li>, nao fecha a lista
    if lista and linhas[i][:1] == ' ':
        html[-1] = html[-1][:-len('</li>')] + ' ' + inline(l.strip()) + '</li>'
        i += 1
        continue
    if lista:
        html.append('</%s>' % lista)
        lista = None
    html.append('<p>%s</p>' % inline(l))
    i += 1
if lista:
    html.append('</%s>' % lista)
if tabela:
    html.append('</table>')
html.append('</body></html>')

doc_tmp = PDF + '.tmp'
escritor = fitz.Story(html=chr(10).join(html))
larg, alt = fitz.paper_size('a4')
moldura = fitz.Rect(0, 0, larg, alt)
util = moldura + (52, 54, -52, -58)

w = fitz.DocumentWriter(doc_tmp)
mais = 1
n = 0
while mais:
    dev = w.begin_page(moldura)
    mais, _ = escritor.place(util)
    escritor.draw(dev)
    w.end_page()
    n += 1
w.close()

doc = fitz.open(doc_tmp)
for i, pg in enumerate(doc, 1):
    pg.insert_text(fitz.Point(52, alt - 34), 'W Premium · Concierge Digital',
                   fontname='helv', fontsize=7.5, color=(.55, .55, .52))
    pg.insert_text(fitz.Point(larg - 62, alt - 34), str(i),
                   fontname='helv', fontsize=7.5, color=(.55, .55, .52))
doc.save(PDF, garbage=4, deflate=True)
doc.close()
try:
    os.remove(doc_tmp)
except OSError:
    pass
print('%s · %d paginas · %d KB' % (os.path.basename(PDF), n, os.path.getsize(PDF) // 1024))
