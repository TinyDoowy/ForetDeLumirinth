const mongoose = require("mongoose");
var Use = require('../usefull.js');


const natures = ["Hardi","Solo","Rigide","Mauvais","Brave","Assuré","Docile","Malin","Lâche","Relax","Modeste","Doux","Pudique","Foufou","Discret","Calme","Gentil","Prudent","Bizarre","Malpoli","Timide","Pressé","Jovial","Naïf","Sérieux"];


const EquipeSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectID,
	dresseurName: String,
	idDiscord : String,
	Pokemon1 : {
		Actif : Boolean,
		Nom : String,
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
		Attaque1 : {
			Nom : String,
			PP : Number,
            PPmax : Number,
			Puissance : Number,
			Precision : Number,
			Type : String,
            Categorie : String
		},
		Attaque2 : {
			Nom : String,
			PP : Number,
            PPmax : Number,
			Puissance : Number,
			Precision : Number,
			Type : String,
            Categorie : String
		},
		Attaque3 : {
			Nom : String,
			PP : Number,
            PPmax : Number,
			Puissance : Number,
			Precision : Number,
			Type : String,
            Categorie : String
		},
		Attaque4 : {
			Nom : String,
			PP : Number,
            PPmax : Number,
			Puissance : Number,
			Precision : Number,
			Type : String,
            Categorie : String
		},
		Objet : String
	},
	Pokemon2 : {
		Actif : Boolean,
		Nom : String,
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
		BoostCombat : [Number,Number,Number,Number,Number,Number],
		Attaque1 : {
			Nom : String,
			PP : Number,
            PPmax : Number,
			Puissance : Number,
			Precision : Number,
			Type : String,
            Categorie : String
		},
		Attaque2 : {
			Nom : String,
			PP : Number,
            PPmax : Number,
			Puissance : Number,
			Precision : Number,
			Type : String,
            Categorie : String
		},
		Attaque3 : {
			Nom : String,
			PP : Number,
            PPmax : Number,
			Puissance : Number,
			Precision : Number,
			Type : String,
            Categorie : String
		},
		Attaque4 : {
			Nom : String,
			PP : Number,
            PPmax : Number,
			Puissance : Number,
			Precision : Number,
			Type : String,
            Categorie : String
		},
		Objet : String
	},
	Pokemon3 : {
		Actif : Boolean,
		Nom : String,
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
		BoostCombat : [Number,Number,Number,Number,Number,Number],
		Attaque1 : {
			Nom : String,
			PP : Number,
            PPmax : Number,
			Puissance : Number,
			Precision : Number,
			Type : String,
            Categorie : String
		},
		Attaque2 : {
			Nom : String,
			PP : Number,
            PPmax : Number,
			Puissance : Number,
			Precision : Number,
			Type : String,
            Categorie : String
		},
		Attaque3 : {
			Nom : String,
			PP : Number,
            PPmax : Number,
			Puissance : Number,
			Precision : Number,
			Type : String,
            Categorie : String
		},
		Attaque4 : {
			Nom : String,
			PP : Number,
            PPmax : Number,
			Puissance : Number,
			Precision : Number,
			Type : String,
            Categorie : String
		},
		Objet : String
	},
	time: Date
});

module.exports = mongoose.model("Equipe", EquipeSchema);


