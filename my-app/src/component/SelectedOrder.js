import React, {Component} from 'react'
import axios from 'axios'

import '../style/SelectedOrder.css'

class SelectedOrderItem extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        console.log(this.props.item)
    }
    render() {
        return (
            <li onClick={this.handleClick}>{this.props.item.title != undefined? this.props.item.title :this.props.item.typetitle}</li>
        )
    }
}

class SelectedOrder extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange0 = this.handleChange0.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.state = {
            resultArr: [],
            type: '',
            sex: '',
            age: '',
            text: ''
        }
    }
    handleSubmit() {
        let _this = this,
            sex = this.state.sex,
            age = this.state.age;
        if(this.state.type == ''){
            this.setState({text: '请选择排行榜类型'});
        }else if(sex == '' && age == ''){
            this.setState({text: '请至少选择一种目标人群'});
        }else{
            this.setState({text: ''});
            let par = sex != '' ? 'sex='+sex : '';
            par += age != ''? '&age='+age : '';
            if(this.state.type == 'album'){
                axios.get('http://localhost:3033/getSelectOrderAlbum/?'+par)
                .then(function(response){
                    _this.setState({resultArr: response.data});
                })
                .catch(function(err){
                    console.log(err);
                })
            }else{
                axios.get('http://localhost:3033/getSelectOrderType/?'+par)
                .then(function(response){
                    _this.setState({resultArr: response.data});
                })
                .catch(function(err){
                    console.log(err);
                })
            }
        }
    }
    handleChange0(e) {
        this.setState({type: e.target.value});
    }
    handleChange1(e) {
        this.setState({sex: e.target.value});
    }
    handleChange2(e) {
        this.setState({age: e.target.value});
    }
    render() {
        let data = this.state.resultArr,
            text = this.state.text;
        return (
            <div className="selectedOrderBox">
                <div className="selectBox">
                    <select onChange={this.handleChange0}>
                        <option value="">请选择排行榜类型</option>
                        <option value="album">剧目排行榜</option>
                        <option value="type">剧目类型排行榜</option>
                    </select>
                    <select onChange={this.handleChange1}>
                        <option value="">请选择目标人群性别类型</option>
                        <option value="male">男性</option>
                        <option value="female">女性</option>
                    </select>
                    <select onChange={this.handleChange2}>
                        <option value="">请选择目标人群年龄段</option>
                        <option value="ost">1~17</option>
                        <option value="ettf">18~24</option>
                        <option value="tftt">25~30</option>
                        <option value="totf">31~35</option>
                        <option value="tsft">36~40</option>
                        <option value="ftp">40+</option>
                    </select>
                </div>
                <div className="seachBox" onClick={this.handleSubmit}>
                    <img src="https://png.icons8.com/ios/1600/google-web-search-filled.png" alt=""/>
                </div>
                <div className="resultBox">
                    <ul>
                        {data && data.map((item,index) => <SelectedOrderItem item={item} index={index} />)}
                    </ul>
                    {text && text}
                </div>
            </div>
        )
    }
}

export default SelectedOrder;