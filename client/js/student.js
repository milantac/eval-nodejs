var xhttpStudent=new XMLHttpRequest();

function addStudent(){    
/*  ensemble des informations de mon formulaire  */
    var nameStudent = document.querySelector('#nameStudent');
    var surnameStudent = document.querySelector('#surnameStudent');
    var birthdayStudent = document.querySelector('#birthdayStudent');
    var lvlStudent = document.querySelector('#lvlStudent');
    var adressStudent = document.querySelector('#adressStudent');

/* objet temporaire respectant la même structure que le schéma du model */
    var tmpStudent={
        nameStudent: nameStudent.value,
        surnameStudent: surnameStudent.value,
        birthdayStudent: birthdayStudent.value,
        lvlStudent: lvlStudent.value,
        adressStudent: adressStudent.value,
    };

    xhttpStudent.open('POST','/students',true);
    xhttpStudent.setRequestHeader('Content-type','Application/json');
    xhttpStudent.send(JSON.stringify(tmpStudent));// JSON.stringify() méthode qui converti un objet en string
    addOneLineStudent(tmpStudent);
    document.forms['formSpeStudent'].reset();  //  je selectionnes parmis tous les forms de la page celui d'identifiant formSpe
    //                          |=>.reset() permet de remettre à vide les champs du form
    window.location.href='/pages/student.html'; 
/*      |      |=>location.href c'est l'emplacement dans votre barre de recherche   
        |=>  L'objet window c'est pour le navigateur  */        
};

/*___________________________________________
|                                            |
|      fonction qui permet de supprimer      |
|        un établissement au serveur         |
|____________________________________________*/
function deleteStudent(id){
    xhttpStudent.open('DELETE','/students/'+id,true);
    xhttpStudent.send();
    window.location.href='/pages/student.html';
};

/*___________________________________________*
|                                            |
|      fonction qui permet de ajouter        |
|        un établissement au serveur         |
|____________________________________________*/
function addOneLineStudent(data){
    var tab=document.querySelector('#students');
    var newLine=document.createElement('tr');   //on va crée un tr au tableau School
    for(const prop in data){
        if(prop!='_id'&&prop!='__v'){
            var tmpStudent=document.createElement('td');
            tmpStudent.innerText=data[prop];   //data.prop
            newLine.appendChild(tmpStudent);
        }
    }

    /* Je créé un lien vers la page détail    */
    var tdLink = document.createElement('td');
    var link = document.createElement('a');
    link.href = '/pages/detailstudent.html#'+data._id;
    link.innerText = 'Détails';
    tdLink.appendChild(link);
    newLine.appendChild(tdLink);

    /*  Je créé un bouton suppression   */
    var tdSuppr = document.createElement('td');
    var btnSuppr = document.createElement('button');
    btnSuppr.innerText = 'Suppression';
    btnSuppr.classList.add('btn', 'btn-outline-danger');
    tdSuppr.appendChild(btnSuppr);
    newLine.appendChild(tdSuppr);
  
    btnSuppr.addEventListener('click', (e) => {
      deleteStudent(data._id);
    });

    tab.appendChild(newLine);
}

/* Je crée l'écouteur d'évenement associé au click du bouton validation  */
var btn = document.querySelector('#validStudent');
btn.addEventListener('click', (e)=>{
    e.preventDefault(); //je stop l'action par defaut du bouton
    addStudent();
});

/*  Afficher les information en BdD */
xhttpStudent.open('GET','/students',true);
xhttpStudent.send();
xhttpStudent.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200) {
        var data=JSON.parse(this.responseText);
        data.forEach(elt => {
            addOneLineStudent(elt);
        });
    }
};