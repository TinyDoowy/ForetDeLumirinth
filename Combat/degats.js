const mongoose = require("mongoose");
var Suppr = require('../Fonctions/suppressions.js');
const Spawn = require("../FicheMongo/sauvage.js");
const Equipe = require("../FicheMongo/equipe.js");
const Dresseurs = require("../FicheMongo/joueur.js");
var auth = require('../auth.json');


module.exports.InitPV = async ([StatFinalPV,StatFinalAtt,StatFinalDef,StatFinalAttSpe,StatFinalDefSpe,StatFinalVit]) => {
	var InitPVFinal = [StatFinalPV, 0];
	console.log(InitPVFinal);
	return InitPVFinal;
}


module.exports.EmoteType = async (type) => {
	switch (type){
		case "Acier" : return '⚙️'; break;
		case "Combat" : return '🥊'; break;
		case "Dragon" : return '🐲'; break;
		case "Eau" : return '💦'; break;
		case "Électrique" : return '⚡'; break;
		case "Fée" : return '🧚'; break;
		case "Feu" : return '🔥'; break;
		case "Glace" : return '🧊'; break;
		case "Insecte" : return '🪲'; break;
		case "Normal" : return '⚪'; break;
		case "Plante" : return '🌿'; break;
		case "Poison" : return '☠️'; break;
		case "Psy" : return '🧠'; break;
		case "Roche" : return '🪨'; break;
		case "Sol" : return '🌍'; break;
		case "Spectre" : return '👻'; break;
		case "Ténèbres" : return '🌚'; break;
		case "Vol" : return '🪶'; break;
		case "Statut" : return '⁉️';break;
		default : return '⛔';break;
	};
}

