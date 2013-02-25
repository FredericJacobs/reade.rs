/*
 * GET a user profile page containing all his posts
 */

module.exports = function (server){
	return {
		profile : function(req, res){
 			if (req.params.author == "sync"){
 			// Syncing Route
				require('./sync.js') (req, res);
 			}

 			if (req.params.author) {title = req.params.author};
  				res.render('index', { title: title 
  			});
 		}
	}
}

 