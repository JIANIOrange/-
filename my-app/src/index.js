import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory} from 'react-router'
// import './index.css';
// import App from './component/index.js';
import Home from  '../src/component/Home.js'
import LoginPage from '../src/component/LoginPage.js'
import Detail from '../src/component/Detail.js'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router history={hashHistory}> 
       <Route path="/" component={Home}/>
       <Route path="login" component={LoginPage}/> 
       <Route path="detail" component={Detail} />
    </Router>, 
    document.getElementById('root'));
registerServiceWorker();
