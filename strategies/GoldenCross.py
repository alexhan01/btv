import backtrader as bt
import os, sys, argparse
import pandas as pd

cerebro = bt.Cerebro()
cerebro.broker.setcash(100000)
