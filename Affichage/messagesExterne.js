
var Discord = require('discord.js');
var auth = require('../auth.json');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Stats = require("../Fonctions/statistiques.js");
const Equipe = require("../FicheMongo/equipe.js");
const PokemonSauvage = require("../Combat/rencontre.js");
const Sac = require("../FicheMongo/sac.js");
const Dresseurs = require("../FicheMongo/joueur.js");
const Spawn = require("../FicheMongo/sauvage.js");
const Suppr = require("../Fonctions/suppressions.js");
const Degats = require("../Combat/degats.js");
const Trigger = require("../Fonctions/triggers.js");

function Rand(valeur){return Math.floor(Math.random() * valeur +1);}

const options = {
    page: 0,
    limit: 60 * 1000
}


var nomPoke = ["","","",""];
var emotePoke = ["","","",""];
var reactionPoke = ["","","",""];
var positionPoke = [0,0,0,0];
var nivPoke = [0,0,0,0];
var pvMaxPoke = [0,0,0,0];
var pvPoke = [0,0,0,0];


var money = 80000+Rand(3000);
var dex = 65+Rand(40);



const pages = {
    0: { color : "#854D30",
    title: "**__Menu Principal__**",
    description: "Te voici dans le Menu Principal.\rPour accéder à ton Équipe, clique sur "+auth.server.emoteMessage.poke+"\rPour accéder à ton Sac, clique sur 🎒\rPour accéder à ta Carte Dresseur, clique sur 🧢\r\rPour fermer le menu, clique sur ❌",
    footer : "*Bonne shance (´｡• ᵕ •｡`) ♡ *" }, 
    1: { color : "#FFF354",
    title: "__**Ton Équipe**__"
	},
    2: { color : "#AF2A32",
    title: "__**Ton Sac**__",
    description: "Voici ton Sac et Équipement pour cette shasse !\rEn cliquant sur l'emote correspondante, tu pourras connaître le contenu de chaque poche.\rDepuis la poche Objets, tu pourras décider d'en assigner à tes Pokémon.\r\rPour revenir en arrière ⏪\rPour fermer la fenêtre : ❌",
    fields : [{ name : `Poche Balls`, value : auth.server.emoteMessage.honor, inline : true},
              { name : `Poche Soins`, value : '💊', inline : true},
              { name : `Poche Objets`, value : '🛠️', inline : true}],
	},
    3: { color : "#2F2AAF",
    title: "__**Ta fiche**__",
    description: "Voici ta Fiche de Dresseur·euse !\r\rTu as actuellement 4 Badges en ta posession.\rTon solde de PokéDollar est de "+money+" ₽.\rTon Pokédex est à "+dex+" entrées.\r\rPour revenir en arrière ⏪\rPour fermer la fenêtre : ❌",
	},
	4: { color : "#166F1C",
    title: "__**Gorythmic**__"
	},
	5: { color : "#F1271F",
    title: "__**Pyrobut**__"
	},
	6: { color : "#3879FA",
    title: "__**Lezargus**__"
	},
	7: { color : "#166F1C",
    title: "__**Attaque de Gorythmic**__"
	},
	8: { color : "#F1271F",
    title: "__**Attaque de Pyrobut**__"
	},
	9: { color : "#3879FA",
    title: "__**Attaque de Lezargus**__"
	},
	10: { color : "#3879FA",
    title: "__**Poche Balls**__"
	},
	11: { color : "#3879FA",
    title: "__**Poche Soins**__"
	},
	12: { color : "#3879FA",
    title: "__**Poche Objets Combat**__"
	}
}

module.exports.MenuTest = async (msg) => {


    //const attachment = new Discord.MessageAttachment('./Images/Menu/Menu.png');

	const m = await msg.channel.send({embed: pages[0]});
	await m.react(auth.server.emoteReaction.poke)
	await m.react('🎒');
	await m.react('🧢');
	await m.react('❌');

	const filter = (reaction, user) => {
    return (['🎒', '🧢', '❌', '⏪', '🥇', '💥', '💊','🛠️','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'].includes(reaction.emoji.name)||([auth.server.emoteReaction.poke,auth.server.emoteReaction.honor,auth.server.emoteReaction.gorythmic,auth.server.emoteReaction.pyrobut,auth.server.emoteReaction.lezargus].includes(reaction.emoji.id))) && user.id == msg.author.id;
	};
	//page = 0;
	awaitReactions(msg, m, options, filter);

}


