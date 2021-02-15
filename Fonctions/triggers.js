var Discord = require('discord.js');
var logger = require('winston');
var auth = require('../auth.json');
var Suppr = require('./suppressions.js');
var cron = require('node-cron');
const Dresseurs = require("../FicheMongo/joueur.js");
const Sac = require("../FicheMongo/sac.js");
const Equipe = require("../FicheMongo/equipe.js");
const Degats = require("../Combat/degats.js");
const Spawn = require("../FicheMongo/sauvage.js");

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/Theffroi',{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

//Fonctions Objets de Combat
	module.exports.ItemUsed = async (place, message) => {

	    //récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
	    var fiche = await Dresseurs.findOne({idDiscord: message.author.id});
	    /// Récupération du message Sous-Menu Sac dans une variable
	    const fetchedObjetsId = await message.guild.channels.cache.get(fiche.idSalon).messages.cache.get(fiche.idObjets);

		//Récupération de variable à afficher dans le message stat générale
	    var ficheSac = await Sac.findOne({idDiscord : message.author.id});
	    var nomObjets = ficheSac.objets;
	    var equipeObjets = ficheSac.objetsUsed;

		var messageObjet1 = "L'objet : "+nomObjets[place-1]+" est déjà équipé ! Voulez-vous le retirer de votre Pokémon "+equipeObjets[place-1]+" ?";                                            

	    //Récupération de la fiche dresseur pour retrouver son salon privé
	    var fiche = await Dresseurs.findOne({idDiscord: message.author.id});
	    //Ecriture du message plus de l'image, ajout de deux emotes (attaque et tête d'équipe)
	    await fetchedObjetsId.guild.channels.cache.get(fiche.idSalon).send(messageObjet1).then(async sentClue => {
	        await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{'gestionObjets.ouinon' : sentClue});
	        await sentClue.react('✅');
	        await sentClue.react('❌');
	    });

	    YesNoObjet(message, place);

	}


	//Fonction Oui ou Non pour l'objet de Combat
	async function YesNoObjet(message, place) {

	        //2 filtres de réaction sur oui/non 
	        const filterOUI = (reaction, user) => {return (reaction.emoji.name === '✅' && user.id!=auth.server.roleBot);};
	        const filterNON = (reaction, user) => {return (reaction.emoji.name === '❌' && user.id!=auth.server.roleBot);};


	        //récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
	        var fiche = await Dresseurs.findOne({idDiscord: message.author.id});
	        /// Récupération du message Sous-Menu Sac dans une variable
	        const fetchedGestionOuiNon = await message.guild.channels.cache.get(fiche.idSalon).messages.cache.get(fiche.gestionObjets.ouinon);
	        console.log("fetchedGestionOuiNon : "+fetchedGestionOuiNon);

	        //Collector du Pokémon 1 sur l'emote Gorythmic (activation du retrait de l'emote (inutile ici mais sait-on jamais))
	        const ouiCollector = fetchedGestionOuiNon.createReactionCollector(filterOUI, { dispose: true });
	        const nonCollector = fetchedGestionOuiNon.createReactionCollector(filterNON, { dispose: true });


	            /// Collector pour mettre l'item 1 sur le Pokémon 1 ///
	            ouiCollector.on('collect', async (reaction, participant) => {
		        	await Suppr.deleteLast(message, 1);
	                console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

	                //récup de la fiche équipe
	                var testTeam = await Equipe.findOne({idDiscord: message.author.id});
	                //récup de la fiche sac
	                var testSac = await Sac.findOne({idDiscord: message.author.id});

				    var nomObjets = testSac.objets;
				    var equipeObjets = testSac.objetsUsed;

	                ///UPdate le Pokémon d'équipe qui est le bon
	                if(testTeam.Pokemon1.Nom==equipeObjets[place-1]){
		                // Mettre l'objet sur le Pokémon
		                await Equipe.findOneAndUpdate({idDiscord: message.author.id}, {'Pokemon1.Objet' : ""});

	                }else if(testTeam.Pokemon2.Nom==equipeObjets[place-1]){
		                // Mettre l'objet sur le Pokémon
		                await Equipe.findOneAndUpdate({idDiscord: message.author.id}, {'Pokemon2.Objet' : ""});

	                }else if(testTeam.Pokemon3.Nom==equipeObjets[place-1]){
		                // Mettre l'objet sur le Pokémon
		                await Equipe.findOneAndUpdate({idDiscord: message.author.id}, {'Pokemon3.Objet' : ""});

	                }

	                // Retirer le nom du Pokémon sur l'objet dans le sac
	                switch (place){
	                	case 1 : await Sac.findOneAndUpdate({idDiscord: message.author.id}, {'objetsUsed.0' : "disponible"}); break;
	                	case 2 : await Sac.findOneAndUpdate({idDiscord: message.author.id}, {'objetsUsed.1' : "disponible"}); break;
	                	case 3 : await Sac.findOneAndUpdate({idDiscord: message.author.id}, {'objetsUsed.2' : "disponible"}); break;
	                	case 4 : await Sac.findOneAndUpdate({idDiscord: message.author.id}, {'objetsUsed.3' : "disponible"}); break;
	                	case 5 : await Sac.findOneAndUpdate({idDiscord: message.author.id}, {'objetsUsed.4' : "disponible"}); break;
	                	case 6 : await Sac.findOneAndUpdate({idDiscord: message.author.id}, {'objetsUsed.5' : "disponible"}); break;
	                	case 7 : await Sac.findOneAndUpdate({idDiscord: message.author.id}, {'objetsUsed.6' : "disponible"}); break;
	                	case 8 : await Sac.findOneAndUpdate({idDiscord: message.author.id}, {'objetsUsed.7' : "disponible"}); break;
	                	case 9 : await Sac.findOneAndUpdate({idDiscord: message.author.id}, {'objetsUsed.8' : "disponible"}); break;
	                	default : break;
	                }

	                //récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
	                var fiche = await Dresseurs.findOne({idDiscord: message.author.id});

	                const messageObjet2 = "**"+testSac.objets[place-1]+"** est de nouveau disponible !\rRetirez votre emote sur l'objet et revalidez-la pour pouvoir l'assigner à un Pokémon."
	                    await fetchedGestionOuiNon.guild.channels.cache.get(fiche.idSalon).send(messageObjet2);

	            });


	            /// Collector pour mettre l'item 1 sur le Pokémon 1 ///
	            nonCollector.on('collect', async (reaction, participant) => {
		        	await Suppr.deleteLast(message, 1);
	                console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

					//Récupération de variable à afficher dans le message stat générale
				    var ficheSac = await Sac.findOne({idDiscord : message.author.id});
				    var nomObjets = ficheSac.objets;
				    var equipeObjets = ficheSac.objetsUsed;

	                //récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
	                var fiche = await Dresseurs.findOne({idDiscord: message.author.id});

	                const messageObjet3 = "L'objet : "+nomObjets[place-1]+" reste équipé sur votre Pokémon "+equipeObjets[place-1]+"."
	                    await fetchedGestionOuiNon.guild.channels.cache.get(fiche.idSalon).send(messageObjet3);

	            });

	}



	module.exports.ItemDone = async (place, message) => {

		//récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
	    var fiche = await Dresseurs.findOne({idDiscord: message.author.id});
	    /// Récupération du message Sous-Menu Sac dans une variable
	    const fetchedObjetsId = await message.guild.channels.cache.get(fiche.idSalon).messages.cache.get(fiche.idObjets);

		//Récupération de variable à afficher dans le message stat générale
	    var ficheSac = await Sac.findOne({idDiscord : message.author.id});
	    var nomObjets = ficheSac.objets;
	    var equipeObjets = ficheSac.objetsUsed;

	    if(equipeObjets[place-1]!="disponible"){

	    	YesNoObjet(message);

	    }else{

		    var messageObjet1 = "Sur quel Pokémon souhaitez-vous équiper l'objet : "+nomObjets[place-1]+" ?";
		    
		    //Ecriture du message plus de l'image, ajout de deux emotes (attaque et tête d'équipe)
		    await fetchedObjetsId.guild.channels.cache.get(fiche.idSalon).send(messageObjet1).then(async sentClue => {
		        await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{'gestionObjets.pokemon' : sentClue});
		        await sentClue.react(auth.server.emote.pokemon1);
		        await sentClue.react(auth.server.emote.pokemon2);
		        await sentClue.react(auth.server.emote.pokemon3);
		    });


		    //3 filtres de réaction sur chaque pokemon 
		    const filterObjetPokemon1 = (reaction, user) => {return (reaction.emoji.id === auth.server.emote.pokemon1 && user.id!=auth.server.roleBot);};
		    const filterObjetPokemon2 = (reaction, user) => {return (reaction.emoji.id === auth.server.emote.pokemon2 && user.id!=auth.server.roleBot);};
		    const filterObjetPokemon3 = (reaction, user) => {return (reaction.emoji.id === auth.server.emote.pokemon3 && user.id!=auth.server.roleBot);};


		    //récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
		    var fiche = await Dresseurs.findOne({idDiscord: message.author.id});
		    /// Récupération du message Sous-Menu Sac dans une variable
		    const fetchedGestionPokemon = await message.guild.channels.cache.get(fiche.idSalon).messages.cache.get(fiche.gestionObjets.pokemon);
		    console.log("fetchedGestionPokemon : "+fetchedGestionPokemon);

		    //Collector du Pokémon 1 sur l'emote Gorythmic (activation du retrait de l'emote (inutile ici mais sait-on jamais))
		    const objetPokemon1Collector = fetchedGestionPokemon.createReactionCollector(filterObjetPokemon1, { dispose: true });
		    const objetPokemon2Collector = fetchedGestionPokemon.createReactionCollector(filterObjetPokemon2, { dispose: true });
		    const objetPokemon3Collector = fetchedGestionPokemon.createReactionCollector(filterObjetPokemon3, { dispose: true });


		        /// Collector pour mettre l'item 1 sur le Pokémon 1 ///
		        objetPokemon1Collector.on('collect', async (reaction, participant) => {
		        	await Suppr.deleteLast(message, 1);
		            console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

		            //récup de la fiche équipe
		            var testTeam = await Equipe.findOne({idDiscord: message.author.id});
		            //récup de la fiche sac
		            var testSac = await Sac.findOne({idDiscord: message.author.id});

		            // Mettre l'objet sur le Pokémon
		            await Equipe.findOneAndUpdate({idDiscord: message.author.id}, {'Pokemon1.Objet' : testSac.objets[place-1]});


		            // récupéré la fiche sac, update le tableau sac et revnoyer le tableau sac dans la fiche sac
		            var ficheSacDone = await Sac.findOne({idDiscord: message.author.id});
		            ficheSacDone.objetsUsed[place-1]=testTeam.Pokemon1.Nom;
		            await Sac.findOneAndUpdate({idDiscord: message.author.id}, { 'objetsUsed' : ficheSacDone.objetsUsed});


		            //récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
		            var fiche = await Dresseurs.findOne({idDiscord: message.author.id});

		            const messageObjetPokemon1 = "**"+testTeam.Pokemon1.Nom.toUpperCase()+"** tient désormais : "+testSac.objets[place-1]+" !"
		                await fetchedGestionPokemon.guild.channels.cache.get(fiche.idSalon).send(messageObjetPokemon1);

		        });

		        /// Collector pour mettre l'item 1 sur le Pokémon 1 ///
		        objetPokemon2Collector.on('collect', async (reaction, participant) => {
		        	await Suppr.deleteLast(message, 1);
		            console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

		            //récup de la fiche équipe
		            var testTeam = await Equipe.findOne({idDiscord: message.author.id});
		            //récup de la fiche sac
		            var testSac = await Sac.findOne({idDiscord: message.author.id});

		            // Mettre l'objet sur le Pokémon
		            await Equipe.findOneAndUpdate({idDiscord: message.author.id}, {'Pokemon2.Objet' : testSac.objets[place-1]});



		            // récupéré la fiche sac, update le tableau sac et revnoyer le tableau sac dans la fiche sac
		            var ficheSacDone = await Sac.findOne({idDiscord: message.author.id});
		            ficheSacDone.objetsUsed[place-1]=testTeam.Pokemon2.Nom;
		            await Sac.findOneAndUpdate({idDiscord: message.author.id}, { 'objetsUsed' : ficheSacDone.objetsUsed});


		            //récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
		            var fiche = await Dresseurs.findOne({idDiscord: message.author.id});

		            const messageObjetPokemon2 = "**"+testTeam.Pokemon2.Nom.toUpperCase()+"** tient désormais : "+testSac.objets[place-1]+" !"
		                await fetchedGestionPokemon.guild.channels.cache.get(fiche.idSalon).send(messageObjetPokemon2);

		        });

		        /// Collector pour mettre l'item 1 sur le Pokémon 1 ///
		        objetPokemon3Collector.on('collect', async (reaction, participant) => {
		        	await Suppr.deleteLast(message, 1);
		            console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

		            //récup de la fiche équipe
		            var testTeam = await Equipe.findOne({idDiscord: message.author.id});
		            //récup de la fiche sac
		            var testSac = await Sac.findOne({idDiscord: message.author.id});

		            // Mettre l'objet sur le Pokémon
		            await Equipe.findOneAndUpdate({idDiscord: message.author.id}, {'Pokemon3.Objet' : testSac.objets[place-1]});



		            // récupéré la fiche sac, update le tableau sac et revnoyer le tableau sac dans la fiche sac
		            var ficheSacDone = await Sac.findOne({idDiscord: message.author.id});
		            ficheSacDone.objetsUsed[place-1]=testTeam.Pokemon3.Nom;
		            await Sac.findOneAndUpdate({idDiscord: message.author.id}, { 'objetsUsed' : ficheSacDone.objetsUsed});


		            //récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
		            var fiche = await Dresseurs.findOne({idDiscord: message.author.id});

		            const messageObjetPokemon3 = "**"+testTeam.Pokemon3.Nom.toUpperCase()+"** tient désormais : "+testSac.objets[place-1]+" !"
		                await fetchedGestionPokemon.guild.channels.cache.get(fiche.idSalon).send(messageObjetPokemon3);

		        });
		}
	}
