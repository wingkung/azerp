var query = require('../config/db').query;
var async = require('async');
exports.list = function(req, res){
    var sql = "call department_show()";
    query(sql, function(err, rows){
        res.json({err: err, data: rows[0]});
    })
};

exports.add = function(req, res){
    var isChild = req.body.isChild || 0;
    var node = req.body.node;
    var atnode = req.body.atnode || '';

    if (atnode == undefined ){
        res.json({err:'未提供添加节点位置'});
        return;
    }
    if (node == undefined || node == ''){
        res.json({err:'未提供添加节点'});
        return;
    }

    var sql = 'call department_add(?,?,?)';
    query(sql, [node, atnode, isChild], function(err, rows){
        res.json({err: err, data: rows[0]});
    })
};

exports.remove = function(req, res){
    var atnode = req.params.atnode;
    if (atnode == undefined || atnode == ''){
        res.json({err:'未提供删除节点'});
        return;
    }

    var sql = 'call department_del(?)';
    query(sql, [atnode], function(err, rows){
        res.json({err: err, data: rows[0]});
    })
};

exports.rename = function(req, res){
    var atnode = req.body.atnode;
    var node = req.body.node;
    if (atnode == undefined ){
        res.json({err:'未提供重命名节点'});
        return;
    }
    if (node == undefined || node == ''){
        res.json({err:'未提供添加节点'});
        return;
    }
    var has = false;
    var error = null;
    var data = {};
    async.series([
        function(cb){
            var sql = "select count(1) as c from department where name=?";
            query(sql, [node, atnode], function(err, rows){
                error = err;
                if (rows[0].c > 0){
                    has = true;
                }
                cb();
            })
        },
        function(cb){
            if (!has){
                var sql = "update department set name=? where name=?";
                query(sql, [node, atnode], function(err, rows){
                    error = err;
                    data = rows[0];
                    cb();
                })
            }else{
                error = '名字已经存在';
                data = {};
                cb();
            }
        },
    ], function(){
        res.json({err: error, data: data});
    });
};