module.exports.XP = async (gain, [CourbeXP, Niveau, XP]) => {

	var XPActuel = parseInt(XP)+gain;
	var n = parseInt(Niveau)+1;

	switch (CourbeXP){
		//800.000 XP level 100
		case "Rapide" :
			var XPNextLevel = Math.floor(0.8*n*n*n);
			if(XPActuel>=XPNextLevel){
				var Level = n;
				var LevelUp = true;
				var resteXP = XPNextLevel-XPActuel;
			}else{
				var Level = parseInt(Niveau);
				var resteXP = XPActuel;
			}
		break;
		//1.000.000 XP level 100
		case "Moyenne" :
			var XPNextLevel = Math.floor(n*n*n);
			if(XPActuel>=XPNextLevel){
				var Level = n;
				var LevelUp = true;
				var resteXP = XPNextLevel-XPActuel;
			}else{
				var Level = parseInt(Niveau);
				var resteXP = XPActuel;
			}
		break;
		//1.059.860 XP level 100
		case "Parabolique" :
			var XPNextLevel = Math.floor((1.2*n*n*n)-(15*n*n)+(100*n)-140);
			if(XPActuel>=XPNextLevel){
				var Level = n;
				var LevelUp = true;
				var resteXP = XPNextLevel-XPActuel;
			}else{
				var Level = parseInt(Niveau);
				var resteXP = XPActuel;
			}
		break;
		//1.250.000 XP level 100
		case "Lente" :
			var XPNextLevel = Math.floor(1.2*n*n*n);
			if(XPActuel>=XPNextLevel){
				var Level = n;
				var LevelUp = true;
				var resteXP = XPNextLevel-XPActuel;
			}else{
				var Level = parseInt(Niveau);
				var resteXP = XPActuel;
			}
		break;
		//600.000 XP level 100
		case "Erratique" :
			if(n>=1&&n<=50){
				var XPNextLevel = Math.floor((n*n*n)*((100-n)/50));
			}else if(n>=51&&n<=68){
				var XPNextLevel = Math.floor((n*n*n)*((150-n)/100));
			}else if(n>=69&&n<=98){
				if(n%3==0){
					var px = 0.000;
				}else if(n%3==1){
					var px = 0.008;
				}else if(n%3==2){
					var px = 0.014;
				}else{
					var px = 0.000;
				}

				var XPNextLevel = Math.floor((n*n*n)*(1.274-(n/150)-px));

			}else if(n>=99&&n<=100){
				var XPNextLevel = Math.floor((n*n*n)*((160-n)/100));
			}

			if(XPActuel>=XPNextLevel){
				var Level = n;
				var LevelUp = true;
				var resteXP = XPNextLevel-XPActuel;
			}else{
				var Level = parseInt(Niveau);
				var resteXP = XPActuel;
			}
		break;
		//1.640.000 XP level 100
		case "Fluctuante" :
			if(n>=1&&n<=15){
				var XPNextLevel = Math.floor((n*n*n)*((24+((n+1)/3))/50));
			}else if(n>=16&&n<=35){
				var XPNextLevel = Math.floor((n*n*n)*((14+n)/50));
			}else if(n>=36&&n<=100){
				var XPNextLevel = Math.floor((n*n*n)*((32+(n/2))/50));
			}


			if(XPActuel>=XPNextLevel){
				var Level = n;
				var LevelUp = true;
				var resteXP = XPNextLevel-XPActuel;
			}else{
				var Level = parseInt(Niveau);
				var resteXP = XPActuel;
			}
		break;
		default : break;
	}

var XPFinal = [Level, resteXP, CourbeXP];
console.log(XPFinal);
return XPFinal;

}


module.exports.IVs = async () => {

	//////Gestion des IVS //////
		var IVpv = Rand(31);
		var IVatt = Rand(31);
		var IVdef = Rand(31);
		var IVattspe = Rand(31);
		var IVdefspe = Rand(31);
		var IVvit = Rand(31);



		var IV1 = Rand(6);
		var IV2 = Rand(6);
		while(IV2==IV1){IV2 = Rand(6);}
		var IV3 = Rand(6);
		while(IV3==IV1||IV3==IV2){IV3 = Rand(6);}

		switch(IV1){
			case 1 : IVpv = 31; break;
			case 2 : IVatt = 31; break;
			case 3 : IVdef = 31; break;
			case 4 : IVattspe = 31; break;
			case 5 : IVdefspe = 31; break;
			case 6 : IVvit = 31; break;
			default : break;
		}
		switch(IV2){
			case 1 : IVpv = 31; break;
			case 2 : IVatt = 31; break;
			case 3 : IVdef = 31; break;
			case 4 : IVattspe = 31; break;
			case 5 : IVdefspe = 31; break;
			case 6 : IVvit = 31; break;
			default : break;
		}
		switch(IV3){
			case 1 : IVpv = 31; break;
			case 2 : IVatt = 31; break;
			case 3 : IVdef = 31; break;
			case 4 : IVattspe = 31; break;
			case 5 : IVdefspe = 31; break;
			case 6 : IVvit = 31; break;
			default : break;
		}

	console.log("IVs : "+IVpv+" "+IVatt+" "+IVdef+" "+IVattspe+" "+IVdefspe+" "+IVvit);
	////Fin des IVS/////

	var IVsFinal = [IVpv,IVatt,IVdef,IVattspe,IVdefspe,IVvit];
	console.log(IVsFinal);
	return IVsFinal;

}


