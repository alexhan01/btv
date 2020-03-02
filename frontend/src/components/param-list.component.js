import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Param = props => (
    <tr>
        <td>{props.param.symbol}</td>
        <td>{props.param.starttime.substring(0,10)}</td>
        <td>{props.param.endtime.substring(0,10)}</td>
        <td>{props.param.strategy}</td>
        <td>
            <Link to={"/edit/"+props.param._id}>edit</Link> | <a href='#' onClick={() => { props.deleteParam(props.param._id) }}> delete</a>
        </td>
    </tr>
)

export default class ParamList extends Component {
    constructor(props) {
        super(props);

        this.deleteParam = this.deleteParam.bind(this);
        this.state = {params: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/param/')
            .then(response => {
                this.setState({ params: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteParam(id) {
        axios.delete('http://localhost:5000/param/'+id)
            .then(res => console.log(res.data)); 
        this.setState({
            params: this.state.params.filter (el => el._id !==id)
        })
    }

    paramList() {
        return this.state.params.map(currentparam => {
            return <Param param={currentparam} deleteParam={this.deleteParam} key={currentparam._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Current Params</h3>
                <table className="table">
                    <thead className="thead-light">
                        <th>Symbol</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Strategy</th>
                    </thead>
                    <tbody>
                        { this.paramList() }
                    </tbody>
                </table>
            </div>
        )
    }
}