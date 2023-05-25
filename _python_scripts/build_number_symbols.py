import json
import os
import random
from utils import File, Log

N_SYMBOLS = 2 ** 10

WORDS_PATH = os.path.join('_python_scripts', 'WORDS.txt')
JS_PATH = os.path.join('src', 'nonview', 'core', 'NUMBER_SYMBOLS.js')

log = Log('build_number_symbols')
random.seed(1)

log.info(f'{N_SYMBOLS=}')

def main():
    words = File(WORDS_PATH).read_lines()
    words = [word.strip().upper() for word in words if len(word.strip()) == 5]
    words = words[:N_SYMBOLS]
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
