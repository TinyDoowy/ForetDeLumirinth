
var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var cron = require('node-cron');

//Dossier Affichage
const Menu = require("./Affichage/messagesExterne.js");


//Dossier Fonctions
const Create = require("./Fonctions/creations.js");
const Stats = require("./Fonctions/statistiques.js");
const Suppr = require("./Fonctions/suppressions.js");
const Trigger = require("./Fonctions/triggers.js");

//Dossier Combat
const Degats = require("./Combat/degats.js");
const RandAttaque = require("./Combat/randomAttaque.js");
const PokemonSauvage = require("./Combat/rencontre.js");

//Dossier FicheMongo
const Equipe = require("./FicheMongo/equipe.js");
const Sac = require("./FicheMongo/sac.js");
const Spawn = require("./FicheMongo/sauvage.js");
const Dresseurs = require("./FicheMongo/joueur.js");


const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/Theffroi',{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client();
bot.login(auth.token);
bot.on('ready', async function () {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

const prefixPing = "coucou";
const prefixStart = "lumirinth";
const prefixMenu = "menu";
const prefixClean = "clean";
const prefixMarche = "march"




///////////////////////
// Début de la Quête //
///////////////////////

  //cron.schedule(test, async () => {
  cron.schedule('0 18 31 12 *', async () => {
    const guild = bot.guilds.cache.get(auth.server.guild);
    const channel = bot.channels.cache.get(auth.server.salon.affichage);

                      await channel.send("https://www.youtube.com/watch?v=d5X4iAAE0uU");
                      channel.send("*Ceci est un indice !* <@"+auth.server.role.ping+">");
});


bot.on('message', async function (message, user) {

    petitMessage = message.content.toLowerCase();

    // arrête la lecture du message si l'auteur est le bot.
    if (message.author.bot) return;
    //limité à la catégorie de la forêt
    if (message.channel.parent!=auth.server.categorie.foret) return;

    if(petitMessage.startsWith(prefixPing)&&message.member.roles.cache.has(auth.server.role.staff)) {
        message.reply("echo...echo....echooooo");
        return;
    }

    if(petitMessage.startsWith("test")) {
    			console.log("coucou test !")
                await Menu.MenuTest(message);

                /*
                var fichePV = await Equipe.findOne({idDiscord: message.author.id});
                console.log("fichePV : "+fichePV);
                var triPosition = await fichePV.EquipePkm;
                console.log("triPosition : "+triPosition);
                var k = 1;
                var pokemonNom1 = await triPosition[k-1].Nom;
                var pokemonNom2 = await triPosition[k].Nom;
                var pokemonNom3 = await triPosition[k+1].Nom;
                console.log(pokemonNom3+"/"+pokemonNom2+"/"+pokemonNom1);
                */

    }


    if(petitMessage.startsWith(prefixClean)&&message.member.roles.cache.has(auth.server.role.staff)) {
    	await Suppr.finShasse(message,bot);
    }

    //taper "mulirinth" en ayant le rôle "forêt" (donnat accès à la catégorie forêt) et en n'ayant pas déjà le rôle shasse (qui signifie que le joueur a déjà commencer)
    if(petitMessage.includes(prefixStart)&&message.member.roles.cache.has(auth.server.role.foret)&&!message.member.roles.cache.has(auth.server.role.shasse)) {
        console.log("Let's go !");

        //création des fiche joueur, forêt, sac et équipe
        //la création de forêt génère un salon écrit et un rôle perso.
        await Create.createJoueur(message);
        var tempChannel = await Create.createForest(message);
        await Create.createSac(message);
        await Create.createEquipe(message);

	    //Embed message d'intro
	        const attachment = new Discord.MessageAttachment('./Images/Lieu/Foret.png');

	        const exampleEmbed = new Discord.MessageEmbed()
	            .setColor('#66FF24')
	            .setTitle("Félicitations à __"+message.author.username+"__")
	            .setAuthor("Programmé par **Doowy**")
	            .setDescription(`\rTu viens de pénétrer dans la Forêt de Lumirinth. Il y fait sombre, très sombre.\rTu es incapable de savoir s'il fait jour ou nuit, ce que tu sais c'est que tu n'en sortiras pas les mains vides.\rTu es rentré·e ici pour une raison et une seule, **shasser** le Théffroi ***Authentique*** Shiny.\rPour cela, tu vas devoir __marcher__ dans les hautes herbes et croiser les ~~doigts~~ Pokémon.\r:warning: Attention, tu n'as le droit qu'à une capture :warning:\rMais à autant de recontres que tu le souhaites.\r\rPour ouvrir le Menu, tape __menu__.\rPour commencer à explorer la forêt, il te suffit de __marcher__.\rMerci d'attendre que l'emote :x: apparaisse avant de faire votre choix d'action.`)
	            .addFields(
	                { name : `Ton équipe`, value : auth.server.emoteMessage.gorythmic+" "+auth.server.emoteMessage.pyrobut+" "+auth.server.emoteMessage.lezargus, inline : true},
	                { name : `Ton sac`, value : "5 "+auth.server.emoteMessage.poke+", 2 "+auth.server.emoteMessage.super+"\r1 "+auth.server.emoteMessage.hyper+", 1 "+auth.server.emoteMessage.honor, inline : true},
	                { name : `Charm Chroma`, value : "1 chance sur 50", inline : true}
	                )
	            .setThumbnail(message.author.avatarURL())
	            .setImage(`attachment://Foret.png`)
	            .setFooter("*Bonne shance (´｡• ᵕ •｡`) ♡ *");
	    await message.guild.channels.cache.get(tempChannel.id).send({files:[attachment], embed: exampleEmbed}).then(async pourPin => {
	    																													pourPin.pin();
	    																													await setTimeout(async function() {await Suppr.deleteLast(message,1);},1000);
	    																															 });
    }

    //taper "menu" en ayant le rôle shasse (donc aventure démarrée) et en n'étant pas dans le salon tasse (salon de démarrage)
    if(petitMessage.includes(prefixMenu)&&message.member.roles.cache.has(auth.server.role.shasse)&&message.channel.id!=auth.server.salon.tasse) {

    	await Menu.MenuExterne(message);

/*
            	///Message de Menu ////
                const attachment = new Discord.MessageAttachment('./Images/Menu/Menu.png');

                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#563F39')
                    .setTitle("**__Menu Principal__**")
                    .setDescription(`Te voici dans le Menu Principal.\rPour accéder à ton Équipe, clique sur <:Poke_Ball:`+auth.server.emote.poke+`>\rPour accéder à ton Sac, clique sur 🎒\rPour accéder à ta Carte Dresseur, clique sur 🧢\r\rPour fermer le menu, clique sur ❌`)
                    .setThumbnail(message.author.avatarURL())
                    .setImage(`attachment://Menu.png`)
                    .setFooter("*Bonne shance (´｡• ᵕ •｡`) ♡ *");

                //const menuCollector = 
                await message.guild.channels.cache.get(fiche.idSalon).send({files:[attachment], embed: exampleEmbed}).then(async sentClue => {
                    ///Récupération de l'ID du message Menu
                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{'Menu.idMenu' : sentClue});
                    /// Trois réactions dans le menu (équipe, sac et carte dresseur)
                    await sentClue.react(auth.server.emote.poke);
                    await sentClue.react('🎒');
                    await sentClue.react('🧢');
                    await sentClue.react('❌');
                });
*/
                /// Trois filtres de réaction ///
                const filterEquipe = (reaction, user) => {return (reaction.emoji.id === auth.server.emote.poke && user.id!=auth.server.roleBot);};
                const filterSac = (reaction, user) => {return (reaction.emoji.name === '🎒' && user.id!=auth.server.roleBot);};
                const filterJoueur = (reaction, user) => {return (reaction.emoji.name === '🧢' && user.id!=auth.server.roleBot);};

            //récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
            var fiche = await Dresseurs.findOne({idDiscord: message.author.id});

                /// Récupération du message Menu dans une variable
                const fetchedMenuId = message.guild.channels.cache.get(fiche.idSalon).messages.cache.get(fiche.idMenu);

                //Collector de l'Équipe sur l'emote pokeball (activation du retrait de l'emote (inutile ici mais sait-on jamais))
                const equipeCollector = fetchedMenuId.createReactionCollector(filterEquipe, { dispose: true });

                //Réaction du bot au clic de l'émote Pokeball
                equipeCollector.on('collect', async (reaction, participant) => {
                    console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);
                    //fetchedMenuId.guild.members.fetch(participant).then(async (ajoutPpl) => {

                    var ficheEquipe = await Equipe.findOne({idDiscord: message.author.id});

                    //Message à afficher avec le sous-menu équipe (pour l'instant que 3 pokémon)
                    const messageEquipe = new Discord.MessageEmbed()
                        .setColor('#FFF354')
                        .setTitle("__**Ton Équipe**__")
                        .setDescription(`Voici ton Équipe de Pokémon pour cette shasse !\rEn cliquant sur l'emote correspondante, tu pourras connaître les statistiques de chaque Pokémon.\rDepuis la fiche du Pokémon tu pourras décider quel Pokémon mettre en tête d'équipe.\r\rPour fermer la fenêtre : ❌`)
                        .addFields(
                            { name : auth.server.emote.nomPokemon1+" <:"+auth.server.emote.nomPokemon1+":"+auth.server.emote.pokemon1+">", value : "Niveau "+ficheEquipe.Pokemon1.NiveauXP[1]+"\rPV "+ficheEquipe.Pokemon1.PV+"/"+ficheEquipe.Pokemon1.StatFinal[0], inline : true},
                            { name : auth.server.emote.nomPokemon2+" <:"+auth.server.emote.nomPokemon2+":"+auth.server.emote.pokemon2+">", value : "Niveau "+ficheEquipe.Pokemon2.NiveauXP[1]+"\rPV "+ficheEquipe.Pokemon2.PV+"/"+ficheEquipe.Pokemon2.StatFinal[0], inline : true},
                            { name : auth.server.emote.nomPokemon3+" <:"+auth.server.emote.nomPokemon3+":"+auth.server.emote.pokemon3+">", value : "Niveau "+ficheEquipe.Pokemon3.NiveauXP[1]+"\rPV "+ficheEquipe.Pokemon3.PV+"/"+ficheEquipe.Pokemon3.StatFinal[0], inline : true}
                        )
                        .setThumbnail(participant.avatarURL());

                        //Nouvelle récup de la fiche dresseur pour retrouver l'id de son salon privé
                        var fiche = await Dresseurs.findOne({idDiscord: message.author.id});

                        await fetchedMenuId.guild.channels.cache.get(fiche.idSalon).send(messageEquipe).then(async sentClue => {
                            ///Récupération de l'ID du message sous-menu équipe
                            await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{idEquipe : sentClue});
                            /// Trois réactions dans le menu (les trois pokémon)
                            await sentClue.react(auth.server.emote.pokemon1);
                            await sentClue.react(auth.server.emote.pokemon2);
                            await sentClue.react(auth.server.emote.pokemon3);
                            await sentClue.react('❌');
                        });

                        //trois filtres de réaction sur chaque émote de chaque pokémon
                        const filterPokemon1 = (reaction, user) => {return (reaction.emoji.id === auth.server.emote.pokemon1 && user.id!=auth.server.roleBot);};
                        const filterPokemon2 = (reaction, user) => {return (reaction.emoji.id === auth.server.emote.pokemon2 && user.id!=auth.server.roleBot);};
                        const filterPokemon3 = (reaction, user) => {return (reaction.emoji.id === auth.server.emote.pokemon3 && user.id!=auth.server.roleBot);};

                    //récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
                    var fiche = await Dresseurs.findOne({idDiscord: message.author.id});

                        /// Récupération du message Sous-Menu équipe dans une variable
                        const fetchedEquipeId = message.guild.channels.cache.get(fiche.idSalon).messages.cache.get(fiche.idEquipe);
                        
                        //Collector du Pokémon 1 sur l'emote Gorythmic (activation du retrait de l'emote (inutile ici mais sait-on jamais))
                        const pokemon1Collector = fetchedEquipeId.createReactionCollector(filterPokemon1, { dispose: true });
                        const pokemon2Collector = fetchedEquipeId.createReactionCollector(filterPokemon2, { dispose: true });
                        const pokemon3Collector = fetchedEquipeId.createReactionCollector(filterPokemon3, { dispose: true });

                        pokemon1Collector.on('collect', async (reaction, participant) => {
                            console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);
                            //fetchedMenuId.guild.members.fetch(participant).then(async (ajoutPpl) => {
                            

                            //Récupération de variable à afficher dans le message stat générale
                            var fichePokemon1 = await Equipe.findOne({idDiscord : message.author.id});
                            var nomPokemon1 = fichePokemon1.Pokemon1.Nom;
                            var niveauPokemon1 = fichePokemon1.Pokemon1.NiveauXP;
                            var statutPokemon1 = fichePokemon1.Pokemon1.Statut;
                            var pvPokemon1 = fichePokemon1.Pokemon1.PV;
                            var naturePokemon1 = fichePokemon1.Pokemon1.Nature;
                            var talentPokemon1 = fichePokemon1.Pokemon1.Talent;
                            var statsPokemon1 = fichePokemon1.Pokemon1.StatFinal;
                            var ivsPokemon1 = fichePokemon1.Pokemon1.IVs;
                            var evsPokemon1 = fichePokemon1.Pokemon1.EVs;
                            //Petite pirouette pour le cas d'un objet vide
                            if (fichePokemon1.Pokemon1.Objet==""){var objetPokemon1="Aucun";}else{var objetPokemon1=fichePokemon1.Pokemon1.Objet};


                            //Image et message à afficher
                            const attachmentPokemon1 = new Discord.MessageAttachment('./Images/Equipe/'+nomPokemon1+'.png');
                            const messagePokemon1 = new Discord.MessageEmbed()
                                .setColor('#FFF354')
                                .setTitle("__**"+nomPokemon1.toUpperCase()+"**__")
                                .setDescription(`Niveau : `+niveauPokemon1[1]+`\rNature : `+naturePokemon1[0]+`\rPV actuel : `+pvPokemon1+`/`+statsPokemon1[0]+`\rTalent : `+talentPokemon1+`\rObjet tenu : `+objetPokemon1+`\rStatut : `+statutPokemon1[0]+`\rPour voir ses attaques : 💥\rPour le mettre en tête d'équipe : 1️⃣\r\rPour fermer la fenêtre : ❌`)
                                .addFields(
                                    { name : `Stat PV`, value : statsPokemon1[0], inline : true},
                                    { name : `IV`, value : ivsPokemon1[0], inline : true},
                                    { name : `EV`, value : evsPokemon1[0], inline : true}
                                )
                                .addFields(
                                    { name : `Stat Att`, value : statsPokemon1[1], inline : true},
                                    { name : `IV`, value : ivsPokemon1[1], inline : true},
                                    { name : `EV`, value : evsPokemon1[1], inline : true}
                                )
                                .addFields(
                                    { name : `Stat Def`, value : statsPokemon1[2], inline : true},
                                    { name : `IV`, value : ivsPokemon1[2], inline : true},
                                    { name : `EV`, value : evsPokemon1[2], inline : true}
                                )
                                .addFields(
                                    { name : `Stat AttSpe`, value : statsPokemon1[3], inline : true},
                                    { name : `IV`, value : ivsPokemon1[3], inline : true},
                                    { name : `EV`, value : evsPokemon1[3], inline : true}
                                )
                                .addFields(
                                    { name : `Stat DefSpe`, value : statsPokemon1[4], inline : true},
                                    { name : `IV`, value : ivsPokemon1[4], inline : true},
                                    { name : `EV`, value : evsPokemon1[4], inline : true}
                                )
                                .addFields(
                                    { name : `Stat Vit`, value : statsPokemon1[5], inline : true},
                                    { name : `IV`, value : ivsPokemon1[5], inline : true},
                                    { name : `EV`, value : evsPokemon1[5], inline : true}
                                )
                                .setThumbnail(participant.avatarURL());

                                //Récupération de la fiche dresseur pour retrouver son salon privé
                                var fiche = await Dresseurs.findOne({idDiscord: message.author.id});

                                //Ecriture du message plus de l'image, ajout de deux emotes (attaque et tête d'équipe)
                                await fetchedEquipeId.guild.channels.cache.get(fiche.idSalon).send({files:[attachmentPokemon1], embed: messagePokemon1}).then(async sentClue => {
                                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{idPokemon1 : sentClue});
                                    await sentClue.react('💥');
                                    await sentClue.react('1️⃣');
                                    await sentClue.react('❌');
                                });

                                //Deux nouveaux filtres pour les attaques et la tête d'équipe
                                const filterAttaquePokemon1 = (reaction, user) => {return (reaction.emoji.name === '💥' && user.id!=auth.server.roleBot);};
                                const filterPremierPokemon1 = (reaction, user) => {return (reaction.emoji.name === '1️⃣' && user.id!=auth.server.roleBot);};

                                //Récupération de la fiche dresseur pour retrouver son salon privé
                                var fiche = await Dresseurs.findOne({idDiscord: message.author.id});
                                    //Récupération du message de sous-menu Fiche Pokémon 1
                                    const fetchedPokemon1Id = message.guild.channels.cache.get(fiche.idSalon).messages.cache.get(fiche.idPokemon1);

                                    // Création des deux derniers collecteur de cette ligne Pokémon 1
                                    const pokemon1AttaqueCollector = fetchedPokemon1Id.createReactionCollector(filterAttaquePokemon1, { dispose: true });
                                    const pokemon1FirstCollector = fetchedPokemon1Id.createReactionCollector(filterPremierPokemon1, { dispose: true });

                                    //Récupération des infos d'attaques du Pokémon 1
                                    var fichePokemon1 = await Equipe.findOne({idDiscord : message.author.id});
                                    var nomPokemon1 = fichePokemon1.Pokemon1.Nom;
                                    var attaque1Pokemon1 = fichePokemon1.Pokemon1.Attaque1;
                                    var attaque2Pokemon1 = fichePokemon1.Pokemon1.Attaque2;
                                    var attaque3Pokemon1 = fichePokemon1.Pokemon1.Attaque3;
                                    var attaque4Pokemon1 = fichePokemon1.Pokemon1.Attaque4;

                                    //Action du collector Attaque du Pokémon1
                                    pokemon1AttaqueCollector.on('collect', async (reaction, participant) => {
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);
                                        
                                        //Message listant les attaques du Pokémon 1
                                        const messageAttaquePokemon1 = new Discord.MessageEmbed()
                                            .setColor('#FFF354')
                                            .setTitle("__**Attaque de "+nomPokemon1.toUpperCase()+"**__")
                                            .addFields(
                                                { name : attaque1Pokemon1.Nom+" "+ await Degats.EmoteType(attaque1Pokemon1.Type) , value : attaque1Pokemon1.PP+" PP", inline : true},
                                                { name : `Puissance`, value : attaque1Pokemon1.Puissance, inline : true},
                                                { name : `Précision`, value : (attaque1Pokemon1.Precision*100)+"%", inline : true}
                                            )
                                            .addFields(
                                                { name : attaque2Pokemon1.Nom+" "+ await Degats.EmoteType(attaque2Pokemon1.Type) , value : attaque2Pokemon1.PP+" PP", inline : true},
                                                { name : `Puissance`, value : attaque2Pokemon1.Puissance, inline : true},
                                                { name : `Précision`, value : (attaque2Pokemon1.Precision*100)+"%", inline : true}
                                            )
                                            .addFields(
                                                { name : attaque3Pokemon1.Nom+" "+ await Degats.EmoteType(attaque3Pokemon1.Type) , value : attaque3Pokemon1.PP+" PP", inline : true},
                                                { name : `Puissance`, value : attaque3Pokemon1.Puissance, inline : true},
                                                { name : `Précision`, value : (attaque3Pokemon1.Precision*100)+"%", inline : true}
                                            )
                                            .addFields(
                                                { name : attaque4Pokemon1.Nom+" "+ await Degats.EmoteType(attaque4Pokemon1.Type) , value : attaque4Pokemon1.PP+" PP", inline : true},
                                                { name : `Puissance`, value : attaque4Pokemon1.Puissance, inline : true},
                                                { name : `Précision`, value : (attaque4Pokemon1.Precision*100)+"%", inline : true}
                                            )
                                            .setThumbnail(participant.avatarURL());

                                            await fetchedPokemon1Id.guild.channels.cache.get(fiche.idSalon).send(messageAttaquePokemon1).then(async sentClue => {
                                                ///Récupération de l'ID du message sous-menu équipe
                                                //await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{idEquipe : sentClue});

                                                await sentClue.react('❌');
                                            });

                                    });


                                    /// Collector pour passer le Pokémon en Premier dans l'équipe ///
                                    pokemon1FirstCollector.on('collect', async (reaction, participant) => {
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

                                        //récup de la fiche équipe
                                        var testTeam = await Equipe.findOne({idDiscord: message.author.id});

                                        await Equipe.findOneAndUpdate({idDiscord: message.author.id}, {'Pokemon1.Actif' : true, 'Pokemon2.Actif' : false, 'Pokemon3.Actif' : false});
                                        const messageFirstPokemon1 = "**"+nomPokemon1.toUpperCase()+"** est désormais ton Pokémon en tête d'équipe !"
                                            await fetchedPokemon1Id.guild.channels.cache.get(fiche.idSalon).send(messageFirstPokemon1);

                                    });

                        });



                        pokemon2Collector.on('collect', async (reaction, participant) => {
                            console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);
                            //fetchedMenuId.guild.members.fetch(participant).then(async (ajoutPpl) => {
                            
                        //Récupération de variable à afficher dans le message stat générale
                        var fichePokemon2 = await Equipe.findOne({idDiscord : message.author.id});
                        var nomPokemon2 = fichePokemon2.Pokemon2.Nom;
                        var niveauPokemon2 = fichePokemon2.Pokemon2.NiveauXP;
                        var statutPokemon2 = fichePokemon2.Pokemon2.Statut;
                        var pvPokemon2 = fichePokemon2.Pokemon2.PV;
                        var naturePokemon2 = fichePokemon2.Pokemon2.Nature;
                        var talentPokemon2 = fichePokemon2.Pokemon2.Talent;
                        var statsPokemon2 = fichePokemon2.Pokemon2.StatFinal;
                        var ivsPokemon2 = fichePokemon2.Pokemon2.IVs;
                        var evsPokemon2 = fichePokemon2.Pokemon2.EVs;
                        //Petite pirouette pour le cas d'un objet vide
                        if (fichePokemon2.Pokemon2.Objet==""){var objetPokemon2="Aucun";}else{var objetPokemon2=fichePokemon2.Pokemon2.Objet};


                            //Image et message à afficher
                            const attachmentPokemon2 = new Discord.MessageAttachment('./Images/Equipe/'+nomPokemon2+'.png');
                            const messagePokemon2 = new Discord.MessageEmbed()
                                .setColor('#FFF354')
                                .setTitle("__**"+nomPokemon2.toUpperCase()+"**__")
                                .setDescription(`Niveau : `+niveauPokemon2[1]+`\rNature : `+naturePokemon2[0]+`\rPV actuel : `+pvPokemon2+`/`+statsPokemon2[0]+`\rTalent : `+talentPokemon2+`\rObjet tenu : `+objetPokemon2+`\rStatut : `+statutPokemon2[0]+`\rPour voir ses attaques : 💥\rPour le mettre en tête d'équipe : 1️⃣\r\rPour fermer la fenêtre : ❌`)
                                .addFields(
                                    { name : `Stat PV`, value : statsPokemon2[0], inline : true},
                                    { name : `IV`, value : ivsPokemon2[0], inline : true},
                                    { name : `EV`, value : evsPokemon2[0], inline : true}
                                )
                                .addFields(
                                    { name : `Stat Att`, value : statsPokemon2[1], inline : true},
                                    { name : `IV`, value : ivsPokemon2[1], inline : true},
                                    { name : `EV`, value : evsPokemon2[1], inline : true}
                                )
                                .addFields(
                                    { name : `Stat Def`, value : statsPokemon2[2], inline : true},
                                    { name : `IV`, value : ivsPokemon2[2], inline : true},
                                    { name : `EV`, value : evsPokemon2[2], inline : true}
                                )
                                .addFields(
                                    { name : `Stat AttSpe`, value : statsPokemon2[3], inline : true},
                                    { name : `IV`, value : ivsPokemon2[3], inline : true},
                                    { name : `EV`, value : evsPokemon2[3], inline : true}
                                )
                                .addFields(
                                    { name : `Stat DefSpe`, value : statsPokemon2[4], inline : true},
                                    { name : `IV`, value : ivsPokemon2[4], inline : true},
                                    { name : `EV`, value : evsPokemon2[4], inline : true}
                                )
                                .addFields(
                                    { name : `Stat Vit`, value : statsPokemon2[5], inline : true},
                                    { name : `IV`, value : ivsPokemon2[5], inline : true},
                                    { name : `EV`, value : evsPokemon2[5], inline : true}
                                )
                                .setThumbnail(participant.avatarURL());

                                //Récupération de la fiche dresseur pour retrouver son salon privé
                                var fiche = await Dresseurs.findOne({idDiscord: message.author.id});

                                //Ecriture du message plus de l'image, ajout de deux emotes (attaque et tête d'équipe)
                                await fetchedEquipeId.guild.channels.cache.get(fiche.idSalon).send({files:[attachmentPokemon2], embed: messagePokemon2}).then(async sentClue => {
                                    await sentClue.react('💥');
                                    await sentClue.react('1️⃣');
                                    await sentClue.react('❌');
                                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{idPokemon2 : sentClue});
                                });

                                //Deux nouveaux filtres pour les attaques et la tête d'équipe
                                const filterAttaquePokemon2 = (reaction, user) => {return (reaction.emoji.name === '💥' && user.id!=auth.server.roleBot);};
                                const filterPremierPokemon2 = (reaction, user) => {return (reaction.emoji.name === '1️⃣' && user.id!=auth.server.roleBot);};

                                //Récupération de la fiche dresseur pour retrouver son salon privé
                                var fiche = await Dresseurs.findOne({idDiscord: message.author.id});
                                    //Récupération du message de sous-menu Fiche Pokémon 1
                                    const fetchedPokemon2Id = message.guild.channels.cache.get(fiche.idSalon).messages.cache.get(fiche.idPokemon2);

                                    // Création des deux derniers collecteur de cette ligne Pokémon 1
                                    const pokemon2AttaqueCollector = fetchedPokemon2Id.createReactionCollector(filterAttaquePokemon2, { dispose: true });
                                    const pokemon2FirstCollector = fetchedPokemon2Id.createReactionCollector(filterPremierPokemon2, { dispose: true });

                                    //Récupération des infos d'attaques du Pokémon 1
                                    var fichePokemon2 = await Equipe.findOne({idDiscord : message.author.id});
                                    var nomPokemon2 = fichePokemon2.Pokemon2.Nom;
                                    var attaque1Pokemon2 = fichePokemon2.Pokemon2.Attaque1;
                                    var attaque2Pokemon2 = fichePokemon2.Pokemon2.Attaque2;
                                    var attaque3Pokemon2 = fichePokemon2.Pokemon2.Attaque3;
                                    var attaque4Pokemon2 = fichePokemon2.Pokemon2.Attaque4;

                                    //Action du collector Attaque du Pokémon1
                                    pokemon2AttaqueCollector.on('collect', async (reaction, participant) => {
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);
                                        
                                        //Message listant les attaques du Pokémon 1
                                        const messageAttaquePokemon2 = new Discord.MessageEmbed()
                                            .setColor('#FFF354')
                                            .setTitle("__**Attaque de "+nomPokemon2.toUpperCase()+"**__")
                                            .addFields(
                                                { name : attaque1Pokemon2.Nom+" "+ await Degats.EmoteType(attaque1Pokemon2.Type) , value : attaque1Pokemon2.PP+" PP", inline : true},
                                                { name : `Puissance`, value : attaque1Pokemon2.Puissance, inline : true},
                                                { name : `Précision`, value : (attaque1Pokemon2.Precision*100)+"%", inline : true}
                                            )
                                            .addFields(
                                                { name : attaque2Pokemon2.Nom+" "+ await Degats.EmoteType(attaque2Pokemon2.Type) , value : attaque2Pokemon2.PP+" PP", inline : true},
                                                { name : `Puissance`, value : attaque2Pokemon2.Puissance, inline : true},
                                                { name : `Précision`, value : (attaque2Pokemon2.Precision*100)+"%", inline : true}
                                            )
                                            .addFields(
                                                { name : attaque3Pokemon2.Nom+" "+ await Degats.EmoteType(attaque3Pokemon2.Type) , value : attaque3Pokemon2.PP+" PP", inline : true},
                                                { name : `Puissance`, value : attaque3Pokemon2.Puissance, inline : true},
                                                { name : `Précision`, value : (attaque3Pokemon2.Precision*100)+"%", inline : true}
                                            )
                                            .addFields(
                                                { name : attaque4Pokemon2.Nom+" "+ await Degats.EmoteType(attaque4Pokemon2.Type) , value : attaque4Pokemon2.PP+" PP", inline : true},
                                                { name : `Puissance`, value : attaque4Pokemon2.Puissance, inline : true},
                                                { name : `Précision`, value : (attaque4Pokemon2.Precision*100)+"%", inline : true}
                                            )
                                            .setThumbnail(participant.avatarURL());

                                            await fetchedPokemon2Id.guild.channels.cache.get(fiche.idSalon).send(messageAttaquePokemon2).then(async sentClue => {
                                                ///Récupération de l'ID du message sous-menu équipe
                                                //await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{idEquipe : sentClue});

                                                await sentClue.react('❌');
                                            });

                                    });


                                    /// Collector pour passer le Pokémon en Premier dans l'équipe ///
                                    pokemon2FirstCollector.on('collect', async (reaction, participant) => {
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

                                        //récup de la fiche équipe
                                        var testTeam = await Equipe.findOne({idDiscord: message.author.id});

                                        await Equipe.findOneAndUpdate({idDiscord: message.author.id}, {'Pokemon1.Actif' : false, 'Pokemon2.Actif' : true, 'Pokemon3.Actif' : false});
                                        const messageFirstPokemon2 = "**"+nomPokemon2.toUpperCase()+"** est désormais ton Pokémon en tête d'équipe !"
                                            await fetchedPokemon2Id.guild.channels.cache.get(fiche.idSalon).send(messageFirstPokemon2);

                                    });

                        });



                        pokemon3Collector.on('collect', async (reaction, participant) => {
                            console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);
                            //fetchedMenuId.guild.members.fetch(participant).then(async (ajoutPpl) => {
                            
                        //Récupération de variable à afficher dans le message stat générale
                        var fichePokemon3 = await Equipe.findOne({idDiscord : message.author.id});
                        var nomPokemon3 = fichePokemon3.Pokemon3.Nom;
                        var niveauPokemon3 = fichePokemon3.Pokemon3.NiveauXP;
                        var statutPokemon3 = fichePokemon3.Pokemon3.Statut;
                        var pvPokemon3 = fichePokemon3.Pokemon3.PV;
                        var naturePokemon3 = fichePokemon3.Pokemon3.Nature;
                        var talentPokemon3 = fichePokemon3.Pokemon3.Talent;
                        var statsPokemon3 = fichePokemon3.Pokemon3.StatFinal;
                        var ivsPokemon3 = fichePokemon3.Pokemon3.IVs;
                        var evsPokemon3 = fichePokemon3.Pokemon3.EVs;
                        //Petite pirouette pour le cas d'un objet vide
                        if (fichePokemon3.Pokemon3.Objet==""){var objetPokemon3="Aucun";}else{var objetPokemon3=fichePokemon3.Pokemon3.Objet};

                            //Image et message à afficher
                            const attachmentPokemon3 = new Discord.MessageAttachment('./Images/Equipe/'+nomPokemon3+'.png');
                            const messagePokemon3 = new Discord.MessageEmbed()
                                .setColor('#FFF354')
                                .setTitle("__**"+nomPokemon3.toUpperCase()+"**__")
                                .setDescription(`Niveau : `+niveauPokemon3[1]+`\rNature : `+naturePokemon3[0]+`\rPV actuel : `+pvPokemon3+`/`+statsPokemon3[0]+`\rTalent : `+talentPokemon3+`\rObjet tenu : `+objetPokemon3+`\rStatut : `+statutPokemon3[0]+`\rPour voir ses attaques : 💥\rPour le mettre en tête d'équipe : 1️⃣\r\rPour fermer la fenêtre : ❌`)
                                .addFields(
                                    { name : `Stat PV`, value : statsPokemon3[0], inline : true},
                                    { name : `IV`, value : ivsPokemon3[0], inline : true},
                                    { name : `EV`, value : evsPokemon3[0], inline : true}
                                )
                                .addFields(
                                    { name : `Stat Att`, value : statsPokemon3[1], inline : true},
                                    { name : `IV`, value : ivsPokemon3[1], inline : true},
                                    { name : `EV`, value : evsPokemon3[1], inline : true}
                                )
                                .addFields(
                                    { name : `Stat Def`, value : statsPokemon3[2], inline : true},
                                    { name : `IV`, value : ivsPokemon3[2], inline : true},
                                    { name : `EV`, value : evsPokemon3[2], inline : true}
                                )
                                .addFields(
                                    { name : `Stat AttSpe`, value : statsPokemon3[3], inline : true},
                                    { name : `IV`, value : ivsPokemon3[3], inline : true},
                                    { name : `EV`, value : evsPokemon3[3], inline : true}
                                )
                                .addFields(
                                    { name : `Stat DefSpe`, value : statsPokemon3[4], inline : true},
                                    { name : `IV`, value : ivsPokemon3[4], inline : true},
                                    { name : `EV`, value : evsPokemon3[4], inline : true}
                                )
                                .addFields(
                                    { name : `Stat Vit`, value : statsPokemon3[5], inline : true},
                                    { name : `IV`, value : ivsPokemon3[5], inline : true},
                                    { name : `EV`, value : evsPokemon3[5], inline : true}
                                )
                                .setThumbnail(participant.avatarURL());

                                //Récupération de la fiche dresseur pour retrouver son salon privé
                                var fiche = await Dresseurs.findOne({idDiscord: message.author.id});

                                //Ecriture du message plus de l'image, ajout de deux emotes (attaque et tête d'équipe)
                                await fetchedEquipeId.guild.channels.cache.get(fiche.idSalon).send({files:[attachmentPokemon3], embed: messagePokemon3}).then(async sentClue => {
                                    await sentClue.react('💥');
                                    await sentClue.react('1️⃣');
                                    await sentClue.react('❌');
                                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{idPokemon3 : sentClue});
                                });

                                //Deux nouveaux filtres pour les attaques et la tête d'équipe
                                const filterAttaquePokemon3 = (reaction, user) => {return (reaction.emoji.name === '💥' && user.id!=auth.server.roleBot);};
                                const filterPremierPokemon3 = (reaction, user) => {return (reaction.emoji.name === '1️⃣' && user.id!=auth.server.roleBot);};

                                //Récupération de la fiche dresseur pour retrouver son salon privé
                                var fiche = await Dresseurs.findOne({idDiscord: message.author.id});
                                    //Récupération du message de sous-menu Fiche Pokémon 1
                                    const fetchedPokemon3Id = message.guild.channels.cache.get(fiche.idSalon).messages.cache.get(fiche.idPokemon3);

                                    // Création des deux derniers collecteur de cette ligne Pokémon 1
                                    const pokemon3AttaqueCollector = fetchedPokemon3Id.createReactionCollector(filterAttaquePokemon3, { dispose: true });
                                    const pokemon3FirstCollector = fetchedPokemon3Id.createReactionCollector(filterPremierPokemon3, { dispose: true });

                                    //Récupération des infos d'attaques du Pokémon 1
                                    var fichePokemon3 = await Equipe.findOne({idDiscord : message.author.id});
                                    var nomPokemon3 = fichePokemon3.Pokemon3.Nom;
                                    var attaque1Pokemon3 = fichePokemon3.Pokemon3.Attaque1;
                                    var attaque2Pokemon3 = fichePokemon3.Pokemon3.Attaque2;
                                    var attaque3Pokemon3 = fichePokemon3.Pokemon3.Attaque3;
                                    var attaque4Pokemon3 = fichePokemon3.Pokemon3.Attaque4;

                                    //Action du collector Attaque du Pokémon1
                                    pokemon3AttaqueCollector.on('collect', async (reaction, participant) => {
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);
                                        
                                        //Message listant les attaques du Pokémon 1
                                        const messageAttaquePokemon3 = new Discord.MessageEmbed()
                                            .setColor('#FFF354')
                                            .setTitle("__**Attaque de "+nomPokemon3.toUpperCase()+"**__")
                                            .addFields(
                                                { name : attaque1Pokemon3.Nom+" "+ await Degats.EmoteType(attaque1Pokemon3.Type) , value : attaque1Pokemon3.PP+" PP", inline : true},
                                                { name : `Puissance`, value : attaque1Pokemon3.Puissance, inline : true},
                                                { name : `Précision`, value : (attaque1Pokemon3.Precision*100)+"%", inline : true}
                                            )
                                            .addFields(
                                                { name : attaque2Pokemon3.Nom+" "+ await Degats.EmoteType(attaque2Pokemon3.Type) , value : attaque2Pokemon3.PP+" PP", inline : true},
                                                { name : `Puissance`, value : attaque2Pokemon3.Puissance, inline : true},
                                                { name : `Précision`, value : (attaque2Pokemon3.Precision*100)+"%", inline : true}
                                            )
                                            .addFields(
                                                { name : attaque3Pokemon3.Nom+" "+ await Degats.EmoteType(attaque3Pokemon3.Type) , value : attaque3Pokemon3.PP+" PP", inline : true},
                                                { name : `Puissance`, value : attaque3Pokemon3.Puissance, inline : true},
                                                { name : `Précision`, value : (attaque3Pokemon3.Precision*100)+"%", inline : true}
                                            )
                                            .addFields(
                                                { name : attaque4Pokemon3.Nom+" "+ await Degats.EmoteType(attaque4Pokemon3.Type) , value : attaque4Pokemon3.PP+" PP", inline : true},
                                                { name : `Puissance`, value : attaque4Pokemon3.Puissance, inline : true},
                                                { name : `Précision`, value : (attaque4Pokemon3.Precision*100)+"%", inline : true}
                                            )
                                            .setThumbnail(participant.avatarURL());

                                            await fetchedPokemon3Id.guild.channels.cache.get(fiche.idSalon).send(messageAttaquePokemon3).then(async sentClue => {
                                                ///Récupération de l'ID du message sous-menu équipe
                                                //await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{idEquipe : sentClue});

                                                await sentClue.react('❌');
                                            });

                                    });


                                    /// Collector pour passer le Pokémon en Premier dans l'équipe ///
                                    pokemon3FirstCollector.on('collect', async (reaction, participant) => {
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

                                        //récup de la fiche équipe
                                        var testTeam = await Equipe.findOne({idDiscord: message.author.id});

                                        await Equipe.findOneAndUpdate({idDiscord: message.author.id}, {'Pokemon1.Actif' : false, 'Pokemon2.Actif' : false, 'Pokemon3.Actif' : true});
                                        const messageFirstPokemon3 = "**"+nomPokemon3.toUpperCase()+"** est désormais ton Pokémon en tête d'équipe !"
                                            await fetchedPokemon3Id.guild.channels.cache.get(fiche.idSalon).send(messageFirstPokemon3);

                                    });

                        });
                });

                const sacCollector = fetchedMenuId.createReactionCollector(filterSac, { dispose: true });

                sacCollector.on('collect', async (reaction, participant) => {
                    console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

                    const messageSac = new Discord.MessageEmbed()
                        .setColor('#FFF354')
                        .setTitle("__**Ton Sac**__")
                        .setDescription(`Voici ton Sac et Équipement pour cette shasse !
                        En cliquant sur l'emote correspondante, tu pourras connaître le contenu de chaque poche.
                        Depuis la poche Objets, tu pourras décider d'en assigner à tes Pokémon.`)
                        .addFields(
                            { name : `Poche Balls`, value : "<:Honor_Ball:"+auth.server.emote.honor+">", inline : true},
                            { name : `Poche Soins`, value : '💊', inline : true},
                            { name : `Poche Objets`, value : '🛠️', inline : true}
                        )
                        .setThumbnail(participant.avatarURL());


                        //récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
                        var fiche = await Dresseurs.findOne({idDiscord: message.author.id});
                        /// Récupération du message Menu dans une variable
                        const fetchedMenuId = message.guild.channels.cache.get(fiche.idSalon).messages.cache.get(fiche.idMenu);


                        await fetchedMenuId.guild.channels.cache.get(fiche.idSalon).send(messageSac).then(async sentClue => {
                            await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{idSac : sentClue});
                            await sentClue.react(auth.server.emote.honor);
                            await sentClue.react('💊');
                            await sentClue.react('🛠️');
                        });


                        //trois filtres de réaction sur chaque émote de chaque type de poche
                        const filterBalls = (reaction, user) => {return (reaction.emoji.id === auth.server.emote.honor && user.id!=auth.server.roleBot);};
                        const filterSoins = (reaction, user) => {return (reaction.emoji.name === '💊' && user.id!=auth.server.roleBot);};
                        const filterObjets = (reaction, user) => {return (reaction.emoji.name === '🛠️' && user.id!=auth.server.roleBot);};

                        //récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
                        var fiche = await Dresseurs.findOne({idDiscord: message.author.id});
                        /// Récupération du message Sous-Menu Sac dans une variable
                        const fetchedSacId = await message.guild.channels.cache.get(fiche.idSalon).messages.cache.get(fiche.idSac);
                        console.log("fetchedSacId : "+fetchedSacId);
                        //Collector du Pokémon 1 sur l'emote Gorythmic (activation du retrait de l'emote (inutile ici mais sait-on jamais))
                        const ballsCollector = fetchedSacId.createReactionCollector(filterBalls, { dispose: true });
                        const soinsCollector = fetchedSacId.createReactionCollector(filterSoins, { dispose: true });
                        const objetsCollector = fetchedSacId.createReactionCollector(filterObjets, { dispose: true });

                        //Menu des Balls
                        ballsCollector.on('collect', async (reaction, participant) => {
                            console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);
                            //fetchedMenuId.guild.members.fetch(participant).then(async (ajoutPpl) => {
                            

                            //Récupération de variable à afficher dans le message stat générale
                            var ficheSac = await Sac.findOne({idDiscord : message.author.id});
                            var nomBalls = ficheSac.balls;
                            var quantiteBalls = ficheSac.ballsLeft;

                            //Image et message à afficher
                            const attachment = new Discord.MessageAttachment('./Images/Sac/Balls.png');
                            const messageBalls = new Discord.MessageEmbed()
                                .setColor('#FFF354')
                                .setTitle("__**Ta Poche à Balls Pokémon**__")
                                .setDescription(`Voici l'état de tes Balls pour cette shasse !
                                    En marchant, tu pourras aléatoirement en ramasser.
                                    Elles s'ajouteront alors à ton stock.`)
                                .addFields(
                                    { name : nomBalls[0], value : "<:Poke_Ball:"+auth.server.emote.poke+"> "+quantiteBalls[0], inline : true},
                                    { name : nomBalls[1], value : "<:Super_Ball:"+auth.server.emote.super+"> "+quantiteBalls[1], inline : true},
                                    { name : nomBalls[2], value : "<:Hyper_Ball:"+auth.server.emote.hyper+"> "+quantiteBalls[2], inline : true}
                                )
                                .addFields(
                                    { name : nomBalls[3], value : "<:Honor_Ball:"+auth.server.emote.honor+"> "+quantiteBalls[3], inline : true},
                                    { name : nomBalls[4], value : "<:Luxe_Ball:"+auth.server.emote.luxe+"> "+quantiteBalls[4], inline : true},
                                    { name : nomBalls[5], value : "<:Scuba_Ball:"+auth.server.emote.scuba+"> "+quantiteBalls[5], inline : true}
                                )
                                .setImage(`attachment://Balls.png`)
                                .setThumbnail(participant.avatarURL());

                                //Récupération de la fiche dresseur pour retrouver son salon privé
                                var fiche = await Dresseurs.findOne({idDiscord: message.author.id});

                                //Ecriture du message plus de l'image, ajout de deux emotes (attaque et tête d'équipe)
                                await fetchedSacId.guild.channels.cache.get(fiche.idSalon).send({files:[attachment], embed: messageBalls}).then(async sentClue => {
                                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{idBalls : sentClue});
                                });
                        //Fin de Balls Collector
                        });

                        //Menu Objets de Soins
                        soinsCollector.on('collect', async (reaction, participant) => {
                            console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);
                            //fetchedMenuId.guild.members.fetch(participant).then(async (ajoutPpl) => {
                            

                            //Récupération de variable à afficher dans le message stat générale
                            var ficheSac = await Sac.findOne({idDiscord : message.author.id});
                            var nomSoins = ficheSac.healing;
                            var quantiteSoins = ficheSac.healingLeft;

                            //Image et message à afficher
                            const attachment = new Discord.MessageAttachment('./Images/Sac/Soins.png');
                            const messageSoins = new Discord.MessageEmbed()
                                .setColor('#FFF354')
                                .setTitle("__**Ta Poche à Soins Pokémon**__")
                                .setDescription(`Voici l'état de tes objets de Soins pour cette shasse !
                                    En marchant, tu pourras aléatoirement en ramasser.
                                    Ils s'ajouteront alors à ton stock.`)
                                .addFields(
                                    { name : nomSoins[0]+" 1️⃣", value : quantiteSoins[0], inline : true},
                                    { name : nomSoins[1]+" 2️⃣", value : quantiteSoins[1], inline : true},
                                    { name : nomSoins[2]+" 3️⃣", value : quantiteSoins[2], inline : true}
                                )
                                .addFields(
                                    { name : nomSoins[3]+" 4️⃣", value : quantiteSoins[3], inline : true},
                                    { name : nomSoins[4]+" 5️⃣", value : quantiteSoins[4], inline : true},
                                    { name : nomSoins[5]+" 6️⃣", value : quantiteSoins[5], inline : true}
                                )
                                .addFields(
                                    { name : nomSoins[6]+" 7️⃣", value : quantiteSoins[6], inline : true},
                                    { name : nomSoins[7]+" 8️⃣", value : quantiteSoins[7], inline : true},
                                    { name : nomSoins[8]+" 9️⃣", value : quantiteSoins[8], inline : true}
                                )
                                .setImage(`attachment://Soins.png`)
                                .setThumbnail(participant.avatarURL());

                                //Récupération de la fiche dresseur pour retrouver son salon privé
                                var fiche = await Dresseurs.findOne({idDiscord: message.author.id});

                                //Ecriture du message plus de l'image, ajout de deux emotes (attaque et tête d'équipe)
                                await fetchedSacId.guild.channels.cache.get(fiche.idSalon).send({files:[attachment], embed: messageSoins}).then(async sentClue => {
                                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{idSoins : sentClue});
                                    await sentClue.react('1️⃣');
                                    await sentClue.react('2️⃣');
                                    await sentClue.react('3️⃣');
                                    await sentClue.react('4️⃣');
                                    await sentClue.react('5️⃣');
                                    await sentClue.react('6️⃣');
                                    await sentClue.react('7️⃣');
                                    await sentClue.react('8️⃣');
                                    await sentClue.react('9️⃣');
                                });

                                //9 filtres de réaction sur chaque Soins 
                                const filterSoins1 = (reaction, user) => {return (reaction.emoji.name === '1️⃣' && user.id!=auth.server.roleBot);};
                                const filterSoins2 = (reaction, user) => {return (reaction.emoji.name === '2️⃣' && user.id!=auth.server.roleBot);};
                                const filterSoins3 = (reaction, user) => {return (reaction.emoji.name === '3️⃣' && user.id!=auth.server.roleBot);};
                                const filterSoins4 = (reaction, user) => {return (reaction.emoji.name === '4️⃣' && user.id!=auth.server.roleBot);};
                                const filterSoins5 = (reaction, user) => {return (reaction.emoji.name === '5️⃣' && user.id!=auth.server.roleBot);};
                                const filterSoins6 = (reaction, user) => {return (reaction.emoji.name === '6️⃣' && user.id!=auth.server.roleBot);};
                                const filterSoins7 = (reaction, user) => {return (reaction.emoji.name === '7️⃣' && user.id!=auth.server.roleBot);};
                                const filterSoins8 = (reaction, user) => {return (reaction.emoji.name === '8️⃣' && user.id!=auth.server.roleBot);};
                                const filterSoins9 = (reaction, user) => {return (reaction.emoji.name === '9️⃣' && user.id!=auth.server.roleBot);};

                                //récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
                                var fiche = await Dresseurs.findOne({idDiscord: message.author.id});
                                /// Récupération du message Sous-Menu Sac dans une variable
                                const fetchedSoinsId = await message.guild.channels.cache.get(fiche.idSalon).messages.cache.get(fiche.idSoins);
                                console.log("fetchedSoinsId : "+fetchedSoinsId);

                                //Collector du Pokémon 1 sur l'emote Gorythmic (activation du retrait de l'emote (inutile ici mais sait-on jamais))
                                const soins1Collector = fetchedSoinsId.createReactionCollector(filterSoins1, { dispose: true });
                                const soins2Collector = fetchedSoinsId.createReactionCollector(filterSoins2, { dispose: true });
                                const soins3Collector = fetchedSoinsId.createReactionCollector(filterSoins3, { dispose: true });
                                const soins4Collector = fetchedSoinsId.createReactionCollector(filterSoins4, { dispose: true });
                                const soins5Collector = fetchedSoinsId.createReactionCollector(filterSoins5, { dispose: true });
                                const soins6Collector = fetchedSoinsId.createReactionCollector(filterSoins6, { dispose: true });
                                const soins7Collector = fetchedSoinsId.createReactionCollector(filterSoins7, { dispose: true });
                                const soins8Collector = fetchedSoinsId.createReactionCollector(filterSoins8, { dispose: true });
                                const soins9Collector = fetchedSoinsId.createReactionCollector(filterSoins9, { dispose: true });

                                //Récupération de variable à afficher dans le message stat générale
                                var ficheSac = await Sac.findOne({idDiscord : message.author.id});
                                var nomSoinss = ficheSac.healing;
                                var quantiteSoins = ficheSac.healingLeft;

                                /// 9 Soins Collector Used avec fonction ///
                                    soins1Collector.on('collect', async (reaction, participant) => {
                                        var itemitem = 0;
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

                                            await Menu.SoinHorsCombat(itemitem, message);
                                        
                                    //fin de Objet1Collector.on  
                                    });

                                    soins2Collector.on('collect', async (reaction, participant) => {
                                        var itemitem = 1;
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

                                            await Menu.SoinHorsCombat(itemitem, message);
                                        
                                    //fin de Objet2Collector.on  
                                    });

                                    soins3Collector.on('collect', async (reaction, participant) => {
                                        var itemitem = 2;
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

                                            await Menu.SoinHorsCombat(itemitem, message);
                                        
                                    //fin de Objet3Collector.on  
                                    });

                                    soins4Collector.on('collect', async (reaction, participant) => {
                                        var itemitem = 3;
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

                                            await Menu.SoinHorsCombat(itemitem, message);
                                        
                                    //fin de Objet4Collector.on  
                                    });

                                    soins5Collector.on('collect', async (reaction, participant) => {
                                        var itemitem = 4;
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

                                            await Menu.SoinHorsCombat(itemitem, message);
                                        
                                    //fin de Objet5Collector.on  
                                    });

                                    soins6Collector.on('collect', async (reaction, participant) => {
                                        var itemitem = 5;
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

                                            await Menu.SoinHorsCombat(itemitem, message);
                                        
                                    //fin de Objet6Collector.on  
                                    });

                                    soins7Collector.on('collect', async (reaction, participant) => {
                                        var itemitem = 6;
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

                                            await Menu.SoinHorsCombat(itemitem, message);
                                        
                                    //fin de Objet7Collector.on  
                                    });

                                    soins8Collector.on('collect', async (reaction, participant) => {
                                        var itemitem = 7;
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

                                            await Menu.SoinHorsCombat(itemitem, message);
                                        
                                    //fin de Objet8Collector.on  
                                    });

                                    soins9Collector.on('collect', async (reaction, participant) => {
                                        var itemitem = 8;
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

                                            await Menu.SoinHorsCombat(itemitem, message);
                                        
                                    //fin de Objet9Collector.on  
                                    });
                        //Fin de soinsCollector.on
                        });

                        //Menu Objets de Combat
                        objetsCollector.on('collect', async (reaction, participant) => {
                            console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);
                            

                            //Récupération de variable à afficher dans le message stat générale
                            var ficheSac = await Sac.findOne({idDiscord : message.author.id});
                            var nomObjets = ficheSac.objets;
                            var equipeObjets = ficheSac.objetsUsed;     

                            //Image et message à afficher
                            const attachment = new Discord.MessageAttachment('./Images/Sac/Objets.png');
                            const messageObjets = new Discord.MessageEmbed()
                                .setColor('#FFF354')
                                .setTitle("__**Ta Poche à Objets de Combat**__")
                                .setDescription(`Voici l'état de tes objets de Combat pour cette shasse !
                                    Pour en équiper un, il te suffit de cliquer sur le numéro de l'Objet.
                                    Tu pourras alors décider du Pokémon à qui l'équiper.`)
                                .addFields(
                                    { name : nomObjets[0]+" 1️⃣", value : equipeObjets[0], inline : true},
                                    { name : nomObjets[1]+" 2️⃣", value : equipeObjets[1], inline : true},
                                    { name : nomObjets[2]+" 3️⃣", value : equipeObjets[2], inline : true}
                                )
                                .addFields(
                                    { name : nomObjets[3]+" 4️⃣", value : equipeObjets[3], inline : true},
                                    { name : nomObjets[4]+" 5️⃣", value : equipeObjets[4], inline : true},
                                    { name : nomObjets[5]+" 6️⃣", value : equipeObjets[5], inline : true}
                                )
                                .addFields(
                                    { name : nomObjets[6]+" 7️⃣", value : equipeObjets[6], inline : true},
                                    { name : nomObjets[7]+" 8️⃣", value : equipeObjets[7], inline : true},
                                    { name : nomObjets[8]+" 9️⃣", value : equipeObjets[8], inline : true}
                                )
                                .setImage(`attachment://Objets.png`)
                                .setThumbnail(participant.avatarURL());

                                //Récupération de la fiche dresseur pour retrouver son salon privé
                                var fiche = await Dresseurs.findOne({idDiscord: message.author.id});

                                //Ecriture du message plus de l'image, ajout de deux emotes (attaque et tête d'équipe)
                                await fetchedSacId.guild.channels.cache.get(fiche.idSalon).send({files:[attachment], embed: messageObjets}).then(async sentClue => {
                                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{idObjets : sentClue});
                                    await sentClue.react('1️⃣');
                                    await sentClue.react('2️⃣');
                                    await sentClue.react('3️⃣');
                                    await sentClue.react('4️⃣');
                                    await sentClue.react('5️⃣');
                                    await sentClue.react('6️⃣');
                                    await sentClue.react('7️⃣');
                                    await sentClue.react('8️⃣');
                                    await sentClue.react('9️⃣');
                                });

                                //9 filtres de réaction sur chaque objets 
                                const filterObjet1 = (reaction, user) => {return (reaction.emoji.name === '1️⃣' && user.id!=auth.server.roleBot);};
                                const filterObjet2 = (reaction, user) => {return (reaction.emoji.name === '2️⃣' && user.id!=auth.server.roleBot);};
                                const filterObjet3 = (reaction, user) => {return (reaction.emoji.name === '3️⃣' && user.id!=auth.server.roleBot);};
                                const filterObjet4 = (reaction, user) => {return (reaction.emoji.name === '4️⃣' && user.id!=auth.server.roleBot);};
                                const filterObjet5 = (reaction, user) => {return (reaction.emoji.name === '5️⃣' && user.id!=auth.server.roleBot);};
                                const filterObjet6 = (reaction, user) => {return (reaction.emoji.name === '6️⃣' && user.id!=auth.server.roleBot);};
                                const filterObjet7 = (reaction, user) => {return (reaction.emoji.name === '7️⃣' && user.id!=auth.server.roleBot);};
                                const filterObjet8 = (reaction, user) => {return (reaction.emoji.name === '8️⃣' && user.id!=auth.server.roleBot);};
                                const filterObjet9 = (reaction, user) => {return (reaction.emoji.name === '9️⃣' && user.id!=auth.server.roleBot);};


                                //récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
                                var fiche = await Dresseurs.findOne({idDiscord: message.author.id});
                                /// Récupération du message Sous-Menu Sac dans une variable
                                const fetchedObjetsId = await message.guild.channels.cache.get(fiche.idSalon).messages.cache.get(fiche.idObjets);
                                console.log("fetchedObjetsId : "+fetchedObjetsId);

                                //Collector du Pokémon 1 sur l'emote Gorythmic (activation du retrait de l'emote (inutile ici mais sait-on jamais))
                                const objet1Collector = fetchedObjetsId.createReactionCollector(filterObjet1, { dispose: true });
                                const objet2Collector = fetchedObjetsId.createReactionCollector(filterObjet2, { dispose: true });
                                const objet3Collector = fetchedObjetsId.createReactionCollector(filterObjet3, { dispose: true });
                                const objet4Collector = fetchedObjetsId.createReactionCollector(filterObjet4, { dispose: true });
                                const objet5Collector = fetchedObjetsId.createReactionCollector(filterObjet5, { dispose: true });
                                const objet6Collector = fetchedObjetsId.createReactionCollector(filterObjet6, { dispose: true });
                                const objet7Collector = fetchedObjetsId.createReactionCollector(filterObjet7, { dispose: true });
                                const objet8Collector = fetchedObjetsId.createReactionCollector(filterObjet8, { dispose: true });
                                const objet9Collector = fetchedObjetsId.createReactionCollector(filterObjet9, { dispose: true });

                                //Récupération de variable à afficher dans le message stat générale
                                var ficheSac = await Sac.findOne({idDiscord : message.author.id});
                                var nomObjets = ficheSac.objets;
                                var equipeObjets = ficheSac.objetsUsed;

                                /// 9 Objet Collector Used avec fonction ///
                                    objet1Collector.on('collect', async (reaction, participant) => {
                                        var itemitem = 0;
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);
                                        if(equipeObjets[itemitem]!="disponible"){
                                            await Menu.ItemUsed(itemitem+1, message);
                                        }else{

                                            //Récupération de la fiche sac pour checker son état
                                            var ficheSac2 = await Sac.findOne({idDiscord: message.author.id});
                                            console.log("ficheSac2 : "+ficheSac2);
                                            if(ficheSac2.objetsUsed[itemitem]!="disponible"){
                                                await Menu.ItemUsed(itemitem+1, message);
                                            }else{
                                                await Menu.ItemDone(itemitem+1,message);
                                            }

                                        //fin du else dans la partie si l'item est disponible
                                        }
                                    //fin de Objet1Collector.on  
                                    });


                                    objet2Collector.on('collect', async (reaction, participant) => {
                                        var itemitem = 1;
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);
                                        if(equipeObjets[itemitem]!="disponible"){
                                            await Menu.ItemUsed(itemitem+1, message);
                                        }else{

                                            //Récupération de la fiche sac pour checker son état
                                            var ficheSac2 = await Sac.findOne({idDiscord: message.author.id});
                                            console.log("ficheSac2 : "+ficheSac2);
                                            if(ficheSac2.objetsUsed[itemitem]!="disponible"){
                                                await Menu.ItemUsed(itemitem+1, message);
                                            }else{
                                                await Menu.ItemDone(itemitem+1,message);
                                            }

                                        //fin du else dans la partie si l'item est disponible
                                        }
                                    //fin de Objet1Collector.on  
                                    });


                                    objet3Collector.on('collect', async (reaction, participant) => {
                                        var itemitem = 2;
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);
                                        if(equipeObjets[itemitem]!="disponible"){
                                            await Menu.ItemUsed(itemitem+1, message);
                                        }else{

                                            //Récupération de la fiche sac pour checker son état
                                            var ficheSac2 = await Sac.findOne({idDiscord: message.author.id});
                                            console.log("ficheSac2 : "+ficheSac2);
                                            if(ficheSac2.objetsUsed[itemitem]!="disponible"){
                                                await Menu.ItemUsed(itemitem+1, message);
                                            }else{
                                                await Menu.ItemDone(itemitem+1,message);
                                            }

                                        //fin du else dans la partie si l'item est disponible
                                        }
                                    //fin de Objet1Collector.on  
                                    });


                                    objet4Collector.on('collect', async (reaction, participant) => {
                                        var itemitem = 3;
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);
                                        if(equipeObjets[itemitem]!="disponible"){
                                            await Menu.ItemUsed(itemitem+1, message);
                                        }else{

                                            //Récupération de la fiche sac pour checker son état
                                            var ficheSac2 = await Sac.findOne({idDiscord: message.author.id});
                                            console.log("ficheSac2 : "+ficheSac2);
                                            if(ficheSac2.objetsUsed[itemitem]!="disponible"){
                                                await Menu.ItemUsed(itemitem+1, message);
                                            }else{
                                                await Menu.ItemDone(itemitem+1,message);
                                            }

                                        //fin du else dans la partie si l'item est disponible
                                        }
                                    //fin de Objet1Collector.on  
                                    });


                                    objet5Collector.on('collect', async (reaction, participant) => {
                                        var itemitem = 4;
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);
                                        if(equipeObjets[itemitem]!="disponible"){
                                            await Menu.ItemUsed(itemitem+1, message);
                                        }else{

                                            //Récupération de la fiche sac pour checker son état
                                            var ficheSac2 = await Sac.findOne({idDiscord: message.author.id});
                                            console.log("ficheSac2 : "+ficheSac2);
                                            if(ficheSac2.objetsUsed[itemitem]!="disponible"){
                                                await Menu.ItemUsed(itemitem+1, message);
                                            }else{
                                                await Menu.ItemDone(itemitem+1,message);
                                            }

                                        //fin du else dans la partie si l'item est disponible
                                        }
                                    //fin de Objet1Collector.on  
                                    });


                                    objet6Collector.on('collect', async (reaction, participant) => {
                                        var itemitem = 5;
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);
                                        if(equipeObjets[itemitem]!="disponible"){
                                            await Menu.ItemUsed(itemitem+1, message);
                                        }else{

                                            //Récupération de la fiche sac pour checker son état
                                            var ficheSac2 = await Sac.findOne({idDiscord: message.author.id});
                                            console.log("ficheSac2 : "+ficheSac2);
                                            if(ficheSac2.objetsUsed[itemitem]!="disponible"){
                                                await Menu.ItemUsed(itemitem+1, message);
                                            }else{
                                                await Menu.ItemDone(itemitem+1,message);
                                            }

                                        //fin du else dans la partie si l'item est disponible
                                        }
                                    //fin de Objet1Collector.on  
                                    });


                                    objet7Collector.on('collect', async (reaction, participant) => {
                                        var itemitem = 6;
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);
                                        if(equipeObjets[itemitem]!="disponible"){
                                            await Menu.ItemUsed(itemitem+1, message);
                                        }else{

                                            //Récupération de la fiche sac pour checker son état
                                            var ficheSac2 = await Sac.findOne({idDiscord: message.author.id});
                                            console.log("ficheSac2 : "+ficheSac2);
                                            if(ficheSac2.objetsUsed[itemitem]!="disponible"){
                                                await Menu.ItemUsed(itemitem+1, message);
                                            }else{
                                                await Menu.ItemDone(itemitem+1,message);
                                            }

                                        //fin du else dans la partie si l'item est disponible
                                        }
                                    //fin de Objet1Collector.on  
                                    });


                                    objet8Collector.on('collect', async (reaction, participant) => {
                                        var itemitem = 7;
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);
                                        if(equipeObjets[itemitem]!="disponible"){
                                            await Menu.ItemUsed(itemitem+1, message);
                                        }else{

                                            //Récupération de la fiche sac pour checker son état
                                            var ficheSac2 = await Sac.findOne({idDiscord: message.author.id});
                                            console.log("ficheSac2 : "+ficheSac2);
                                            if(ficheSac2.objetsUsed[itemitem]!="disponible"){
                                                await Menu.ItemUsed(itemitem+1, message);
                                            }else{
                                                await Menu.ItemDone(itemitem+1,message);
                                            }

                                        //fin du else dans la partie si l'item est disponible
                                        }
                                    //fin de Objet1Collector.on  
                                    });


                                    objet9Collector.on('collect', async (reaction, participant) => {
                                        var itemitem = 8;
                                        console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);
                                        if(equipeObjets[itemitem]!="disponible"){
                                            await Menu.ItemUsed(itemitem+1, message);
                                        }else{

                                            //Récupération de la fiche sac pour checker son état
                                            var ficheSac2 = await Sac.findOne({idDiscord: message.author.id});
                                            console.log("ficheSac2 : "+ficheSac2);
                                            if(ficheSac2.objetsUsed[itemitem]!="disponible"){
                                                await Menu.ItemUsed(itemitem+1, message);
                                            }else{
                                                await Menu.ItemDone(itemitem+1,message);
                                            }

                                        //fin du else dans la partie si l'item est disponible
                                        }
                                    //fin de Objet1Collector.on  
                                    });
                                /// Fin Objet collector avec fonction
                        //fin de ObjetsCollector.on
                        });
                //fin de SacCollector.on
                });

                const joueurCollector = fetchedMenuId.createReactionCollector(filterJoueur, { dispose: true });

                joueurCollector.on('collect', async (reaction, participant) => {
                    console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);
                    //fetchedMenuId.guild.members.fetch(participant).then(async (ajoutPpl) => {

                    const messageJoueur = new Discord.MessageEmbed()
                        .setColor('#FFF354')
                        .setTitle("__**Ta fiche**__")
                        .setDescription(`Voici ta Fiche de Dresseur·euse !
                            
                        Tu as actuellement 4 Badges en ta posession.
                        Ton solde de PokéDollar est de 81.062 ₽.
                        Ton Pokédex est à 83 entrées.`)
                        .setThumbnail(participant.avatarURL());

                        fetchedMenuId.guild.channels.cache.get(fiche.idSalon).send(messageJoueur).then(async sentClue => {
                            await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{idJoueur : sentClue});
                        });
                //fin de JoueurCollector.on
                });   
    }


    if(petitMessage.includes(prefixMarche)&&message.member.roles.cache.has(auth.server.role.shasse)&&message.channel.id!=auth.server.categorie.tasse) {

        var marcheGenerale = Rand(3);
        if(marcheGenerale%3>=1){

            var randomItems = Rand(Math.floor(27*3));
            await message.channel.send(randomItems);

            //["PokéBall","SuperBall","HyperBall","HonorBall","LuxeBall","ScubaBall"]
            //["Super Potion","Hyper Potion","Guérison","Antidote","Réveil","Anti-Brûle","Anti-Para","Rappel","Rappel Max"]

            switch (true){
                case randomItems<=5 : 
                    message.channel.send("Vous ramasser un champignon rouge qui s'avère être une **PokéBall** <:Poke_Ball:"+auth.server.emote.poke+"> !\rVous l'ajoutez à votre inventaire.");
                    var ficheItem = await Sac.findOne({idDiscord : message.author.id});
                    await Sac.findOneAndUpdate({idDiscord : message.author.id},{'ballsLeft.0' : ficheItem.ballsLeft[0]+1});
                break;
                case randomItems>=6&&randomItems<=9 :
                    message.channel.send("Vous trébuchez sur une **SuperBall** <:Super_Ball:"+auth.server.emote.super+"> !\rVous l'ajoutez à votre inventaire.");
                    var ficheItem = await Sac.findOne({idDiscord : message.author.id});
                    await Sac.findOneAndUpdate({idDiscord : message.author.id},{'ballsLeft.1' : ficheItem.ballsLeft[1]+1});
                break;  
                case randomItems>=10&&randomItems<=12 :
                    message.channel.send("Vous avez littérallement une absence devant une **HyperBall** <:Hyper_Ball:"+auth.server.emote.hyper+">, avec sont \"H\", tel un symbole d'héliport !\rVous l'ajoutez à votre inventaire.");
                    var ficheItem = await Sac.findOne({idDiscord : message.author.id});
                    await Sac.findOneAndUpdate({idDiscord : message.author.id},{'ballsLeft.2' : ficheItem.ballsLeft[2]+1});
                break;  
                case randomItems>=13&&randomItems<=14 :
                    message.channel.send("Qu'est-ce que ... ? Vraiment ?! Ici ?! Bon bah **ScubaBall** <:Scuba_Ball:"+auth.server.emote.scuba+"> !\rVous l'ajoutez à votre inventaire.");
                    var ficheItem = await Sac.findOne({idDiscord : message.author.id});
                    await Sac.findOneAndUpdate({idDiscord : message.author.id},{'ballsLeft.5' : ficheItem.ballsLeft[5]+1});
                break;  
                case randomItems>=15&&randomItems<=16 :
                    message.channel.send("Katching, vous tombez sur une **LuxeBall** <:Luxe_Ball:"+auth.server.emote.luxe+"> !\r100% vous la renvendrez en sortant d'ici... à moins d'en avoir vraiment besoin.\rVous l'ajoutez à votre inventaire.");
                    var ficheItem = await Sac.findOne({idDiscord : message.author.id});
                    await Sac.findOneAndUpdate({idDiscord : message.author.id},{'ballsLeft.4' : ficheItem.ballsLeft[4]+1});
                break;  
                case randomItems>=17&&randomItems<=20 :
                    message.channel.send("Mais qui laisse traîner ses déchets dans une forêt aussi Magique ?\rCette **Super Potion** n'est même pas utilisée !\rVous l'ajoutez à votre inventaire.");
                    var ficheItem = await Sac.findOne({idDiscord : message.author.id});
                    await Sac.findOneAndUpdate({idDiscord : message.author.id},{'healingLeft.0' : ficheItem.healingLeft[0]+1});
                break;  
                case randomItems>=21&&randomItems<=23 :
                    message.channel.send("Vous trébuchez sur une **Hyper Potion** !\rVous l'ajoutez à votre inventaire.");
                    var ficheItem = await Sac.findOne({idDiscord : message.author.id});
                    await Sac.findOneAndUpdate({idDiscord : message.author.id},{'healingLeft.1' : ficheItem.healingLeft[1]+1});
                break;  
                case randomItems==24 :
                    message.channel.send("Outch, en passant sous des lianes une branche vous percute.\rChance ! Votre regard, maintenant au niveau du sol, se pose sur une **Guérison** !\rVous l'ajoutez à votre inventaire.");
                    var ficheItem = await Sac.findOne({idDiscord : message.author.id});
                    await Sac.findOneAndUpdate({idDiscord : message.author.id},{'healingLeft.2' : ficheItem.healingLeft[2]+1});
                break;  
                case randomItems>=25&&randomItems<=26 :
                    message.channel.send("Vous apercevez un cristal Z !\rOh zut, pas de super attaque pour vous, juste un **Rappel**.\rVous l'ajoutez à votre inventaire.");
                    var ficheItem = await Sac.findOne({idDiscord : message.author.id});
                    await Sac.findOneAndUpdate({idDiscord : message.author.id},{'healingLeft.7' : ficheItem.healingLeft[7]+1});
                break;  
                case randomItems==27 :
                    message.channel.send("En expert géologuiste, ce phénomène rocheux vous intrigue.\rCe n'est pas la Géode du siècle, mais un très précieux **Rappel Max** !\rVous l'ajoutez à votre inventaire.");
                    var ficheItem = await Sac.findOne({idDiscord : message.author.id});
                    await Sac.findOneAndUpdate({idDiscord : message.author.id},{'healingLeft.8' : ficheItem.healingLeft[8]+1});
                break;  
                case (randomItems>=28&&randomItems<=30)||(randomItems>=33) :
                    message.channel.send("Vous parcourez les hautes herbes de la forêt... Rien à l'horizon.\rRestez sur vos gardes !");
                break;  
                case randomItems==31 :
                    if(Rand(3)==1){
                        message.channel.send("Vous remarquez un diamant brillant dans la pénombre !\rOh Génial ! Votre vue perçante vous a porté jusqu'à une **HonorBall** <:Honor_Ball:"+auth.server.emote.honor+"> !\rVous l'ajoutez à votre inventaire.");
                        var ficheItem = await Sac.findOne({idDiscord : message.author.id});
                        await Sac.findOneAndUpdate({idDiscord : message.author.id},{'ballsLeft.3' : ficheItem.ballsLeft[3]+1});
                    }else{
                        message.channel.send("Vous parcourez les hautes herbes de la forêt... Rien à l'horizon.\rRestez sur vos gardes !");
                    }
                break;
                case randomItems==32 :
                        var ficheItem = await Sac.findOne({idDiscord : message.author.id});
                        if (ficheItem.itemZarude==false){
                            message.channel.send("Vous trouvez une vieille écharpe rose... Que peut-elle bien faire dans cette forêt ?...");
                            await Sac.findOneAndUpdate({idDiscord : message.author.id},{itemZarude : true});
                        }else{
                            message.channel.send("Vous parcourez les hautes herbes de la forêt... Rien à l'horizon.\rRestez sur vos gardes !");
                        }
                break;
                default: message.channel.send("Vous parcourez les hautes herbes de la forêt... Rien à l'horizon.\rRestez sur vos gardes !");break;          
            }

        } else {

            var rencontre = Rand(50);
            //var rencontre = 43;
            await message.channel.send(rencontre);
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
                    await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{'gestionRencontre.ouinon' : sentClue});
                    await sentClue.react('✅');
                    await sentClue.react('❌');
                });

                var fuiteOuPas = await Degats.Fuite(message,await Degats.fuiteOuiNon(message, 1));
                var fiche = await Dresseurs.findOne({idDiscord: message.author.id});

                if (fuiteOuPas==true){
                    const messageFuiteDone = "Vous prenez la fuite !"
                    await message.guild.channels.cache.get(fiche.idSalon).send(messageFuiteDone);
                }else{
                    const messageFuiteFail = "Le Combat commence, vous allez prendre une attaque d'entrée !"
                    await message.guild.channels.cache.get(fiche.idSalon).send(messageFuiteFail);
                    var pokeA = await Spawn.findOne({idDiscord: message.author.id});

                    var attaqueRandom = await RandAttaque.ChoixAttaque(message);
                    console.log(attaqueRandom);

                    var outch = await Degats.CalculDegats(message,"sauvage",[attaqueRandom.Nom,attaqueRandom.PP,attaqueRandom.PPmax,attaqueRandom.Puissance,attaqueRandom.Precision,attaqueRandom.Type,attaqueRandom.Categorie]);
                    console.log("outch : "+outch);
                    var equipeD = await Equipe.findOne({idDiscord: message.author.id});
                    if(equipeD.Pokemon1.Actif==true){
                        var pokeD = equipeD.Pokemon1;
                        var health = pokeD.PV;
                        console.log("health avant : "+health);
                        health = health-outch;
                        console.log("health après : "+health);
                        if(health==0){
                            await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon1.PV': health, 'Pokemon1.Actif' : false, 'Pokemon2.Actif' : true}).then(yep => {
                            Degats.JaugeDeVie(message,health,pokeD.StatFinal[0],"joueur").then(jauge => {message.channel.send(jauge);});});
                            message.channel.send(pokeD.Nom+" est K.O.!");
                        }else{
                            await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon1.PV': health}).then(yep => {
                            Degats.JaugeDeVie(message,health,pokeD.StatFinal[0],"joueur").then(jauge => {message.channel.send(jauge);});});
                        }
                    }else if(equipeD.Pokemon2.Actif==true){
                        var pokeD = equipeD.Pokemon2;
                        var health = pokeD.PV;
                        console.log("health avant : "+health);
                        health = health-outch;
                        console.log("health après : "+health);
                        if(health==0){
                            await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon2.PV': health, 'Pokemon2.Actif' : false, 'Pokemon3.Actif' : true}).then(yep => {
                            Degats.JaugeDeVie(message,health,pokeD.StatFinal[0],"joueur").then(jauge => {message.channel.send(jauge);});});
                            message.channel.send(pokeD.Nom+" est K.O.!");
                        }else{
                            await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon2.PV': health}).then(yep => {
                            Degats.JaugeDeVie(message,health,pokeD.StatFinal[0],"joueur").then(jauge => {message.channel.send(jauge);});});
                        }
                    }else if(equipeD.Pokemon3.Actif==true){
                        var pokeD = equipeD.Pokemon3;
                        var health = pokeD.PV;
                        console.log("health avant : "+health);
                        health = health-outch;
                        console.log("health après : "+health);
                        if(health==0){
                            await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon3.PV': health, 'Pokemon3.Actif' : false, 'Pokemon1.Actif' : true}).then(yep => {
                            Degats.JaugeDeVie(message,health,pokeD.StatFinal[0],"joueur").then(jauge => {message.channel.send(jauge);});});
                            message.channel.send(pokeD.Nom+" est K.O.!");
                        }else{
                            await Equipe.findOneAndUpdate({idDiscord: message.author.id},{'Pokemon3.PV': health}).then(yep => {
                            Degats.JaugeDeVie(message,health,pokeD.StatFinal[0],"joueur").then(jauge => {message.channel.send(jauge);});});
                        }
                    }

                }


        }
    //Fin de la fonction Marche
    }


});



