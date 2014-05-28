var mysql = require("mysql");


/** pooled mysql **/


var option = {
    host: '192.168.230.232',
    user: 'ccone',
    password: 'ccone',
    database: 'azerp',
    connectionLimit: 10
};

var pool = mysql.createPool(option);

var query = exports.query = function (sql, args, cb) {
    console.log(arguments);
    if (arguments.length == 2) {
        cb = args;
        args = [];
    }
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
            cb(new Error('数据库连接失败'), []);
        } else {
            connection.query(sql, args, function (err, rows) {
                if (cb) {
                    if (err) cb(err, null);
                    cb(null, rows);
                }
                connection.release();
            });
        }
    });
};


/* single connection */
/*
 var option = {
 host: '192.168.230.232',
 user: 'vcall',
 password: 'vcall@',
 database: 'vcall'
 };
 var connection;

 function handleDisconnect() {
 connection = mysql.createConnection(option);
 connection.connect(function(err) {
 if(err) {
 console.log('数据库连接失败:', err);
 setTimeout(handleDisconnect, 2000);
 }else{
 console.log('数据库连接成功');
 }
 });
 connection.on('error', function(err) {
 console.log('数据库错误:', err);
 if(err.code === 'PROTOCOL_CONNECTION_LOST') {
 handleDisconnect();
 } else {
 throw err;
 }
 });
 }

 handleDisconnect();

 exports.query = function (sql, args, cb) {
 if (arguments.length == 2){
 cb = args;
 args = [];
 }
 if (connection){
 connection.query(sql, args, function (err, rows) {
 if (cb){
 if (err) cb(err, null);
 cb(null, rows);
 }
 });
 }else{
 cb(new Error('数据库连接不存在'), []);
 }
 };
 */
