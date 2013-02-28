/* Let's explain the sync process, 

1) git pull 

2) Flag "wasSynced" is 0 before the sync. Nothing to do now but will help to find duplicated

3) Loop all files, if exists, update record, if it doesn't create it, and update all flags of synced elements to 1.

4) Delete all records where the sync flag is 0

5) Set all flags to 0

*/

module.exports = function (server, next){

	return {

		sync : function (req, res){

			Git = require ("git-wrapper");
			var git = new Git({'git-dir':'./posts/.git', 'work-tree':"./"})

			git.exec("pull", function (){


				var fs = require('fs');
				var filesNamesArray = fs.readdirSync("./posts");

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
		var yamlHeading = (yamlFront.loadFront("./posts/"+filesNamesArray[i]));
		
		if (i == 0) {
			makeOrUpdateStory(yamlHeading, server, require("../app/resetDBFlags.js"));
		}else {
			makeOrUpdateStory(yamlHeading, server);
		}
	}

	// Now that all posts have been synced, it's time to sync authors

	var makeOrUpdateAuthor = require("../app/authorSync.js");

	var authorFilesNamesArray = fs.readdirSync("./posts/authors");

	for (var i=authorFilesNamesArray.length-1; i>=0; i--) {
					if (authorFilesNamesArray[i].search(".md") == -1) {
						authorFilesNamesArray.splice(i, 1);
					}
				}
	for (var i = authorFilesNamesArray.length - 1; i >= 0; i--) {
		var yaml = (yamlFront.loadFront("./posts/authors/"+authorFilesNamesArray[i]));

		if (i == 0) {
			makeOrUpdateAuthor(yaml, server, require("../app/resetDBFlags.js"));
		}else {
			makeOrUpdateAuthor(yaml, server);
		}
	}


	res.send("Ok Chief !");

});
		}
	}
}