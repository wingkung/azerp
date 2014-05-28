var express = require('express');
var http = require('http');
var path = require('path');
var multer = require('multer');

var route = require('./routes');

var app = express();

app.set('port', "3000");
app.use(express.json());
app.use(express.favicon());
app.use(express.urlencoded());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(multer({ dest: './uploads/' }));
app.use(express.session());
app.use(express.static(path.join(__dirname, 'app')));
app.use(app.router);

route.route(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
