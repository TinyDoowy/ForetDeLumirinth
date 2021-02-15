const mongoose = require("mongoose");
var Suppr = require('../Fonctions/suppressions.js');
const Spawn = require("../FicheMongo/sauvage.js");
const Equipe = require("../FicheMongo/equipe.js");
const Dresseurs = require("../FicheMongo/joueur.js");
const Degats = require("./degats.js");
var auth = require('../auth.json');



module.exports.ChoixAttaque = async (message) => {

    var equipe = await Equipe.findOne({idDiscord: message.author.id});
    var sauvage = await Spawn.findOne({idDiscord: message.author.id});
    var pokemonSauvage = sauvage.Pokemon;

    if(equipe.Pokemon1.Actif==true){
        var pokemonActif = equipe.Pokemon1;
    }else if(equipe.Pokemon2.Actif==true){
        var pokemonActif = equipe.Pokemon2;
    }else if(equipe.Pokemon3.Actif==true){
        var pokemonActif = equipe.Pokemon3;
    } 
    var efficaceAttaque = [0,0,0,0];
    var pointAttaque = [0,0,0,0];

     efficaceAttaque[0] = await Degats.ExportSuperEfficace(pokemonSauvage.Attaque1.Type, pokemonActif.Type);
     efficaceAttaque[1] = await Degats.ExportSuperEfficace(pokemonSauvage.Attaque2.Type, pokemonActif.Type);
     efficaceAttaque[2] = await Degats.ExportSuperEfficace(pokemonSauvage.Attaque3.Type, pokemonActif.Type);
     efficaceAttaque[3] = await Degats.ExportSuperEfficace(pokemonSauvage.Attaque4.Type, pokemonActif.Type);

    if(pokemonSauvage.Attaque1.Categorie=="Statut"){efficaceAttaque[0]=-1;}
    if(pokemonSauvage.Attaque2.Categorie=="Statut"){efficaceAttaque[1]=-1;}
    if(pokemonSauvage.Attaque3.Categorie=="Statut"){efficaceAttaque[2]=-1;}
    if(pokemonSauvage.Attaque4.Categorie=="Statut"){efficaceAttaque[3]=-1;}

    for(z=0;z<4;z++){
        console.log("attaque n°"+(z+1)+" : "+efficaceAttaque[z]);
        if(efficaceAttaque[z]>=2){
            pointAttaque[z]=4;
        }else if(efficaceAttaque[z]==1){
            pointAttaque[z]=3;
        }else if(efficaceAttaque[z]>0){
            pointAttaque[z]=2;
        }else if(efficaceAttaque[z]==0){
            pointAttaque[z]=1;
        }else if(efficaceAttaque[z]<0){
            pointAttaque[z]=2;
        }else{pointAttaque[z]=0;}
    }

    var statProba = pointAttaque[0]+pointAttaque[1]+pointAttaque[2]+pointAttaque[3];
    console.log("statProba : "+statProba);

    var randomisationAttaque = Math.random();
    console.log(randomisationAttaque);
    console.log((pointAttaque[0]/statProba));
    console.log(((pointAttaque[0]+pointAttaque[1])/statProba));
    console.log(((pointAttaque[0]+pointAttaque[1]+pointAttaque[2])/statProba));


    switch(true){
        case randomisationAttaque<=(pointAttaque[0]/statProba) : 
            console.log("attaque 1");
            return pokemonSauvage.Attaque1;
        break;
        case randomisationAttaque>(pointAttaque[0]/statProba)&&randomisationAttaque<=((pointAttaque[0]+pointAttaque[1])/statProba) : 
            console.log("attaque 2");
            return pokemonSauvage.Attaque2;
        break;
        case randomisationAttaque>((pointAttaque[0]+pointAttaque[1])/statProba)&&randomisationAttaque<=((pointAttaque[0]+pointAttaque[1]+pointAttaque[2])/statProba) : 
            console.log("attaque 3");
            return pokemonSauvage.Attaque3;
        break;
        case randomisationAttaque>((pointAttaque[0]+pointAttaque[1]+pointAttaque[2])/statProba) : 
            console.log("attaque 4");
            return pokemonSauvage.Attaque4;
        break;
        default : console.log("attaque 1");return pokemonSauvage.Attaque1;break;
    }

}


function Rand(valeur){
    return Math.floor(Math.random() * valeur +1);
}

