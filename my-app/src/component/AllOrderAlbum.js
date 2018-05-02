import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router'

import '../style/AllOrder.css'

class AllOrderAlbumItem extends Component {
    constructor() {
        super(); 
    }
    render() {
        return (
            <table className="allOrderAlbumItemBox">
                <tr>
                    <td>{this.props.index + 1}</td>
                    <td><Link to={
                        {
                            pathname:"detail",
                            query:{aid:this.props.item.aid,title:this.props.item.title,pv:this.props.item.pv}
                        }
                    }>
                        <img src={require('../image/'+this.props.item.aid+'.jpg')}/>
                    </Link></td>
                    <td><Link to={
                        {
                            pathname:"detail",
                            query:{aid:this.props.item.aid,title:this.props.item.title,pv:this.props.item.pv}
                        }
                    }>
                        {this.props.item.title}
                    </Link></td>
                    <td>{this.props.item.pv}</td>
                </tr>
            </table>
        )
    }
}

class AllOrderAlbum extends Component {
    constructor() {
        super();
        this.state = {
            allOrderAlbum : []
        }
    }
    componentDidMount() {
        let _this = this;
        axios.get('http://localhost:3033/getAllOrderAlbum/')
        .then(function(response){
            _this.setState({allOrderAlbum: response.data});
        })
        .catch(function(err){
            console.log(err);
        })
    }
    render() {
        let data = this.state.allOrderAlbum;
        return (
            <div className="allOrderAlbumBox">
                
                {data && data.map((item,index) => <AllOrderAlbumItem index = {index} item = {item}/>)}

            </div>
        )
    }
}

export default AllOrderAlbum;