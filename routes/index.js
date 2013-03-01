
/*
 * GET home page.
 */

exports.index = function(req, res){
	var title = 'Reade.rs';
  	res.render('index', { title: title });
};