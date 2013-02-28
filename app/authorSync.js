module.exports = function (yaml, server, next){

Author = server.get("db").model("Author")

Story.findOne({username:yaml.username}).exec(function(err, author){

	if (err) {
		console.log ("Error "+err+ " looking up user "+ yaml.username);
		return;
	}else {
		if (author){
			console.log("Updating User :" + yaml.username);
		}else {
			console.log("Creating User : "+ yaml.username);
			author = new Author({username:yaml.username});
		}

		author.bio = yaml.bio;
		author.fullname = yaml.bio;
		author.links.website = yaml.website;
		author.links.twitter = yaml.twitter;
		author.syncedInBatch = true;

		author.save(function (err, author){
			if (err) {
				console.log("Saving author :"+author.username+" failed");
			};

			if (next) {
				next(server, "Author");
			};
		});

	}
});

}