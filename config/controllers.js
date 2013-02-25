module.exports = function(server, next) {
  var fs = require('fs')
    , ext = '.js';
    
  server.controllers = {};
   
  server.controller = function(filename) {
    return server.controllers[filename.toLowerCase()];
  };

  fs.readdirSync(__dirname + '/../app/controllers').forEach(function(filename) {
    if (!filename.match(ext + '$')) {
      return;
    }
    server.controllers[filename.replace(RegExp(ext + '$'), '').toLowerCase()] = require(__dirname + '/../app/controllers/' + filename)(server);
  });
  
  next();
};