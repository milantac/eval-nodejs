/*************************************/
/*          detailSchool.js          */
/*  Created on: 09/11/2020           */
/*          by: MILANYONI Guillaume  */
/*************************************/


/*  Je déclare l'ensemble des informations de mon formulaire  */
var nameSchool = document.querySelector('#nameSchool');
var adressSchool = document.querySelector('#adressSchool');
var dptSchool = document.querySelector('#dptSchool');

/*  Je recupere l'identifiant de l'établissement   */
var url=window.location;
/*          |=> l'obect window contien plein d'informations lié au navigateur
                                                    |=> y compris son url   */
var SchoolsId=url.hash;    //J'utilise la propriété hash de mon url pour récupérer l'identifiant
SchoolsId=SchoolsId.substring(1);
/*              |=>la méthode substring(<indiceDépart>, <indiceFin>)  "indiceFin est optionel"  */

var xhttp=new XMLHttpRequest();

xhttp.open('GET', '/schools/' + SchoolsId, true);
xhttp.send();
xhttp.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
        var data=JSON.parse(this.responseText);
        console.log(data);
        console.log(this.responseText);
    
        nameSchool.value=data.nameSchool;
        adressSchool.value=data.adressSchool;
        dptSchool.value=data.dptSchool;
    }
}
function modifySchool(){
    var tmpSchool={  // Je créé un objet temporaire respectant le schéma du model
        nameSchool: nameSchool.value,
        adressSchool: adressSchool.value,
        dptSchool: dptSchool.value,
    };
    xhttp.open('PUT','/schools/' + SchoolsId,true);
    /* comme je vais envoyer des informations, je dois préciser une requête */
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify(tmpSchool));
}

var btn = document.querySelector('#modifSchool');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    modifySchool();
    // Je me redirige vers la liste des car
    window.location.href = '/pages/school.html';
});