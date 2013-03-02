module.exports = function(server){

	var routes = require('../routes');
	authorController = server.controller("author"),
	storyController = server.controller("story");

	// Web Server Routes

	server.get('/', routes.index);
	server.get('/:author', authorController.profile);
	server.get('/:author/:slug', storyController.article);
};
