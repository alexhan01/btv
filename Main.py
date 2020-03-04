from __future__ import (absolute_import, division, print_function,
                        unicode_literals)

import datetime  # For datetime objects
import os.path  # To manage paths
import sys  # To find out the script name (in argv[0])

# Import the backtrader platform
import backtrader as bt
from pydoc import locate
import os
import config
import yfinance as yf
import pandas




# Ensures the input to strategies chosen to be a number
def represents_int(s):
    try:
        int(s)
        return True
    except ValueError:
        return False


def run_cerebro(Strategy, file_name="data", start_year=1999, start_month=1, start_day=1, end_year=2000, end_month=12,
                end_day=31, cash=1000):
    # Needed to force conda to write to relative path for some reason
    this_dir = os.path.dirname(os.path.realpath(__file__))
    file_path = os.path.join(this_dir + "\\dataoutput", file_name + ".txt")
    f = open(file_path, "w")

    # Create a cerebro entity
    cerebro = bt.Cerebro()
    cerebro.addstrategy(Strategy)

    # Makes cerebro write to file instead of console
    cerebro.addwriter(bt.WriterFile, out=f, csv=True, rounding=2, close_out=True)

    # Datas are in a subfolder of the samples. Need to find where the script is
    # because it could have been called from anywhere
    modpath = os.path.dirname(os.path.abspath(sys.argv[0]))
    datapath = os.path.join(modpath, 'orcl-1995-2014.txt')

    # Create a Data Feed
    data = bt.feeds.YahooFinanceCSVData(
        dataname=datapath,
        # Do not pass values before this date
        fromdate=datetime.datetime(start_year, start_month, start_day),
        # Do not pass values before this date
        todate=datetime.datetime(end_year, end_month, end_day),
        # Do not pass values after this date
        reverse=False)

    # Add the Data Feed to Cerebro
    cerebro.adddata(data)

    # Set our desired cash start
    cerebro.broker.setcash(cash)

    # Add a FixedSize sizer according to the stake
    cerebro.addsizer(bt.sizers.FixedSize, stake=10)

    # Set the commission
    cerebro.broker.setcommission(commission=0.0)

    # Print out the starting conditions
    print('Starting Portfolio Value: %.2f' % cerebro.broker.getvalue())

    # Run over everything

    result = cerebro.run()

    # Print out the final result
    print('Final Portfolio Value: %.2f' % cerebro.broker.getvalue())

    # Plot the result
    # cerebro.plot()
    f.close();


if __name__ == '__main__':
    # Add a strategy
    # REQUIRES : Integer correlated to a strategy, or a non integer
    # MODIFIES : dataoutput directory
    # EFFECTS : If not an integer, ends.  Otherwise, creates a data output correlated to the strategy
    # while True:
    #     k = input()
    #     if represents_int(k):
    #         target = "strategies.Strategy" + k + ".Strategy"
    #         strategy = locate(target)
    #         run_cerebro(strategy, file_name="strategy" + k)
    #
    #     else:
    #         break
    # Needed to force conda to write to relative path for some reason
    this_dir = os.path.dirname(os.path.realpath(__file__))
    file_path = os.path.join(this_dir , "temp" + ".txt")
    f = open(file_path, "w")
    a = yf.download("SPY AAPL", start="2017-01-01", end="2017-04-30",
                   group_by="ticker")
    print(type(a))
    print(a.dtypes)
    for tuple in a.items():
        for series in tuple:
            for data in series:
                print(type(data))
                f.write("\n"+str(data))


    f.close()
    # https://aroussi.com/post/python-yahoo-finance
