import os
import re
import glob

html_dir = r"c:\Users\Mohit\Desktop\Github repos\Imp\Quantum Shield PNB"

for filepath in glob.glob(os.path.join(html_dir, "*.html")):
    if 'index.html' in filepath: continue
    
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Hide sidebar on mobile
    new_content = re.sub(r'<aside class="h-screen w-64 fixed left-0 top-0 border-r-0 bg-slate-50 flex flex-col py-6 px-4 z-50"', r'<aside class="hidden md:flex h-screen w-64 fixed left-0 top-0 border-r-0 bg-slate-50 flex-col py-6 px-4 z-50"', content)
    
    # Header left margin
    new_content = re.sub(r'<header class="fixed top-0 right-0 left-64 ', r'<header class="fixed top-0 right-0 left-0 md:left-64 ', new_content)
    
    # Main margin
    new_content = re.sub(r'<main class="ml-64 mt-16 p-4 sm:p-6 md:p-8 ', r'<main class="ml-0 md:ml-64 mt-16 p-4 sm:p-6 md:p-8 ', new_content)
    new_content = re.sub(r'<main class="ml-64 mt-16 p-8 ', r'<main class="ml-0 md:ml-64 mt-16 p-4 sm:p-6 md:p-8 ', new_content)
    
    if new_content != content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated sidebar/main responsivenes in {os.path.basename(filepath)}")
