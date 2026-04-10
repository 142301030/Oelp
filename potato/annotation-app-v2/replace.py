import os
import glob

replacements = [
    ("Malayalam", "Hindi"),
    ("malayalam", "hindi"),
    ("ml_word", "hi_word"),
    ("ml_sentence", "hi_sentence"),
    ("ml_tokens", "hi_tokens"),
    ("mlTokens", "hiTokens"),
    ("hlMlIdx", "hlHiIdx"),
    ("answeredMlIdx", "answeredHiIdx"),
    ("token-ml", "token-hi"),
    ("--hl-ml", "--hl-hi"),
    ("className=\"ml\"", "className=\"hi\""),
    ("className=\"form-control ml\"", "className=\"form-control hi\""),
    ("className={`token token-ml ml", "className={`token token-hi hi"),
    (".ml {", ".hi {"),
]

src_dir = "/home/shravani/Oelp/potato/annotation-app-v2/src"

for filepath in glob.glob(src_dir + "/**/*.*", recursive=True):
    if filepath.endswith((".js", ".jsx", ".css")):
        with open(filepath, "r") as f:
            content = f.read()
            
        new_content = content
        for old, new in replacements:
            new_content = new_content.replace(old, new)
            
        if new_content != content:
            with open(filepath, "w") as f:
                f.write(new_content)
            print(f"Updated {filepath}")
