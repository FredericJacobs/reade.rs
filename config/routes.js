module.exports = function(server){

	var routes = require('../routes');
	authorController = server.controller("author");

	// Web Server Routes

	server.get('/', routes.index);
	server.get('/:author', authorController.profile);
	//server.get('/:author/:slug', routes.story);

};
