const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var auth = require('../auth.json');
const Dresseurs = require("../FicheMongo/joueur.js");
const Equipe = require("../FicheMongo/equipe.js");
const Sac = require("../FicheMongo/sac.js");

module.exports.deleteLast = async (message, quantite) => {
    console.log("I'm in delete "+quantite);

    var fiche = await Dresseurs.findOne({idDiscord: message.author.id});
    
    console.log("fiche fiche fiche "+fiche);
    const fetched = await message.guild.channels.cache.get(fiche.idSalon).messages.fetch({ limit: quantite });
    const notPinned = await fetched.filter(fetchedMsg => !fetchedMsg.pinned);
    await message.guild.channels.cache.get(fiche.idSalon).bulkDelete(notPinned);
}

module.exports.removeReactionName = async (m, msg, emoji) => {
    try { m.reactions.cache.find(r => r.emoji.name == emoji).users.remove(msg.author.id); } catch(err) {}
}

module.exports.removeReactionID = async (m, msg, emoji) => {
    try { m.reactions.cache.find(r => r.emoji.id == emoji).users.remove(msg.author.id); } catch(err) {}
}


module.exports.finShasse = async (message,bot) => {
        console.log("Nettoyage en cours !");




        const taggedUser = message.mentions.users.first();

        if (!taggedUser) return message.author.send("Vous n'avez pas saisi de pseudo à chercher.").then(msg => msg.delete({ timeout: 10000 }));
        if (isNaN(taggedUser)) return message.author.send("Le paramètre que vous avez saisi n'est pas un pseudo.").then(msg => msg.delete({ timeout: 10000 }));

        const NicknameOut = await bot.users.fetch(taggedUser.id);



        await message.guild.members.fetch(NicknameOut.id).then((personKicked) => {
        personKicked.roles.remove(auth.server.role.shasse);})

        var finDresseur = await Dresseurs.findOne({idDiscord: NicknameOut.id});
        var finSac = await Sac.findOne({idDiscord: NicknameOut.id});
        var finEquipe = await Equipe.findOne({idDiscord: NicknameOut.id});

        // si pas de fiche existante, on créé la fiche
        if (!finDresseur) { 
            message.author.send("Désolé ! pas de Dresseur").then(msg => msg.delete({ timeout: 15000 }));
        }else{
        	await Dresseurs.deleteOne({ idDiscord: NicknameOut.id });
        }
        if (!finSac) { 
            message.author.send("Désolé ! pas de Sac").then(msg => msg.delete({ timeout: 15000 }));
        }else{
        	await Sac.deleteOne({ idDiscord: NicknameOut.id });
        }
        if (!finEquipe) { 
            message.author.send("Désolé ! pas d'Equipe").then(msg => msg.delete({ timeout: 15000 }));
        }else{
        	await Equipe.deleteOne({ idDiscord: NicknameOut.id });
        }

        const fetchedChannel = message.guild.channels.cache.get(finDresseur.idSalon).delete();
        const fetchedRole = message.guild.roles.cache.get(finDresseur.idRole).delete();



}