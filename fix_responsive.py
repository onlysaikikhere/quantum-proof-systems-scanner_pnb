import os
import re
import glob

components_dir = r"c:\Users\Mohit\Desktop\Github repos\Imp\Quantum Shield PNB\src\components"

replacements = [
    # Main content padding
    (r'className="md:ml-64 mt-16 p-8 ', 'className="md:ml-64 mt-16 p-4 sm:p-6 md:p-8 '),
    
    # Page Header layout
    (r'flex justify-between items-end', 'flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0'),
    
    # Page Header buttons container
    (r'<div className="flex gap-3">', '<div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">'),
    
    # Table controls header
    (r'<div className="px-6 py-4 border-b border-surface-container-low flex flex-wrap gap-4 items-center justify-between">', '<div className="px-6 py-4 border-b border-surface-container-low flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center justify-between">'),
    
    # General button modifications to make them full width on mobile
    (r'<button className="([^"]*)">', lambda m: '<button className="' + (m.group(1) + ' w-full sm:w-auto' if 'w-full' not in m.group(1) else m.group(1)) + '">'),

    # Input wrappers
    (r'w-48', 'w-full sm:w-48'),
    
    # Top metrics grids
    (r'grid grid-cols-12 gap-6', 'grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6'),
    
    # Form rows / specific flex
    (r'<div className="flex items-center gap-4">', '<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">'),
    
    # Make sure text inputs have width full on mobile
    (r'<input className="([^"]*?w-full[^"]*)"', r'<input className="\1"'), # do nothing if it has w-full
    (r'<input className="([^"]*?w-64[^"]*)"', r'<input className="\1 w-full sm:w-64"'),
    
    # Responsive table container
    (r'<div className="overflow-x-auto no-scrollbar">', '<div className="overflow-x-auto no-scrollbar w-full">'),
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
        print(f"Updated {os.path.basename(filepath)}")
