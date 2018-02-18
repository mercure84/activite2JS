/* 
Activité 1
*/

// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)
var listeLiens = [
    {
        titre: "So Foot",
        url: "http://sofoot.com",
        auteur: "yann.usaille"
    },
    {
        titre: "Guide d'autodéfense numérique",
        url: "http://guide.boum.org",
        auteur: "paulochon"
    },
    {
        titre: "L'encyclopédie en ligne Wikipedia",
        url: "http://Wikipedia.org",
        auteur: "annie.zette"
    }
];

// Crée et renvoie un élément DOM affichant les données d'un lien
// Le paramètre lien est un objet JS représentant un lien
function creerElementLien(lien) {
    var titreLien = document.createElement("a");
    titreLien.href = lien.url;
    titreLien.style.color = "#428bca";
    titreLien.style.textDecoration = "none";
    titreLien.style.marginRight = "5px";
    titreLien.appendChild(document.createTextNode(lien.titre));

    var urlLien = document.createElement("span");
    urlLien.appendChild(document.createTextNode(lien.url));

    // Cette ligne contient le titre et l'URL du lien
    var ligneTitre = document.createElement("h4");
    ligneTitre.style.margin = "0px";
    ligneTitre.appendChild(titreLien);
    ligneTitre.appendChild(urlLien);

    // Cette ligne contient l'auteur
    var ligneDetails = document.createElement("span");
    ligneDetails.appendChild(document.createTextNode("Ajouté par " + lien.auteur));

    var divLien = document.createElement("div");
    divLien.classList.add("lien");
    divLien.appendChild(ligneTitre);
    divLien.appendChild(ligneDetails);

    return divLien;
}

var contenu = document.getElementById("contenu");





// Parcours de la liste des liens et ajout d'un élément au DOM pour chaque lien
listeLiens.forEach(function (lien) {
    var elementLien = creerElementLien(lien);
    contenu.appendChild(elementLien);
});


//création d'un div dont l'id est "haut" pour pouvoir manipuler la zone au dessus des liens :)

var hautElt = document.createElement("div");
hautElt.id = "haut";
document.getElementsByTagName("body")[0].insertBefore(hautElt, contenu);

// création  du bouton "Ajouter un lien"

var boutonAjoutLienElt = document.createElement("button");
boutonAjoutLienElt.id = "boutonAjoutLien";
boutonAjoutLienElt.textContent = "Ajouter un lien";

hautElt.appendChild(boutonAjoutLienElt);
hautElt.appendChild(document.createElement("p"));

// création du formulaire comprenant 3 zone de texte à remplir (Auteur, titre, lien) + bouton ajouter (submit)

var formulaire = [{

        name: "auteur",
        texte: "Entrez votre nom",
        type: "input",
        taille: "150px"

},
    {
        name: "titre",
        texte: "Entrez le titre du lien",
        type: "input",
        taille: "200px"
                 },
    {
        name: "lien",
        texte: "Entrez l'URL du lien",
        type: "input",
        taille: "300px"
    }]


var blocFormulaire = document.createElement("form");
blocFormulaire.id = "blocFormulaire";



formulaire.forEach(function (zone) {
    var elementFormulaire = document.createElement(zone.type);
    elementFormulaire.name = zone.name;
    elementFormulaire.id = zone.name;
    elementFormulaire.placeholder = zone.texte;
    elementFormulaire.style.width = zone.taille;
    elementFormulaire.style.marginRight = "10px";
    blocFormulaire.appendChild(elementFormulaire);

})



var submitAjouter = document.createElement("input");
submitAjouter.type = "submit";
submitAjouter.value = "Ajouter";
blocFormulaire.appendChild(submitAjouter);
blocFormulaire.appendChild(document.createElement("p"));

// ajout d'un div aide formulaire pour y afficher les éventuelles erreures de saisies
    var aideFormulaire = document.createElement("div");
    blocFormulaire.appendChild(aideFormulaire);


// code de l'action du bouton id = boutonAjoutLien : on supprime le bouton et on le remplace par notre blocformulaire
boutonAjoutLienElt.addEventListener("click", function () {

    hautElt.replaceChild(blocFormulaire, boutonAjoutLienElt);


})

//code du bouton "submit" de notre formulaire

blocFormulaire.addEventListener("submit", function (e) {

    //on récupère les valeurs du formulaire
    var nouveauAuteur = blocFormulaire.elements.auteur.value;
    var nouveauUrl = blocFormulaire.elements.lien.value;
    var nouveauTitre = blocFormulaire.elements.titre.value;
    var nouveauLien = {
        titre: nouveauTitre,
        url: nouveauUrl,
        auteur: nouveauAuteur,

    };

    //on teste si les valeurs sont remplies
    if (nouveauAuteur == "" || nouveauUrl == "" || nouveauTitre == "") {

        aideFormulaire.textContent = "Un champs est vide";



    } else {

        var elementLien = creerElementLien(nouveauLien);
        contenu.insertBefore(elementLien, document.getElementsByClassName("lien")[0]);

        // vidange des valeurs du formulaire
        blocFormulaire.elements.auteur.value ="";
        blocFormulaire.elements.lien.value ="";
        blocFormulaire.elements.titre.value ="";
        
        
        
        var blocBleu = document.createElement("p")
        blocBleu.id = "blocBleu";
        blocBleu.textContent = "Le lien " + nouveauTitre + " a bien été ajouté !";
        blocBleu.style.backgroundColor= "LightBlue";
        blocBleu.style.color = "#428bca";
        

        hautElt.replaceChild(blocBleu, blocFormulaire);
        setTimeout(function () {
            hautElt.replaceChild(boutonAjoutLienElt, blocBleu);

        }, 2000)






    }


    e.preventDefault();
});
