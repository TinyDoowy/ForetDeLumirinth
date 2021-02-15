const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const EquipeSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectID,
	dresseurName: String,
	idDiscord : String,
	Combien : Number,
	EquipePkm : [
		{
			Position : Number,
			Actif : Boolean,
			Nom : String,
			Emote : String,
			Reaction : String,
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
			Attaques: [
				{
					Position : Number,
					Nom : String,
					PP : Number,
		            PPmax : Number,
					Puissance : Number,
					Precision : Number,
					Type : String,
		            Categorie : String,
		            Priorité : Number
				},
				{
					Position : Number,
					Nom : String,
					PP : Number,
		            PPmax : Number,
					Puissance : Number,
					Precision : Number,
					Type : String,
		            Categorie : String,
		            Priorité : Number
				},
				{
					Position : Number,
					Nom : String,
					PP : Number,
		            PPmax : Number,
					Puissance : Number,
					Precision : Number,
					Type : String,
		            Categorie : String,
		            Priorité : Number
				},
				{
					Position : Number,
					Nom : String,
					PP : Number,
		            PPmax : Number,
					Puissance : Number,
					Precision : Number,
					Type : String,
		            Categorie : String,
		            Priorité : Number
				}
			],
			Objet : String
		},
		{
			Position : Number,
			Actif : Boolean,
			Nom : String,
			Emote : String,
			Reaction : String,
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
			Attaques: [
				{
					Position : Number,
					Nom : String,
					PP : Number,
		            PPmax : Number,
					Puissance : Number,
					Precision : Number,
					Type : String,
		            Categorie : String,
		            Priorité : Number
				},
				{
					Position : Number,
					Nom : String,
					PP : Number,
		            PPmax : Number,
					Puissance : Number,
					Precision : Number,
					Type : String,
		            Categorie : String,
		            Priorité : Number
				},
				{
					Position : Number,
					Nom : String,
					PP : Number,
		            PPmax : Number,
					Puissance : Number,
					Precision : Number,
					Type : String,
		            Categorie : String,
		            Priorité : Number
				},
				{
					Position : Number,
					Nom : String,
					PP : Number,
		            PPmax : Number,
					Puissance : Number,
					Precision : Number,
					Type : String,
		            Categorie : String,
		            Priorité : Number
				}
			],
			Objet : String
		},
		{
			Position : Number,
			Actif : Boolean,
			Nom : String,
			Emote : String,
			Reaction : String,
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
			Attaques: [
				{
					Position : Number,
					Nom : String,
					PP : Number,
		            PPmax : Number,
					Puissance : Number,
					Precision : Number,
					Type : String,
		            Categorie : String,
		            Priorité : Number
				},
				{
					Position : Number,
					Nom : String,
					PP : Number,
		            PPmax : Number,
					Puissance : Number,
					Precision : Number,
					Type : String,
		            Categorie : String,
		            Priorité : Number
				},
				{
					Position : Number,
					Nom : String,
					PP : Number,
		            PPmax : Number,
					Puissance : Number,
					Precision : Number,
					Type : String,
		            Categorie : String,
		            Priorité : Number
				},
				{
					Position : Number,
					Nom : String,
					PP : Number,
		            PPmax : Number,
					Puissance : Number,
					Precision : Number,
					Type : String,
		            Categorie : String,
		            Priorité : Number
				}
			],
			Objet : String
		},
		{
			Position : Number,
			Actif : Boolean,
			Nom : String,
			Emote : String,
			Reaction : String,
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
			Attaques: [
				{
					Position : Number,
					Nom : String,
					PP : Number,
		            PPmax : Number,
					Puissance : Number,
					Precision : Number,
					Type : String,
		            Categorie : String,
		            Priorité : Number
				},
				{
					Position : Number,
					Nom : String,
					PP : Number,
		            PPmax : Number,
					Puissance : Number,
					Precision : Number,
					Type : String,
		            Categorie : String,
		            Priorité : Number
				},
				{
					Position : Number,
					Nom : String,
					PP : Number,
		            PPmax : Number,
					Puissance : Number,
					Precision : Number,
					Type : String,
		            Categorie : String,
		            Priorité : Number
				},
				{
					Position : Number,
					Nom : String,
					PP : Number,
		            PPmax : Number,
					Puissance : Number,
					Precision : Number,
					Type : String,
		            Categorie : String,
		            Priorité : Number
				}
			],
			Objet : String
		}
	],
	time: Date
});

module.exports = mongoose.model("Equipe", EquipeSchema);




