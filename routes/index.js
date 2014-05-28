var department = require('./department');
exports.route = function(app){
    app.get('/api/department', department.list);
};



