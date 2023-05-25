import json
import os
import random
from utils import File, Log

WORDS_PATH = os.path.join('src', 'nonview', 'core', 'WORDS.txt')
JS_PATH = os.path.join('src', 'nonview', 'core', 'NUMBER_SYMBOLS.js')

log = Log('build_number_symbols')
random.seed(1)

def main():
    words = File(WORDS_PATH).read_lines()
    words = [word.strip().upper() for word in words if len(word.strip()) == 5]
    random.shuffle(words)
    inner = json.dumps(words, indent=4)
    js_content = f'''
// Auto Generated with build_number_symbols.py

export const NUMBER_SYMBOLS = {inner};

export const N_SYMBOLS = NUMBER_SYMBOLS.length;
    '''
    File(JS_PATH).write(js_content)
    log.debug(f'Wrote {len(words)} words to {JS_PATH}')

    os.system(f'npx prettier --write {JS_PATH}')

if __name__ == '__main__':
    main()
