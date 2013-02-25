module.exports = function(req, res){

/* Let's explain the sync process, 

1) git pull 

2) Flag "wasSynced" is 0 before the sync. Nothing to do now but will help to find duplicated

3) Loop all files, if exists, update record, if it doesn't create it, and update all flags of synced elements to 1.

4) Delete all records where the sync flag is 0

5) Set all flags to 0

*/

// -1-

	Git = require ("git-wrapper");
	var git = new Git({'git-dir':'./posts/.git', 'work-tree':"./"})

	git.exec("pull", function (){

	//- 2 - 

	var fs = require('fs');
	var filesNamesArray = fs.readdirSync("./posts");

	// Lets only take the markdown files for the posts, syncing authors later

	for (var i=filesNamesArray.length-1; i>=0; i--) {
	    if (filesNamesArray[i] === "README.md" || filesNamesArray[i].search(".md") == -1) {
	        filesNamesArray.splice(i, 1);
	    }
	}

	console.log ("Posts :"+filesNamesArray);

	// We now have all the posts, let's sync them now.

	var Story = 

	var yamlFront = require('yaml-front-matter');

	for (var i = filesNamesArray.length - 1; i >= 0; i--) {
		var yamlHeading = (yamlFront.loadFront("./posts/"+filesNamesArray[i]));

		console.log(yamlHeading);



	}


	res.send("Synced");
	console.log("Synced");


};