const awaitReactions = async (msg, m, options, filter) => {
    // simplify the use of these options, using destructing^
    var { page, limit } = options;
    console.log(options);
    console.log(page+"/"+limit);
    
    m.awaitReactions(filter, { max: 1, time: limit, errors: ['time'] })
    .then(async (collected) => {
        // logic
        const reaction = collected.first();

        // add this below where we define reaction, but inside the '.then'

        //aller vers la page équipe
		if (reaction.emoji.id === auth.server.emoteReaction.poke) {
			console.log(auth.server.emoteReaction.poke);
		    // remove the back reaction if possible
		    await Suppr.removeReactionID(m, msg, auth.server.emoteReaction.poke);
		    
		    // check if the page can go back one
		    if (page == 0) {
		    	console.log("on passe à la page 1");
		        // change the page
		        page = 1;

	
				await AffichageEquipe(msg,m);


				await m.reactions.removeAll();
				await m.react(reactionPoke[0]);
				await m.react(reactionPoke[1]);
				await m.react(reactionPoke[2]);
				await m.react('⏪');
				await m.react('❌');

		    }
		   
    		var optionUpdate = { page, limit };
		    console.log(optionUpdate);

		    // restart the listener 
		    awaitReactions(msg, m, optionUpdate, filter);      
		}
		//vers la page sac
		else if (reaction.emoji.name === '🎒') {
			console.log('🎒');
		    // remove the back reaction if possible
		    await Suppr.removeReactionName(m, msg, '🎒');
		    
		    // check if the page can go back one
		    if (page == 0) {


		        // change the page
		        page = 2;
		        await m.edit({ embed: pages[page] });
		    	await m.reactions.removeAll();
				await m.react(auth.server.emoteReaction.honor);
				await m.react('💊');
				await m.react('🛠️');
				await m.react('⏪');
				await m.react('❌');

		    }
		   
    		var optionUpdate = { page, limit };
		    console.log(optionUpdate);
		   
		    // restart the listener 
		    awaitReactions(msg, m, optionUpdate, filter);      
		}
		//vers la page dresseur
		else if (reaction.emoji.name === '🧢') {
			console.log('🧢');
		    // remove the back reaction if possible
		    await Suppr.removeReactionName(m, msg, '🧢');
		    
		    // check if the page can go back one
		    if (page == 0) {

		        // change the page
		        page = 3;

		        await m.edit({ embed: pages[page] });
		        await m.reactions.removeAll();
				await m.react('⏪');
				await m.react('❌');

		    }
		   
    		var optionUpdate = { page, limit };
		    console.log(optionUpdate);
		   
		    // restart the listener 
		    awaitReactions(msg, m, optionUpdate, filter);   
		}
		//vers la page pokémon Gorythmmic
		else if (reaction.emoji.id === auth.server.emoteReaction.gorythmic) {
			console.log('Gorythmic');
		    // remove the back reaction if possible
		    await Suppr.removeReactionID(m, msg, auth.server.emoteReaction.gorythmic);
		    
		    // check if the page can go back one
		    if (page == 1) {

		        // change the page
		        page = 4;

		        await AffichagePokemon(msg,m,"Gorythmic");
		        await m.reactions.removeAll();
				await m.react('💥');
				await m.react('🥇');
				await m.react('⏪');
				await m.react('❌');

		    }
		   
    		var optionUpdate = { page, limit };
		    console.log(optionUpdate);
		   
		    // restart the listener 
		    awaitReactions(msg, m, optionUpdate, filter);   
		}
		//vers la page pokémon Pyrobut
		else if (reaction.emoji.id === auth.server.emoteReaction.pyrobut) {
			console.log('Pyrobut');
		    // remove the back reaction if possible
		    await Suppr.removeReactionID(m, msg, auth.server.emoteReaction.pyrobut);
		    
		    // check if the page can go back one
		    if (page == 1) {

		        // change the page
		        page = 5;


		        await AffichagePokemon(msg,m,"Pyrobut");
		        await m.reactions.removeAll();
				await m.react('💥');
				await m.react('🥇');
				await m.react('⏪');
				await m.react('❌');

		    }
		   
    		var optionUpdate = { page, limit };
		    console.log(optionUpdate);
		   
		    // restart the listener 
		    awaitReactions(msg, m, optionUpdate, filter);   
		}
		//vers la page pokémon Lezargus
		else if (reaction.emoji.id === auth.server.emoteReaction.lezargus) {
			console.log('Lezargus');
		    // remove the back reaction if possible
		    await Suppr.removeReactionID(m, msg, auth.server.emoteReaction.lezargus);
		    
		    // check if the page can go back one
		    if (page == 1) {

		        // change the page
		        page = 6;

		        await AffichagePokemon(msg,m,"Lezargus");
		        await m.reactions.removeAll();
				await m.react('💥');
				await m.react('🥇');
				await m.react('⏪');
				await m.react('❌');

		    }
		   
    		var optionUpdate = { page, limit };
		    console.log(optionUpdate);
		   
		    // restart the listener 
		    awaitReactions(msg, m, optionUpdate, filter);   
		}
		//vers la page attaque pokémon (param pokémon)
		else if (reaction.emoji.name === '💥') {
			console.log('💥');
		    // remove the back reaction if possible
		    await Suppr.removeReactionName(m, msg, '💥');
		    
		    // check if the page can go back one
		    if (page >= 4 && page <=6) {
		    	if(page==4){
		    		await AffichageAttaque(msg,m,"Gorythmic");
		    	}else if(page==5){
		    		await AffichageAttaque(msg,m,"Pyrobut");
		    	}else{
		    		await AffichageAttaque(msg,m,"Lezargus");
		    	}
		    page = page+3;

	    	await m.reactions.removeAll();
			await m.react('⏪');
			await m.react('❌');

		    }
		   
    		var optionUpdate = { page, limit };
		    console.log(optionUpdate);

		    // restart the listener 
		    awaitReactions(msg, m, optionUpdate, filter);   
		}
		//vers la page poche balls
		else if (reaction.emoji.id === auth.server.emoteReaction.honor) {
			console.log("Honor");
		    // remove the back reaction if possible
		    await Suppr.removeReactionID(m, msg, auth.server.emoteReaction.honor);
		    
		    // check if the page can go back one
		    if (page ==2) {

		    await AffichageBalls (msg,m);

		    page = 10;

	    	await m.reactions.removeAll();
			await m.react('⏪');
			await m.react('❌');

		    }
		   
    		var optionUpdate = { page, limit };
		    console.log(optionUpdate);

		    // restart the listener 
		    awaitReactions(msg, m, optionUpdate, filter);   
		}
		//vers la page poche balls
		else if (reaction.emoji.name === '💊') {
			console.log('💊');
		    // remove the back reaction if possible
		    await Suppr.removeReactionName(m, msg, '💊');
		    
		    // check if the page can go back one
		    if (page ==2) {

		    await AffichageSoins (msg,m);

		    page = 11;

	    	await m.reactions.removeAll();
            await m.react('1️⃣');
            await m.react('2️⃣');
            await m.react('3️⃣');
            await m.react('4️⃣');
            await m.react('5️⃣');
            await m.react('6️⃣');
            await m.react('7️⃣');
            await m.react('8️⃣');
            await m.react('9️⃣');
			await m.react('⏪');
			await m.react('❌');

		    }
		   
    		var optionUpdate = { page, limit };
		    console.log(optionUpdate);

		    // restart the listener 
		    awaitReactions(msg, m, optionUpdate, filter);   
		}
		//vers la page poche balls
		else if (reaction.emoji.name === '🛠️') {
			console.log('🛠️');
		    // remove the back reaction if possible
		    await Suppr.removeReactionName(m, msg, '🛠️');
		    
		    // check if the page can go back one
		    if (page ==2) {

		    await AffichageObjets (msg,m);

		    page = 12;

	    	await m.reactions.removeAll();
            await m.react('1️⃣');
            await m.react('2️⃣');
            await m.react('3️⃣');
            await m.react('4️⃣');
            await m.react('5️⃣');
            await m.react('6️⃣');
            await m.react('7️⃣');
            await m.react('8️⃣');
            await m.react('9️⃣');
			await m.react('⏪');
			await m.react('❌');

		    }
		   
    		var optionUpdate = { page, limit };
		    console.log(optionUpdate);

		    // restart the listener 
		    awaitReactions(msg, m, optionUpdate, filter);   
		}else if(reaction.emoji.name === '1️⃣'||reaction.emoji.name === '2️⃣'||reaction.emoji.name === '3️⃣'||reaction.emoji.name === '4️⃣'||reaction.emoji.name === '5️⃣'||reaction.emoji.name === '6️⃣'||reaction.emoji.name === '7️⃣'||reaction.emoji.name === '8️⃣'||reaction.emoji.name === '9️⃣'){
			console.log(reaction.emoji.name);
			if (page==11){
				console.log("page 12");
				switch(reaction.emoji.name){
					case '1️⃣' : console.log("première émote");await Suppr.removeReactionName(m, msg, '1️⃣');console.log("suppr done");await Trigger.SoinHorsCombat(1,msg);break;
					case '2️⃣' : await Suppr.removeReactionName(m, msg, '2️⃣');await Trigger.SoinHorsCombat(2,msg);break;
					case '3️⃣' : await Suppr.removeReactionName(m, msg, '3️⃣');await Trigger.SoinHorsCombat(3,msg);break;
					case '4️⃣' : await Suppr.removeReactionName(m, msg, '4️⃣');await Trigger.SoinHorsCombat(4,msg);break;
					case '5️⃣' : await Suppr.removeReactionName(m, msg, '5️⃣');await Trigger.SoinHorsCombat(5,msg);break;
					case '6️⃣' : await Suppr.removeReactionName(m, msg, '6️⃣');await Trigger.SoinHorsCombat(6,msg);break;
					case '7️⃣' : await Suppr.removeReactionName(m, msg, '7️⃣');await Trigger.SoinHorsCombat(7,msg);break;
					case '8️⃣' : await Suppr.removeReactionName(m, msg, '8️⃣');await Trigger.SoinHorsCombat(8,msg);break;
					case '9️⃣' : await Suppr.removeReactionName(m, msg, '9️⃣');await Trigger.SoinHorsCombat(9,msg);break;
					default : break;
				}
			}else if (page ==12){
				console.log("page 12");
				switch(reaction.emoji.name){
					case '1️⃣' : console.log("première émote");await Suppr.removeReactionName(m, msg, '1️⃣');console.log("suppr done");await Trigger.ItemUsed(1,msg);break;
					case '2️⃣' : await Suppr.removeReactionName(m, msg, '2️⃣');await Trigger.ItemUsed(2,msg);break;
					case '3️⃣' : await Suppr.removeReactionName(m, msg, '3️⃣');await Trigger.ItemUsed(3,msg);break;
					case '4️⃣' : await Suppr.removeReactionName(m, msg, '4️⃣');await Trigger.ItemUsed(4,msg);break;
					case '5️⃣' : await Suppr.removeReactionName(m, msg, '5️⃣');await Trigger.ItemUsed(5,msg);break;
					case '6️⃣' : await Suppr.removeReactionName(m, msg, '6️⃣');await Trigger.ItemUsed(6,msg);break;
					case '7️⃣' : await Suppr.removeReactionName(m, msg, '7️⃣');await Trigger.ItemUsed(7,msg);break;
					case '8️⃣' : await Suppr.removeReactionName(m, msg, '8️⃣');await Trigger.ItemUsed(8,msg);break;
					case '9️⃣' : await Suppr.removeReactionName(m, msg, '9️⃣');await Trigger.ItemUsed(9,msg);break;
					default : break;
				}
			}
    		var optionUpdate = { page, limit };
		    console.log(optionUpdate);

		    // restart the listener 
		    awaitReactions(msg, m, optionUpdate, filter);  

		}
		else if(reaction.emoji.name === '⏪') {
			console.log('⏪');
		    // remove the back reaction if possible
		    await Suppr.removeReactionName(m, msg, '⏪');
		    console.log("page en cours : "+page);
		    //si page équipe, sac, ou fiche
			if(page>=1&&page<=3){
				page = 0;
				await m.edit({ embed: pages[page] });
		    	await m.reactions.removeAll();
				await m.react(auth.server.emoteReaction.poke)
				await m.react('🎒');
				await m.react('🧢');
				await m.react('❌');
			//si page pokémon Gor, Pyr, Lez
			}else if(page>=4&&page<=6){
				page = 1;

				await AffichageEquipe(msg,m);

				await m.reactions.removeAll();
				await m.react(reactionPoke[0]);
				await m.react(reactionPoke[1]);
				await m.react(reactionPoke[2]);
				await m.react('⏪');
				await m.react('❌');

			}else if(page>=7&&page<=9){

				if(page==7){
		    		await AffichagePokemon(msg,m,"Gorythmic");
		    	}else if(page==8){
		    		await AffichagePokemon(msg,m,"Pyrobut");
		    	}else{
		        	await AffichagePokemon(msg,m,"Lezargus");
		    	}

				page = page-3;

				await m.reactions.removeAll();
				await m.react('💥');
				await m.react('🥇');
				await m.react('⏪');
				await m.react('❌');

			}else if(page>=10&&page<=12){

				page = 2;
				await m.edit({ embed: pages[page] });
		    	await m.reactions.removeAll();
				await m.react(auth.server.emoteReaction.honor);
				await m.react('💊');
				await m.react('🛠️');
				await m.react('⏪');
				await m.react('❌');

			}
		   
    		var optionUpdate = { page, limit };
		    console.log(optionUpdate);
		    // restart the listener 
		    awaitReactions(msg, m, optionUpdate, filter);  

		}
		else if (reaction.emoji.name === '❌') {
			console.log('❌');
		    // trash the message instantly, returning so the listener fully stops
		    return await m.delete();
		}
		else {
			console.log('🗑');
		   
    		var optionUpdate = { page, limit };
		    console.log(optionUpdate);
		    // restart the listener 
			awaitReactions(msg, m, options, filter);
		}

    }).catch(err => m.delete())
}


