var query = require('../config/db').query;
exports.list = function(req, res){
    var sql = "call department_show()";
    query(sql, function(err, rows){
        res.json({err: err, data: rows[0]});
    })
};

exports.add = function(req, res){
    var isChild = req.body.isChild | 0;
    var node = req.body.node;
    var atnode = req.body.adnode | '';

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
    var atnode = req.body.atnode;
    if (atnode == undefined || atnode == ''){
        res.json({err:'未提供删除节点'});
        return;
    }

    var sql = 'call department_del(?)';
    query(sql, [atnode], function(err, rows){
        res.json({err: err, data: rows[0]});
    })
};