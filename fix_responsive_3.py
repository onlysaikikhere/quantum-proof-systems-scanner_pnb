import os
import re
import glob

components_dir = r"c:\Users\Mohit\Desktop\Github repos\Imp\Quantum Shield PNB\src\components"

replacements = [
    # General Flex columns
    (r'<div className="flex gap-4">', '<div className="flex flex-col sm:flex-row gap-4">'),
    (r'<div className="flex gap-3">', '<div className="flex flex-col sm:flex-row gap-3">'),
    (r'<div className="flex gap-6">', '<div className="flex flex-col sm:flex-row gap-6">'),
    
    # Specific select tags
    (r'<select className="([^"]*)">', lambda m: '<select className="' + (m.group(1) + ' w-full sm:w-auto' if 'w-full' not in m.group(1) else m.group(1)) + '">'),

    # Any remaining un-responsive buttons - the user really emphasized "every button"
    (r'<button className="([^"]*\bpx-\d+\b[^"]*\bpy-\d+\b[^"]*)">', lambda m: '<button className="' + (m.group(1) + ' w-full sm:w-auto' if 'w-full' not in m.group(1) else m.group(1)) + '">'),
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
        print(f"Updated general flex and selects in {os.path.basename(filepath)}")
