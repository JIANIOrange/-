var express = require('express');
var cors = require('cors');

var getMessage = require('./database/getMessage');

var app = express();
app.use(cors());
app.use(express.static('./my-app/public'));

app.get('/login',function(req,res){
    if(req.query.name == '123' && req.query.pwd == '123'){
        res.send('1');
    }else{
        res.send('0');
    }
})

app.get('/getAllOrderAlbum',function(req,res){
    getMessage.getAllOrderAlbum(function (data) {
        res.send(data);
    });
})

app.get('/getAllOrderType',function(req,res){
    getMessage.getAllOrderType(function (data) {
        res.send(data);
    });
})

app.get('/getSelectOrderAlbum',function(req,res){
    let age = req.query.age,
        sex = req.query.sex;
    if(age != undefined && sex != undefined) {
        getMessage.getMergeAlbum([age + ' DESC',sex + ' DESC'],function (data) {
            res.send(data);
        })
    }else if(age != undefined || sex != undefined) {
        let data = age == undefined ? sex + ' DESC': age + ' DESC';
        console.log(data);
        getMessage.getSelectedOrderAlbum(data,function (data) {
            res.send(data);
        })
    }
})

app.get('/getSelectOrderType',function(req,res){
    let age = req.query.age,
        sex = req.query.sex;
    if(age != undefined && sex != undefined) {
        getMessage.getMergeType([age + ' DESC',sex + ' DESC'],function (data) {
            res.send(data);
        })
    }else if(age != undefined || sex != undefined) {
        let data = age == undefined ? sex + ' DESC': age + ' DESC';
        // console.log(data);
        getMessage.getSelectOrderType(data,function (data) {
            res.send(data);
        })
    }
})

app.get('/getDetail',function(req,res){
    getMessage.searchPeople(req.query.aid,function(data){
        res.send(data);
    })
})

app.listen(3033,function(){
    console.log('run');
})