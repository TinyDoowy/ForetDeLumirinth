const mongoose = require("mongoose");

const JoueurSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectID,
	dresseurName: String,
	idDiscord : String,
	idRole : String,
	idSalon : String,
	Menu : {
		idMenu : String,
		Equipe : {
			idEquipe : String,
			idPokemon1 : [String,String],
			idPokemon2 : [String,String],
			idPokemon3 : [String,String],
			idPokemon4 : [String,String]
		},
		Sac : {
			idSac : String,
			idBalls : String,
			Soin : {
				idSoins : String,
				idChoisir : String,
				idHealing : String,
				idNoHealing : String
			},
			Objets : {
				idObjets : String,
				idDonner : String,
				idGiving : String,
				idNoGiving : String
			}
		},
		idFiche : String,
	},
	Rencontre : {
		EnCours : Boolean,
		Fuite : {
			idFuite : String,
			idCombat : String
		},
		Menu : {
			Attaque : {
				idAttaque1 : String,
				idAttaque2 : String,
				idAttaque3 : String,
				idAttaque4 : String
			},
			Pokemon : {
				idPokemon1 : String,
				idPokemon2 : String,
				idPokemon3 : String,
				idPokemon4 : String
			},
			Sac : {
				idSac : String,
				idBalls : String,
				Soin : {
					idSoins : String,
					idChoisir : String,
					idHealing : String,
					idNoHealing : String
				}
			},
			Fuite : {
				idFuite : String,
				idCombat : String
			}
		}
	},
	Compteur : {
		totale : Number,
		theffroiTrueShiny : Number,
		theffroiTrue : Number,
		theffroiFakeShiny : Number,
		theffroiFake : Number,
		grimalinShiny : Number,
		grimalin : Number,
		bibichutShiny : Number,
		bibichut : Number,
		ponytaDGShiny : Number,
		ponytaDG : Number,
		wimessirMShiny : Number,
		wimessirM : Number,
		wimessirFShiny : Number,
		wimessirF : Number
	},
	time: Date
});

module.exports = mongoose.model("Joueurs", JoueurSchema);