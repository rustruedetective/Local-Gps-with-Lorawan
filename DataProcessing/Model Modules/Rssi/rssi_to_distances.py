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
print( rssi_to_distances(int(sys.argv[1]), 'A') )
print( rssi_to_distances(int(sys.argv[1]), 'B') )
print( rssi_to_distances(int(sys.argv[1]), 'C') )