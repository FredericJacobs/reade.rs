// This function is called to initialize the mongoose db schemes
module.exports = function (server){

var mongoose = server.get('db')

var authorSchema = new mongoose.Schema({
	bio : String,
	fullname : String,
	username : String,
	links : {
		twitter : String,
		website : String
	},
	syncedInBatch : Boolean
});

var storySchema = new mongoose.Schema ({
	layout : String,
	title : String,
	author : String,
	published : Boolean,
	slug : String,
	publishedAt : Date,
	category : Array,
	tags : Array,
	post : String,
	thumbnail : String,
	syncedInBatch : Boolean
});

 mongoose.model('Author', authorSchema);
 mongoose.model('Story', storySchema);

};