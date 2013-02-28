module.exports = function (basepath, server) {
	var fs = require('fs');
	var filesNamesArray = fs.readdirSync("./"+basepath);

	for (var i=filesNamesArray.length-1; i>=0; i--) {
		if (filesNamesArray[i] === "README.md" || filesNamesArray[i].search(".md") == -1) {
			filesNamesArray.splice(i, 1);
		}	
	}

	console.log ("Posts :"+filesNamesArray);

	// We now have all the posts, let's sync them now.

	var yamlFront = require('yaml-front-matter');

	var makeOrUpdateStory = require("../app/storySync.js");

	for (var i = filesNamesArray.length - 1; i >= 0; i--) {
			
		var yamlHeading = (yamlFront.loadFront("./"+basepath+"/"+filesNamesArray[i]));
		
		if (yamlHeading == undefined) {continue};

		if (i == 0) {
			makeOrUpdateStory(yamlHeading, server, require("../app/resetDBFlags.js"));
		}else {
			makeOrUpdateStory(yamlHeading, server);
		}
	}
}