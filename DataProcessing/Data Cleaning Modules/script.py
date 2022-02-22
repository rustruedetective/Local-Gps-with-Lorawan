#works on file named collection.csv

import re

file = open("collection.csv", 'r')
read = file.read()
file.close()

reread = re.findall(r'G.*', read)
reread2 = re.sub('GateA:', '\nGateA:' , ''.join(reread))

file = open("collection2.csv", 'w')
file.write(reread2)
file.close()