module.exports.MenuExterne = async (message) => {

	var fiche = await Dresseurs.findOne({idDiscord: message.author.id});

	///Message de Menu ////
    const attachment = new Discord.MessageAttachment('./Images/Menu/Menu.png');

    const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#563F39')
        .setTitle("**__Menu Principal__**")
        .setDescription("Te voici dans le Menu Principal.\rPour accéder à ton Équipe, clique sur "+auth.server.emoteMessage.poke+"\rPour accéder à ton Sac, clique sur 🎒\rPour accéder à ta Carte Dresseur, clique sur 🧢\r\rPour fermer le menu, clique sur ❌")
        .setThumbnail(message.author.avatarURL())
        .setImage(`attachment://Menu.png`)
        .setFooter("*Bonne shance (´｡• ᵕ •｡`) ♡ *");

    //const menuCollector = 
    await message.guild.channels.cache.get(fiche.idSalon).send({files:[attachment], embed: exampleEmbed}).then(async sentClue => {
        ///Récupération de l'ID du message Menu
        await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{idMenu : sentClue});
        /// Trois réactions dans le menu (équipe, sac et carte dresseur)
        await sentClue.react(auth.server.emoteReaction.poke);
        await sentClue.react('🎒');
        await sentClue.react('🧢');
        await sentClue.react('❌');
    });

}

