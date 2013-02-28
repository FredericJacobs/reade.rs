module.exports = function (server, who){
	
	Story = server.get("db").model("Story");
	Author = server.get("db").model("Author");


	var handleFlags = function (err, elements){
		if (elements) {
			for (var i = elements.length - 1; i >= 0; i--) {
				var element = elements[i];

				if (element.syncedInBatch) {
					element.syncedInBatch = false;
					element.save();
				}else{
					element.remove(function (err,element){
						if (!err) {
							console.log(element +" deleted");
						};
					})
				}
			}
		}
	};

	if (who == "Story") {
		Story.find(handleFlags);
	}else if (who == "Author"){
		Author.find(handleFlags);
	}
}