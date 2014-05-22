/* dependancies*/
var	bodyParser 	= require('body-parser')();
var config		= require ('./server-config');
var express		= require('express');
var app			= express();
var router		= express.Router();
var api			= require(config.appPath);

api.init( router );

/* db */
var mongoose   = require('mongoose');
mongoose.connect(config.db);

/* application */
var pub = ( config.env === 'production' ? '/public-built' : '/public');
app.use(express.static(__dirname + pub));
app.use(bodyParser);
app.use('/', router);
app.listen(config.server.port);
console.log("port : " + config.server.port);