module.exports.EVs = async () => {


	//////Gestion des EVS //////

		var EVpv = 0;
		var EVatt = 0;
		var EVdef = 0;
		var EVattspe = 0;
		var EVdefspe = 0;
		var EVvit = 0;

		var a = Rand(252);
		if(510-a>=252){var b = Rand(252);}else{b=Rand(510-a);}
		if(510-a-b>=252){var c = Rand(252);}else{c=Rand(510-a-b);}
		if(510-a-b-c>=252){var d = Rand(252);}else{d=Rand(510-a-b-c);}
		if(510-a-b-c-d>=252){var e = Rand(252);}else{e=Rand(510-a-b-c-d);}
		if(510-a-b-c-d-e>=252){var f = Rand(252);}else{f=Rand(510-a-b-c-d-e);}

		if(510-a-b-c-d-e-f>0){
			var extra = Math.floor((510-a-b-c-d-e-f)/6);
			while((extra*6)+a+b+c+d+e+f>510){extra=extra-1;console.log("extra EV : "+extra);}
			a = a + extra;
			b = b + extra;
			c = c + extra;
			d = d + extra;
			e = e + extra;
			f = f + extra;
		}


			var EV1 = Rand(6);
			var EV2 = Rand(6);
			while(EV2==EV1){EV2 = Rand(6);}
			var EV3 = Rand(6);
			while(EV3==EV1||EV3==EV2){EV3 = Rand(6);}
			var EV4 = Rand(6);
			while(EV4==EV1||EV4==EV2||EV4==EV3){EV4 = Rand(6);}
			var EV5 = Rand(6);
			while(EV5==EV1||EV5==EV2||EV5==EV3||EV5==EV4){EV5 = Rand(6);}
			var EV6 = 1+2+3+4+5+6-EV1-EV2-EV3-EV4-EV5;

			switch(EV1){
				case 1 : EVpv = a; break;
				case 2 : EVatt = a; break;
				case 3 : EVdef = a; break;
				case 4 : EVattspe = a; break;
				case 5 : EVdefspe = a; break;
				case 6 : EVvit = a; break;
				default : break;
			}
			switch(EV2){
				case 1 : EVpv = b; break;
				case 2 : EVatt = b; break;
				case 3 : EVdef = b; break;
				case 4 : EVattspe = b; break;
				case 5 : EVdefspe = b; break;
				case 6 : EVvit = b; break;
				default : break;
			}
			switch(EV3){
				case 1 : EVpv = c; break;
				case 2 : EVatt = c; break;
				case 3 : EVdef = c; break;
				case 4 : EVattspe = c; break;
				case 5 : EVdefspe = c; break;
				case 6 : EVvit = c; break;
				default : break;
			}
			switch(EV4){
				case 1 : EVpv = d; break;
				case 2 : EVatt = d; break;
				case 3 : EVdef = d; break;
				case 4 : EVattspe = d; break;
				case 5 : EVdefspe = d; break;
				case 6 : EVvit = d; break;
				default : break;
			}
			switch(EV5){
				case 1 : EVpv = e; break;
				case 2 : EVatt = e; break;
				case 3 : EVdef = e; break;
				case 4 : EVattspe = e; break;
				case 5 : EVdefspe = e; break;
				case 6 : EVvit = e; break;
				default : break;
			}
			switch(EV6){
				case 1 : EVpv = f; break;
				case 2 : EVatt = f; break;
				case 3 : EVdef = f; break;
				case 4 : EVattspe = f; break;
				case 5 : EVdefspe = f; break;
				case 6 : EVvit = f; break;
				default : break;
			}

	console.log("EV random : "+a+" "+b+" "+c+" "+d+" "+e+" "+f);
	console.log("EV distribué : "+EVpv+" "+EVatt+" "+EVdef+" "+EVattspe+" "+EVdefspe+" "+EVvit);
	////Fin des EVS/////

	var EVsFinal = [EVpv,EVatt,EVdef,EVattspe,EVdefspe,EVvit];
	console.log(EVsFinal);
	return EVsFinal;


}