///ATTENTION à utiliser après createJoueur///
module.exports.SacExterne = async (message) => {

}

module.exports.EquipeExterne = async (message) => {

}

module.exports.FicheExterne = async (message) => {

}

async function AffichageEquipe (message, m) {
    	    	
	var fichePV = await Equipe.findOne({idDiscord: message.author.id});
    console.log("fichePV : "+fichePV);

    for(k=0;k<4;k++){
		nomPoke[k] = await fichePV.EquipePkm[k].Nom;
		emotePoke[k] = await fichePV.EquipePkm[k].Emote;
		reactionPoke[k] = await fichePV.EquipePkm[k].Reaction;
		positionPoke[k] = await fichePV.EquipePkm[k].Position;
    	nivPoke[k] = await fichePV.EquipePkm[k].NiveauXP[1];
    	pvMaxPoke[k] = await fichePV.EquipePkm[k].StatFinal[0];
    	pvPoke[k] = await fichePV.EquipePkm[k].PV;
    }

	const messageEquipe = new Discord.MessageEmbed()
            .setColor(await CouleurEmbedType("équipe"))
            .setTitle("__**Ton Équipe**__")
            .setDescription("Voici ton Équipe de Pokémon pour cette shasse !\rEn cliquant sur l'emote correspondante, tu pourras connaître les statistiques de chaque Pokémon.\rDepuis la fiche du Pokémon tu pourras décider quel Pokémon mettre en tête d'équipe.\r\rPour revenir en arrière ⏪\rPour fermer la fenêtre : ❌")
            .addFields(
                { name : nomPoke[0]+"  "+emotePoke[0], value : "Niveau "+nivPoke[0]+"\rPV "+pvPoke[0]+"/"+pvMaxPoke[0], inline : true},
                { name : nomPoke[1]+"  "+emotePoke[1], value : "Niveau "+nivPoke[1]+"\rPV "+pvPoke[1]+"/"+pvMaxPoke[1], inline : true},
                { name : nomPoke[2]+"  "+emotePoke[2], value : "Niveau "+nivPoke[2]+"\rPV "+pvPoke[2]+"/"+pvMaxPoke[2], inline : true}
            )


	await m.edit({ embed: messageEquipe });

}

