"""Make a page for each invite version from the main index.html.

Run from the repo root after changing index.html:  python3 tools/build-versions.py
Each version lives in its own folder (bride-complete/index.html) so its link
reads .../wedding-invite/bride-complete/. The page is the main invite with
the version named, so js/content.js adds that version's extra events.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://himanshikapoor3099.github.io/wedding-invite/"

VERSIONS = {
    "bride-complete": {
        "description": "Sagan & Cocktails, Mehndi, Haldi and the Wedding",
    },
    "bride-no-cocktail": {
        "description": "Mehndi, Haldi and the Wedding",
        "dates": "29 Nov — 01 Dec 2026",
    },
    "bride-wedding": {
        "description": "The Wedding",
        "dates": "01 Dec 2026",
    },
}

main = (ROOT / "index.html").read_text()
for name, v in VERSIONS.items():
    page = main
    page = page.replace("<head>\n", f'<head>\n  <base href="../">\n', 1)
    page = page.replace(f'content="{SITE}"', f'content="{SITE}{name}/"', 1)
    page = page.replace(
        '<meta name="description" content="Sagan &amp; Cocktails, Haldi and the Wedding',
        f'<meta name="description" content="{v["description"].replace("&", "&amp;")}', 1)
    if v.get("dates"):
        page = page.replace("28 Nov — 01 Dec 2026", v["dates"])
    page = page.replace('  <script src="js/content.js',
                        f'  <script>window.INVITE_VERSION = "{name}";</script>\n  <script src="js/content.js', 1)
    out = ROOT / name / "index.html"
    out.parent.mkdir(exist_ok=True)
    page = page.replace("<html", "<!-- Made by tools/build-versions.py from index.html. Edit index.html, then rerun it. -->\n<html", 1)
    out.write_text(page)
    print("wrote", out.relative_to(ROOT))