module.exports.Nature = async () => {

    var naturePoke = Rand(25)-1;

    var attBonus = 1;
    var defBonus = 1;
    var attspeBonus = 1;
    var defspeBonus = 1;
    var vitBonus = 1;

    switch (Math.floor(naturePoke/5)){
        case 0 :
            var attBonus = attBonus+0.1;
            break;
        case 1 :
            var defBonus = defBonus+0.1;
            break;
        case 2 :
            var attspeBonus = attspeBonus+0.1;
            break;
        case 3 :
            var defspeBonus = defspeBonus+0.1;
            break;
        default :
            var vitBonus = vitBonus+0.1;
            break;
        }


    switch (Math.floor(naturePoke%5)){
        case 0 :
            var attBonus = attBonus-0.1;
            break;
        case 1 :
            var defBonus = defBonus-0.1;
            break;
        case 2 :
            var attspeBonus = attspeBonus-0.1;
            break;
        case 3 :
            var defspeBonus = defspeBonus-0.1;
            break;
        default :
            var vitBonus = vitBonus-0.1;
            break;
        }

    var statPoke = [natures[naturePoke],attBonus,defBonus,attspeBonus,defspeBonus,vitBonus];
    console.log(statPoke);
    return statPoke;

}


module.exports.BaseStat = async (pokemon) => {

	switch (pokemon) {
		case "Gorythmic" : var StatDeBase = [100,125,90,60,70,85]; break;
		case "Pyrobut" : var StatDeBase = [80,116,75,65,75,119]; break;
		case "Lezargus" : var StatDeBase = [70,85,65,125,65,120]; break;
		case "Theffroi" : var StatDeBase = [40,45,45,74,54,50]; break;
		case "Grimalin" : var StatDeBase = [45,45,30,55,40,50]; break;
		case "Bibichut" : var StatDeBase = [42,30,45,56,53,39]; break;
		case "Ponyta de Galar" : var StatDeBase = [50,85,55,65,65,90]; break;
		case "Wimessir ♂️" : var StatDeBase = [60,65,55,105,95,95]; break;
		case "Wimessir ♀️" : var StatDeBase = [70,55,65,95,105,85]; break;
		default : var StatDeBase = [0,0,0,0,0,0]; break;
	}

	console.log(StatDeBase);
	return StatDeBase;
}

module.exports.calculStats = async([typeCourbe, niveau, xp], [BasePV, BaseAtt, BaseDef, BaseAttSpe, BaseDefSpe, BaseVit], [IVpv,IVatt,IVdef,IVattspe,IVdefspe,IVvit], [EVpv,EVatt,EVdef,EVattspe,EVdefspe,EVvit],[natures,attBonus,defBonus,attspeBonus,defspeBonus,vitBonus]) => {

	var StatFinalPV = Math.floor(Math.floor(((2*BasePV+IVpv+Math.floor(EVpv/4))*niveau)/100)+parseInt(niveau)+parseInt(10));
	var StatFinalAtt = Math.floor((Math.floor(((2*BaseAtt+IVatt+Math.floor(EVatt/4))*niveau)/100)+5)*attBonus);
	var StatFinalDef = Math.floor((Math.floor(((2*BaseDef+IVdef+Math.floor(EVdef/4))*niveau)/100)+5)*defBonus);
	var StatFinalAttSpe = Math.floor((Math.floor(((2*BaseAttSpe+IVattspe+Math.floor(EVattspe/4))*niveau)/100)+5)*attspeBonus);
	var StatFinalDefSpe = Math.floor((Math.floor(((2*BaseDefSpe+IVdefspe+Math.floor(EVdefspe/4))*niveau)/100)+5)*defspeBonus);
	var StatFinalVit = Math.floor((Math.floor(((2*BaseVit+IVvit+Math.floor(EVvit/4))*niveau)/100)+5)*vitBonus);

	console.log("Stats Finales : "+StatFinalPV+" "+StatFinalAtt+" "+StatFinalDef+" "+StatFinalAttSpe+" "+StatFinalDefSpe+" "+StatFinalVit)
	
	var PokeDone = [StatFinalPV,StatFinalAtt,StatFinalDef,StatFinalAttSpe,StatFinalDefSpe,StatFinalVit];
	console.log(PokeDone);
	return PokeDone;

}



function Rand(valeur){
    return Math.floor(Math.random() * valeur +1);
}




