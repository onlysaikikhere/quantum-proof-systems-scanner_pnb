import os
import re
import glob

html_dir = r"c:\Users\Mohit\Desktop\Github repos\Imp\Quantum Shield PNB"

replacements = [
    # Main content padding
    (r'class="ml-64 mt-16 p-8 ', 'class="ml-64 mt-16 p-4 sm:p-6 md:p-8 '),
    
    # Page Header layout
    (r'flex justify-between items-end', 'flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0'),
    
    # Page Header buttons container
    (r'<div class="flex gap-3">', '<div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">'),
    
    # General Flex columns
    (r'<div class="flex gap-4">', '<div class="flex flex-col sm:flex-row gap-4">'),
    (r'<div class="flex gap-6">', '<div class="flex flex-col sm:flex-row gap-6">'),
    
    # Table controls header
    (r'<div class="px-6 py-4 border-b border-surface-container-low flex flex-wrap gap-4 items-center justify-between">', '<div class="px-6 py-4 border-b border-surface-container-low flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center justify-between">'),
    
    # Top metrics grids
    (r'grid grid-cols-12 gap-6', 'grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6'),
    
    # Make sure text inputs have width full on mobile
    (r'<input class="([^"]*?w-48[^"]*)"', r'<input class="\1 w-full sm:w-48"'),
    (r'<input class="([^"]*?w-64[^"]*)"', r'<input class="\1 w-full sm:w-64"'),
    
    # Responsive table container
    (r'<div class="overflow-x-auto custom-scrollbar">', '<div class="overflow-x-auto custom-scrollbar w-full">'),
    
    # Form rows / specific flex
    (r'<div class="flex items-center gap-4">', '<div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">'),
]

for filepath in glob.glob(os.path.join(html_dir, "*.html")):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    new_content = content
    for pattern, replacement in replacements:
        if callable(replacement):
            new_content = re.sub(pattern, replacement, new_content)
        else:
            new_content = re.sub(pattern, replacement, new_content)

    # General button modifications (skip w-8, p-1.5, text-slate-400 which usually mean icon/pagination)
    new_content = re.sub(r'<button class="([^"]*)">', lambda m: '<button class="' + (m.group(1) + ' w-full sm:w-auto' if ('w-full' not in m.group(1) and 'w-8' not in m.group(1) and 'p-1.5' not in m.group(1) and 'text-slate-400' not in m.group(1)) else m.group(1)) + '">', new_content)
    
    # Select tags
    new_content = re.sub(r'<select class="([^"]*)">', lambda m: '<select class="' + (m.group(1) + ' w-full sm:w-auto' if 'w-full' not in m.group(1) else m.group(1)) + '">', new_content)

    if new_content != content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated {os.path.basename(filepath)}")
