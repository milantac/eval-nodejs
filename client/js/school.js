var xhttp=new XMLHttpRequest();

/*-- -- -- On créé une fonction qui permet d'envoyer un nouvel établissement au server -- -- --*/
function addSchool(){    
/*  Je déclare l'ensemble des informations de mon formulaire  */
    var nameSchool = document.querySelector('#nameSchool');
    var adressSchool = document.querySelector('#adressSchool');
    var dptSchool = document.querySelector('#dptSchool');

/* objet temporaire respectant la même structure que le schéma du model */
    var tmp={
        nameSchool: nameSchool.value,
        adressSchool: adressSchool.value,
        dptSchool: dptSchool.value,
    };

    xhttp.open('POST','/schools',true);
    xhttp.setRequestHeader('Content-type','Application/json');
/*  JSON.stringify() méthode qui converti un objet en string    */
    xhttp.send(JSON.stringify(tmp));
    addOneLine(tmp);
    document.forms['formSpe'].reset();  //  je selectionnes parmis tous les forms de la page celui d'identifiant formSpe
    //                          |=>.reset() permet de remettre à vide les champs du form
    window.location.href='/pages/school.html'; 
/*      |      |=>location.href c'est l'emplacement dans votre barre de recherche   
        |=>  L'objet window c'est pour le navigateur  */        
};

/*___________________________________________
|                                            |
|      fonction qui permet de supprimer      |
|        un établissement au serveur         |
|____________________________________________*/
function deleteSchool(id){
    xhttp.open('DELETE','/schools/'+id,true);
    xhttp.send();
    window.location.href='/pages/school.html';
};

/*___________________________________________*
|                                            |
|      fonction qui permet de ajouter        |
|        un établissement au serveur         |
|____________________________________________*/
function addOneLine(data){
    var tab=document.querySelector('#schools');
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
    link.href = '/pages/detailSchool.html#' + data._id;//obliger de mettre # sinon envoie sur un mauvais lien
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
      deleteSchool(data._id);
    });

    tab.appendChild(newLine);
}

/* Je crée l'écouteur d'évenement associé au click du bouton validation  */
var btn = document.querySelector('#valid');
btn.addEventListener('click', (e)=>{
    e.preventDefault(); //je stop l'action par defaut du bouton
    addSchool();
});

/*  Afficher les information en BdD */
xhttp.open('GET','/schools',true);
xhttp.send();
xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200) {
        var data=JSON.parse(this.responseText);
        data.forEach(elt => {
            addOneLine(elt);
        });
    }
};