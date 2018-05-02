var Mysql = require('node-mysql-promise');
var promise = require('promise');
var async = require('async');

var mysql = Mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chen'
});

//该函数的作用：将pv,tpretitle储到typedata表中
function insertIntoTypedataType(type,pv,callback){
    mysql.table('typedata').thenAdd({typetitle:type},{typetitle:type})
    .then(function(retdata){
        mysql.table('typedata').where({typetitle:type}).updateInc('pv',pv)
        .then(function(retdata){
            console.log('type pv stored in albumtype');
            callback(null);
        })
        .catch(function(err){
            console.log(err);
        })
    })
    .catch(function(err){
        console.log(err);
    })
}

//该函数的作用：将male,female,ost,ettf,tftt,totf,tsft,ftp更新到typedata表中
function insertIntoTypedataPeople(typeList,dataList){
    return mysql.execute('UPDATE typedata SET male = male +"'+dataList[0]+'",female = female +"'+dataList[1]+'",ost = ost +"'+dataList[2]+'",ettf = ettf +"'+dataList[3]+'",tftt = tftt +"'+dataList[4]+'",totf = totf +"'+dataList[5]+'",tsft = tsft +"'+dataList[6]+'",ftp = ftp +"'+dataList[7]+'" WHERE typetitle IN ('+typeList+')')
    .then(function(retdata){
        // console.log(retdata);
    })
    .catch(function(err){
        console.log(err);
    })
}

module.exports = {
    insertType : insertIntoTypedataType,
    insertPeople : insertIntoTypedataPeople
}









