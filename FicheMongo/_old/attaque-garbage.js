const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Use = require('../usefull.js');


const AttaqueSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectID,
	dresseurName: String,
	idDiscord : String,
	NomPokemon : String,
	LevelPokemon : Number,
			Position : Number,
			Nom : String,
			PP : Number,
            PPmax : Number,
			Puissance : Number,
			Precision : Number,
			Type : String,
            Categorie : String,
            Priorité : Number,
	time: Date
});

module.exports = mongoose.model("Attaque", AttaqueSchema);


function Rand(valeur){
    return Math.floor(Math.random() * valeur +1);
}