async function AffichagePokemon (message, m, pokemon){


   	var fichePoke = await Equipe.findOne({idDiscord : message.author.id});
   	for(j=0;j<4;j++){
   		var nomPoke = fichePoke.EquipePkm[j].Nom;
   		if(nomPoke === pokemon){
   			var nivPoke = fichePoke.EquipePkm[j].NiveauXP;
            var statutPoke = fichePoke.EquipePkm[j].Statut;
            var objetPoke = fichePoke.EquipePkm[j].Objet;
            var pvPoke = fichePoke.EquipePkm[j].PV;
            var naturePoke = fichePoke.EquipePkm[j].Nature;
            var talentPoke = fichePoke.EquipePkm[j].Talent;
            var statsPoke = fichePoke.EquipePkm[j].StatFinal;
            var ivsPoke = fichePoke.EquipePkm[j].IVs;
            var evsPoke = fichePoke.EquipePkm[j].EVs;
            var typePoke = fichePoke.EquipePkm[j].Type;
            break;
   		}
   	}

   	//Image et message à afficher
    //const attachmentGor = new Discord.MessageAttachment('./Images/Equipe/'+nomGor+'.png');
    const messagePoke = new Discord.MessageEmbed()
        .setColor(await CouleurEmbedType(typePoke[0]))
        .setTitle("__**"+nomPoke.toUpperCase()+"**__")
        .setDescription(`Niveau : `+nivPoke[1]+`\rNature : `+naturePoke[0]+`\rPV actuel : `+pvPoke+`/`+statsPoke[0]+`\rTalent : `+talentPoke+`\rObjet tenu : `+objetPoke+`\rStatut : `+statutPoke[0]+`\rPour voir ses attaques : 💥\rPour le mettre en tête d'équipe : 🥇\r\rPour revenir en arrière ⏪\rPour fermer la fenêtre : ❌`)
        .addFields(
            { name : `Stat PV`, value : statsPoke[0], inline : true},
            { name : `IV`, value : ivsPoke[0], inline : true},
            { name : `EV`, value : evsPoke[0], inline : true}
        )
        .addFields(
            { name : `Stat Att`, value : statsPoke[1], inline : true},
            { name : `IV`, value : ivsPoke[1], inline : true},
            { name : `EV`, value : evsPoke[1], inline : true}
        )
        .addFields(
            { name : `Stat Def`, value : statsPoke[2], inline : true},
            { name : `IV`, value : ivsPoke[2], inline : true},
            { name : `EV`, value : evsPoke[2], inline : true}
        )
        .addFields(
            { name : `Stat AttSpe`, value : statsPoke[3], inline : true},
            { name : `IV`, value : ivsPoke[3], inline : true},
            { name : `EV`, value : evsPoke[3], inline : true}
        )
        .addFields(
            { name : `Stat DefSpe`, value : statsPoke[4], inline : true},
            { name : `IV`, value : ivsPoke[4], inline : true},
            { name : `EV`, value : evsPoke[4], inline : true}
        )
        .addFields(
            { name : `Stat Vit`, value : statsPoke[5], inline : true},
            { name : `IV`, value : ivsPoke[5], inline : true},
            { name : `EV`, value : evsPoke[5], inline : true}
        );

        await m.edit({embed: messagePoke});

}

