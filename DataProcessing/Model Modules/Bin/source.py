import pickle
import numpy as np
import warnings
import sys

def rssi_to_distances(rssi, model):
  distance = 0
  regr = pickle.load(open('./Models/train'+model+'.sav', 'rb'))
  test_input = np.array([[rssi]])
  distance = regr.predict(test_input)
  return distance[0][0]

warnings.filterwarnings("ignore")
gad = rssi_to_distances(int(sys.argv[1]), 'A')
gbd = rssi_to_distances(int(sys.argv[2]), 'B')
gcd = rssi_to_distances(int(sys.argv[3]), 'C')

# gax = sys.argv[4]
# gay = sys.argv[5]
# gbx = sys.argv[6]
# gby = sys.argv[7]
# gcx = sys.argv[8]
# gcy = sys.argv[9]

gax = 0.26416
gay = 4.04368
gbx = 0.2794
gby = 5.31622
gcx = 3.67792
gcy = 8.11022

def trilateration(gax, gay, gad, gbx, gby, gbd, gcx, gcy, gcd):
  A = 2*gbx - 2*gax
  B = 2*gby - 2*gay
  C = gad**2 - gbd**2 - gax**2 + gbx**2 - gay**2 + gby**2
  D = 2*gcx - 2*gbx
  E = 2*gcy - 2*gby
  F = gbd**2 - gcd**2 - gbx**2 + gcx**2 - gby**2 + gcy**2
  x = (C*E - F*B) / (E*A - B*D)
  y = (C*D - A*F) / (B*D - A*E)
  return [x,y]

[x, y] = trilateration(gax, gay, gad, gbx, gby, gbd, gcx, gcy, gcd)
print(x, y)