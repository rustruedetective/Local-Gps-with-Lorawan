#works on file named collection.csv

import re

file = open("collection.csv", 'r')
read = file.read()
file.close()

reread = re.findall(r'GateA: -[0-9][0-9] GateB: -[0-9][0-9] GateC: -[0-9][0-9]', read)
reread2 = '\n'.join(reread)

file = open("collection2.csv", 'w')
file.write(reread2)
file.close()