async function AffichageAttaque (message, m, pokemon){


   	var fichePoke = await Equipe.findOne({idDiscord : message.author.id});
   	for(j=0;j<4;j++){
   		var nomPoke = fichePoke.EquipePkm[j].Nom;
   		if(nomPoke === pokemon){
   			var positionPoke = fichePoke.EquipePkm[j].Position;
            var attaque1 = fichePoke.EquipePkm[j].Attaques[0];
            var attaque2 = fichePoke.EquipePkm[j].Attaques[1];
            var attaque3 = fichePoke.EquipePkm[j].Attaques[2];
            var attaque4 = fichePoke.EquipePkm[j].Attaques[3];
            var typePoke = fichePoke.EquipePkm[j].Type;
            break;
   		}
   	}

   	//Message listant les attaques du Pokémon 1
    const messageAttaque = new Discord.MessageEmbed()
        .setColor(await CouleurEmbedType(typePoke[0]))
        .setTitle("__**Attaque de "+nomPoke.toUpperCase()+"**__")
        .addFields(
            { name : attaque1.Nom+" "+ await Degats.EmoteType(attaque1.Type) , value : attaque1.PP+"/"+attaque1.PPmax+" PP", inline : true},
            { name : `Puissance`, value : attaque1.Puissance, inline : true},
            { name : `Précision`, value : (attaque1.Precision*100)+"%", inline : true}
        )
        .addFields(
            { name : attaque2.Nom+" "+ await Degats.EmoteType(attaque2.Type) , value : attaque2.PP+"/"+attaque2.PPmax+" PP", inline : true},
            { name : `Puissance`, value : attaque2.Puissance, inline : true},
            { name : `Précision`, value : (attaque2.Precision*100)+"%", inline : true}
        )
        .addFields(
            { name : attaque3.Nom+" "+ await Degats.EmoteType(attaque3.Type) , value : attaque3.PP+"/"+attaque3.PPmax+" PP", inline : true},
            { name : `Puissance`, value : attaque3.Puissance, inline : true},
            { name : `Précision`, value : (attaque3.Precision*100)+"%", inline : true}
        )
        .addFields(
            { name : attaque4.Nom+" "+ await Degats.EmoteType(attaque4.Type) , value : attaque4.PP+"/"+attaque4.PPmax+" PP", inline : true},
            { name : `Puissance`, value : attaque4.Puissance, inline : true},
            { name : `Précision`, value : (attaque4.Precision*100)+"%", inline : true}
        );

        await m.edit({embed: messageAttaque});

}


