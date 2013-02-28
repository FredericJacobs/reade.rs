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
			fs = require ("fs");
			yamlFront = require ("yaml-front-matter")

			git.exec("pull", function (){

				// Let's start by syncing stories
				var authorsDirectoriesArray = [];
				var basepath = './posts/authors';

				var files = fs.readdirSync(basepath);

				if (files == undefined) {
					console.log ("Posts Not Found");
					return
				} else{
					for (var i = files.length - 1; i >= 0; i--) {
					var fileOrFolder = fs.lstatSync(basepath+"/"+files[i]);
					if(fileOrFolder.isDirectory()){
						authorsDirectoriesArray.push(files[i]);
						console.log("Processing Author : " + files[i]);
						}
					}
				}

				// We now have all the author folders. Let's sync the authors.
				var makeOrUpdateAuthor = require("../app/authorSync.js");

				for (var i = authorsDirectoriesArray.length - 1; i >= 0; i--) {
					var yaml;

					try {
						yaml = require("."+basepath+"/"+authorsDirectoriesArray[i]+"/"+"author_description.yaml");
					} catch (e){
						console.log(e.stack || e.toString());
						continue;
					}

					if (yaml == undefined) {continue;};
					if (i == 0) {
						makeOrUpdateAuthor(yaml, server, require("../app/resetDBFlags.js"));
					}else {
						makeOrUpdateAuthor(yaml, server);
					}
					
				};

				// We now have all the authors in the db. Let's sync their posts.

				var makeOrUpdateStory = require("../app/storySync.js");

				for (var i = authorsDirectoriesArray.length - 1; i >= 0; i--) {
					
					var postsFileArray = fs.readdirSync(basepath +"/"+authorsDirectoriesArray[i]+"/posts");

					for (var j = postsFileArray.length - 1; j >= 0; j--) {
						
						if (postsFileArray[j].search(".md") == -1) {
							if (i == 0 && j == 0) {(require("../app/resetDBFlags.js"))(server, "Story")};
							continue;
						};

						var yaml = (yamlFront.loadFront(basepath+"/"+authorsDirectoriesArray[i]+"/posts/"+postsFileArray[j]));
						if (yaml == undefined) {continue;};

						if (i == 0 && j==0) {
							makeOrUpdateStory(yaml, server, require("../app/resetDBFlags.js"));
						}else {
							makeOrUpdateStory(yaml, server);
						}
					};
				};

				res.send("Ok Chief !");

			});
		}
	}
}