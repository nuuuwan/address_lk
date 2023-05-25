import random
import sys
random.seed(0)
def main(n):
    arr = [i for i in range(n)]
    random.shuffle(arr)
    print(arr)

if __name__ == '__main__':
    n = int(sys.argv[-1])
    main(n)