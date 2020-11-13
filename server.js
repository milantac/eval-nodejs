/*_______________________________*
|    Déclaration des framework    |
*________________________________*/
const express=require('express');         //  J'appelle le package express grâce à require
const mongoose=require('mongoose');       //  c'est l'adresse qui me permet de me connecter a la base de donnée
const bodyParser = require('body-parser');  //  body-parser permet de « convertir » automatiquement la chaine de caractère que mon client envoie à mon serveur

/*_____________________________*
|    Connexion BdD et model    |			//test 
*______________________________*/

/*  On va créer une constante uri qui enregistre le lien vers la base de donnée "MONGODB" */
const uri = "mongodb+srv://milantac:COD(ww2)@devweb2020joeuf.ab3uv.mongodb.net/devWeb2020Joeuf?retryWrites=true&w=majority";
const Schools=require('./model/school');
const Teachers=require('./model/teacher');
const Students=require('./model/student');

/*______________________________________________*
|    Déclaration d'instance et connexion BdD    |
*_______________________________________________*/
var promise = mongoose.connect(uri, {useNewUrlParser:true});  //J'utilise le système  de promesse Node étant asynchrone, je ne veux pas que le serveur soit lancé avant la connexion
var app = express();  // je déclare une variable app et j'y affecte le résultat de la fonction express cela me permet de créer un serveur Node express

promise.then(()=>{
  console.log('DB connected');
  
  app.listen(3000, () => {// Mon application va écouter les événements sur le port 3000
    console.log('Listening on port 3000 !');  // A l'ouverture du serveur j'affiche le message: Listening on port 3000 !
  });
});

/*___________________________*
|       Configuration        |
*____________________________*/
app.use('/pages', express.static('./client/pages'));
app.use('/js', express.static('./client/js'));
app.use('/css', express.static('./client/css'));
app.use('/img', express.static('./client/img'));

app.use(bodyParser.urlencoded({extended: true})); //  Je configure "bodyParser" de telle sorte qu’il ne prenne en compte que les éléments en JSON
app.use(bodyParser.json());

/*_____________*
|    Routes    |
*______________*/
app.get('/', (req, res) => {    // Quand mon application est sollicité à la racine ....
  res.sendFile(__dirname + '/client/index.html');   // ... Je lui envoie le fichier index.html à afficher grace à sendFile()
            /*      |-> "__dirname" permet d'obtenir automatiquement l'arborescence du dossier courant   */
});
app.get('/liste', (req, res) => {
  res.send(srcListe);
});

/*  établissement */
app.post('/schools',(req,res)=>{
  var newSchool = new Schools(req.body); //  Je crée un nouvel établissement respectant le schéma defini dans mon model
  
  newSchool.save((err, obj) => {  //  Je le sauvegarde grâce à la méthode save()
    if(err) /*  Si il y a une erreur  */ {    //  Alors       
      console.log(err); //  J'affiche 
      return res.send(500); // j'envoie au client !!
    }
    res.sendStatus(200);  //  Dans le cas contraire j'envoie le statut 200 pour indiquer que tous s'est bien déroulé
  });
});
app.get('/schools',(req,res)=>{
    Schools.find({},(err,obj)=>{
    if(err){                        //  if(err){
      console.log(err);             //  console.log(err);
      return res.send(500);         //  return res.send(500);
    }                               //  }else{
    res.send(obj);                  //  res.send(obj);
                                    //  }
  });
});
app.get('/schools/:id',(req,res)=>{  //le  :id sera automatiquement transformé par l'identifiant envoyé par la requête xhttp pour effectuer une recherche on va utilisé le modèle
  Schools.findOne({_id: req.params.id},(err,obj)=>{
    if(err){
      console.log(err);
      return res.send(500);
    }
    res.send(obj);
  });
});
app.put('/schools/:id',(req,res)=>{
    Schools.findOneAndUpdate({_id: req.params.id},req.body,{new:true, upsert:true, setDefaultsOnInsert:true, runValidators:true},(err,obj)=>{
    if(err){
      console.log(err);
      return res.send(500);
    }
    res.send(obj);
  });
});
app.delete('/schools/:id',(req,res)=>{
    Schools.deleteOne({_id: req.params.id},(err,obj)=> {
    if(err){
      console.log(err);
      return res.send(500);
    }
    res.sendStatus(200);
  });
});

