module.exports = function (yaml, server, next) {

// Process is easy, identify if it's existing. Update it  or create it.
Story = server.get("db").model("Story")

Story.findOne({title:yaml.title}).where('author').equals(yaml.author).exec(function(err, story){

	if (err) {
		console.log ("Error :"+err);
		return;
	}else {
		if (story){
			console.log("Updating post :" + yaml.title);
		}else {
			console.log("Creating post :" + yaml.title);
			story = new Story({title:yaml.title});
			story.author = yaml.author;
		}

		story.layout = yaml.layout;
		story.published = yaml.published == true;
		story.publishedAt = new Date(yaml.publishedAt);
		story.slug = yaml.slug;
		story.category = yaml.category;
		story.tags = yaml.tags;
		story.post = yaml.__content;
		story.thumbnail = yaml.thumbnail;
		story.syncedInBatch = true;

		story.save(function (err, story){
			if (err) {
				console.log("Saving : "+ story.title +" failed");
			};

			if (next) {
				next(server, "Story");
			};
		});

	}
});

}