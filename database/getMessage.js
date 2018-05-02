var Mysql = require('node-mysql-promise');
var promise = require('promise');
var async = require('async');
var path = require('path');

var mysql = Mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chen'
});

//获取重复数据
function unique(arr) {
    let newArr = [];
    for(var i = 0; i < arr.length; i++){
        for(var j = i + 1; j < arr.length; j++){
            if(arr[i].aid === arr[j].aid){
                newArr.push(arr[i]);
            }
        }
    }
    return newArr;
}
function uniqueArr (arr) {
    let newArr = [];
    for(var i = 0; i < arr.length; i++){
        for(var j = i + 1; j < arr.length; j++){
            if(arr[i].typetitle === arr[j].typetitle){
                newArr.push(arr[i]);
            }
        }
    }
    return newArr;
}

//根据参数获取剧目的排名，并获取剧目图片
function getSelectOrderAlbum(data,callbackFun){
    mysql.table('albumpeople').order(data).limit(20).select()
    .then(function(retdata){
        let res = retdata
        async.eachSeries(res,function(item,callback){
            mysql.table('albumdata').where({aid:item.aid}).getField('title')
            .then(function(retdata){
                console.log(item)
                item.title = retdata;
                callback(null);
            })
            .catch(function(err){
                console.log(err);
                callback(null);
            })
        },function(err){
            console.log('err is ' + err);
            console.log(res)
            callbackFun(res);
        })  
        // let selectedArr = [];
        // async.eachSeries(retdata,function(item,callback){
        //     mysql.table('albumdata').where({aid:item}).getField('title')
        //     .then(function(retdata){
        //         selectedArr.push({title: retdata})
        //         callback(null);
        //     })
        //     .catch(function(err){
        //         console.log(err);
        //         callback(null);
        //     })
        // },function(err){
        //     console.log('err is ' + err);
        //     callbackFun(selectedArr);
        // })  
    })
    .catch(function(err){
        console.log(err);
    })
}

//根据参数获取剧目的排名，返回aid
function getSelectAlbumOrder(data){
    return mysql.table('albumpeople').order(data).limit(20).select()
    .then(function(retdata){
        return retdata;
    })
    .catch(function(err){
        console.log(err);
    })
}

//根据参数获取剧目类型的排名
function getSelectOrderType(data,callbackFun){
    return mysql.table('typedata').order(data).limit(20).select()
    .then(function(retdata){
        callbackFun && callbackFun(retdata);
        return retdata;
    })
    .catch(function(err){
        console.log(err);
    })
}

//根据多个参数获取剧目类型的排名
async function getSelectMergeType(data,callbackFun){
    let res0 = await getSelectOrderType(data[0]);
    let res1 = await getSelectOrderType(data[1]);
    // console.log([...res0,...res1])
    // console.log(uniqueArr([...res0,...res1]))
    callbackFun(uniqueArr([...res0,...res1]));
}

//根据多个参数获取剧目的排名
async function getSelectMergeAlbum(data,callbackFun) {
    let res0 = await getSelectAlbumOrder(data[0]);
    let res1 = await getSelectAlbumOrder(data[1]);
    let res = unique([...res0,...res1])
    async.eachSeries(res,function(item,callback){
        mysql.table('albumdata').where({aid:item.aid}).getField('title')
        .then(function(retdata){
            console.log(item)
            item.title = retdata;
            callback(null);
        })
        .catch(function(err){
            console.log(err);
            callback(null);
        })
    },function(err){
        console.log('err is ' + err);
        console.log(res)
        callbackFun(res);
    })  
}

//剧目排行榜，返回pic,title,pv
function getAllOrderAlbum(callbackFun) {
    mysql.table('albumdata').order('pv DESC').limit(20).select()
    .then(function(retdata) {
        callbackFun(retdata);
    })
    .catch(function(err) {
        console.log(err);
    })
}

//剧目类型排行榜，返回type，pv
function getAllOrderType(callbackFun) {
    mysql.table('typedata').order('pv DESC').limit(20).select()
    .then(function(retdata) {
        callbackFun(retdata);
    })
    .catch(function(err) {
        console.log(err);
    })
}

//该函数的作用：根据传入的aid，返回人群数据
function searchPeopleData(aid,callback){
    mysql.table('albumpeople').where({aid:aid}).select()
    .then(function(retdata){
        callback(retdata)
    })
    .catch(function(err){
        console.log(err);
    })
}


module.exports = {
    getSelectedOrderAlbum: getSelectOrderAlbum,
    getSelectOrderType: getSelectOrderType,
    getMergeType: getSelectMergeType,
    getMergeAlbum: getSelectMergeAlbum,
    getAllOrderAlbum: getAllOrderAlbum,
    getAllOrderType: getAllOrderType,
    searchPeople: searchPeopleData
}