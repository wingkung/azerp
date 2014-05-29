var department = require('./department');
exports.route = function(app){
    app.get('/api/department', department.list);
    app.post('/api/department', department.add);
    app.put('/api/department', department.rename);
    app.delete('/api/department/:atnode', department.remove);
};



