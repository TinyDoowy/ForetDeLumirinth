const mongoose = require("mongoose");
const PokemonSauvage = require("../FicheMongo/sauvage.js");
const Stats = require("../Fonctions/statistiques.js");


module.exports.Encounter = async (message, pokemon) => {

	switch (pokemon) {
		case "Theffroi" : var CourbeXP = "Moyenne"; var Level = Rand(3)+33; var pokeType = ["Spectre","vide","vide"]; var pokeTalent = ["Armurouillée","Armurouillée","Corps Maudit"];
			var pokeAttaque1 = ["Abri", 10, 0, 1, "Normal","Statut",4];
			var pokeAttaque2 = ["Coup Bas", 5, 70, 1, "Ténèbres","Physique",1];
			var pokeAttaque3 = ["Aromathérapie", 5, 0, 1, "Plante","Statut",0];
			if(Level==36){
				var pokeAttaque4 = ["Giga-Sangsue", 15, 40, 1, "Plante","Special",0];
			}else{
				var pokeAttaque4 = ["Méga-Sangsue", 10, 75, 1, "Plante","Special",0];
			}
		break;
		case "Grimalin" : var CourbeXP = "Moyenne"; var Level = Rand(3)+33; var pokeType = ["Ténèbres","Fée","vide"]; var pokeTalent = ["Farceur","Fouille","Pickpocket"];
			var pokeAttaque1 = ["Tourmente", 15, 0, 1, "Ténèbres","Statut",0];
			var pokeAttaque2 = ["Coup Bas", 5, 70, 1, "Ténèbres","Physique",1];
			var pokeAttaque3 = ["Vibrobscur", 15, 80, 1, "Ténèbres","Special",0];
			if(Level==36){
				var pokeAttaque4 = ["Machination", 20, 0, 1, "Ténèbres","Statut",0];
			}else{
				var pokeAttaque4 = ["Vantardise", 15, 0, 0.85, "Normal","Statut",0];
			}
		break;
		case "Bibichut" : var CourbeXP = "Lente"; var Level = Rand(3)+33; var pokeType = ["Psy","vide","vide"]; var pokeTalent = ["Coeur Soin","Anticipation","Miroir Magik"];
			var pokeAttaque1 = ["Rafale Psy", 20, 65, 1, "Psy","Special",0];
			var pokeAttaque2 = ["Vibra Soin", 10, 0, 1, "Psy","Statut",0];
			var pokeAttaque3 = ["Eclat Magique", 10, 80, 1, "Fée","Special",0];
			if(Level>=35){
				var pokeAttaque4 = ["Plénitude", 20, 0, 1, "Psy","Statut",0];
			}else{
				var pokeAttaque4 = ["Aromathérapie", 5, 0, 1, "Plante","Statut",0];
			}
		break;
		case "Ponyta de Galar" : var CourbeXP = "Moyenne"; var Level = Rand(3)+33; var pokeType = ["Psy","vide","vide"]; var pokeTalent = ["Fuite","Voile Pastel","Anticipation"];
			var pokeAttaque1 = ["Rafale Psy", 20, 65, 1, "Psy","Special",0];
			var pokeAttaque2 = ["Hâte", 30, 0, 1, "Psy","Statut",0];
			var pokeAttaque3 = ["Ecrasement", 10, 65, 1, "Normal","Physique",0];
			if(Level>=35){
				var pokeAttaque4 = ["Vibra Soin", 10, 0, 1, "Psy","Statut",0];
			}else{
				var pokeAttaque4 = ["Vent Féérique", 30, 40, 1, "Fée","Special",0];
			}
		break;
		case "Wimessir ♂️" : var CourbeXP = "Rapide"; var Level = Rand(3)+33; var pokeType = ["Psy","Normal","vide"]; var pokeTalent = ["Attention","Synchro","Créa-Psy"];
			var pokeAttaque1 = ["Coup d'Main", 20, 0, 1, "Normal","Statut",5];
			var pokeAttaque2 = ["Après Vous", 15, 0, 1, "Normal","Statut",0];
			var pokeAttaque3 = ["Aromathérapie", 5, 0, 1, "Plante","Statut",0];
			if(Level>=35){
				var pokeAttaque4 = ["Psyko", 10, 90, 1, "Psy","Special",0];
			}else{
				var pokeAttaque4 = ["Rafale Psy", 20, 65, 1, "Psy","Special",0];
			}
		break;
		case "Wimessir ♀️" : var CourbeXP = "Rapide"; var Level = Rand(3)+33; var pokeType = ["Psy","Normal","vide"]; var pokeTalent = ["Tempo Perso","Synchro","Créa-Psy"];
			var pokeAttaque1 = ["Coup d'Main", 20, 0, 1, "Normal","Statut",5];
			var pokeAttaque2 = ["Par Ici", 20, 0, 1, "Normal","Statut",2];
			var pokeAttaque3 = ["Aromathérapie", 5, 0, 1, "Plante","Statut",0];
			if(Level>=35){
				var pokeAttaque4 = ["Psyko", 10, 90, 1, "Psy","Special",0];
			}else{
				var pokeAttaque4 = ["Rafale Psy", 20, 65, 1, "Psy","Special",0];
			}
		break;
		default : break;
	}



	var randTalent = Rand(100);
	switch (true){
		case randTalent<=40 : var realTalent = pokeTalent[0]; break;
		case randTalent>=41 && randTalent<=80 : var realTalent = pokeTalent[1]; break;
		case randTalent>=81 : var realTalent = pokeTalent[2]; break;
		default :  var realTalent = pokeTalent[0]; break;
	}


    const RencontreSauvage = new PokemonSauvage({
    _id : mongoose.Types.ObjectId(),
    dresseurName: message.author.username,
    idDiscord : message.author.id,
	idCombat : "",
    Pokemon : {
        Actif : true,
        Nom : pokemon,
        Surnom : "",
        NiveauXP : [CourbeXP,Level,0],
        PV : 0,
        Type : pokeType,
        Talent : realTalent,
        Statut : ["",""],
        BaseStat : await Stats.BaseStat(pokemon),
        IVs : await Stats.IVs(),
        EVs : [0,0,0,0,0,0],
        Nature : await Stats.Nature(),
        StatFinal : [0,0,0,0,0,0],
        BoostCombat : [0,0,0,0,0,0,0],
		Attaques: [
			{
				Position : 1,
				Nom : pokeAttaque1[0],
				PP : Number(pokeAttaque1[1]),
	            PPmax : Number(pokeAttaque1[1]),
				Puissance : Number(pokeAttaque1[2]),
				Precision : Number(pokeAttaque1[3]),
				Type : pokeAttaque1[4],
	            Categorie : pokeAttaque1[5],
	            Priorité : Number(pokeAttaque1[6])
			},
			{
				Position : 2,
				Nom : pokeAttaque2[0],
				PP : Number(pokeAttaque2[1]),
	            PPmax : Number(pokeAttaque2[1]),
				Puissance : Number(pokeAttaque2[2]),
				Precision : Number(pokeAttaque2[3]),
				Type : pokeAttaque2[4],
	            Categorie : pokeAttaque2[5],
	            Priorité : Number(pokeAttaque2[6])
			},
			{
				Position : 3,
				Nom : pokeAttaque3[0],
				PP : Number(pokeAttaque3[1]),
	            PPmax : Number(pokeAttaque3[1]),
				Puissance : Number(pokeAttaque3[2]),
				Precision : Number(pokeAttaque3[3]),
				Type : pokeAttaque3[4],
	            Categorie : pokeAttaque3[5],
	            Priorité : Number(pokeAttaque3[6])
			},
			{
				Position : 4,
				Nom : pokeAttaque4[0],
				PP : Number(pokeAttaque4[1]),
	            PPmax : Number(pokeAttaque4[1]),
				Puissance : Number(pokeAttaque4[2]),
				Precision : Number(pokeAttaque4[3]),
				Type : pokeAttaque4[4],
	            Categorie : pokeAttaque4[5],
	            Priorité : Number(pokeAttaque4[6])
			}
		],
        Objet : ""
    },
    time: Date()
    });

	await RencontreSauvage.save().then(result => console.log(result)).catch(err => console.log(err));


	var ficheEncounter = await PokemonSauvage.findOne({idDiscord: message.author.id});
	await console.log("ficheEncounter : "+ficheEncounter);
	var FinalCalculTotal = await Stats.calculStats(ficheEncounter.Pokemon.NiveauXP, ficheEncounter.Pokemon.BaseStat, ficheEncounter.Pokemon.IVs, ficheEncounter.Pokemon.EVs,ficheEncounter.Pokemon.Nature);
	await console.log("FinalCalculTotal : "+FinalCalculTotal);
	await PokemonSauvage.findOneAndUpdate({idDiscord: message.author.id}, {'Pokemon.StatFinal' : FinalCalculTotal, 'Pokemon.PV' : FinalCalculTotal[0]});

}



function Rand(valeur){
    return Math.floor(Math.random() * valeur +1);
}

