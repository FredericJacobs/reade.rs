
/*
 * GET home page.
 */

exports.index = function(req, res){
	var title = 'Express';
  	res.render('index', { title: title });
};

exports.author = require ("./author.js");

exports.story = require ("./story.js");

exports.sync = require ("./sync.js");