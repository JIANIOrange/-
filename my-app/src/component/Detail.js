import React, { Component } from 'react';
import axios from 'axios'

import '../style/Detail.css'

class Detail extends Component {
  constructor(){
    super();
    this.state = {
      albumData: []
    }
  }
  componentDidMount() {
      let _this = this;
      axios.get('http://localhost:3033/getDetail/?aid='+this.props.location.query.aid)
      .then(function(response){
          _this.setState({albumData: response.data[0]});
      })
      .catch(function(err){
          console.log(err);
      })
  }
  render() {
    let all = this.props.location.query.pv
    return (
      <div className="detailBox">
        <div className="detailBox__head">
          剧目：{this.props.location.query.title}
        </div>
        {this.state.albumData &&
          <table className="detailBox__sexData">
            <tr><th>性别数据比例</th></tr>
            <tr><td>男性</td><td>{(this.state.albumData.male / all).toFixed(2)}%</td></tr>
            <tr><td>女性</td><td>{(this.state.albumData.female / all).toFixed(2)}%</td></tr>
            <tr><th>年龄段数据比例</th></tr>
            <tr><td>0~17岁</td><td>{(this.state.albumData.ost / all).toFixed(2)}%</td></tr>
            <tr><td>18~24岁</td><td>{(this.state.albumData.ettf / all).toFixed(2)}%</td></tr>
            <tr><td>25~30岁</td><td>{(this.state.albumData.tftt / all).toFixed(2)}%</td></tr>
            <tr><td>31~35岁</td><td>{(this.state.albumData.totf / all).toFixed(2)}%</td></tr>
            <tr><td>36~40岁</td><td>{(this.state.albumData.tsft / all).toFixed(2)}%</td></tr>
            <tr><td>40+岁</td><td>{(this.state.albumData.ftp / all).toFixed(2)}%</td></tr>
          </table>
        }
      </div>
    );
  }
}

export default Detail;
