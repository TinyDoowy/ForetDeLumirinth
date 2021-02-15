
var Discord = require('discord.js');
var auth = require('../auth.json');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Stats = require("./statistiques.js");
const Equipe = require("../FicheMongo/equipe.js");
const PokemonSauvage = require("../Combat/rencontre.js");
const Sac = require("../FicheMongo/sac.js");
const Dresseurs = require("../FicheMongo/joueur.js");
const Spawn = require("../FicheMongo/sauvage.js");

function Rand(valeur){return Math.floor(Math.random() * valeur +1);}


module.exports.createJoueur = async (message) => {

    	//bloc création équipe//
        await Dresseurs.findOneAndUpdate({idDiscord: message.author.id}, {
				dresseurName: message.author.username,
				idDiscord : message.author.id,
				idRole : "",
				idSalon : "",
				Menu : {
					idMenu : "",
					Equipe : {
						idEquipe : "",
						idPokemon1 : ["",""],
						idPokemon2 : ["",""],
						idPokemon3 : ["",""],
						idPokemon4 : ["",""]
					},
					Sac : {
						idSac : "",
						idBalls : "",
						Soin : {
							idSoins : "",
							idChoisir : "",
							idHealing : "",
							idNoHealing : ""
						},
						Objets : {
							idObjets : "",
							idDonner : "",
							idGiving : "",
							idNoGiving : ""
						}
					},
					idFiche : "",
				},
				Rencontre : {
					EnCours : false,
					Fuite : {
						idFuite : "",
						idCombat : ""
					},
					Menu : {
						Attaque : {
							idAttaque1 : "",
							idAttaque2 : "",
							idAttaque3 : "",
							idAttaque4 : ""
						},
						Pokemon : {
							idPokemon1 : "",
							idPokemon2 : "",
							idPokemon3 : "",
							idPokemon4 : ""
						},
						Sac : {
							idSac : "",
							idBalls : "",
							Soin : {
								idSoins : "",
								idChoisir : "",
								idHealing : "",
								idNoHealing : ""
							}
						},
						Fuite : {
							idFuite : "",
							idCombat : ""
						}
					}
				},
				Compteur : {
					totale : 0,
					theffroiTrueShiny : 0,
					theffroiTrue : 0,
					theffroiFakeShiny : 0,
					theffroiFake : 0,
					grimalinShiny : 0,
					grimalin : 0,
					bibichutShiny : 0,
					bibichut : 0,
					ponytaDGShiny : 0,
					ponytaDG : 0,
					wimessirMShiny : 0,
					wimessirM : 0,
					wimessirFShiny : 0,
					wimessirF : 0
				},
				time: Date()

        }, {upsert: true, new: true}, function(err, result) {
            if(err) {
                console.log("Erreur: " + err);
            } else {
                console.log("Result: " + result);
            };
        });
}

///ATTENTION à utiliser après createJoueur///
module.exports.createForest = async (message) => {

    // Create a new role with data and a reason
    let tempRole = await message.guild.roles.create({
        data: {
        name: 'shasse-de-'+message.author.username,
        color: 'WHITE',
            },
        permissionOverwrites: [{deny:['MENTION_EVERYONE']}],
        reason: "Voici le rôle de la shasse de : "+message.author.username,
    })

    // Create a new channel with permission overwrites
    let tempChannel = await message.guild.channels.create('foret-de-'+message.author.username, {
        type: 'text',
        parent: auth.server.categorie.foret,
        permissionOverwrites: [
            {
            id: tempRole,
            allow: ['VIEW_CHANNEL','READ_MESSAGE_HISTORY','SEND_MESSAGES'],
            deny: ['ADD_REACTIONS']
                },
            {
            id: auth.server.role.staff,
            allow: ['VIEW_CHANNEL','READ_MESSAGE_HISTORY','SEND_MESSAGES']
                },
            {
            id: auth.server.role.everyone,
            deny: ['VIEW_CHANNEL','READ_MESSAGE_HISTORY','SEND_MESSAGES']
                },
              ],
    })

    //update la fiche de l'autheur avec les rôles et salons associés
    await Dresseurs.findOneAndUpdate({ idDiscord: message.author.id }, { dresseurName: message.author.username, idRole: tempRole, idSalon: tempChannel, time:Date() });
    var dresseurUpdate = await Dresseurs.findOne({idDiscord: message.author.id});
    console.log ('fiche de l utlisateur update : '+dresseurUpdate);
    //Ajout des roles de son salon et pour l'empêcher de recréer un autre salon.
    await message.guild.members.fetch(message.author.id).then((auteurShasse) => {
    auteurShasse.roles.add(tempRole);
    auteurShasse.roles.add(auth.server.role.shasse);})

    return tempChannel;
}

