import os
import re
import glob

components_dir = r"c:\Users\Mohit\Desktop\Github repos\Imp\Quantum Shield PNB\src\components"

replacements = [
    # Remove w-full sm:w-auto from buttons that shouldn't be full width like pagination, icons
    (r'className="([^"]*\bw-\d+\b[^"]*\bh-\d+\b[^"]*) w-full sm:w-auto"', r'className="\1"'),
    (r'className="([^"]*\bp-1\.5\b[^"]*) w-full sm:w-auto"', r'className="\1"'),
    (r'className="([^"]*\btext-slate-400\b[^"]*) w-full sm:w-auto"', r'className="\1"'),
]

for filepath in glob.glob(os.path.join(components_dir, "*.tsx")):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    new_content = content
    for pattern, replacement in replacements:
        if callable(replacement):
            new_content = re.sub(pattern, replacement, new_content)
        else:
            new_content = re.sub(pattern, replacement, new_content)

    if new_content != content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Fixed false positives in {os.path.basename(filepath)}")
