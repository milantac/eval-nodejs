/* Je crée mon objet XMLttpRequest */
var xhttp=new XMLHttpRequest();

xhttp.onreadystatechange = function() {
/* J'utilise la fonction onreadystatechange pour indiquer ce qui doit être fait lorsque je recois maa liste */

    if(this.readyState == 4 && this.status == 200) {
/*      |=>this fait référence à la variable xhtt
        |=>preaadyState, status et responsText sont des propriétés de cet objet */
        console.log(this.responseText);                             //j'affiche la liste 

/* Je transforme ma réponse en tableau JSON parse */ 
        var data = JSON.parse(this.responseText);
/* J'utilise la boucle forEaach avec ma foction de création de LI pour afficher mes éléments */
        data.forEach(elt=>{
            newLi(elt);
        });
    }
}
                                                                    //la foction open permet de définirle type de requete
xhttp.open("GET","/liste",true);                                    //l'url qui doit être contacté 
                                                                    //la possibilité de gérer celal de manière asymchrone

xhttp.send();                                                       //ici j'envoie la requête

/*      je selection mo body        */
var body = document.querySelector('body');
/*      création d'un UL        */
var maListe = document.createElement('ul');
/*      Ajout du UL dans ma page        */
body.appendChild(maListe);

/*      Je crée une fonction me permettant de créer un li qui prends en paramètre l'informaation        */ 
function newLi(data) {
    var tmp = document.createElement('li');
/*      Je crée une div dans mon li     */
    var div=document.createElement('div');

    tmp.appendChild(div);

/*      Je parcour les différentes  propriétés de mon objet data grâce à la boucle for...in     */
    for(const elt in data) {
        var tmp2 = document.createElement('span');
        tmp2.innerText=elt+': '+data[elt];
        var br = document.createElement('br');
        div.appendChild(tmp2);      //ATTENTTION A L BONNE ECRITURE
        div.appendChild(br);
    }

/*      J'ajoute mon LI dans ma miste       */
    maListe.appendChild(tmp);
}