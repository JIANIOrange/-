// aid,tvid,title,pv插入数据库

var Mysql = require('node-mysql-promise');
var promise = require('promise');

var mysql = Mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chen'
});

//该函数的作用：将aid,tvid,title储到albumdata表中
function insertIntoAlbumdata (data,callback){
    return mysql.table('albumdata').thenAdd(data,{aid:data.aid})
    .then(function(retdata){
        console.log('Data has been stored in the table albumdata');
        callback(null)
    })
    .catch(function(err){
        console.log(err);
    })
};

//该函数的作用：将pv更新到albumdata表中
function insertIntoAlbumdataPv(wdata,udata) {
    return mysql.table('albumdata').where(wdata).update(udata)
    .then(function(data){
        console.log('update the pv data');
    })
    .catch(function(err){
        console.log(err);
    })
}

//该函数的作用：根据aid查找pv与tvid
function seachPvTvid(aid){
    return mysql.table('albumdata').where({aid:aid}).getField('tvid,pv')
    .then(function(retdata){
        return retdata;
    })
    .catch(function(err){
        console.log(err);
    })
}

module.exports = {
    insertAlbumdata: insertIntoAlbumdata,
    updatePv: insertIntoAlbumdataPv,
    seachPvTvid :seachPvTvid
}