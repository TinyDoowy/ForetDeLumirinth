const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Use = require('../usefull.js');
const Attaque = require('./attaque.js');


const natures = ["Hardi","Solo","Rigide","Mauvais","Brave","Assuré","Docile","Malin","Lâche","Relax","Modeste","Doux","Pudique","Foufou","Discret","Calme","Gentil","Prudent","Bizarre","Malpoli","Timide","Pressé","Jovial","Naïf","Sérieux"];


const PokemonSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectID,
	dresseurName: String,
	idDiscord : String,
		Actif : Boolean,
		Position : Number,
		Nom : String,
		Surnom : String,
		NiveauXP : [String,Number,Number],
		PV : Number,
		Type : [String,String,String],
		Talent : String,
		Statut : [String,String],
		BaseStat : [Number,Number,Number,Number,Number,Number],
		IVs : [Number,Number,Number,Number,Number,Number],
		EVs : [Number,Number,Number,Number,Number,Number],
		Nature : [String,Number,Number,Number,Number,Number,Number],
		StatFinal : [Number,Number,Number,Number,Number,Number],
		BoostCombat : [Number,Number,Number,Number,Number,Number,Number],
		Attaques: [{ type: Schema.Types.ObjectId, ref: 'Attaque' }],
		Objet : String,
	time: Date
});

module.exports = mongoose.model("Pokemon", PokemonSchema);


function Rand(valeur){
    return Math.floor(Math.random() * valeur +1);
}




