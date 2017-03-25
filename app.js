
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

//load customers route

var app = express();

var connection  = require('express-myconnection'); 
//var Redshift = require('node-redshift');

var routeRedshift = require('./routes/redshift.js'); 

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//var redshift = new Redshift(client);



app.get('/customers', routeRedshift.list);

app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
