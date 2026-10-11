"""Regenerate the site's Iosevka webfonts from the @fontsource source files.

The published Iosevka files carry thousands of glyphs (~1 MB each). The site
only needs basic Latin plus a handful of punctuation and arrows, so this
subsets each variant down to a few tens of kilobytes and writes the result to
static/fonts/. The dependencies live in scripts/.venv; run scripts/setup.sh
once to create it, then run this with scripts/.venv/bin/python.
"""

from pathlib import Path

from fontTools import subset

SOURCE_DIR = Path(__file__).resolve().parent.parent / "node_modules/@fontsource/iosevka/files"
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "static/fonts"

VARIANTS = (
    ("iosevka-latin-400-normal.woff2", "iosevka-regular.woff2"),
    ("iosevka-latin-700-normal.woff2", "iosevka-bold.woff2"),
    ("iosevka-latin-400-italic.woff2", "iosevka-italic.woff2"),
)


def retained_codepoints() -> set[int]:
    codepoints = set(range(0x20, 0x7F))
    codepoints |= set(range(0xA0, 0x100))
    codepoints |= {ord(character) for character in "‘’“”–—…•‹›←→↗↑↓"}
    return codepoints


def subset_variant(source: Path, destination: Path, codepoints: set[int]) -> None:
    options = subset.Options()
    options.layout_features = ["*"]
    options.flavor = "woff2"
    options.hinting = False
    options.desubroutinize = True

    font = subset.load_font(source, options)
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=codepoints)
    subsetter.subset(font)
    subset.save_font(font, destination, options)
    font.close()


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    codepoints = retained_codepoints()
    for source_name, destination_name in VARIANTS:
        source = SOURCE_DIR / source_name
        destination = OUTPUT_DIR / destination_name
        subset_variant(source, destination, codepoints)
        print(f"{destination_name}: {destination.stat().st_size} bytes")


if __name__ == "__main__":
    main()
