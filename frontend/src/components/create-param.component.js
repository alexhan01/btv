import React, { Component } from 'react';

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
            symbols: []
        }
    }

    componentDidMount() {
        this.setState({
            symbols:['AAPL', 'AMZN', 'TSLA'],
            symbol: 'AAPL'
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
        </form>
        </div>
        )
    }
}