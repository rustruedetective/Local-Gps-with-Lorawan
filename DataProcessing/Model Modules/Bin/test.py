import os
import subprocess

#put rssi values here
def test(a, b, c):
    proc = subprocess.Popen(["python", "source.py", "%d" %a, "%d" %b, "%d" %c], stdout=subprocess.PIPE, shell=True)
    (out, err) = proc.communicate()
    print( str(out).replace('\\r\\n', '').replace('b', '').replace("'", '').split(' ') )

test(-73, -65, -50)