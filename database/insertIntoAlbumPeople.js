// aid，人群特性插入数据库

var Mysql = require('node-mysql-promise');
var promise = require('promise');

var mysql = Mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chen'
});

//该函数的作用：将aid,male,female,ost,ettf,tftt,totf,tsft,ftp储到albumpeople表中
function insertPeople(list){
    mysql.table('albumpeople').add(list)
    .then(function(){
        console.log('Data has been stored in the table albumpeople');
    })
    .catch(function(err){
        console.log(err);
    })
}

//该函数的作用：将aid,male,female,ost,ettf,tftt,totf,tsft,ftp更新到albumpeople表中
function updatePeople(list){
    mysql.table('albumpeople').where({aid:list.aid}).update(list)
    .then(function(){
        console.log('Data has been updated in the table albumpeople');
    })
    .catch(function(err){
        console.log(err);
    })
}

function insertIntoAlbumpeople(aid,list){
    return mysql.table('albumpeople').where({aid:aid}).select()
    .then(function(retdata){
        var newData = {aid:aid,male:list[0],female:list[1],ost:list[2],ettf:list[3],tftt:list[4],totf:list[5],tsft:list[6],ftp:list[7]};
        // console.log(newData)
        if(retdata == ''){
            insertPeople(newData);
        }else{
            updatePeople(newData);
        }
    })
}


module.exports = insertIntoAlbumpeople