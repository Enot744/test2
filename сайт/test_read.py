with open(r'd:/сайт/public/world-map.svg', encoding='utf-8') as f:
    text = f.read()
import re
print('Length:', len(text))
print('Paths:', len(re.findall(r'<path', text)))
