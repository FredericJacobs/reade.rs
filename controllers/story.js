module.exports = function (server){
	return {
		article :function (req, res){
			if (req.params.author) {title = req.params.author};
  			res.render('index', { title: title });
	 	}
	 }
}