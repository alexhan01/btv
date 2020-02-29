from __future__ import (absolute_import, division, print_function,
                        unicode_literals)

import datetime  # For datetime objects
import os.path  # To manage paths
import sys  # To find out the script name (in argv[0])

# Import the backtrader platform
import backtrader as bt
from pydoc import locate
import os

# Ensures the input to strategies chosen to be a number
def represents_int(s):
    try:
        int(s)
        return True
    except ValueError:
        return False

def run_cerebro(Strategy):
    # Needed to force conda to write to relative path for some reason
    this_dir = os.path.dirname(os.path.realpath(__file__))
    file_path = os.path.join(this_dir, "data.txt")
    f = open(file_path, "w")

    # Create a cerebro entity
    cerebro = bt.Cerebro()
    cerebro.addstrategy(Strategy)

    # Makes cerebro write to file instead of console
    cerebro.addwriter(bt.WriterFile, out=f, csv=True, rounding=2, close_out = True)


    # Add a strategy
    #cerebro.addstrategy(TestStrategy)
    # while True:
    #     k = input()
    #     if (RepresentsInt(k)) :
    #         target = "strategies.Strategy"+k+".Strategy"
    #         strategy = locate(target)
    #         cerebro.addstrategy(strategy)
    #     else :
    #         break



    # Datas are in a subfolder of the samples. Need to find where the script is
    # because it could have been called from anywhere
    modpath = os.path.dirname(os.path.abspath(sys.argv[0]))
    datapath = os.path.join(modpath, 'orcl-1995-2014.txt')

    # Create a Data Feed
    data = bt.feeds.YahooFinanceCSVData(
        dataname=datapath,
        # Do not pass values before this date
        fromdate=datetime.datetime(1999, 1, 1),
        # Do not pass values before this date
        todate=datetime.datetime(2000, 12, 31),
        # Do not pass values after this date
        reverse=False)

    # Add the Data Feed to Cerebro
    cerebro.adddata(data)

    # Set our desired cash start
    cerebro.broker.setcash(1000.0)

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
    #cerebro.plot()
    f.close();


if __name__ == '__main__':
    # Add a strategy
    while True:
        k = input()
        if (represents_int(k)) :
            target = "strategies.Strategy"+k+".Strategy"
            strategy = locate(target)
            run_cerebro(strategy)
        else :
            break