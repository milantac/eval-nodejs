var xhttp=new XMLHttpRequest();

function addTeacher(){    
/*  Je déclare l'ensemble des informations de mon formulaire  */
    var nameTeacher = document.querySelector('#nameTeacher');
    var surnameTeacher = document.querySelector('#surnameTeacher');
    var birthdayTeacher = document.querySelector('#birthdayTeacher');
    var adressTeacher = document.querySelector('#adressTeacher');

/* objet temporaire respectant la même structure que le schéma du model */
    var tmp={
        nameTeacher: nameTeacher.value,
        surnameTeacher: surnameTeacher.value,
        birthdayTeacher: birthdayTeacher.value,
        adressTeacher: adressTeacher.value,
    };

    xhttp.open('POST','/teachers',true);
    xhttp.setRequestHeader('Content-type','Application/json');
/*  JSON.stringify() méthode qui converti un objet en string    */
    xhttp.send(JSON.stringify(tmp));
    addOneLine(tmp);
    document.forms['formSpe'].reset();  //  je selectionnes parmis tous les forms de la page celui d'identifiant formSpe
    //                          |=>.reset() permet de remettre à vide les champs du form
    window.location.href='/pages/teacher.html'; 
/*      |      |=>location.href c'est l'emplacement dans votre barre de recherche   
        |=>  L'objet window c'est pour le navigateur  */        
};

/*___________________________________________
|                                            |
|      fonction qui permet de supprimer      |
|        un établissement au serveur         |
|____________________________________________*/
function deleteTeacher(id){
    xhttp.open('DELETE','/teachers/'+id,true);
    xhttp.send();
    window.location.href='/pages/teacher.html';
};

/*___________________________________________*
|                                            |
|      fonction qui permet de ajouter        |
|        un établissement au serveur         |
|____________________________________________*/
function addOneLine(data){
    var tab=document.querySelector('#teachers');
    var newLine=document.createElement('tr');   //on va crée un tr au tableau School
    for(const prop in data){
        if(prop!='_id'&&prop!='__v'){
            var tmp=document.createElement('td');
            tmp.innerText=data[prop];   //data.prop
            newLine.appendChild(tmp);
        }
    }

    /* Je créé un lien vers la page détail    */
    var tdLink = document.createElement('td');
    var link = document.createElement('a');
    link.href = '/pages/detailteacher.html#'+data._id;
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
      deleteTeacher(data._id);
    });

    tab.appendChild(newLine);
}

/* Je crée l'écouteur d'évenement associé au click du bouton validation  */
var btn = document.querySelector('#validTeacher');
btn.addEventListener('click', (e)=>{
    e.preventDefault(); //je stop l'action par defaut du bouton
    addTeacher();
});

/*  Afficher les information en BdD */
xhttp.open('GET','/teachers',true);
xhttp.send();
xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200) {
        var data=JSON.parse(this.responseText);
        data.forEach(elt => {
            addOneLine(elt);
        });
    }
};