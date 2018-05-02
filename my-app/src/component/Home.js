import React, { Component } from 'react';

import '../style/home.css';

import AllOrderAlbum from './AllOrderAlbum.js'
import AllOrderType from './AllOrderType.js'
import SelectedOrder from './SelectedOrder.js'

class Home extends Component {
  render() {
    return (
        <div className="loginedBox">
            <div className="headBox">
              剧目排行榜系统
            </div>
            <div className="contentBox">
              <div className="orderAlbumBox">
                <p>剧目排行榜</p>
                <table className="headTitle">
                    <tr>
                        <td>排名</td>
                        <td colspan="2">剧目名称</td>
                        <td>播放总量 <br/> (次数)</td>
                    </tr>
                </table>
                <AllOrderAlbum />
              </div>
              <div className="orderTypeBox">
                <p>剧目类型排行榜</p>
                <table className="headTitle">
                    <tr>
                        <td>排名</td>
                        <td>剧目类型</td>
                        <td>播放总量  <br/> （次数）</td>
                    </tr>
                </table>
                <AllOrderType />
              </div>
              <div className="selectedBox">
                <SelectedOrder />
              </div>
            </div>
        </div>
    );
  }
}

export default Home;