module.exports.createSac = async (message) => {

    	//bloc création équipe//
        await Sac.findOneAndUpdate({idDiscord: message.author.id}, {
				dresseurName: message.author.username,
				idDiscord : message.author.id,
			    balls : ["PokéBall","SuperBall","HyperBall","HonorBall","LuxeBall","ScubaBall"],
			    ballsLeft :[5,2,1,1,0,0],
			    ballsEmote : [auth.server.emoteMessage.poke,auth.server.emoteMessage.super,auth.server.emoteMessage.hyper,auth.server.emoteMessage.honor,auth.server.emoteMessage.luxe,auth.server.emoteMessage.scuba],
			    ballsReaction : [auth.server.emoteReaction.poke,auth.server.emoteReaction.super,auth.server.emoteReaction.hyper,auth.server.emoteReaction.honor,auth.server.emoteReaction.luxe,auth.server.emoteReaction.scuba],
			    healing : ["Super Potion","Hyper Potion","Guérison","Antidote","Réveil","Anti-Brûle","Anti-Para","Rappel","Rappel Max"],
			    healingLeft :[3,1,1,2,1,1,1,2,0],
			    healingEmote : ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'],
			    healingReaction : ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'],
			    objets :["Restes","Veste de Combat","Orbe Vie","Mouchoir Choix","Lunette Choix","Bandeau Choix","Casque Brut","Boule Fumée","Ceinture Force"],
			    objetsUsed :["disponible","disponible","disponible","disponible","disponible","disponible","disponible","disponible","disponible"],
			    objetsEmote : ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'],
			    objetsReaction : ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'],
			    itemZarude : false,
				time: Date()

        }, {upsert: true, new: true}, function(err, result) {
            if(err) {
                console.log("Erreur: " + err);
            } else {
                console.log("Result: " + result);
            };
        });
}

