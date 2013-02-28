module.exports = function (server){
	
	Story = server.get("db").model("Story");

	Story.find(function(err, stories){
		if (stories) {
			for (var i = stories.length - 1; i >= 0; i--) {
				var story = stories[i];

				if (story.syncedInBatch) {
					console.log("Ressetting flag")
					story.syncedInBatch = false;
					story.save();
				}else{
					story.remove(function (err,story){
						if (!err) {
							console.log(story+"deleted");
						};
					})
				}
			}
		}
	});
}