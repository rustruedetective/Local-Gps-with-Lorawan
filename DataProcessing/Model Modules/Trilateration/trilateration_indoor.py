gax = 0.26416   #gateway A x axis
gay = 4.04368
gad = 1.6242   #gateway A distance from node
gbx = 0.2794
gby = 5.31622
gbd = 4.4618
gcx = 3.67792
gcy = 8.11022
gcd = 5.9675

def trilateration(gax, gay, gad, gbx, gby, gbd, gcx, gcy, gcd):
  A = 2*gbx - 2*gax
  B = 2*gby - 2*gay
  C = gad**2 - gbd**2 - gax**2 + gbx**2 - gay**2 + gby**2
  D = 2*gcx - 2*gbx
  E = 2*gcy - 2*gby
  F = gbd**2 - gcd**2 - gbx**2 + gcx**2 - gby**2 + gcy**2
  x = (C*E - F*B) / (E*A - B*D)
  y = (C*D - A*F) / (B*D - A*E)
  return x,y

# x, y = trilateration(gax, gay, gad, gbx, gby, gbd, gcx, gcy, gcd)   #coords of node

# print(x, y)