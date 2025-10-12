#!/usr/bin/env python3
"""
Simple static build: inline includes from /includes into HTML files and copy to dist/
Usage: python3 build.py
"""
import os
import shutil
from pathlib import Path

ROOT = Path(__file__).parent
INCLUDES = ROOT / 'includes'
DIST = ROOT / 'dist'

def inline_includes(html_text):
    # Replace <div data-include="/includes/foo.html"></div>
    import re
    def repl(m):
        path = m.group(1)
        # accept absolute or relative
        p = ROOT / path.lstrip('/')
        if not p.exists():
            return ''
        return p.read_text(encoding='utf-8')
    return re.sub(r"<div\s+data-include=[\"']([^\"']+)[\"']\s*></div>", repl, html_text)

def build():
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir(parents=True)

    # Copy all files except includes/ and build.py into dist
    for p in ROOT.rglob('*'):
        if p.is_dir():
            continue
        rel = p.relative_to(ROOT)
        if rel.parts[0] == 'includes':
            continue
        if p.name == 'build.py':
            continue
        # Only process .html files for inlining
        if p.suffix.lower() == '.html':
            outp = DIST / rel
            outp.parent.mkdir(parents=True, exist_ok=True)
            txt = p.read_text(encoding='utf-8')
            txt = inline_includes(txt)
            outp.write_text(txt, encoding='utf-8')
        else:
            # copy static asset
            outp = DIST / rel
            outp.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(p, outp)

    print('Build complete. Output in', DIST)

if __name__ == '__main__':
    build()