async function AffichageBalls (message,m){


	var ficheSac = await Sac.findOne({idDiscord : message.author.id});

    const messageBalls = new Discord.MessageEmbed()
        .setColor(await CouleurEmbedType("balls"))
        .setTitle("__**Ta Poche à Balls Pokémon**__")
        .setDescription("Voici l'état de tes Balls pour cette shasse !\rEn marchant, tu pourras aléatoirement en ramasser.\rElles s'ajouteront alors à ton stock.\r\rPour revenir en arrière ⏪\rPour fermer le menu, clique sur ❌")
        .addFields(
            { name : ficheSac.balls[0], value : ficheSac.ballsEmote[0]+" "+ficheSac.ballsLeft[0], inline : true},
            { name : ficheSac.balls[1], value : ficheSac.ballsEmote[1]+" "+ficheSac.ballsLeft[1], inline : true},
            { name : ficheSac.balls[2], value : ficheSac.ballsEmote[2]+" "+ficheSac.ballsLeft[2], inline : true}
        )
        .addFields(
            { name : ficheSac.balls[3], value : ficheSac.ballsEmote[3]+" "+ficheSac.ballsLeft[3], inline : true},
            { name : ficheSac.balls[4], value : ficheSac.ballsEmote[4]+" "+ficheSac.ballsLeft[4], inline : true},
            { name : ficheSac.balls[5], value : ficheSac.ballsEmote[5]+" "+ficheSac.ballsLeft[5], inline : true}
        );


        await m.edit({embed: messageBalls});

}


async function AffichageSoins (message,m){


	var ficheSac = await Sac.findOne({idDiscord : message.author.id});

    const messageSoins = new Discord.MessageEmbed()
        .setColor(await CouleurEmbedType("soins"))
        .setTitle("__**Ta Poche à Soins Pokémon**__")
        .setDescription("Voici l'état de tes objets de Soins pour cette shasse !\rEn marchant, tu pourras aléatoirement en ramasser.\rIls s'ajouteront alors à ton stock.\rPour utiliser un objet, clique sur son emote associée.\r\rPour revenir en arrière ⏪\rPour fermer le menu, clique sur ❌")
        .addFields(
            { name : ficheSac.healing[0]+" "+ficheSac.healingEmote[0], value : ficheSac.healingLeft[0], inline : true},
            { name : ficheSac.healing[1]+" "+ficheSac.healingEmote[1], value : ficheSac.healingLeft[1], inline : true},
            { name : ficheSac.healing[2]+" "+ficheSac.healingEmote[2], value : ficheSac.healingLeft[2], inline : true}
        )
        .addFields(
            { name : ficheSac.healing[3]+" "+ficheSac.healingEmote[3], value : ficheSac.healingLeft[3], inline : true},
            { name : ficheSac.healing[4]+" "+ficheSac.healingEmote[4], value : ficheSac.healingLeft[4], inline : true},
            { name : ficheSac.healing[5]+" "+ficheSac.healingEmote[5], value : ficheSac.healingLeft[5], inline : true}
        )
        .addFields(
            { name : ficheSac.healing[6]+" "+ficheSac.healingEmote[6], value : ficheSac.healingLeft[6], inline : true},
            { name : ficheSac.healing[7]+" "+ficheSac.healingEmote[7], value : ficheSac.healingLeft[7], inline : true},
            { name : ficheSac.healing[8]+" "+ficheSac.healingEmote[8], value : ficheSac.healingLeft[8], inline : true}
        );


        await m.edit({embed: messageSoins});

}


