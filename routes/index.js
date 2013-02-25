
/*
 * GET home page.
 */

exports.index = function(req, res){
	var title = 'Express';
  	res.render('index', { title: title });
};


