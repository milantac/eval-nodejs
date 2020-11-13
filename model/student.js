const mongoose=require('mongoose');

var studentSchema=mongoose.Schema({ //déclaration d'une variable studentSchema
    nameStudent: String,
    surnameStudent: String,
    birthdayStudent: String,
    lvlStudent: String,  
    adressStudent: String,          
});

/*_________________________________________________
|                                                  |
|      Création du model par le SGBD MongoDB       |
|           grâce à la methode model               |
|__________________________________________________*/
var students=mongoose.model('Students',studentSchema);
//                  |     |        |=> Schéma que je vien de créer.
//                  |     |=> Nom que je donne a mon model.


module.exports=students;    //  Pour utiliser ce model pourtout dans mon environnement, je l'exporte avec module.exports