async function AffichageObjets (message,m){


	var ficheSac = await Sac.findOne({idDiscord : message.author.id});

    const messageObjets = new Discord.MessageEmbed()
        .setColor(await CouleurEmbedType("objets"))
        .setTitle("__**Ta Poche à Objets de Combat**__")
        .setDescription("Voici l'état de tes objets de Combat pour cette shasse !\rPour en équiper un, il te suffit de cliquer sur l'emote associée.\rTu pourras alors décider du Pokémon à qui l'équiper.\r\rPour revenir en arrière ⏪\rPour fermer le menu, clique sur ❌")
        .addFields(
            { name : ficheSac.objets[0]+" "+ficheSac.objetsEmote[0], value : ficheSac.objetsUsed[0], inline : true},
            { name : ficheSac.objets[1]+" "+ficheSac.objetsEmote[1], value : ficheSac.objetsUsed[1], inline : true},
            { name : ficheSac.objets[2]+" "+ficheSac.objetsEmote[2], value : ficheSac.objetsUsed[2], inline : true}
        )
        .addFields(
            { name : ficheSac.objets[3]+" "+ficheSac.objetsEmote[3], value : ficheSac.objetsUsed[3], inline : true},
            { name : ficheSac.objets[4]+" "+ficheSac.objetsEmote[4], value : ficheSac.objetsUsed[4], inline : true},
            { name : ficheSac.objets[5]+" "+ficheSac.objetsEmote[5], value : ficheSac.objetsUsed[5], inline : true}
        )
        .addFields(
            { name : ficheSac.objets[6]+" "+ficheSac.objetsEmote[6], value : ficheSac.objetsUsed[6], inline : true},
            { name : ficheSac.objets[7]+" "+ficheSac.objetsEmote[7], value : ficheSac.objetsUsed[7], inline : true},
            { name : ficheSac.objets[8]+" "+ficheSac.objetsEmote[8], value : ficheSac.objetsUsed[8], inline : true}
        );


        await m.edit({embed: messageObjets});

}

async function CouleurEmbedType (type){

    switch (type.toLowerCase()){
        case "acier" : return "#9F9F9F"; break;
        case "combat" : return "#C6432F"; break;
        case "dragon" : return "#5111AC"; break;
        case "eau" : return "#3879FA"; break;
        case "électrique" : return "#F6F201"; break;
        case "fée" : return "#F45AE8"; break;
        case "feu" : return "#F1271F"; break;
        case "glace" : return "#14E7FF"; break;
        case "insecte" : return "#B2D482"; break;
        case "normal" : return "#FFFFFE"; break;
        case "plante" : return "#166F1C"; break;
        case "poison" : return "#C042FF"; break;
        case "psy" : return "#C168D4"; break;
        case "roche" : return "#7F4F3C"; break;
        case "sol" : return "#D48868"; break;
        case "spectre" : return "#BC92C4"; break;
        case "ténèbres" : return "#000001"; break;
        case "vol" : return "#9AE8F1"; break;
        case "menu" : return "#854D30"; break;
        case "sac" : return "#AF2A32"; break;
        case "équipe" : return "#FFFFFE"; break;
        case "fiche" : return "#2F2AAF"; break;
        case "balls" : return "#6D1E8A"; break;
        case "soins" : return "#EA7BD9"; break;
        case "objets" : return "#616161"; break;
        case "statut" : return "#888888";break;
        default : return "#888888";break;
    };

}

 
