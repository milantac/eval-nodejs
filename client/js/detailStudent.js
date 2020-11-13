/*************************************/
/*          detailStudent.js         */
/*  Created on: 10/11/2020           */
/*          by: MILANYONI Guillaume  */
/*************************************/


/*  Je déclare l'ensemble des informations de mon formulaire  */
var nameStudent = document.querySelector('#nameStudent');
var surnameStudent = document.querySelector('#surnameStudent');
var birthdayStudent = document.querySelector('#birthdayStudent');
var lvlStudent = document.querySelector('#lvlStudent');
var adressStudent = document.querySelector('#adressStudent');

/*  Je recupere l'identifiant du eleve   */
var url=window.location;
/*          |=> l'obect window contien plein d'informations lié au navigateur
                                                    |=> y compris son url   */
var studentsId=url.hash;    //J'utilise la propriété hash de mon url pour récupérer l'identifiant
studentsId=studentsId.substring(1);
/*              |=>la méthode substring(<indiceDépart>, <indiceFin>)  "indiceFin est optionel"  */

var xhttpStudent=new XMLHttpRequest();

xhttpStudent.open('GET', '/students/'+studentsId, true);
xhttpStudent.send();
xhttpStudent.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
        var data=JSON.parse(this.responseText);
        console.log(data);
        console.log(this.responseText);
    
        nameStudent.value=data.nameStudent;
        surnameStudent.value=data.surnameStudent;
        birthdayStudent.value=data.birthdayStudent;
        lvlStudent.value=data.lvlStudent;
        adressStudent.value=data.adressStudent;
    }
}
function modifyStudent(){
    var tmp={  // Je créé un objet temporaire respectant le schéma du model
        nameStudent: nameStudent.value,
        surnameStudent: surnameStudent.value,
        birthdayStudent: birthdayStudent.value,
        lvlStudent: lvlStudent.value,
        adressStudent: adressStudent.value,
    };
    xhttpStudent.open('PUT','/students/'+studentsId,true);
    /* comme je vais envoyer des informations, je dois préciser une requête */
    xhttpStudent.setRequestHeader('Content-type', 'application/json');
    xhttpStudent.send(JSON.stringify(tmp));
}

var btn = document.querySelector('#modifStudent');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    modifyStudent();
    // Je me redirige vers la liste des car
    window.location.href = '/pages/student.html';
});