module.exports = function(req, res){

/* Let's explain the sync process, 

1) git pull 

2) Flag "wasSynced" is 0 before the sync. Nothing to do now but will help to find duplicated

3) Loop all files, if exists, update record, if it doesn't create it, and update all flags of synced elements to 1.

4) Delete all records where the sync flag is 0

*/

// -1-

	var git = new Git({'git-dir':'../posts/.git'})



	res.send("Synced");
	console.log("Synced");
};