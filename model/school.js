const mongoose=require('mongoose');

var schoolSchema=mongoose.Schema({ //déclaration d'une variable schoolSchema
    nameSchool: String,      
    adressSchool: String,        
    dptSchool: String,  
});

/*_________________________________________________
|                                                  |
|      Création du model par le SGBD MongoDB       |
|           grâce à la methode model               |
|__________________________________________________*/
var schools=mongoose.model('Schools',schoolSchema);
//                  |     |        |=> Schéma que je vien de créer.
//                  |     |=> Nom que je donne a mon model.


module.exports=schools;    //  Pour utiliser ce model pourtout dans mon environnement, je l'exporte avec module.exports