module.exports.ExportSuperEfficace = async (typeAtt, [typeDef1, typeDef2, typeDef3]) => {
    
    var fois = 1;

    switch (typeAtt){
        case "Acier" : 
            switch(typeDef1){
                case "Acier" : fois = fois*0.5; break;
                case "Eau" : fois = fois*0.5; break;
                case "Électrique" : fois = fois*0.5; break;
                case "Fée" : fois = fois*2; break;
                case "Feu" : fois = fois*0.5; break;
                case "Glace" : fois = fois*2; break;
                case "Roche" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0.5; break;
                case "Eau" : fois = fois*0.5; break;
                case "Électrique" : fois = fois*0.5; break;
                case "Fée" : fois = fois*2; break;
                case "Feu" : fois = fois*0.5; break;
                case "Glace" : fois = fois*2; break;
                case "Roche" : fois = fois*2; break;
                default : fois = fois*1; break;
            }
            switch(typeDef3){
                case "Acier" : fois = fois*0.5; break;
                case "Eau" : fois = fois*0.5; break;
                case "Électrique" : fois = fois*0.5; break;
                case "Fée" : fois = fois*2; break;
                case "Feu" : fois = fois*0.5; break;
                case "Glace" : fois = fois*2; break;
                case "Roche" : fois = fois*2; break;
                default : fois = fois*1; break;
            }
        return fois; break;
        case "Combat" :
            switch(typeDef1){
                case "Acier" : fois = fois*2; break;
                case "Fée" : fois = fois*0.5; break;
                case "Glace" : fois = fois*2; break;
                case "Insecte" : fois = fois*0.5; break;
                case "Normal" : fois = fois*2; break;
                case "Poison" : fois = fois*0.5; break;
                case "Psy" : fois = fois*0.5; break;
                case "Roche" : fois = fois*2; break;
                case "Spectre" : fois = fois*0; break;
                case "Ténèbres" : fois = fois*2; break;
                case "Vol" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*2; break;
                case "Fée" : fois = fois*0.5; break;
                case "Glace" : fois = fois*2; break;
                case "Insecte" : fois = fois*0.5; break;
                case "Normal" : fois = fois*2; break;
                case "Poison" : fois = fois*0.5; break;
                case "Psy" : fois = fois*0.5; break;
                case "Roche" : fois = fois*2; break;
                case "Spectre" : fois = fois*0; break;
                case "Ténèbres" : fois = fois*2; break;
                case "Vol" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*2; break;
                case "Fée" : fois = fois*0.5; break;
                case "Glace" : fois = fois*2; break;
                case "Insecte" : fois = fois*0.5; break;
                case "Normal" : fois = fois*2; break;
                case "Poison" : fois = fois*0.5; break;
                case "Psy" : fois = fois*0.5; break;
                case "Roche" : fois = fois*2; break;
                case "Spectre" : fois = fois*0; break;
                case "Ténèbres" : fois = fois*2; break;
                case "Vol" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Dragon" :
            switch(typeDef1){
                case "Acier" : fois = fois*0.5; break;
                case "Dragon" : fois = fois*2; break;
                case "Fée" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0.5; break;
                case "Dragon" : fois = fois*2; break;
                case "Fée" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*0.5; break;
                case "Dragon" : fois = fois*2; break;
                case "Fée" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Eau" :
            switch(typeDef1){
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*0.5; break;
                case "Feu" : fois = fois*2; break;
                case "Plante" : fois = fois*0.5; break;
                case "Roche" : fois = fois*2; break;
                case "Sol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*0.5; break;
                case "Feu" : fois = fois*2; break;
                case "Plante" : fois = fois*0.5; break;
                case "Roche" : fois = fois*2; break;
                case "Sol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*0.5; break;
                case "Feu" : fois = fois*2; break;
                case "Plante" : fois = fois*0.5; break;
                case "Roche" : fois = fois*2; break;
                case "Sol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Électrique" :
            switch(typeDef1){
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*2; break;
                case "Électrique" : fois = fois*0.5; break;
                case "Plante" : fois = fois*0.5; break;
                case "Sol" : fois = fois*0; break;
                case "Vol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*2; break;
                case "Électrique" : fois = fois*0.5; break;
                case "Plante" : fois = fois*0.5; break;
                case "Sol" : fois = fois*0; break;
                case "Vol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*2; break;
                case "Électrique" : fois = fois*0.5; break;
                case "Plante" : fois = fois*0.5; break;
                case "Sol" : fois = fois*0; break;
                case "Vol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Fée" :
            switch(typeDef1){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*2; break;
                case "Dragon" : fois = fois*2; break;
                case "Feu" : fois = fois*0.5; break;
                case "Poison" : fois = fois*0.5; break;
                case "Ténèbres" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*2; break;
                case "Dragon" : fois = fois*2; break;
                case "Feu" : fois = fois*0.5; break;
                case "Poison" : fois = fois*0.5; break;
                case "Ténèbres" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*2; break;
                case "Dragon" : fois = fois*2; break;
                case "Feu" : fois = fois*0.5; break;
                case "Poison" : fois = fois*0.5; break;
                case "Ténèbres" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Feu" :
            switch(typeDef1){
                case "Acier" : fois = fois*2; break;
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*0.5; break;
                case "Feu" : fois = fois*0.5; break;
                case "Glace" : fois = fois*2; break;
                case "Insecte" : fois = fois*2; break;
                case "Plante" : fois = fois*2; break;
                case "Roche" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*2; break;
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*0.5; break;
                case "Feu" : fois = fois*0.5; break;
                case "Glace" : fois = fois*2; break;
                case "Insecte" : fois = fois*2; break;
                case "Plante" : fois = fois*2; break;
                case "Roche" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*2; break;
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*0.5; break;
                case "Feu" : fois = fois*0.5; break;
                case "Glace" : fois = fois*2; break;
                case "Insecte" : fois = fois*2; break;
                case "Plante" : fois = fois*2; break;
                case "Roche" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Glace" :
            switch(typeDef1){
                case "Acier" : fois = fois*0.5; break;
                case "Dragon" : fois = fois*2; break;
                case "Eau" : fois = fois*0.5; break;
                case "Feu" : fois = fois*0.5; break;
                case "Glace" : fois = fois*0.5; break;
                case "Plante" : fois = fois*2; break;
                case "Sol" : fois = fois*2; break;
                case "Vol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0.5; break;
                case "Dragon" : fois = fois*2; break;
                case "Eau" : fois = fois*0.5; break;
                case "Feu" : fois = fois*0.5; break;
                case "Glace" : fois = fois*0.5; break;
                case "Plante" : fois = fois*2; break;
                case "Sol" : fois = fois*2; break;
                case "Vol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*0.5; break;
                case "Dragon" : fois = fois*2; break;
                case "Eau" : fois = fois*0.5; break;
                case "Feu" : fois = fois*0.5; break;
                case "Glace" : fois = fois*0.5; break;
                case "Plante" : fois = fois*2; break;
                case "Sol" : fois = fois*2; break;
                case "Vol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Insecte" :
            switch(typeDef1){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*0.5; break;
                case "Fée" : fois = fois*0.5; break;
                case "Feu" : fois = fois*0.5; break;
                case "Plante" : fois = fois*2; break;
                case "Poison" : fois = fois*0.5; break;
                case "Psy" : fois = fois*2; break;
                case "Spectre" : fois = fois*0.5; break;
                case "Ténèbres" : fois = fois*2; break;
                case "Vol" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*0.5; break;
                case "Fée" : fois = fois*0.5; break;
                case "Feu" : fois = fois*0.5; break;
                case "Plante" : fois = fois*2; break;
                case "Poison" : fois = fois*0.5; break;
                case "Psy" : fois = fois*2; break;
                case "Spectre" : fois = fois*0.5; break;
                case "Ténèbres" : fois = fois*2; break;
                case "Vol" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*0.5; break;
                case "Fée" : fois = fois*0.5; break;
                case "Feu" : fois = fois*0.5; break;
                case "Plante" : fois = fois*2; break;
                case "Poison" : fois = fois*0.5; break;
                case "Psy" : fois = fois*2; break;
                case "Spectre" : fois = fois*0.5; break;
                case "Ténèbres" : fois = fois*2; break;
                case "Vol" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Normal" :
            switch(typeDef1){
                case "Acier" : fois = fois*0.5; break;
                case "Roche" : fois = fois*0.5; break;
                case "Spectre" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0.5; break;
                case "Roche" : fois = fois*0.5; break;
                case "Spectre" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*0.5; break;
                case "Roche" : fois = fois*0.5; break;
                case "Spectre" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Plante" :
            switch(typeDef1){
                case "Acier" : fois = fois*0.5; break;
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*2; break;
                case "Feu" : fois = fois*0.5; break;
                case "Insecte" : fois = fois*0.5; break;
                case "Plante" : fois = fois*0.5; break;
                case "Poison" : fois = fois*0.5; break;
                case "Roche" : fois = fois*2; break;
                case "Sol" : fois = fois*2; break;
                case "Vol" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0.5; break;
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*2; break;
                case "Feu" : fois = fois*0.5; break;
                case "Insecte" : fois = fois*0.5; break;
                case "Plante" : fois = fois*0.5; break;
                case "Poison" : fois = fois*0.5; break;
                case "Roche" : fois = fois*2; break;
                case "Sol" : fois = fois*2; break;
                case "Vol" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*0.5; break;
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*2; break;
                case "Feu" : fois = fois*0.5; break;
                case "Insecte" : fois = fois*0.5; break;
                case "Plante" : fois = fois*0.5; break;
                case "Poison" : fois = fois*0.5; break;
                case "Roche" : fois = fois*2; break;
                case "Sol" : fois = fois*2; break;
                case "Vol" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Poison" :
            switch(typeDef1){
                case "Acier" : fois = fois*0; break;
                case "Fée" : fois = fois*2; break;
                case "Plante" : fois = fois*2; break;
                case "Poison" : fois = fois*0.5; break;
                case "Roche" : fois = fois*0.5; break;
                case "Sol" : fois = fois*0.5; break;
                case "Spectre" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0; break;
                case "Fée" : fois = fois*2; break;
                case "Plante" : fois = fois*2; break;
                case "Poison" : fois = fois*0.5; break;
                case "Roche" : fois = fois*0.5; break;
                case "Sol" : fois = fois*0.5; break;
                case "Spectre" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*0; break;
                case "Fée" : fois = fois*2; break;
                case "Plante" : fois = fois*2; break;
                case "Poison" : fois = fois*0.5; break;
                case "Roche" : fois = fois*0.5; break;
                case "Sol" : fois = fois*0.5; break;
                case "Spectre" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Psy" :
            switch(typeDef1){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*2; break;
                case "Poison" : fois = fois*2; break;
                case "Psy" : fois = fois*0.5; break;
                case "Ténèbres" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*2; break;
                case "Poison" : fois = fois*2; break;
                case "Psy" : fois = fois*0.5; break;
                case "Ténèbres" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*2; break;
                case "Poison" : fois = fois*2; break;
                case "Psy" : fois = fois*0.5; break;
                case "Ténèbres" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Roche" :
            switch(typeDef1){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*0.5; break;
                case "Feu" : fois = fois*2; break;
                case "Glace" : fois = fois*2; break;
                case "Insecte" : fois = fois*2; break;
                case "Sol" : fois = fois*0.5; break;
                case "Vol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*0.5; break;
                case "Feu" : fois = fois*2; break;
                case "Glace" : fois = fois*2; break;
                case "Insecte" : fois = fois*2; break;
                case "Sol" : fois = fois*0.5; break;
                case "Vol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*0.5; break;
                case "Feu" : fois = fois*2; break;
                case "Glace" : fois = fois*2; break;
                case "Insecte" : fois = fois*2; break;
                case "Sol" : fois = fois*0.5; break;
                case "Vol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Sol" :
            switch(typeDef1){
                case "Acier" : fois = fois*2; break;
                case "Électrique" : fois = fois*2; break;
                case "Feu" : fois = fois*2; break;
                case "Insecte" : fois = fois*0.5; break;
                case "Plante" : fois = fois*0.5; break;
                case "Poison" : fois = fois*2; break;
                case "Roche" : fois = fois*2; break;
                case "Vol" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*2; break;
                case "Électrique" : fois = fois*2; break;
                case "Feu" : fois = fois*2; break;
                case "Insecte" : fois = fois*0.5; break;
                case "Plante" : fois = fois*0.5; break;
                case "Poison" : fois = fois*2; break;
                case "Roche" : fois = fois*2; break;
                case "Vol" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*2; break;
                case "Électrique" : fois = fois*2; break;
                case "Feu" : fois = fois*2; break;
                case "Insecte" : fois = fois*0.5; break;
                case "Plante" : fois = fois*0.5; break;
                case "Poison" : fois = fois*2; break;
                case "Roche" : fois = fois*2; break;
                case "Vol" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Spectre" :
            switch(typeDef1){
                case "Normal" : fois = fois*0; break;
                case "Psy" : fois = fois*2; break;
                case "Spectre" : fois = fois*2; break;
                case "Ténèbres" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Normal" : fois = fois*0; break;
                case "Psy" : fois = fois*2; break;
                case "Spectre" : fois = fois*2; break;
                case "Ténèbres" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Normal" : fois = fois*0; break;
                case "Psy" : fois = fois*2; break;
                case "Spectre" : fois = fois*2; break;
                case "Ténèbres" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Ténèbres" :
            switch(typeDef1){
                case "Combat" : fois = fois*0.5; break;
                case "Fée" : fois = fois*0.5; break;
                case "Psy" : fois = fois*2; break;
                case "Spectre" : fois = fois*2; break;
                case "Ténèbres" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Combat" : fois = fois*0.5; break;
                case "Fée" : fois = fois*0.5; break;
                case "Psy" : fois = fois*2; break;
                case "Spectre" : fois = fois*2; break;
                case "Ténèbres" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Combat" : fois = fois*0.5; break;
                case "Fée" : fois = fois*0.5; break;
                case "Psy" : fois = fois*2; break;
                case "Spectre" : fois = fois*2; break;
                case "Ténèbres" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Vol" :
            switch(typeDef1){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*2; break;
                case "Électrique" : fois = fois*0.5; break;
                case "Insecte" : fois = fois*2; break;
                case "Plante" : fois = fois*2; break;
                case "Roche" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*2; break;
                case "Électrique" : fois = fois*0.5; break;
                case "Insecte" : fois = fois*2; break;
                case "Plante" : fois = fois*2; break;
                case "Roche" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*2; break;
                case "Électrique" : fois = fois*0.5; break;
                case "Insecte" : fois = fois*2; break;
                case "Plante" : fois = fois*2; break;
                case "Roche" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        default : return fois; break;
    }
}

async function SuperEfficace(typeAtt, [typeDef1, typeDef2, typeDef3]){
    
    var fois = 1;

    switch (typeAtt){
        case "Acier" : 
            switch(typeDef1){
                case "Acier" : fois = fois*0.5; break;
                case "Eau" : fois = fois*0.5; break;
                case "Électrique" : fois = fois*0.5; break;
                case "Fée" : fois = fois*2; break;
                case "Feu" : fois = fois*0.5; break;
                case "Glace" : fois = fois*2; break;
                case "Roche" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0.5; break;
                case "Eau" : fois = fois*0.5; break;
                case "Électrique" : fois = fois*0.5; break;
                case "Fée" : fois = fois*2; break;
                case "Feu" : fois = fois*0.5; break;
                case "Glace" : fois = fois*2; break;
                case "Roche" : fois = fois*2; break;
                default : fois = fois*1; break;
            }
            switch(typeDef3){
                case "Acier" : fois = fois*0.5; break;
                case "Eau" : fois = fois*0.5; break;
                case "Électrique" : fois = fois*0.5; break;
                case "Fée" : fois = fois*2; break;
                case "Feu" : fois = fois*0.5; break;
                case "Glace" : fois = fois*2; break;
                case "Roche" : fois = fois*2; break;
                default : fois = fois*1; break;
            }
        return fois; break;
        case "Combat" :
            switch(typeDef1){
                case "Acier" : fois = fois*2; break;
                case "Fée" : fois = fois*0.5; break;
                case "Glace" : fois = fois*2; break;
                case "Insecte" : fois = fois*0.5; break;
                case "Normal" : fois = fois*2; break;
                case "Poison" : fois = fois*0.5; break;
                case "Psy" : fois = fois*0.5; break;
                case "Roche" : fois = fois*2; break;
                case "Spectre" : fois = fois*0; break;
                case "Ténèbres" : fois = fois*2; break;
                case "Vol" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*2; break;
                case "Fée" : fois = fois*0.5; break;
                case "Glace" : fois = fois*2; break;
                case "Insecte" : fois = fois*0.5; break;
                case "Normal" : fois = fois*2; break;
                case "Poison" : fois = fois*0.5; break;
                case "Psy" : fois = fois*0.5; break;
                case "Roche" : fois = fois*2; break;
                case "Spectre" : fois = fois*0; break;
                case "Ténèbres" : fois = fois*2; break;
                case "Vol" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*2; break;
                case "Fée" : fois = fois*0.5; break;
                case "Glace" : fois = fois*2; break;
                case "Insecte" : fois = fois*0.5; break;
                case "Normal" : fois = fois*2; break;
                case "Poison" : fois = fois*0.5; break;
                case "Psy" : fois = fois*0.5; break;
                case "Roche" : fois = fois*2; break;
                case "Spectre" : fois = fois*0; break;
                case "Ténèbres" : fois = fois*2; break;
                case "Vol" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Dragon" :
            switch(typeDef1){
                case "Acier" : fois = fois*0.5; break;
                case "Dragon" : fois = fois*2; break;
                case "Fée" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0.5; break;
                case "Dragon" : fois = fois*2; break;
                case "Fée" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*0.5; break;
                case "Dragon" : fois = fois*2; break;
                case "Fée" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Eau" :
            switch(typeDef1){
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*0.5; break;
                case "Feu" : fois = fois*2; break;
                case "Plante" : fois = fois*0.5; break;
                case "Roche" : fois = fois*2; break;
                case "Sol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*0.5; break;
                case "Feu" : fois = fois*2; break;
                case "Plante" : fois = fois*0.5; break;
                case "Roche" : fois = fois*2; break;
                case "Sol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*0.5; break;
                case "Feu" : fois = fois*2; break;
                case "Plante" : fois = fois*0.5; break;
                case "Roche" : fois = fois*2; break;
                case "Sol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Électrique" :
            switch(typeDef1){
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*2; break;
                case "Électrique" : fois = fois*0.5; break;
                case "Plante" : fois = fois*0.5; break;
                case "Sol" : fois = fois*0; break;
                case "Vol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*2; break;
                case "Électrique" : fois = fois*0.5; break;
                case "Plante" : fois = fois*0.5; break;
                case "Sol" : fois = fois*0; break;
                case "Vol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*2; break;
                case "Électrique" : fois = fois*0.5; break;
                case "Plante" : fois = fois*0.5; break;
                case "Sol" : fois = fois*0; break;
                case "Vol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Fée" :
            switch(typeDef1){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*2; break;
                case "Dragon" : fois = fois*2; break;
                case "Feu" : fois = fois*0.5; break;
                case "Poison" : fois = fois*0.5; break;
                case "Ténèbres" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*2; break;
                case "Dragon" : fois = fois*2; break;
                case "Feu" : fois = fois*0.5; break;
                case "Poison" : fois = fois*0.5; break;
                case "Ténèbres" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*2; break;
                case "Dragon" : fois = fois*2; break;
                case "Feu" : fois = fois*0.5; break;
                case "Poison" : fois = fois*0.5; break;
                case "Ténèbres" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Feu" :
            switch(typeDef1){
                case "Acier" : fois = fois*2; break;
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*0.5; break;
                case "Feu" : fois = fois*0.5; break;
                case "Glace" : fois = fois*2; break;
                case "Insecte" : fois = fois*2; break;
                case "Plante" : fois = fois*2; break;
                case "Roche" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*2; break;
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*0.5; break;
                case "Feu" : fois = fois*0.5; break;
                case "Glace" : fois = fois*2; break;
                case "Insecte" : fois = fois*2; break;
                case "Plante" : fois = fois*2; break;
                case "Roche" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*2; break;
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*0.5; break;
                case "Feu" : fois = fois*0.5; break;
                case "Glace" : fois = fois*2; break;
                case "Insecte" : fois = fois*2; break;
                case "Plante" : fois = fois*2; break;
                case "Roche" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Glace" :
            switch(typeDef1){
                case "Acier" : fois = fois*0.5; break;
                case "Dragon" : fois = fois*2; break;
                case "Eau" : fois = fois*0.5; break;
                case "Feu" : fois = fois*0.5; break;
                case "Glace" : fois = fois*0.5; break;
                case "Plante" : fois = fois*2; break;
                case "Sol" : fois = fois*2; break;
                case "Vol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0.5; break;
                case "Dragon" : fois = fois*2; break;
                case "Eau" : fois = fois*0.5; break;
                case "Feu" : fois = fois*0.5; break;
                case "Glace" : fois = fois*0.5; break;
                case "Plante" : fois = fois*2; break;
                case "Sol" : fois = fois*2; break;
                case "Vol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*0.5; break;
                case "Dragon" : fois = fois*2; break;
                case "Eau" : fois = fois*0.5; break;
                case "Feu" : fois = fois*0.5; break;
                case "Glace" : fois = fois*0.5; break;
                case "Plante" : fois = fois*2; break;
                case "Sol" : fois = fois*2; break;
                case "Vol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Insecte" :
            switch(typeDef1){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*0.5; break;
                case "Fée" : fois = fois*0.5; break;
                case "Feu" : fois = fois*0.5; break;
                case "Plante" : fois = fois*2; break;
                case "Poison" : fois = fois*0.5; break;
                case "Psy" : fois = fois*2; break;
                case "Spectre" : fois = fois*0.5; break;
                case "Ténèbres" : fois = fois*2; break;
                case "Vol" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*0.5; break;
                case "Fée" : fois = fois*0.5; break;
                case "Feu" : fois = fois*0.5; break;
                case "Plante" : fois = fois*2; break;
                case "Poison" : fois = fois*0.5; break;
                case "Psy" : fois = fois*2; break;
                case "Spectre" : fois = fois*0.5; break;
                case "Ténèbres" : fois = fois*2; break;
                case "Vol" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*0.5; break;
                case "Fée" : fois = fois*0.5; break;
                case "Feu" : fois = fois*0.5; break;
                case "Plante" : fois = fois*2; break;
                case "Poison" : fois = fois*0.5; break;
                case "Psy" : fois = fois*2; break;
                case "Spectre" : fois = fois*0.5; break;
                case "Ténèbres" : fois = fois*2; break;
                case "Vol" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Normal" :
            switch(typeDef1){
                case "Acier" : fois = fois*0.5; break;
                case "Roche" : fois = fois*0.5; break;
                case "Spectre" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0.5; break;
                case "Roche" : fois = fois*0.5; break;
                case "Spectre" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*0.5; break;
                case "Roche" : fois = fois*0.5; break;
                case "Spectre" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Plante" :
            switch(typeDef1){
                case "Acier" : fois = fois*0.5; break;
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*2; break;
                case "Feu" : fois = fois*0.5; break;
                case "Insecte" : fois = fois*0.5; break;
                case "Plante" : fois = fois*0.5; break;
                case "Poison" : fois = fois*0.5; break;
                case "Roche" : fois = fois*2; break;
                case "Sol" : fois = fois*2; break;
                case "Vol" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0.5; break;
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*2; break;
                case "Feu" : fois = fois*0.5; break;
                case "Insecte" : fois = fois*0.5; break;
                case "Plante" : fois = fois*0.5; break;
                case "Poison" : fois = fois*0.5; break;
                case "Roche" : fois = fois*2; break;
                case "Sol" : fois = fois*2; break;
                case "Vol" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*0.5; break;
                case "Dragon" : fois = fois*0.5; break;
                case "Eau" : fois = fois*2; break;
                case "Feu" : fois = fois*0.5; break;
                case "Insecte" : fois = fois*0.5; break;
                case "Plante" : fois = fois*0.5; break;
                case "Poison" : fois = fois*0.5; break;
                case "Roche" : fois = fois*2; break;
                case "Sol" : fois = fois*2; break;
                case "Vol" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Poison" :
            switch(typeDef1){
                case "Acier" : fois = fois*0; break;
                case "Fée" : fois = fois*2; break;
                case "Plante" : fois = fois*2; break;
                case "Poison" : fois = fois*0.5; break;
                case "Roche" : fois = fois*0.5; break;
                case "Sol" : fois = fois*0.5; break;
                case "Spectre" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0; break;
                case "Fée" : fois = fois*2; break;
                case "Plante" : fois = fois*2; break;
                case "Poison" : fois = fois*0.5; break;
                case "Roche" : fois = fois*0.5; break;
                case "Sol" : fois = fois*0.5; break;
                case "Spectre" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*0; break;
                case "Fée" : fois = fois*2; break;
                case "Plante" : fois = fois*2; break;
                case "Poison" : fois = fois*0.5; break;
                case "Roche" : fois = fois*0.5; break;
                case "Sol" : fois = fois*0.5; break;
                case "Spectre" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Psy" :
            switch(typeDef1){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*2; break;
                case "Poison" : fois = fois*2; break;
                case "Psy" : fois = fois*0.5; break;
                case "Ténèbres" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*2; break;
                case "Poison" : fois = fois*2; break;
                case "Psy" : fois = fois*0.5; break;
                case "Ténèbres" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*2; break;
                case "Poison" : fois = fois*2; break;
                case "Psy" : fois = fois*0.5; break;
                case "Ténèbres" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Roche" :
            switch(typeDef1){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*0.5; break;
                case "Feu" : fois = fois*2; break;
                case "Glace" : fois = fois*2; break;
                case "Insecte" : fois = fois*2; break;
                case "Sol" : fois = fois*0.5; break;
                case "Vol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*0.5; break;
                case "Feu" : fois = fois*2; break;
                case "Glace" : fois = fois*2; break;
                case "Insecte" : fois = fois*2; break;
                case "Sol" : fois = fois*0.5; break;
                case "Vol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*0.5; break;
                case "Feu" : fois = fois*2; break;
                case "Glace" : fois = fois*2; break;
                case "Insecte" : fois = fois*2; break;
                case "Sol" : fois = fois*0.5; break;
                case "Vol" : fois = fois*2; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Sol" :
            switch(typeDef1){
                case "Acier" : fois = fois*2; break;
                case "Électrique" : fois = fois*2; break;
                case "Feu" : fois = fois*2; break;
                case "Insecte" : fois = fois*0.5; break;
                case "Plante" : fois = fois*0.5; break;
                case "Poison" : fois = fois*2; break;
                case "Roche" : fois = fois*2; break;
                case "Vol" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*2; break;
                case "Électrique" : fois = fois*2; break;
                case "Feu" : fois = fois*2; break;
                case "Insecte" : fois = fois*0.5; break;
                case "Plante" : fois = fois*0.5; break;
                case "Poison" : fois = fois*2; break;
                case "Roche" : fois = fois*2; break;
                case "Vol" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*2; break;
                case "Électrique" : fois = fois*2; break;
                case "Feu" : fois = fois*2; break;
                case "Insecte" : fois = fois*0.5; break;
                case "Plante" : fois = fois*0.5; break;
                case "Poison" : fois = fois*2; break;
                case "Roche" : fois = fois*2; break;
                case "Vol" : fois = fois*0; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Spectre" :
            switch(typeDef1){
                case "Normal" : fois = fois*0; break;
                case "Psy" : fois = fois*2; break;
                case "Spectre" : fois = fois*2; break;
                case "Ténèbres" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Normal" : fois = fois*0; break;
                case "Psy" : fois = fois*2; break;
                case "Spectre" : fois = fois*2; break;
                case "Ténèbres" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Normal" : fois = fois*0; break;
                case "Psy" : fois = fois*2; break;
                case "Spectre" : fois = fois*2; break;
                case "Ténèbres" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Ténèbres" :
            switch(typeDef1){
                case "Combat" : fois = fois*0.5; break;
                case "Fée" : fois = fois*0.5; break;
                case "Psy" : fois = fois*2; break;
                case "Spectre" : fois = fois*2; break;
                case "Ténèbres" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Combat" : fois = fois*0.5; break;
                case "Fée" : fois = fois*0.5; break;
                case "Psy" : fois = fois*2; break;
                case "Spectre" : fois = fois*2; break;
                case "Ténèbres" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Combat" : fois = fois*0.5; break;
                case "Fée" : fois = fois*0.5; break;
                case "Psy" : fois = fois*2; break;
                case "Spectre" : fois = fois*2; break;
                case "Ténèbres" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        case "Vol" :
            switch(typeDef1){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*2; break;
                case "Électrique" : fois = fois*0.5; break;
                case "Insecte" : fois = fois*2; break;
                case "Plante" : fois = fois*2; break;
                case "Roche" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef2){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*2; break;
                case "Électrique" : fois = fois*0.5; break;
                case "Insecte" : fois = fois*2; break;
                case "Plante" : fois = fois*2; break;
                case "Roche" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
            switch(typeDef3){
                case "Acier" : fois = fois*0.5; break;
                case "Combat" : fois = fois*2; break;
                case "Électrique" : fois = fois*0.5; break;
                case "Insecte" : fois = fois*2; break;
                case "Plante" : fois = fois*2; break;
                case "Roche" : fois = fois*0.5; break;
                default : fois = fois*1; break;
            } 
        return fois; break;
        default : return fois; break;
    }
}

async function BonusBoost(boost){

    var Mult = 1;

    //Calcul du Boost d'attaque
    switch(boost){
        case -6 : Mult = 1/4;break;
        case -5 : Mult = 2/7;break;
        case -4 : Mult = 1/3;break;
        case -3 : Mult = 2/5;break;
        case -2 : Mult = 1/2;break;
        case -1 : Mult = 2/3;break;
        case 0 : Mult = 1;break;
        case 1 : Mult = 3/2;break;
        case 2 : Mult = 2;break;
        case 3 : Mult = 5/2;break;
        case 4 : Mult = 3;break;
        case 5 : Mult = 7/2;break;
        case 6 : Mult = 4;break;
        default : Mult = 1;break;
    }

    return Mult;

}

module.exports.JaugeDeVie = async(message,pv,pvmax,quicestqui) => {

    var pourcentage = Math.floor((pv*100)/(pvmax*5));
    console.log("pourcentage de PV restants : "+pourcentage);

    if(quicestqui=="joueur"){var actualPV = pv+"/"+pvmax+" ";}else{var actualPV ="";}

    switch (pourcentage){
        case 0 :  
        if(pv<=0){return "PV "+actualPV+":white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:";break;
        }else{return "PV "+actualPV+":adhesive_bandage::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:";break;}
        case 1 :  return "PV "+actualPV+":red_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:";break;
        case 2 :  return "PV "+actualPV+":red_square::red_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:";break;
        case 3 :  return "PV "+actualPV+":orange_square::orange_square::orange_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:";break;
        case 4 :  return "PV "+actualPV+":orange_square::orange_square::orange_square::orange_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:";break;
        case 5 :  return "PV "+actualPV+":orange_square::orange_square::orange_square::orange_square::orange_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:";break;
        case 6 :  return "PV "+actualPV+":orange_square::orange_square::orange_square::orange_square::orange_square::orange_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:";break;
        case 7 :  return "PV "+actualPV+":orange_square::orange_square::orange_square::orange_square::orange_square::orange_square::orange_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:";break;
        case 8 :  return "PV "+actualPV+":orange_square::orange_square::orange_square::orange_square::orange_square::orange_square::orange_square::orange_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:";break;
        case 9 :  return "PV "+actualPV+":orange_square::orange_square::orange_square::orange_square::orange_square::orange_square::orange_square::orange_square::orange_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:";break;
        case 10 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:";break;
        case 11 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:";break;
        case 12 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:";break;
        case 13 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:";break;
        case 14 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:";break;
        case 15 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:";break;
        case 16 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::white_large_square::white_large_square::white_large_square::white_large_square:";break;
        case 17 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::white_large_square::white_large_square::white_large_square:";break;
        case 18 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::white_large_square::white_large_square:";break;
        case 19 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::white_large_square:";break;
        case 20 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square:";break;
        default : return "PV "+actualPV+":white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:";break;

   }

}

module.exports.JaugeDeVieNoire = async(message,pv,pvmax,quicestqui) => {

    var pourcentage = Math.floor((pv*100)/(pvmax*5));
    console.log("pourcentage de PV restants : "+pourcentage);

    if(quicestqui=="joueur"){var actualPV = pv+"/"+pvmax+" ";}else{var actualPV ="";}

    switch (pourcentage){
        case 0 :  
        if(pv<=0){return "PV "+actualPV+":black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:";break;
        }else{return "PV "+actualPV+":adhesive_bandage::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:";break;}
        case 1 :  return "PV "+actualPV+":red_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:";break;
        case 2 :  return "PV "+actualPV+":red_square::red_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:";break;
        case 3 :  return "PV "+actualPV+":orange_square::orange_square::orange_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:";break;
        case 4 :  return "PV "+actualPV+":orange_square::orange_square::orange_square::orange_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:";break;
        case 5 :  return "PV "+actualPV+":orange_square::orange_square::orange_square::orange_square::orange_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:";break;
        case 6 :  return "PV "+actualPV+":orange_square::orange_square::orange_square::orange_square::orange_square::orange_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:";break;
        case 7 :  return "PV "+actualPV+":orange_square::orange_square::orange_square::orange_square::orange_square::orange_square::orange_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:";break;
        case 8 :  return "PV "+actualPV+":orange_square::orange_square::orange_square::orange_square::orange_square::orange_square::orange_square::orange_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:";break;
        case 9 :  return "PV "+actualPV+":orange_square::orange_square::orange_square::orange_square::orange_square::orange_square::orange_square::orange_square::orange_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:";break;
        case 10 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:";break;
        case 11 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:";break;
        case 12 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:";break;
        case 13 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:";break;
        case 14 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:";break;
        case 15 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:";break;
        case 16 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::black_large_square::black_large_square::black_large_square::black_large_square:";break;
        case 17 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::black_large_square::black_large_square::black_large_square:";break;
        case 18 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::black_large_square::black_large_square:";break;
        case 19 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::black_large_square:";break;
        case 20 : return "PV "+actualPV+":green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square::green_square:";break;
        default : return "PV "+actualPV+":black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:";break;

   }

}


module.exports.CalculDegats = async (message, quicestqui, [nomAttaque, pp, ppMax, puissance, precision, type, categorie]) =>{
    
    var MultAtt = 1;
    var MultDef = 1;
    var boostAtt = 0;
    var boostDef = 0;
    var Défense = 0;
    var Attaque = 0;

    //Récupération des deux participants (paramètre quicestqui égal à "joueur" ou "sauvage" pour définir l'attaquant)
    if(quicestqui=="joueur")
    {
        var pokeA = await Equipe.findOne({idDiscord: message.author.id});
        if(pokeA.Pokemon1.Actif==true){var pokemonAttaque = pokeA.Pokemon1;
        }else if(pokeA.Pokemon2.Actif==true){var pokemonAttaque = pokeA.Pokemon2;
        }else if(pokeA.Pokemon3.Actif==true){var pokemonAttaque = pokeA.Pokemon3;}

        var pokeD = await Spawn.findOne({idDiscord: message.author.id});
        var pokemonDefense = pokeD.Pokemon;
    }else if (quicestqui =="sauvage")
    {
        var pokeA = await Spawn.findOne({idDiscord: message.author.id});
        var pokemonAttaque = pokeA.Pokemon;

        var pokeD = await Equipe.findOne({idDiscord: message.author.id});
        if(pokeD.Pokemon1.Actif==true){var pokemonDefense = pokeD.Pokemon1;
        }else if(pokeD.Pokemon2.Actif==true){var pokemonDefense = pokeD.Pokemon2;
        }else if(pokeD.Pokemon3.Actif==true){var pokemonDefense = pokeD.Pokemon3;}
    }else{return false;}


    message.channel.send(pokemonAttaque.Nom+" utilise "+nomAttaque+"!");


    console.log("Ce Pokémon attaque : "+pokemonAttaque);
    console.log("Ce Pokémon defense : "+pokemonDefense);
    console.log("type de l'attaque : "+type);
    console.log("trois type du pokémon : /"+pokemonAttaque.Type[0]+"/"+pokemonAttaque.Type[1]+"/"+pokemonAttaque.Type[2]+"/");

    console.log("catégorie de l'attaque : "+categorie);
    //Calcul Stab ou non
    console.log(String(type).includes(pokemonAttaque.Type[0]));
    console.log(String(type).includes(pokemonAttaque.Type[1]));
    console.log(String(type).includes(pokemonAttaque.Type[2]));
    if(type.includes(pokemonAttaque.Type[0])||type.includes(pokemonAttaque.Type[1])||type.includes(pokemonAttaque.Type[2])){var Stab = 1.5;}else{var Stab = 1;}
    console.log("Le STAB est de : "+Stab);

    if(categorie=="Physique"){
        boostAtt = pokemonAttaque.BoostCombat[0];
        console.log("mon boostattaque : "+boostAtt);
        Attaque = pokemonAttaque.StatFinal[1];
        boostDef = pokemonDefense.BoostCombat[0];
        Défense = pokemonDefense.StatFinal[2];
    }else if(categorie=="Special"){
        boostAtt = pokemonAttaque.BoostCombat[2];
        Attaque = pokemonAttaque.StatFinal[3];
        boostDef = pokemonDefense.BoostCombat[2];
        Défense = pokemonDefense.StatFinal[4];
    }else{boostAtt = 0;boostDef = 0;}

    //Calcul Critique ou non
    if(Math.random()<=1/24){var CoupCritique = 1.5;}else{var CoupCritique=1;}

    // Récupération des B onus d'attaque et de défense
    var MultAtt = await BonusBoost(boostAtt);
    var MultDef = await BonusBoost(boostDef);

    // Annulation des Bonus de défense et des malus d'attaque en cas de coup critique
    if(CoupCritique>1){
        if(MultAtt<1){MultAtt=1;}
        if(MultDef>1){MultDef=1;}
    }

    randomRollDamage = Math.floor(Math.random()*39+1);
    switch(randomRollDamage){
        case 1 : RollDamage = 0.85;break;
        case 2 : RollDamage = 0.85;break;
        case 3 : RollDamage = 0.85;break;
        case 4 : RollDamage = 0.86;break;
        case 5 : RollDamage = 0.86;break;
        case 6 : RollDamage = 0.87;break;
        case 7 : RollDamage = 0.87;break;
        case 8 : RollDamage = 0.87;break;
        case 9 : RollDamage = 0.88;break;
        case 10 : RollDamage = 0.88;break;
        case 11 : RollDamage = 0.89;break;
        case 12 : RollDamage = 0.89;break;
        case 13 : RollDamage = 0.89;break;
        case 14 : RollDamage = 0.90;break;
        case 15 : RollDamage = 0.90;break;
        case 16 : RollDamage = 0.90;break;
        case 17 : RollDamage = 0.91;break;
        case 18 : RollDamage = 0.91;break;
        case 19 : RollDamage = 0.92;break;
        case 20 : RollDamage = 0.92;break;
        case 21 : RollDamage = 0.92;break;
        case 22 : RollDamage = 0.93;break;
        case 23 : RollDamage = 0.93;break;
        case 24 : RollDamage = 0.94;break;
        case 25 : RollDamage = 0.94;break;
        case 26 : RollDamage = 0.94;break;
        case 27 : RollDamage = 0.95;break;
        case 28 : RollDamage = 0.95;break;
        case 29 : RollDamage = 0.96;break;
        case 30 : RollDamage = 0.96;break;
        case 31 : RollDamage = 0.96;break;
        case 32 : RollDamage = 0.97;break;
        case 33 : RollDamage = 0.97;break;
        case 34 : RollDamage = 0.98;break;
        case 35 : RollDamage = 0.98;break;
        case 36 : RollDamage = 0.98;break;
        case 37 : RollDamage = 0.99;break;
        case 38 : RollDamage = 0.99;break;
        default : RollDamage = 1;break;
    }

    var SuperEfficacité = await SuperEfficace(type, pokemonDefense.Type);


    console.log("Mon paramètres Stab est = "+Stab);
    console.log("Mon paramètres CoupCritique est = "+CoupCritique);
    console.log("Mon paramètres SuperEfficacité est = "+SuperEfficacité);
    console.log("Mon paramètres RollDamage est = "+RollDamage);



    var CM = 1*Stab*CoupCritique*SuperEfficacité*RollDamage;


    console.log("\rMon paramètres CM est = "+CM+"\r");

    console.log("Mon paramètres pokemonAttaque.NiveauXP[1] est = "+pokemonAttaque.NiveauXP[1]);
    console.log("Mon paramètres xAttaque est = "+Attaque);
    console.log("Mon paramètres MultAtt est = "+MultAtt);
    console.log("Mon paramètres puissance est = "+puissance);
    console.log("Mon paramètres Défense est = "+Défense);
    console.log("Mon paramètres MultDef est = "+MultDef);


    var pvPerdus = Math.floor((((((pokemonAttaque.NiveauXP[1]*0.4)+2)*(Attaque*MultAtt)*puissance)/(Défense*MultDef*50))+2)*CM);
    if (categorie=="Statut"){
        message.channel.send("Afficher l'effet de l'attaque de statut !");
        return 0;
    }else{
        if(SuperEfficacité>1){
        var messageEfficace = "C'est super efficace!";
        message.channel.send(messageEfficace);
        }else if(SuperEfficacité<1){
        var messageEfficace = "Ce n'est pas très efficace...";
        message.channel.send(messageEfficace);
        }
        if(CoupCritique>1){
            message.channel.send("Coup Critique !\r"+pokemonDefense.Nom+" a perdu "+Number(pvPerdus)+" PV !");
        }else{
            message.channel.send(pokemonDefense.Nom+" a perdu "+Number(pvPerdus)+" PV !");
        }

        console.log("Vrai pvPerdus : "+pvPerdus);

        if(pvPerdus<=pokemonDefense.PV){
            console.log("pvPerdus final : "+pvPerdus);
            return pvPerdus;
        }else{
            console.log("pvPerdus final : "+pokemonDefense.PV);
            return pokemonDefense.PV;
        }


    }
}


module.exports.fuiteOuiNon = async (message, tentative) => {

    var ficheEquipe = await Equipe.findOne({idDiscord: message.author.id});

    if(ficheEquipe.Pokemon1.Actif==true){
    	if(ficheEquipe.Pokemon1.Objet=="Boule Fumée"){await console.log("Boule Fumée Glorythmic");return true;}
    	var pokemonActif=ficheEquipe.Pokemon1.StatFinal[5];
    }else if(ficheEquipe.Pokemon2.Actif==true){
    	if(ficheEquipe.Pokemon2.Objet=="Boule Fumée"){await console.log("Boule Fumée Pyreibut");return true;}
    	var pokemonActif=ficheEquipe.Pokemon2.StatFinal[5];
    }else if(ficheEquipe.Pokemon3.Actif==true){
    	if(ficheEquipe.Pokemon3.Objet=="Boule Fumée"){await console.log("Boule Fumée Leezargus");return true;}
    	var pokemonActif=ficheEquipe.Pokemon3.StatFinal[5];
    }

    var ficheSauvage = await Spawn.findOne({idDiscord: message.author.id});

    var probaFuite = (((pokemonActif * 32)/ (ficheSauvage.Pokemon.StatFinal[5] / 4))+ 30 * tentative) / 256
    console.log(probaFuite);
    if(Math.random()<=probaFuite){
    	await console.log("fuite autoriséé");
    	return true;
    }else{
    	await console.log("fuite refusée");
    	return false;
    }

}


//Fonction Oui ou Non pour la fuite
module.exports.Fuite = async (message, proba) => {

    //1 filtre de réaction sur non 
    const filterFuite = (reaction, user) => {return (reaction.emoji.name === '❌' && user.id!=auth.server.roleBot);};
    const filterCombat = (reaction, user) => {return (reaction.emoji.name === '✅' && user.id!=auth.server.roleBot);};

    //récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
    var fiche = await Dresseurs.findOne({idDiscord: message.author.id});
    await console.log("fichefichefiche : "+fiche);
    /// Récupération du message Sous-Menu Sac dans une variable
    const fetchedGestionFuite = await message.guild.channels.cache.get(fiche.idSalon).messages.cache.get(fiche.gestionRencontre.ouinon);
    await console.log("fetchedGestionFuite : "+fetchedGestionFuite);

    //Collector du Pokémon 1 sur l'emote Gorythmic (activation du retrait de l'emote (inutile ici mais sait-on jamais))
    const FuiteCollector = await fetchedGestionFuite.createReactionCollector(filterFuite, { dispose: true });
    //Collector du Pokémon 1 sur l'emote Gorythmic (activation du retrait de l'emote (inutile ici mais sait-on jamais))
    const CombatCollector = await fetchedGestionFuite.createReactionCollector(filterCombat, { dispose: true });


        /// Collector pour mettre l'item 1 sur le Pokémon 1 ///
        FuiteCollector.on('collect', async (reaction, participant) => {

            //récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
            var fiche = await Dresseurs.findOne({idDiscord: message.author.id});
            /// Récupération du message Sous-Menu Sac dans une variable
            const fetchedGestionFuite = await message.guild.channels.cache.get(fiche.idSalon).messages.cache.get(fiche.gestionRencontre.ouinon);
            console.log("fetchedGestionFuite : "+fetchedGestionFuite);

            if(proba==true){
                await Suppr.deleteLast(message, 1);
                console.log(`Collected ${reaction.emoji.name} from ${participant.tag}`);

                await Spawn.deleteOne({idDiscord: message.author.id});

                return true;
            }else{

                return false;

            }

        });

        /// Collector pour mettre l'item 1 sur le Pokémon 1 ///
        CombatCollector.on('collect', async (reaction, participant) => {

            //récupération de la fiche dresseur, là où on enregistre les ID des messages des Menu et Sous-Menu//
            var fiche = await Dresseurs.findOne({idDiscord: message.author.id});
            /// Récupération du message Sous-Menu Sac dans une variable
            const fetchedGestionFuite = await message.guild.channels.cache.get(fiche.idSalon).messages.cache.get(fiche.gestionRencontre.ouinon);
            console.log("fetchedGestionFuite : "+fetchedGestionFuite);

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

            var MultVitActif = BonusBoost(pokemonActif.BoostCombat[4]);
            var MultVitSauvage = BonusBoost(pokemonSauvage.BoostCombat[4]);

            var messageAttente = "Que doit faire "+pokemonActif.Nom.toUpperCase()+"?";

                await message.guild.channels.cache.get(fiche.idSalon).send(messageAttente).then(async sentClue => {
                    ///Récupération de l'ID du message sous-menu équipe
                    //await Dresseurs.findOneAndUpdate({idDiscord: message.author.id},{idEquipe : sentClue});
                    await sentClue.react('💥');
                    await sentClue.react(auth.server.emote.poke);
                    await sentClue.react('🎒');
                    await sentClue.react('❌');
                });

            if(Math.floor(pokemonActif.StatFinal[5]*MultVitActif)>Math.floor(pokemonSauvage.StatFinal[5]*MultVitSauvage)){
                console.log(pokemonActif.Nom+" attaque en premier\rAfficher les possibilités d'attaques :)");
            }else if(Math.floor(pokemonActif.StatFinal[5]*MultVitActif)<Math.floor(pokemonSauvage.StatFinal[5]*MultVitSauvage)){
                console.log(pokemonSauvage.Nom+" attaque en premier\rTirer une attaque au hasard");
            }else{
                var quiCommence = Rand(2);
                if(quiCommence==1){
                    console.log(pokemonActif.Nom+" attaque en premier\rAfficher les possibilités d'attaques :)");
                }else{
                    console.log(pokemonSauvage.Nom+" attaque en premier\rTirer une attaque au hasard");
                }

            }

        });

}

function Rand(valeur){
    return Math.floor(Math.random() * valeur +1);
}