module.exports.createEquipe = async (message) => {

    	//bloc création équipe//
        await Equipe.findOneAndUpdate({idDiscord: message.author.id}, {
            idDiscord: message.author.id, 
            dresseurName: message.author.username, 
            Combien : 3,
			EquipePkm : [
				{
					Position : 1,
					Actif : true,
					Nom : "Gorythmic",
					Emote : auth.server.emoteMessage.gorythmic,
					Reaction : auth.server.emoteReaction.gorythmic,
					Surnom : "Glorythmic",
					NiveauXP : ["Parabolique",(Rand(8)+36),0],
			        PV : 0,
			        Type : ["Plante","vide","vide"],
			        Talent : "Engrais",
			        Statut : ["",""],
			        BaseStat : await Stats.BaseStat("Gorythmic"),
			        IVs : await Stats.IVs(),
			        EVs : await Stats.EVs(),
			        Nature : await Stats.Nature(),
			        StatFinal : [0,0,0,0,0,0],
			        BoostCombat : [0,0,0,0,0,0,0],
			        Attaques: [
			            {
			                Position : 1,
				            Nom : "Faux-Chage",
				            PP : 40,
				            PPmax : 40,
				            Puissance : 40,
				            Precision : 1,
				            Type : "Normal",
				            Categorie : "Physique",
				            Priorité : 0
				       	},
			            {
			                Position : 2,
				            Nom : "Tranch'Herbe",
				            PP : 25,
				            PPmax : 25,
				            Puissance : 55,
				            Precision : 0.95,
				            Type : "Plante",
				            Categorie : "Physique",
				            Priorité : 0
				        },
			            {
			                Position : 3,
				            Nom : "Champ Herbu",
				            PP : 10,
				            PPmax : 10,
				            Puissance : 0,
				            Precision : 1,
				            Type : "Plante",
				            Categorie : "Statut",
				            Priorité : 0
				        },
			            {
			                Position : 4,
				            Nom : "Séisme",
				            PP : 10,
				            PPmax : 10,
				            Puissance : 100,
				            Precision : 1,
				            Type : "Sol",
				            Categorie : "Physique",
				            Priorité : 0
				        },
				    ],
			        Objet : "Aucun"
				},
				{
					Position : 2,
			        Actif : false,
			        Nom : "Pyrobut",
					Emote : auth.server.emoteMessage.pyrobut,
					Reaction : auth.server.emoteReaction.pyrobut,
			        Surnom : "Pureibut",
			        NiveauXP : ["Parabolique",(Rand(8)+36),0],
			        PV : 0,
			        Type : ["Feu","vide","vide"],
			        Talent : "Brasier",
			        Statut : ["",""],
			        BaseStat : await Stats.BaseStat("Pyrobut"),
			        IVs : await Stats.IVs(),
			        EVs : await Stats.EVs(),
			        Nature : await Stats.Nature(),
			        StatFinal : [0,0,0,0,0,0],
			        BoostCombat : [0,0,0,0,0,0,0],
			        Attaques: [
			            {
			                Position : 1,
				            Nom : "Nitrocharge",
				            PP : 20,
				            PPmax : 20,
				            Puissance : 50,
				            Precision : 1,
				            Type : "Feu",
				            Categorie : "Physique",
				            Priorité : 0
				       	},
			            {
			                Position : 2,
				            Nom : "Double Pied",
				            PP : 30,
				            PPmax : 30,
				            Puissance : 30,
				            Precision : 1,
				            Type : "Combat",
				            Categorie : "Physique",
				            Priorité : 0
				        },
			            {
			                Position : 3,
				            Nom : "Abri",
				            PP : 10,
				            PPmax : 10,
				            Puissance : 0,
				            Precision : 1,
				            Type : "Normal",
				            Categorie : "Statut",
				            Priorité : 4
				        },
			            {
			                Position : 4,
				            Nom : "Détricanon",
				            PP : 5,
				            PPmax : 5,
				            Puissance : 120,
				            Precision : 0.8,
				            Type : "Poison",
				            Categorie : "Physique",
				            Priorité : 0
				        },
				    ],
			        Objet : "Aucun"
				},
				{
					Position : 3,
			        Actif : false,
			        Nom : "Lezargus",
					Emote : auth.server.emoteMessage.lezargus,
					Reaction : auth.server.emoteReaction.lezargus,
			        Surnom : "Leenargus",
			        NiveauXP : ["Parabolique",46,0],
			        PV : 0,
			        Type : ["Eau","vide","vide"],
			        Talent : "Torrent",
			        Statut : ["",""],
			        BaseStat : await Stats.BaseStat("Lezargus"),
			        IVs : await Stats.IVs(),
			        EVs : await Stats.EVs(),
			        Nature : await Stats.Nature(),
			        StatFinal : [0,0,0,0,0,0],
			        BoostCombat : [0,0,0,0,0,0,0],
			        Attaques: [
			            {
			                Position : 1,
				            Nom : "Demi-Tour",
				            PP : 20,
				            PPmax : 20,
				            Puissance : 70,
				            Precision : 1,
				            Type : "Insecte",
				            Categorie : "Physique",
				            Priorité : 0
				       	},
			            {
			                Position : 2,
				            Nom : "Détrempage",
				            PP : 20,
				            PPmax : 20,
				            Puissance : 0,
				            Precision : 1,
				            Type : "Eau",
				            Categorie : "Statut",
				            Priorité : 0
				        },
			            {
			                Position : 3,
				            Nom : "Aqua-Brèche",
				            PP : 10,
				            PPmax : 10,
				            Puissance : 85,
				            Precision : 1,
				            Type : "Eau",
				            Categorie : "Physique",
				            Priorité : 0
				        },
			            {
			                Position : 4,
				            Nom : "Laser Glace",
				            PP : 10,
				            PPmax : 10,
				            Puissance : 90,
				            Precision : 1,
				            Type : "Glace",
				            Categorie : "Special",
				            Priorité : 0
				        },
				    ],
			        Objet : "Aucun"
				},
				{
					Position : 4,
					Actif : false,
					Nom : "",
					Emote : '❓',
					Reaction : '❓',
					Surnom : "",
					NiveauXP : ["",0,0],
			        PV : 0,
			        Type : ["vide","vide","vide"],
			        Talent : "",
			        Statut : ["",""],
			        BaseStat : [0,0,0,0,0,0,0],
			        IVs : [0,0,0,0,0,0,0],
			        EVs : [0,0,0,0,0,0,0],
			        Nature : ["",0,0,0,0,0,0],
			        StatFinal : [0,0,0,0,0,0],
			        BoostCombat : [0,0,0,0,0,0,0],
			        Attaques: [
			            {
			                Position : 1,
				            Nom : "",
				            PP : 0,
				            PPmax : 0,
				            Puissance : 0,
				            Precision : 1,
				            Type : "",
				            Categorie : "",
				            Priorité : 0
				       	},
			            {
			                Position : 2,
				            Nom : "",
				            PP : 0,
				            PPmax : 0,
				            Puissance : 0,
				            Precision : 1,
				            Type : "",
				            Categorie : "",
				            Priorité : 0
				        },
			            {
			                Position : 3,
				            Nom : "",
				            PP : 0,
				            PPmax : 0,
				            Puissance : 0,
				            Precision : 1,
				            Type : "",
				            Categorie : "",
				            Priorité : 0
				        },
			            {
			                Position : 4,
				            Nom : "",
				            PP : 0,
				            PPmax : 0,
				            Puissance : 0,
				            Precision : 1,
				            Type : "",
				            Categorie : "",
				            Priorité : 0
				        },
				    ],
			        Objet : "Aucun"
				},
			]
        }, {upsert: true, new: true}, function(err, result) {
            if(err) {
                console.log("Erreur: " + err);
            } else {
                console.log("Result: " + result);
            };
        });

		var fiche = await Equipe.findOne({idDiscord: message.author.id});
		//console.log(fiche.EquipePkm[0].NiveauXP);
		for(k=0;k<fiche.EquipePkm.length;k++){
			var FinalCalculTotal = await Stats.calculStats(fiche.EquipePkm[k].NiveauXP, fiche.EquipePkm[k].BaseStat, fiche.EquipePkm[k].IVs, fiche.EquipePkm[k].EVs,fiche.EquipePkm[k].Nature);
			console.log(FinalCalculTotal);
			await Equipe.findOneAndUpdate({idDiscord: message.author.id},{ $set : {'EquipePkm.$[elem].StatFinal' : FinalCalculTotal, 'EquipePkm.$[elem].PV' : FinalCalculTotal[0]}},{ "arrayFilters": [{ "elem.Position": k+1 }]});
		}
		//fin bloc création équipe//
}

