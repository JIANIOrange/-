import React, { Component } from 'react';
import axios from 'axios'; 

import '../style/AllOrder.css'

class AllOrderTypeItem extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <table>
                <tr>
                    <td>{this.props.index + 1}</td>
                    <td>{this.props.item.typetitle}</td>
                    <td>{this.props.item.pv}</td>
                </tr>
            </table>
        )
    }
}

class AllOrderType extends Component {
    constructor() {
        super();
        this.state = {
            allOrderType : []
        }
    }
    componentDidMount() {
        let _this = this;
        axios.get('http://localhost:3033/getAllOrderType/')
        .then(function(response){
            console.log(response.data)
            _this.setState({allOrderType: response.data});
        })
        .catch(function(err){
            console.log(err);
        })
    }
    render() {
        let data = this.state.allOrderType;
        return (
            <div className="allOrderTypeBox">
                {data && data.map((item,index) => <AllOrderTypeItem index = {index} item = {item}>{item.title}</AllOrderTypeItem>)}
            </div>
        )
    }
}

export default AllOrderType;