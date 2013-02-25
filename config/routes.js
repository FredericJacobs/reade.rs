module.exports = function(server){

	var routes = require('../routes');

	// Web Server Routes

	server.get('/', routes.index);
	server.get('/:author', routes.author);
	server.get('/:author/:slug', routes.story);

};