module.exports.createSpawn = async (message) => {


	var rencontre = Rand(50);
    //var rencontre = 43;
	console.log("rencontre : "+rencontre);


            var ficheRencontre = await Dresseurs.findOne({idDiscord: message.author.id});
            await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{'rencontre.totale' : ficheRencontre.rencontre.totale+1});


            await Spawn.deleteOne({idDiscord: message.author.id});


            switch(true){
                case rencontre<=1 :
                    var quelEstCePokemon = "Théffroi __**Authentique**__ :sparkles:**Shiny**:sparkles:";
                    var attachment = new Discord.MessageAttachment('./Images/Rencontre/SPOILER_Theffroi.png');
                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{'rencontre.theffroiTrueShiny' : ficheRencontre.rencontre.theffroiTrueShiny+1});
                    await PokemonSauvage.Encounter(message,"Theffroi");
                break;
                case rencontre==2||rencontre==3 :
                    var quelEstCePokemon = "Théffroi __**Authentique**__";
                    var attachment = new Discord.MessageAttachment('./Images/Rencontre/Theffroi.png');
                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{'rencontre.theffroiTrue' : ficheRencontre.rencontre.theffroiTrue+1});
                    await PokemonSauvage.Encounter(message,"Theffroi");
                break;
                case rencontre==4||rencontre==5 :
                    var quelEstCePokemon = "Théffroi Contrefaçon :sparkles:**Shiny**:sparkles:";
                    var attachment = new Discord.MessageAttachment('./Images/Rencontre/SPOILER_Theffroi.png');
                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{'rencontre.theffroiFakeShiny' : ficheRencontre.rencontre.theffroiFakeShiny+1});
                    await PokemonSauvage.Encounter(message,"Theffroi");
                break;
                case rencontre>=6&&rencontre<=10 :
                    var quelEstCePokemon = "Théffroi Contrefaçon";
                    var attachment = new Discord.MessageAttachment('./Images/Rencontre/Theffroi.png');
                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{'rencontre.theffroiFake' : ficheRencontre.rencontre.theffroiFake+1});
                    await PokemonSauvage.Encounter(message,"Theffroi");
                break;
                case rencontre>=11&&rencontre<=13 :
                    var quelEstCePokemon = "Grimalin :sparkles:**Shiny**:sparkles:";
                    var attachment = new Discord.MessageAttachment('./Images/Rencontre/SPOILER_Grimalin.png');
                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{'rencontre.grimalinShiny' : ficheRencontre.rencontre.grimalinShiny+1});
                    await PokemonSauvage.Encounter(message,"Grimalin");
                break;
                case rencontre>=14&&rencontre<=20 :
                    var quelEstCePokemon = "Grimalin";
                    var attachment = new Discord.MessageAttachment('./Images/Rencontre/Grimalin.png');
                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{'rencontre.grimalin' : ficheRencontre.rencontre.grimalin+1});
                    await PokemonSauvage.Encounter(message,"Grimalin");
                break;
                case rencontre>=21&&rencontre<=23 :
                    var quelEstCePokemon = "Bibichut :sparkles:**Shiny**:sparkles:";
                    var attachment = new Discord.MessageAttachment('./Images/Rencontre/SPOILER_Bibichut.png');
                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{'rencontre.bibichutShiny' : ficheRencontre.rencontre.bibichutShiny+1});
                    await PokemonSauvage.Encounter(message,"Bibichut");
                break;
                case rencontre>=24&&rencontre<=30 :
                    var quelEstCePokemon = "Bibichut";
                    var attachment = new Discord.MessageAttachment('./Images/Rencontre/Bibichut.png');
                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{'rencontre.bibichut' : ficheRencontre.rencontre.bibichut+1});
                    await PokemonSauvage.Encounter(message,"Bibichut");
                break;
                case rencontre>=31&&rencontre<=33 :
                    var quelEstCePokemon = "Ponyta de Galar :sparkles:**Shiny**:sparkles:";
                    var attachment = new Discord.MessageAttachment('./Images/Rencontre/SPOILER_PonytaDeGalar.png');
                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{'rencontre.ponytaDGShiny' : ficheRencontre.rencontre.ponytaDGShiny+1});
                    await PokemonSauvage.Encounter(message,"Ponyta de Galar");
                break;
                case rencontre>=34&&rencontre<=40 :
                    var quelEstCePokemon = "Ponyta de Galar";
                    var attachment = new Discord.MessageAttachment('./Images/Rencontre/PonytaDeGalar.png');
                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{'rencontre.ponytaDG' : ficheRencontre.rencontre.ponytaDG+1});
                    await PokemonSauvage.Encounter(message,"Ponyta de Galar");
                break;
                case rencontre==41 :
                    var quelEstCePokemon = "Wimessir ♂️ :sparkles:**Shiny**:sparkles:";
                    var attachment = new Discord.MessageAttachment('./Images/Rencontre/SPOILER_WimessirM.png');
                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{'rencontre.wimessirMShiny' : ficheRencontre.rencontre.wimessirMShiny+1});
                    await PokemonSauvage.Encounter(message,"Wimessir ♂️");
                break;
                case rencontre==42 :
                    var quelEstCePokemon = "Wimessir ♀️ :sparkles:**Shiny**:sparkles:";
                    var attachment = new Discord.MessageAttachment('./Images/Rencontre/SPOILER_WimessirF.png');
                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{'rencontre.wimessirFShiny' : ficheRencontre.rencontre.wimessirFShiny+1});
                    await PokemonSauvage.Encounter(message,"Wimessir ♀️");
                break;
                case rencontre>=43&&rencontre<=46 :
                    var quelEstCePokemon = "Wimessir ♂️";
                    var attachment = new Discord.MessageAttachment('./Images/Rencontre/WimessirM.png');
                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{'rencontre.wimessirM' : ficheRencontre.rencontre.wimessirM+1});
                    await PokemonSauvage.Encounter(message,"Wimessir ♂️");
                break;
                case rencontre>=47 :
                    var quelEstCePokemon = "Wimessir ♀️";
                    var attachment = new Discord.MessageAttachment('./Images/Rencontre/WimessirF.png');
                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{'rencontre.wimessirF' : ficheRencontre.rencontre.wimessirF+1});
                    await PokemonSauvage.Encounter(message,"Wimessir ♀️");
                break;
                default : break;

            }

            var ficheEncounter = await Spawn.findOne({idDiscord: message.author.id});
            
            //Un message pour image en premier

                        const exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#16EF0E')
                        .setTitle("Un "+quelEstCePokemon+" sauvage apparaît !")
                        .setDescription(":warning: Si l'image est sous __**SPOILER**__ :warning:\rC'est que vous venez de rencontrer un Shiny\r(donc Spoil de Couleur)\r\rBon bah combat ?\r✅ pour lancer le combat\r❌ pour tenter de fuir directement (peut échouer)")
                        .addFields(
                            { name : ficheEncounter.Pokemon.Nom+"    Niveau : "+ficheEncounter.Pokemon.NiveauXP[1] , value : "PV  :green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square:"},
                        )
                        .setThumbnail(message.author.avatarURL())
                        .setFooter("*Bonne shance (´｡• ᵕ •｡`) ♡ *");

                await message.channel.send({files:[attachment], embed: exampleEmbed}).then(async sentClue => {
                    await message.guild.members.fetch(message.author.id).then((auteurCombat) => {
                        auteurCombat.roles.add(auth.server.role.combat);});
                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{'Rencontre.Fuite.idFuite' : sentClue});
                    await sentClue.react('✅');
                    await sentClue.react('❌');
                });
}




