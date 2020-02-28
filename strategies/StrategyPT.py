# Imports
import numpy as np
import pandas as pd
import backtrader as bt
import datetime as datetime

import statsmodels
from statsmodels.tsa.stattools import coint
np.random.seed(107)

import matplotlib.pyplot as plt

# Generate daily returns
Xreturns = np.random.normal(0, 1 , 100)

# sum them and shift all the prices up
X = pd.Series(np.cumsum(Xreturns), name='X') + 50
#X.plot(figsize=(15,7))

# generate y that's closely related to x
noise = np.random.normal(0, 1, 100)
Y = X + 5 + noise
Y.name = 'Y'

'''

pd.concat([X, Y], axis=1).plot(figsize=(15,7))

plt.show()

#Shows mean
(Y/X).plot(figsize=(15,7))
plt.axhline((Y/X).mean(), color='red', linestyle='--')

plt.xlabel('Time')
plt.legend(['Price Ratio', 'Mean'])
plt.show()

# compute p-value of the co-integration test
score, pvalue, _ = coint(X,Y)
print(pvalue)
'''

def find_cointegrated_pairs(data):
    n = data.shape[1]
    score_matrix = np.zeros((n, n))
    pvalue_matrix = np.ones((n, n))
    keys = data.keys()
    pairs = []
    for i in range(n):
        for j in range(i+1, n):
            S1 = data[keys[i]]
            S2 = data[keys[j]]
            result = coint(S1, S2)
            score = result[0]
            pvalue = result[1]
            score_matrix[i, j] = score
            pvalue_matrix[i, j] = pvalue
            if pvalue < 0.02:
                pairs.append((keys[i], keys[j]))
    return score_matrix, pvalue_matrix, pairs