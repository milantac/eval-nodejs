/*************************************/
/*          detailTeacher.js         */
/*  Created on: 10/11/2020           */
/*          by: MILANYONI Guillaume  */
/*************************************/


/*  Je déclare l'ensemble des informations de mon formulaire  */
var nameTeacher = document.querySelector('#nameTeacher');
var surnameTeacher = document.querySelector('#surnameTeacher');
var birthdayTeacher = document.querySelector('#birthdayTeacher');
var adressTeacher = document.querySelector('#adressTeacher');

/*  Je recupere l'identifiant du film   */
var url=window.location;
/*          |=> l'obect window contien plein d'informations lié au navigateur
                                                    |=> y compris son url   */
var teachersId=url.hash;    //J'utilise la propriété hash de mon url pour récupérer l'identifiant
teachersId=teachersId.substring(1);
/*              |=>la méthode substring(<indiceDépart>, <indiceFin>)  "indiceFin est optionel"  */

var xhttp=new XMLHttpRequest();

xhttp.open('GET', '/teachers/'+teachersId, true);
xhttp.send();
xhttp.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
        var data=JSON.parse(this.responseText);
        console.log(data);
        console.log(this.responseText);
    
        nameTeacher.value=data.nameTeacher;
        surnameTeacher.value=data.surnameTeacher;
        birthdayTeacher.value=data.birthdayTeacher;
        adressTeacher.value=data.adressTeacher;
    }
}
function modify(){
    var tmp={  // Je créé un objet temporaire respectant le schéma du model
        nameTeacher: nameTeacher.value,
        surnameTeacher: surnameTeacher.value,
        birthdayTeacher: birthdayTeacher.value,
        adressTeacher: adressTeacher.value,
    };
    xhttp.open('PUT','/teachers/'+teachersId,true);
    /* comme je vais envoyer des informations, je dois préciser une requête */
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify(tmp));
}

var btn = document.querySelector('#modifTeacher');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    modify();
    // Je me redirige vers la liste des car
    window.location.href = '/pages/teacher.html';
});