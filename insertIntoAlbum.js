
var Mysql = require('node-mysql-promise');
var promise = require('promise');

var mysql = Mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chen'
});

//该函数的作用：将电视剧数据存储到albumidtv表中
function insertIntoAlbumidTV (data){
    return new Promise(resolve => {
        mysql.table('albumidtv').addAll(data)
        .then(function(){
            console.log('Data has been stored in the table tv');
            resolve();
        })
        .catch(function(err){
            console.log(err);
            resolve();
        })
    })
};

//该函数的作用：将电视剧数据存储到albumidzy表中
function insertIntoAlbumidZY (data,callback){
    return new Promise(resolve => {
        mysql.table('albumidzy').addAll(data)
        .then(function(){
            console.log('Data has been stored in the table zy');
        })
        .catch(function(err){
            console.log(err);
        })
    })
};
module.exports = {
    insertTv : insertIntoAlbumidTV,
    insertZy : insertIntoAlbumidZY
};