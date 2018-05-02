// aid，剧目类型插入数据库

var Mysql = require('node-mysql-promise');
var promise = require('promise');

var mysql = Mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chen'
});

//该函数的作用：将电视剧类型存储到albumtype表中
function insertAlbumtype(data){
    mysql.table('albumtype').addAll(data)
    .then(function(){
        console.log('Data has been stored in the table typedata');
    })
    .catch(function(err){
        console.log(err);
    })
}

function insertIntoAlbumtype (data){
    return mysql.table('albumtype').where({tvid:data[0].tvid}).select()
    .then(function(retdata){
        if(retdata == ''){
            insertAlbumtype(data);
        }
    })
};

//该函数的作用：在albumtype表中获取type的值
function searchType(tvid){
    return mysql.table('albumtype').where({tvid:tvid}).getField('type')
    .then(function(retdata){
        return retdata;
    })
    .catch(function(err){
        console.log(err);
    })
}

module.exports = {
    insertAlbumtype : insertIntoAlbumtype,
    getType : searchType
};