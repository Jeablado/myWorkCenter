// Récupération des pièces depuis le fichier JSON
const agenda = await fetch("http://localhost:8081/agenda").then(agenda => agenda.json());

// Initialisation des variables de filtre
let highChecked = true
let normalChecked = true
let lowChecked = true
let priveChecked = true
let adminChecked = true
let medicalChecked = true

//------------------Section section_rdv---------------------//


// Fonction définissant le back-ground des cases rendez-vous
function backgroundColor(liste, occurence, objet_rdv){
    if (liste[occurence].importance === "High"){objet_rdv.style.backgroundColor="rgba(255, 50, 50, 0.6)"}
    if (liste[occurence].importance === "Normal"){objet_rdv.style.backgroundColor="rgba(255, 255, 255, 0.5"}
    if (liste[occurence].importance === "Low"){objet_rdv.style.backgroundColor="rgba(0, 0, 255, 0.3)"}
    }

// Fonction générant et affichant les objet rdv dans la div .prochains_rdv
function afficherRdv(rdv){
    document.querySelector(".prochains_rdv").innerHTML = "";
// Boucle for parcourant tous mes objets contenu dans le file json
    for(let i = 0; i < rdv.length; i++){
        // Récupération de la section class=prochains_rdv
        const prochains_rdv = document.querySelector(".prochains_rdv");
        // Création d'une balise article pour contenir tous les renseignement de l'objet courrant
        const rendez_vous = document.createElement("article")
        // Création des différentes sections qui composeront la balise article avec affectation
        // des variables provenant du fichier json
        const nomElement = document.createElement("h2");
        nomElement.innerText = rdv[i].sujet;
        const dateHeureElement = document.createElement("p");
        dateHeureElement.innerText = `Le ${rdv[i].date} à ${rdv[i].heure ?? "(n/a)"}`;
        const detailElement = document.createElement("p");
        detailElement.innerText = `Detail: ${rdv[i].detail ??  "(n/a)"}`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = `Catégorie: ${rdv[i].categorie ?? "(n/a)"}`;

        // Si la checkbox pour le tri de l'importance est cochée
        if (filtreAffichageImportance(rdv[i].importance) && filtreAffichageCategorie(rdv[i].categorie)){
            // Append child ma balise article dans ma balise de class=prochains_rdv
            prochains_rdv.appendChild(rendez_vous);
            // Append child les détails de mon objet dans ma balise article
            rendez_vous.appendChild(nomElement);
            rendez_vous.appendChild(dateHeureElement);
            rendez_vous.appendChild(detailElement);
            rendez_vous.appendChild(categorieElement);
            backgroundColor(rdv, i, rendez_vous)    
        }
    }
}

// Fonction premier affichage
function premierAffichage(){
    agenda.sort(function(a,b) {
        return a.dateSort - b.dateSort;
    });
    document.querySelector(".prochains_rdv").innerHTML = "";
    afficherRdv(agenda);
}

// Premier appel à la fonction afficher rdv
premierAffichage();



//------------------Section filtre et tri---------------------//
// Tri par date + récente
const lienDateProchain = document.getElementById("proche");
lienDateProchain.addEventListener("click", function (event){
    event.preventDefault();
    agenda.sort(function(a,b) {
        return a.dateSort - b.dateSort;
    });
    afficherRdv(agenda);
});
const lienDateLointain = document.getElementById("lointain");
lienDateLointain.addEventListener("click", function (event){
    event.preventDefault();
    agenda.sort(function(a,b) {
        return b.dateSort - a.dateSort;
    });
    afficherRdv(agenda);
});


// Filtre par importance
function filtreAffichageImportance(variable) {
    if ((variable === "High" && highChecked === true) ||
        (variable === "Normal" && normalChecked === true) ||
        (variable === "Low" && lowChecked === true)) {
        // If the importance matches and the checkbox is checked, display the element
        return true;}
    else {return false}
    }
const highCheckbox = document.getElementById("high");
const normalCheckbox = document.getElementById("normal");
const lowCheckbox = document.getElementById("low");
highCheckbox.addEventListener('change', function() {
    if (this.checked){
        highChecked = true
    }
    else{
        highChecked = false
    };
    afficherRdv(agenda);
});
normalCheckbox.addEventListener('change', function() {
    if (this.checked){
        normalChecked = true
    }
    else{
        normalChecked = false
    };
    afficherRdv(agenda);
});
lowCheckbox.addEventListener('change', function() {
    if (this.checked){
        lowChecked = true
    }
    else{
        lowChecked = false
    }
    afficherRdv(agenda);
});


// Filtre par type catégorie
function filtreAffichageCategorie(variable) {
    if ((variable === "Privé" && priveChecked === true) ||
        (variable === "Administratif" && adminChecked === true) ||
        (variable === "Médical" && medicalChecked === true)) {
        // If the importance matches and the checkbox is checked, display the element
        return true;}
    else {return false}
    }
const priveCheckbox = document.getElementById("prive");
const adminCheckbox = document.getElementById("admin");
const medicalCheckbox = document.getElementById("medical");
priveCheckbox.addEventListener('change', function() {
    if (this.checked){
        priveChecked = true
    }
    else{
        priveChecked = false
    };
    afficherRdv(agenda);
});
adminCheckbox.addEventListener('change', function() {
    if (this.checked){
        adminChecked = true
    }
    else{
        adminChecked = false
    };
    afficherRdv(agenda);
});
medicalCheckbox.addEventListener('change', function() {
    if (this.checked){
        medicalChecked = true
    }
    else{
        medicalChecked = false
    }
    afficherRdv(agenda);
});