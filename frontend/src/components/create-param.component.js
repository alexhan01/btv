import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateParam extends Component {
    constructor(props) {
        super(props);

        this.onChangeSymbol = this.onChangeSymbol.bind(this);
        this.onChangeStarttime = this.onChangeStarttime.bind(this);
        this.onChangeEndtime = this.onChangeEndtime.bind(this);
        this.onChangeStrategy = this.onChangeStrategy.bind(this);
        this.onSubmit = this.onChangeSymbol.bind(this);

        this.state = { 
            symbol: '',
            starttime: new Date(),
            endtime: new Date(),
            strategy: '',
            symbols: [],
            los: []
        }
    }

    componentDidMount() {
        this.setState({
            symbols:['AAPL', 'AMZN', 'TSLA'],
            symbol: 'AAPL',
            los: ['Strategy1', 'StrategyMR', 'StrategyPT'],
            strategy: 'None'
        })
    }

    onChangeSymbol(e) {
        this.setState({
            symbol: e.target.value
        })
    }

    onChangeStarttime(date) {
        this.setState({
            starttime: date
        })
    }

    onChangeEndtime(date) {
        this.setState({
            endtime: date
        })
    }

    onChangeStrategy(e) {
        this.setState({
            strategy: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const param = {
            symbol: this.state.symbol,
            starttime: this.state.starttime,
            endtime: this.state.endtime,
            strategy: this.state.strategy
        }

        console.log(param);

        axios({
            method: 'post',
            url: '/add',
            data: param
        });

        window.location = '/';
    }

    render() {
        return (
        <div>
        <h3>Change Params</h3>
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label>Symbol:</label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.symbol}
                    onChange={this.onChangeSymbol}>
                    {
                        this.state.symbols.map(function(symbol) {
                            return <option
                            key={symbol}
                            value={symbol}>
                                {symbol}
                            </option>;
                        })
                    }
                </select>
            </div>
            <div className="form-group">
                <label>Start Time:</label>
                <div>
                    <DatePicker
                        selected={this.state.starttime}
                        onChange={this.onChangeStarttime}
                    />
                </div>
            </div>
            <div className="form-group">
                <label>End Time:</label>
                <div>
                    <DatePicker
                        selected={this.state.endtime}
                        onChange={this.onChangeEndtime}
                    />
                </div>
            </div>
            <div className="form-group">
                <label>Strategy:</label>
                <select ref="userInput"
                   className="form-control"
                   value={this.state.strategy}
                   onChange={this.onChangeStrategy} 
                >
                {
                    this.state.los.map(function(strategy) {
                        return <option
                            key={strategy}
                            value={strategy}>
                                {strategy}
                        </option>;
                    })
                }
                </select>
            </div>
            <div className="form-group">
                <input type="submit" value="Run Backtest" className="btn btn-primary" />
            </div>
        </form>
        </div>
        )
    }
}