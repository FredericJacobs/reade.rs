module.exports = function (server){
	return {
		article :function (req, res){
			var authorUsername;

			if (req.params.author == 'public') {console.log ("Did get a public ressource request")};

			if (!(typeof req.params.author != undefined && typeof req.params.slug != undefined)){
				console.log ("Story request for story by " +req.params.author + " and with slug : "+req.params.slug)
				res.send("Sorry, missing params");
			}else {

				Story = server.get("db").model("Story")

				Story.findOne({slug:req.params.slug}).where('author').equals(req.params.author).exec(function(err, story){
					if (!story) {
						res.send("Sorry, didn't catch that");
					}else{
						var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
						var publishedDate = monthNames[story.date.getMonth()]+" "+story.date.getFullYear();
						res.render('story', {title:story.title, story:story, post:require( "markdown" ).markdown.toHTML(story.post), date:publishedDate})
					}
				});
 			}
	 	}
	}
}