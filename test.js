var Mysql = require('node-mysql-promise');

var mysql = Mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chen'
});

mysql.table('albumdata').select()
.then(function(retdata){
    console.log('Data has been stored in the table albumdata');
    callback(null)
})
.catch(function(err){
    console.log(err);
})