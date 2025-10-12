#!/usr/bin/env python3
"""Simple inliner: replaces <div data-include="path"> with the contents of the file at path.
Writes assembled files to dist/ preserving directory structure (only top-level HTML for now).
"""
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DIST = ROOT / 'dist'
INCLUDES_DIR = ROOT / 'includes'

def inline_file(src_path: Path) -> str:
    text = src_path.read_text(encoding='utf-8')
    # find data-include placeholders like: <div data-include="/includes/header.html"></div>
    import re
    pattern = re.compile(r'<div\s+data-include=["\'](?P<p>[^"\']+)["\']\s*>\s*</div>', re.IGNORECASE)

    def repl(m):
        rel = m.group('p')
        # allow leading slash
        rel_path = (ROOT / rel.lstrip('/')).resolve()
        if rel_path.exists():
            return rel_path.read_text(encoding='utf-8')
        else:
            print('Warning: include not found', rel_path)
            return ''

    return pattern.sub(repl, text)

def build():
    DIST.mkdir(exist_ok=True)
    # process all .html files at repo root
    for html in ROOT.glob('*.html'):
        if html.name == 'adminpanel.html':
            # keep adminpanel as-is (it contains JS that expects runtime includes)
            out = DIST / html.name
            out.write_text(html.read_text(encoding='utf-8'), encoding='utf-8')
            continue
        assembled = inline_file(html)
        out = DIST / html.name
        out.write_text(assembled, encoding='utf-8')
        print('Wrote', out)

    # copy assets and other static files (simple copy of includes folder)
    (DIST / 'includes').mkdir(exist_ok=True)
    for inc in INCLUDES_DIR.glob('*.html'):
        (DIST / 'includes' / inc.name).write_text(inc.read_text(encoding='utf-8'), encoding='utf-8')
    print('Build complete')

if __name__ == '__main__':
    build()