//Fin Fonctions Objets de Combat

//Fonction Objets de Soins
	module.exports.SoinHorsCombat = async (place, message) => {
		console.log("début des soins");
		//récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
	    var fiche = await Dresseurs.findOne({idDiscord: message.author.id});
	    /// Récupération du message Sous-Menu Sac dans une variable
	    const fetchedSoinsId = await message.guild.channels.cache.get(fiche.idSalon);

	    //Récupération de variable à afficher dans le message stat générale
	    var ficheSac = await Sac.findOne({idDiscord : message.author.id});
	    var nomSoins = ficheSac.healing;
	    var quantiteSoins = ficheSac.healingLeft;


		//Y'a-t-il des items dispo ? NON
	    if(ficheSac.healingLeft[place]<=0){
	    	console.log("pas de stock");
			var messageNoStock = "Vous n'avez aucun Stock pour l'Objet : "+ficheSac.healing[place]+".";
		    //Ecriture du message plus de l'image, ajout de deux emotes (attaque et tête d'équipe)
		    await fetchedSoinsId.guild.channels.cache.get(fiche.idSalon).send(messageNoStock);
		//Oui des items dispo
	    }else{
	    	console.log("y'a des stock, choix du pokémon");

		    var messageSoins1 = "Sur quel Pokémon souhaitez-vous utiliser l'objet : "+nomSoins[place]+" ?";
		    
		    //Ecriture du message plus de l'image, ajout de deux emotes (attaque et tête d'équipe)
		    await fetchedSoinsId.guild.channels.cache.get(fiche.idSalon).send(messageSoins1).then(async sentClue => {
		        await sentClue.react(auth.server.emoteReaction.gorythmic);
		        await sentClue.react(auth.server.emoteReaction.pyrobut);
		        await sentClue.react(auth.server.emoteReaction.lezargus);
		    });

		    //3 filtres de réaction sur chaque pokemon 
		    const filterSoinsGor = (reaction, user) => {return (reaction.emoji.id === auth.server.emoteReaction.gorythmic && user.id!=auth.server.roleBot);};
		    const filterSoinsPyr = (reaction, user) => {return (reaction.emoji.id === auth.server.emoteReaction.pyrobut && user.id!=auth.server.roleBot);};
		    const filterSoinsLez = (reaction, user) => {return (reaction.emoji.id === auth.server.emoteReaction.lezargus && user.id!=auth.server.roleBot);};


		    //récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
		    var fiche = await Dresseurs.findOne({idDiscord: message.author.id});
		    /// Récupération du message Sous-Menu Sac dans une variable
		    const fetchedGestionPokemon = await message.guild.channels.cache.get(fiche.idSalon).messages.cache.get(fiche.gestionSoins.pokemon);
		    console.log("fetchedGestionPokemon : "+fetchedGestionPokemon);

		    //Collector du Pokémon 1 sur l'emote Gorythmic (activation du retrait de l'emote (inutile ici mais sait-on jamais))
		    const soinsGorCollector = fetchedGestionPokemon.createReactionCollector(filterSoinsGor, { dispose: true });
		    const soinsPyrCollector = fetchedGestionPokemon.createReactionCollector(filterSoinsPyr, { dispose: true });
		    const soinsLezCollector = fetchedGestionPokemon.createReactionCollector(filterSoinsLez, { dispose: true });


		        /// Collector pour mettre l'item 1 sur le Pokémon 1 ///
		        soinsGorCollector.on('collect', async (reaction, participant) => {
		            console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

		            //récup de la fiche équipe
		            var fichePoke = await Equipe.findOne({idDiscord : message.author.id});
				   	for(j=0;j<4;j++){
				   		var nomPoke = fichePoke.EquipePkm[j].Nom;
				   		if(nomPoke === "Gorythmic"){
				   			var positionPoke = fichePoke.EquipePkm[j].Position;
				   			var equipeGor = fichePoke.EquipePkm[j];
				            break;
				   		}
				   	}
		            //récup de la fiche sac
		            var testSac = await Sac.findOne({idDiscord: message.author.id});

		            await LetsHeal(place,equipeGor,testSac,message,positionPoke)
		       	//Fin du Collector Soin du Pokémon 1
		        });

		        /// Collector pour mettre l'item 1 sur le Pokémon 2 ///
		        soinsPyrCollector.on('collect', async (reaction, participant) => {
		            console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

		            //récup de la fiche équipe
		            var fichePoke = await Equipe.findOne({idDiscord : message.author.id});
				   	for(j=0;j<4;j++){
				   		var nomPoke = fichePoke.EquipePkm[j].Nom;
				   		if(nomPoke === "Pyrobut"){
				   			var positionPoke = fichePoke.EquipePkm[j].Position;
				   			var equipePyr = fichePoke.EquipePkm[j];
				            break;
				   		}
				   	}
		            //récup de la fiche sac
		            var testSac = await Sac.findOne({idDiscord: message.author.id});

		            await LetsHeal(place,equipePyr,testSac,message,positionPoke)
		       	//Fin du Collector Soin du Pokémon 2
		        });

		        /// Collector pour mettre l'item 1 sur le Pokémon 3 ///
		        soinsLezCollector.on('collect', async (reaction, participant) => {
		            console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

		            //récup de la fiche équipe
		            var fichePoke = await Equipe.findOne({idDiscord : message.author.id});
				   	for(j=0;j<4;j++){
				   		var nomPoke = fichePoke.EquipePkm[j].Nom;
				   		if(nomPoke === "Lezargus"){
				   			var positionPoke = fichePoke.EquipePkm[j].Position;
				   			var equipeLez = fichePoke.EquipePkm[j];
				            break;
				   		}
				   	}
		            //récup de la fiche sac
		            var testSac = await Sac.findOne({idDiscord: message.author.id});

		            await LetsHeal(place,equipeLez,testSac,message,positionPoke)
		       	//Fin du Collector Soin du Pokémon 3
		        });

		}
	}


	async function LetsHeal(place, team, sac, message, placePoke) {

				var itemUsed = 0;
				//récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
			    var fiche = await Dresseurs.findOne({idDiscord: message.author.id});
			    /// Récupération du message Sous-Menu Sac dans une variable
			    const fetchedSoinsId = await message.guild.channels.cache.get(fiche.idSalon).messages.cache.get(fiche.idSoins);

			    //Y'a-t-il des items dispo ? NON
	            if(sac.healingLeft[place]<=0){
					var messageNoStock = "Vous n'avez aucun Stock pour l'Objet : "+sac.healing[place]+".";
				    //Ecriture du message plus de l'image, ajout de deux emotes (attaque et tête d'équipe)
				    await fetchedSoinsId.guild.channels.cache.get(fiche.idSalon).send(messageNoStock);
				//Oui des items dispo
	            }else{

		            var etatSoins = await WhatToHeal(place, team, message);
		            console.log("etatSoins : "+etatSoins);

		            //Pas de soins à faire
		            if(etatSoins[7]==true){
		            	if(team.PV<=0){
			            	var messageEtatSoinKO = "Votre Pokémon est KO.\rCela n'aura aucun effet sur "+team.Nom+".\rL'objet n'a pas été consommé !";
						    //Ecriture du message plus de l'image, ajout de deux emotes (attaque et tête d'équipe)
						    await fetchedSoinsId.guild.channels.cache.get(fiche.idSalon).send(messageEtatSoinKO);
		            	}else{
			            	var messageEtatSoinFail = "Cela n'aura aucun effet sur "+team.Nom+".\rL'objet n'a pas été consommé !";
						    //Ecriture du message plus de l'image, ajout de deux emotes (attaque et tête d'équipe)
						    await fetchedSoinsId.guild.channels.cache.get(fiche.idSalon).send(messageEtatSoinFail);
						}
					//Soin à faire
		            }else{
		            	//Commençons par les PV
		            	if(etatSoins[0]>0){
		            		var NouveauPV = await team.PV+etatSoins[0];

		            		var fiche = await Equipe.findOne({idDiscord: message.author.id});
							//console.log(fiche.EquipePkm[0].NiveauXP);
							for(k=0;k<fiche.EquipePkm.length;k++){
								if(team.Position==k+1){
									await Equipe.findOneAndUpdate({idDiscord: message.author.id},{ $set : {'EquipePkm.$[elem].PV' : NouveauPV}},{ "arrayFilters": [{ "elem.Position": k+1 }]});
								}
							}

				            switch(placePoke){
		            			case 1 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon1.PV' : NouveauPV});break;
		            			case 2 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon2.PV' : NouveauPV});break;
		            			case 3 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon3.PV' : NouveauPV});break;
		            			default : break;
		            		}

		            		var messageEtatSoinOK = team.Nom+" a récupéré "+etatSoins[0]+" PV.";
						    var itemUsed = 1;
						    //Ecriture du message plus de l'image, ajout de deux emotes (attaque et tête d'équipe)
						    await fetchedSoinsId.guild.channels.cache.get(fiche.idSalon).send(messageEtatSoinOK);
						    Degats.JaugeDeVie(message,NouveauPV,team.StatFinal[0],"joueur").then(jauge => {message.channel.send(jauge);});
		            	}

		            	for (k=0;k<2;k++){
		            		console.log(k);
			            	if(team.Statut[k]!=""){
								// Ordre des BilanSoin : [PV,Brulure,Gel,Para,Poison,Sommeil,Confusion,RienFaire]
			            		switch (team.Statut[k]){
			            			case "Brulure" : 
			            				if(etatSoins[1]==true){
						            		var messageBrulureOK = team.Nom+" n'est plus Brulé !";
						            		var itemUsed = 1;
										    //Ecriture du message plus de l'image, ajout de deux emotes (attaque et tête d'équipe)
										    await fetchedSoinsId.guild.channels.cache.get(fiche.idSalon).send(messageBrulureOK);

										    //Soin de la Brûlure
								            team.Statut[k] = await "";
								            switch(placePoke){
						            			case 1 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon1.Statut' : team.Statut});break;
						            			case 2 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon2.Statut' : team.Statut});break;
						            			case 3 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon3.Statut' : team.Statut});break;
						            			default : break;
						            		}
			            				}
			            			break;
			            			case "Gel" : 
			            				if(etatSoins[2]==true){
						            		var messageGelOK = team.Nom+" n'est plus Gelé !";
						            		var itemUsed = 1;
										    //Ecriture du message plus de l'image, ajout de deux emotes (attaque et tête d'équipe)
										    await fetchedSoinsId.guild.channels.cache.get(fiche.idSalon).send(messageGelOK);

										    //Soin du Gel
								            team.Statut[k] = await "";
								            switch(placePoke){
						            			case 1 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon1.Statut' : team.Statut});break;
						            			case 2 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon2.Statut' : team.Statut});break;
						            			case 3 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon3.Statut' : team.Statut});break;
						            			default : break;
						            		}

			            				}
			            			break;
			            			case "Paralysie" : 
			            				if(etatSoins[3]==true){
						            		var messageParaOK = team.Nom+" n'est plus Paralysé !";
						            		var itemUsed = 1;
										    //Ecriture du message plus de l'image, ajout de deux emotes (attaque et tête d'équipe)
										    await fetchedSoinsId.guild.channels.cache.get(fiche.idSalon).send(messageParaOK);

										    //Soin de la Paralysie
								            team.Statut[k] = await "";
								            switch(placePoke){
						            			case 1 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon1.Statut' : team.Statut});break;
						            			case 2 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon2.Statut' : team.Statut});break;
						            			case 3 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon3.Statut' : team.Statut});break;
						            			default : break;
						            		}

			            				}
			            			break;
			            			case "Poison" : 
			            				if(etatSoins[4]==true){
						            		var messagePoisonOK = team.Nom+" n'est plus Empoisonné !";
						            		var itemUsed = 1;
										    //Ecriture du message plus de l'image, ajout de deux emotes (attaque et tête d'équipe)
										    await fetchedSoinsId.guild.channels.cache.get(fiche.idSalon).send(messagePoisonOK);

										    //Soin du Poison
								            team.Statut[k] = await "";
								            switch(placePoke){
						            			case 1 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon1.Statut' : team.Statut});break;
						            			case 2 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon2.Statut' : team.Statut});break;
						            			case 3 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon3.Statut' : team.Statut});break;
						            			default : break;
						            		}

			            				}
			            			break;
			            			case "Sommeil" : 
			            				if(etatSoins[5]==true){
						            		var messageSommeilOK = team.Nom+" n'est plus Endormi !";
						            		var itemUsed = 1;
										    //Ecriture du message plus de l'image, ajout de deux emotes (attaque et tête d'équipe)
										    await fetchedSoinsId.guild.channels.cache.get(fiche.idSalon).send(messageSommeilOK);

										    //Soin du Sommeil
								            team.Statut[k] = await "";
								            switch(placePoke){
						            			case 1 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon1.Statut' : team.Statut});break;
						            			case 2 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon2.Statut' : team.Statut});break;
						            			case 3 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon3.Statut' : team.Statut});break;
						            			default : break;
						            		}

			            				}
			            			break;
			            			case "Confusion" : 
			            				if(etatSoins[6]==true){
						            		var messageConfusionOK = team.Nom+" n'est plus Confus !";
						            		var itemUsed = 1;
										    //Ecriture du message plus de l'image, ajout de deux emotes (attaque et tête d'équipe)
										    await fetchedSoinsId.guild.channels.cache.get(fiche.idSalon).send(messageConfusionOK);

										    //Soin de la Confusion
								            team.Statut[k] = await "";
								            switch(placePoke){
						            			case 1 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon1.Statut' : team.Statut});break;
						            			case 2 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon2.Statut' : team.Statut});break;
						            			case 3 : await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon3.Statut' : team.Statut});break;
						            			default : break;
						            		}

			            				}
			            			break;
			            			default : break;
			            		//fin Switch des états
			            		}
			            	//fin if des différents Statuts
        					}
        				//Fin boucle for pour passer tous les statuts
        				}


			        //Fin des soins à faire
		            }

		            //pour éviter la double consommation des items de soins :)
		            if(itemUsed >= 1){
			            //Consommation de l'objet
			            sac.healingLeft[place] = await sac.healingLeft[place]-1;
			            await Sac.findOneAndUpdate({idDiscord: message.author.id}, { 'healingLeft' : sac.healingLeft});
			            var itemUsed = 0;
		            }

			    //Fin du check des items dispo et utilisé
	        	}
	//Fin Let's Heal !
	}


	async function WhatToHeal(place, team, message) {
	// Ordre des BilanSoin : [PV,Brulure,Gel,Para,Poison,Sommeil,Confusion,RienFaire]

		//Récupération de variable à afficher dans le message stat générale
	    var ficheSac = await Sac.findOne({idDiscord : message.author.id});
	    var nomSoins = ficheSac.healing;

	    switch (nomSoins[place]){
	    	case "Potion" : 
	    		var MaxHeal = 20;
	    		if(team.PV<=0){
	    			var BilanSoin = [0,false,false,false,false,false,false,true];
	    			return BilanSoin;
	    		}else if(team.StatFinal[0]-team.PV>=MaxHeal){
	    			var BilanSoin = [MaxHeal,false,false,false,false,false,false,false];
	    			return BilanSoin;
	    		}else if (team.StatFinal[0]-team.PV<MaxHeal&&team.StatFinal[0]-team.PV>0){
	    			var BilanSoin = [team.StatFinal[0]-team.PV,false,false,false,false,false,false,false];
	    			return BilanSoin;
	    		}else{
	    			var BilanSoin = [0,false,false,false,false,false,false,true];
	    			return BilanSoin;
	    		}
	    	break;
	    	case "Super Potion" : 
	    		var MaxHeal = 60;
	    		if(team.PV<=0){
	    			var BilanSoin = [0,false,false,false,false,false,false,true];
	    			return BilanSoin;
	    		}else if(team.StatFinal[0]-team.PV>=MaxHeal){
	    			var BilanSoin = [MaxHeal,false,false,false,false,false,false,false];
	    			return BilanSoin;
	    		}else if (team.StatFinal[0]-team.PV<MaxHeal&&team.StatFinal[0]-team.PV>0){
	    			var BilanSoin = [team.StatFinal[0]-team.PV,false,false,false,false,false,false,false];
	    			return BilanSoin;
	    		}else{
	    			var BilanSoin = [0,false,false,false,false,false,false,true];
	    			return BilanSoin;
	    		}
	    	break;
	    	case "Hyper Potion" : 
	    		var MaxHeal = 120;
	    		if(team.PV<=0){
	    			var BilanSoin = [0,false,false,false,false,false,false,true];
	    			return BilanSoin;
	    		}else if(team.StatFinal[0]-team.PV>=MaxHeal){
	    			var BilanSoin = [MaxHeal,false,false,false,false,false,false,false];
	    			return BilanSoin;
	    		}else if (team.StatFinal[0]-team.PV<MaxHeal&&team.StatFinal[0]-team.PV>0){
	    			var BilanSoin = [team.StatFinal[0]-team.PV,false,false,false,false,false,false,false];
	    			return BilanSoin;
	    		}else{
	    			var BilanSoin = [0,false,false,false,false,false,false,true];
	    			return BilanSoin;
	    		}
	    	break;
	    	case "Guérison" : 
	    		if(team.PV<=0){
	    			var BilanSoin = [0,false,false,false,false,false,false,true];
	    			return BilanSoin;
	    		}else if(team.PV<team.StatFinal[0]){
	    			var BilanSoin = [team.StatFinal[0]-team.PV,true,true,true,true,true,true,false];
	    			return BilanSoin;
	    		}else if(team.Statut[0]!=""||team.Statut[1]!=""){
	    			var BilanSoin = [0,true,true,true,true,true,true,false];
	    			return BilanSoin;
	    		}else{
	    			var BilanSoin = [0,false,false,false,false,false,false,true];
	    			return BilanSoin;
	    		}
	    	break;
	    	case "Antidote" : 
	    		if(team.Statut[0]=="Poison"||team.Statut[1]=="Poison"){
	    			var BilanSoin = [0,false,false,false,true,false,false,false];
	    			return BilanSoin;
	    		}else{
	    			var BilanSoin = [0,false,false,false,false,false,false,true];
	    			return BilanSoin;
	    		}
	    	break;
	    	case "Réveil" : 
	    		if(team.Statut[0]=="Sommeil"||team.Statut[1]=="Sommeil"){
	    			var BilanSoin = [0,false,false,false,false,true,false,false];
	    			return BilanSoin;
	    		}else{
	    			var BilanSoin = [0,false,false,false,false,false,false,true];
	    			return BilanSoin;
	    		}
	    	break;
	    	case "Anti-Brûle" : 
	    		if(team.Statut[0]=="Brulure"||team.Statut[1]=="Brulure"){
	    			var BilanSoin = [0,true,false,false,false,false,false,false];
	    			return BilanSoin;
	    		}else{
	    			var BilanSoin = [0,false,false,false,false,false,false,true];
	    			return BilanSoin;
	    		}
	    	break;
	    	case "Anti-Para" : 
	    		if(team.Statut[0]=="Paralysie"||team.Statut[1]=="Paralysie"){
	    			var BilanSoin = [0,false,false,true,false,false,false,false];
	    			return BilanSoin;
	    		}else{
	    			var BilanSoin = [0,false,false,false,false,false,false,true];
	    			return BilanSoin;
	    		}
	    	break;
	    	case "Rappel" : 
	    		if(team.PV<=0){
	    			var BilanSoin = [Math.floor(team.StatFinal[0]/2),true,true,true,true,true,true,false];
	    			return BilanSoin;
	    		}else{
	    			var BilanSoin = [0,false,false,false,false,false,false,true];
	    			return BilanSoin;
	    		}
	    	break;
	    	case "Rappel Max" : 
	    		if(team.PV<=0){
	    			var BilanSoin = [team.StatFinal[0],true,true,true,true,true,true,false];
	    			return BilanSoin;
	    		}else{
	    			var BilanSoin = [0,false,false,false,false,false,false,true];
	    			return BilanSoin;
	    		}
	    	break;
	    	default : break;
	    }


	}

