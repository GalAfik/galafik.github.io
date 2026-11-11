"""Assemble each site into dist/<site>/ for Netlify.

galafik.com used to serve every project from a folder. Each folder is now its
own Netlify site on a subdomain, and galafik.com redirects the old paths.

    python tools/build.py           # builds dist/
    then deploy with tools/deploy.sh
"""
from __future__ import annotations

import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"

# folder in this repo -> (dist name, files to leave out)
SUBSITES = {
    "expense-tracker": ("expense-tracker", set()),
    "job-search-tracker": ("job-search-tracker", {"job-search-tracker.html"}),
    "littlefreewebsite": ("littlefreewebsite", set()),
    "ronirosenthal": ("ronirosenthal", set()),
}

MAIN_FILES = ["index.html", "favicon.svg", "robots.txt", "sitemap.xml"]
MAIN_DIRS = ["css", "js", "img", "assets"]

REDIRECTS = """\
# Projects that moved from galafik.com/<folder> to their own sites.
/expense-tracker              https://expense-tracker.galafik.com/            301!
/expense-tracker/*            https://expense-tracker.galafik.com/:splat      301!
/job-search-tracker           https://job-search-tracker.galafik.com/         301!
/job-search-tracker/*         https://job-search-tracker.galafik.com/:splat   301!
/job-search-tracker.html      https://job-search-tracker.galafik.com/         301!
/littlefreewebsite            https://littlefreewebsite.mythos-interactive.com/        301!
/littlefreewebsite/*          https://littlefreewebsite.mythos-interactive.com/:splat  301!
/ronirosenthal                https://ronirosenthal.mythos-interactive.com/            301!
/ronirosenthal/*              https://ronirosenthal.mythos-interactive.com/:splat      301!
/rosenthalaccounting          https://ronirosenthal.mythos-interactive.com/            301!
/rosenthalaccounting/*        https://ronirosenthal.mythos-interactive.com/            301!
/GnomeLife                    https://flamingofury.mythos-interactive.com/             301!
/GnomeLife/*                  https://flamingofury.mythos-interactive.com/:splat       301!
"""


def main() -> None:
    if DIST.exists():
        shutil.rmtree(DIST)

    main_out = DIST / "galafik"
    main_out.mkdir(parents=True)
    for name in MAIN_FILES:
        shutil.copy2(ROOT / name, main_out / name)
    for name in MAIN_DIRS:
        shutil.copytree(ROOT / name, main_out / name)
    (main_out / "_redirects").write_text(REDIRECTS, encoding="utf-8")

    for folder, (out_name, skip) in SUBSITES.items():
        out = DIST / out_name
        shutil.copytree(ROOT / folder, out, ignore=lambda _d, names: [n for n in names if n in skip])
        shutil.copy2(ROOT / "favicon.svg", out / "favicon.svg")

    for site in sorted(DIST.iterdir()):
        size = sum(f.stat().st_size for f in site.rglob("*") if f.is_file())
        print(f"{site.name:20} {size / 1e6:8.1f} MB")


if __name__ == "__main__":
    main()
