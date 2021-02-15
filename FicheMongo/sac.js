const mongoose = require("mongoose");

const SacSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectID,
	dresseurName: String,
	idDiscord : String,
	balls : [String,String,String,String,String,String],
	ballsLeft :[Number,Number,Number,Number,Number,Number],
	ballsEmote : [String,String,String,String,String,String],
	ballsReaction : [String,String,String,String,String,String],
	healing : [String,String,String,String,String,String,String,String,String],
	healingLeft :[Number,Number,Number,Number,Number,Number,Number,Number,Number],
	healingEmote : [String,String,String,String,String,String,String,String,String],
	healingReaction : [String,String,String,String,String,String,String,String,String],
	objets :[String,String,String,String,String,String,String,String,String],
	objetsUsed :[String,String,String,String,String,String,String,String,String],
	objetsEmote : [String,String,String,String,String,String,String,String,String],
	objetsReaction : [String,String,String,String,String,String,String,String,String],
	itemZarude : Boolean,
	time: Date
});

module.exports = mongoose.model("Sac", SacSchema);