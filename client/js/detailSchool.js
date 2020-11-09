/*************************************/
/*          detailSchool.js          */
/*  Created on: 09/11/2020           */
/*          by: MILANYONI Guillaume  */
/*************************************/


/*  Je déclare l'ensemble des informations de mon formulaire  */
var name = document.querySelector('#nameSchool');
var adress = document.querySelector('#AdressSchool');
var dpt = document.querySelector('#dptSchool');

/*  Je recupere l'identifiant du film   */
var url=window.location;
/*          |=> l'obect window contien plein d'informations lié au navigateur
                                                    |=> y compris son url   */
var schoolsId=url.hash;    //J'utilise la propriété hash de mon url pour récupérer l'identifiant

schoolsId=schoolsId.substring(1);
/*              |=>la méthode substring(<indiceDépart>, <indiceFin>)  "indiceFin est optionel"  */

var xhttp=new XMLHttpRequest();

xhttp.open('GET', '/school/'+schoolsId, true);
xhttp.send();
xhttp.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
        var data=JSON.parse(this.responseText);
        console.log(data);
        console.log(this.responseText);
    
        name.value=data.name;
        adress.value=data.adress;
        dpt.value=data.dpt;
    }
}
function modify(){
    var tmp={  // Je créé un objet temporaire respectant le schéma du model
        name: name.value,
        adress: adress.value,
        dpt: dpt.value,
    };
    xhttp.open('PUT','/school/'+schoolsId,true);
    /* comme je vais envoyer des informations, je dois préciser une requête */
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify(tmp));
}

var btn = document.querySelector('#modif');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    modify();
    // Je me redirige vers la liste des car
    window.location.href = '/pages/school.html';
});