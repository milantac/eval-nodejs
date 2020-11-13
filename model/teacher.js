const mongoose=require('mongoose');

var teacherSchema=mongoose.Schema({ //déclaration d'une variable schoolSchema
    nameTeacher: String,
    surnameTeacher: String,
    birthdayTeacher: String,  
    adressTeacher: String,          
});

/*_________________________________________________
|                                                  |
|      Création du model par le SGBD MongoDB       |
|           grâce à la methode model               |
|__________________________________________________*/
var teachers=mongoose.model('Teachers',teacherSchema);
//                       |     |        |=> Schéma que je vien de créer.
//                       |     |=> Nom que je donne a mon model.


module.exports=teachers;    //  Pour utiliser ce model pourtout dans mon environnement, je l'exporte avec module.exports