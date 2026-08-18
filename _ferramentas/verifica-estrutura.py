# -*- coding: utf-8 -*-
"""
Verificador de conformidade estrutural — Site W Premium

Garante que TODA pagina de sala e de aeroporto siga exatamente a mesma
sequencia de dobras (data-comment-id) da pagina canonica. E a prova
automatizada de que o wireframe nao foi alterado ao trocar conteudo.

Uso:   py _ferramentas/verifica-estrutura.py
Saida: codigo 0 = tudo conforme | 1 = ha divergencia
"""
import os, re, sys, glob

sys.stdout.reconfigure(encoding='utf-8')

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CANONICA_SALA = 'sala-5th-avenue.html'
CANONICA_AERO = 'aeroporto-gru.html'

RE_ID = re.compile(r'data-comment-id="([^"]+)"')
RE_REDIRECT = re.compile(r'http-equiv=["\']refresh["\']', re.I)


def dobras(arquivo):
    """Devolve a sequencia de dobras normalizada (sem o prefixo da pagina)."""
    with open(os.path.join(RAIZ, arquivo), encoding='utf-8', errors='replace') as f:
        html = f.read()
    if RE_REDIRECT.search(html):
        return None, True                      # pagina de redirect: nao se aplica
    ids = RE_ID.findall(html)
    # "sala.5th.01-hero" e "sala-skyline.01-hero" viram ambos "01-hero"
    return [i.rsplit('.', 1)[-1] for i in ids], False


def conferir(titulo, canonica, padrao):
    base, _ = dobras(canonica)
    print("\n" + "=" * 68)
    print("%s   (canonica: %s)" % (titulo, canonica))
    print("=" * 68)
    print("Estrutura esperada · %d dobras:" % len(base))
    print("   " + " > ".join(base))
    print()

    arquivos = sorted(os.path.basename(p) for p in glob.glob(os.path.join(RAIZ, padrao)))
    ok = falha = redirect = 0
    problemas = []

    for arq in arquivos:
        seq, is_redirect = dobras(arq)
        if is_redirect:
            print("   ~  %-38s redirect (nao se aplica)" % arq)
            redirect += 1
            continue
        if seq == base:
            print("   OK %-38s %d dobras" % (arq, len(seq)))
            ok += 1
            continue

        falta = [d for d in base if d not in seq]
        sobra = [d for d in seq if d not in base]
        if not falta and not sobra:
            detalhe = "ordem diferente da canonica"
        else:
            detalhe = []
            if falta:
                detalhe.append("FALTA: " + ", ".join(falta))
            if sobra:
                detalhe.append("EXTRA: " + ", ".join(sobra))
            detalhe = " | ".join(detalhe)
        print("   XX %-38s %s" % (arq, detalhe))
        problemas.append((arq, detalhe))
        falha += 1

    print("\n   Conformes: %d   Divergentes: %d   Redirects: %d" % (ok, falha, redirect))
    return falha, problemas


def main():
    print("VERIFICADOR DE CONFORMIDADE ESTRUTURAL · Site W Premium")
    print("Compara a sequencia de dobras (data-comment-id) de cada pagina")
    print("contra a pagina canonica. Divergencia = wireframe alterado.")

    f1, p1 = conferir("PAGINAS DE SALA", CANONICA_SALA, 'sala-*.html')
    f2, p2 = conferir("PAGINAS DE AEROPORTO", CANONICA_AERO, 'aeroporto-*.html')

    total = f1 + f2
    print("\n" + "=" * 68)
    if total == 0:
        print("RESULTADO: CONFORME. Wireframe preservado em todas as paginas.")
    else:
        print("RESULTADO: %d PAGINA(S) DIVERGENTE(S) — wireframe alterado:" % total)
        for arq, det in p1 + p2:
            print("   - %s  ->  %s" % (arq, det))
    print("=" * 68)
    return 1 if total else 0


if __name__ == '__main__':
    sys.exit(main())