function createJoueur(message) {
    
    const Joueurs = new Dresseurs({
    _id : mongoose.Types.ObjectId(),
    dresseurName: message.author.username,
    idDiscord : message.author.id,
    idRole : 0,
    idSalon : 0,
    idMenu : 0,
    idEquipe : 0,
    idSac : 0,
    idBalls : 0,
    idSoins : 0,
    gestionSoins : {
        ouinon : 0,
        pokemon : 0
    },
    idObjets : 0,
    gestionObjets : {
        ouinon : 0,
        pokemon : 0
    },
    idJoueur : 0,
    idPokemon1 : 0,
    idPokemon2 : 0,
    idPokemon3 : 0,
    rencontre :{
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
    gestionRencontre : {
        ouinon : 0,
        pokemon : 0
    },
    time: Date()
    });

Joueurs.save().then(result => console.log(result)).catch(err => console.log(err));

}


function createSac(message) {
    
    const SacJoueur = new Sac({
    _id : mongoose.Types.ObjectId(),
    dresseurName: message.author.username,
    idDiscord : message.author.id,
    balls : ["PokéBall","SuperBall","HyperBall","HonorBall","LuxeBall","ScubaBall"],
    ballsLeft :[5,2,1,1,0,0],
    healing : ["Super Potion","Hyper Potion","Guérison","Antidote","Réveil","Anti-Brûle","Anti-Para","Rappel","Rappel Max"],
    healingLeft :[3,1,1,2,1,1,1,2,0],
    objets :["Restes","Veste de Combat","Orbe Vie","Mouchoir Choix","Lunette Choix","Bandeau Choix","Casque Brut","Boule Fumée","Ceinture Force"],
    objetsUsed :["disponible","disponible","disponible","disponible","disponible","disponible","disponible","disponible","disponible"],
    itemZarude : false,
    time: Date()
    });

SacJoueur.save().then(result => console.log(result)).catch(err => console.log(err));

}





async function createGorythmic(message) {

    const PokemonGorythmic = new Pokemon({
    dresseurName: message.author.username,
    idDiscord : message.author.id,
        Actif : true,
        Position : 1,
        Nom : "Gorythmic",
        Surnom : "Glorythmic",
        NiveauXP : ["Parabolique",(Rand(8)+36),0],
        PV : 0,
        Type : ["Plante","vide","vide"],
        Talent : "Engrais",
        Statut : ["",""],
        BaseStat : await Equipe.BaseStat("Gorythmic"),
        IVs : await Equipe.IVs(),
        EVs : await Equipe.EVs(),
        Nature : await Equipe.Nature(),
        StatFinal : [0,0,0,0,0,0],
        BoostCombat : [0,0,0,0,0,0,0],
        Objet : "Aucun",
    time: Date()
    });

PokemonGorythmic.save().then(result => console.log(result)).catch(err => console.log(err));

}



function Rand(valeur){
    return Math.floor(Math.random() * valeur +1);
}