/*  éleves */
app.post('/students',(req,res)=>{
  var newStudent = new Students(req.body); //  Je crée un nouvel éleve respectant le schéma defini dans mon model
  
  newStudent.save((err, obj) => {  //  Je le sauvegarde grâce à la méthode save()
    if(err) /*  Si il y a une erreur  */ {    //  Alors       
      console.log(err); //  J'affiche 
      return res.send(500); // j'envoie au client !!
    }
    res.sendStatus(200);  //  Dans le cas contraire j'envoie le statut 200 pour indiquer que tous s'est bien déroulé
  });
});
app.get('/students',(req,res)=>{
    Students.find({},(err,obj)=>{
    if(err){                        //  if(err){
      console.log(err);             //  console.log(err);
      return res.send(500);         //  return res.send(500);
    }                               //  }else{
    res.send(obj);                  //  res.send(obj);
                                    //  }
  });
});
app.get('/students/:id',(req,res)=>{  //:id sera automatiquement transformé par l'identifiant envoyé par la requête xhttp pour effectuer une recherche on va utilisé le modèle
  Students.findOne({_id: req.params.id},(err,obj)=>{
    if(err){
      console.log(err);
      return res.send(500);
    }
    res.send(obj);
  });
});
app.put('/students/:id',(req,res)=>{
    Students.findOneAndUpdate({_id: req.params.id},req.body,{new:true, upsert:true, setDefaultsOnInsert:true, runValidators:true},(err,obj)=>{
    if(err){
      console.log(err);
      return res.send(500);
    }
    res.send(obj);
  });
});
app.delete('/students/:id',(req,res)=>{
  Students.deleteOne({_id: req.params.id},(err,obj)=> {
    if(err){
      console.log(err);
      return res.send(500);
    }
     res.sendStatus(200);
  });
});

/*  Enseignants */
app.post('/teachers',(req,res)=>{
  var newTeacher = new Teachers(req.body); //  Je crée un nouvel dnseignant respectant le schéma defini dans mon model
  
  newTeacher.save((err, obj) => {  //  Je le sauvegarde grâce à la méthode save()
    if(err) /*  Si il y a une erreur  */ {    //  Alors       
      console.log(err); //  J'affiche 
      return res.send(500); // j'envoie au client !!
    }

    res.sendStatus(200);  //  Dans le cas contraire j'envoie le statut 200 pour indiquer que tous s'est bien déroulé
  });
});
app.get('/teachers',(req,res)=>{
  Teachers.find({},(err,obj)=>{
    if(err){                        //  if(err){
      console.log(err);             //  console.log(err);
      return res.send(500);         //  return res.send(500);
    }                               //  }else{
    res.send(obj);                  //  res.send(obj);
                                    //  }
  });
});
app.get('/teachers/:id',(req,res)=>{  //le  :id sera automatiquement transformé par l'identifiant envoyé par la requête xhttp pour effectuer une recherche on va utilisé le modèle
  Teachers.findOne({_id: req.params.id},(err,obj)=>{
    if(err){
      console.log(err);
      return res.send(500);
    }
    res.send(obj);
  });
});
app.put('/teachers/:id',(req,res)=>{
  Teachers.findOneAndUpdate({_id: req.params.id},req.body,{new:true, upsert:true, setDefaultsOnInsert:true, runValidators:true},(err,obj)=>{
    if(err){
      console.log(err);
      return res.send(500);
    }
    res.send(obj);
  });
});
app.delete('/teachers/:id',(req,res)=>{
  Teachers.deleteOne({_id: req.params.id},(err,obj)=> {
    if(err){
      console.log(err);
      return res.send(500);
    }
    res.sendStatus(200);
  });
});