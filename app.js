
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , nib = require('nib')
  , stylus = require('stylus');

var app = express();

// Bootup setup 

app.configure(function(){

  // Express.JS Web Framework initialization

  function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
  }

  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use("/public", stylus.middleware({
    src: __dirname+'/public'
  , compile: compile
  }));
  app.use("/public", express.static(path.join(__dirname, 'public')));
  // Setupping Mongoose <--> MongoDB

  mongoose.connect('localhost', 'readers');

  app.set('db', mongoose);

});

app.configure('development', function(){
  app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Alright bro, the site is on ! Port :" + app.get('port'));
});

// Init the DB Schemes

(require('./config/dbschemes.js')) (app);


// Init Controllers 

(require('./config/controllers.js')) (app);

// Init routes

(require('./config/routes.js')) (app); 

// Launch the application

(require('./app/application.js')) (app);


