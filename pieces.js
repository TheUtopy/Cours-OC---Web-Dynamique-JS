// Récupération des pièces depuis pieces-auto.json
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

// Affichage des != pièces
function genererPieces(pieces) {
    const sectionFiches = document.querySelector(".fiches")
    for (let i in pieces) {
        const article = pieces[i];
        const pieceElement = document.createElement("article");
        
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix : ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

        sectionFiches.appendChild(pieceElement);
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
    };
};

document.querySelector(".fiches").innerHTML = ""
genererPieces(pieces);

//Trier les pièces par prix
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", () => {
    const piecesOrdonnes =  Array.from(pieces);
    piecesOrdonnes.sort((a, b) => {
        return a.prix - b.prix;
    });
    console.log(piecesOrdonnes);
    // Effacement de l'écran et régénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnes);
});

const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant");
boutonTrierDecroissant.addEventListener("click", () => {
    const piecesOrdonnes =  Array.from(pieces);
    piecesOrdonnes.sort((a, b) => {
        return b.prix - a.prix;
    });
    // Effacement de l'écran et régénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnes);
});

// Filtrer les pièces 

//    input range
let maxPriceRange = document.querySelector('.price-range');
let maxPrice = document.querySelector('.price-range').value;
document.querySelector('.max-price-value').innerText = maxPrice
maxPriceRange.addEventListener("input", () => {
    let price = parseInt(maxPriceRange.value);
    maxPrice = price;
    document.querySelector('.max-price-value').innerText = maxPrice
});

//    bouton filtrer prix max
const boutonFilter = document.querySelector(".btn-filtrer");
boutonFilter.addEventListener("click", () => {
    const piecesFiltrees = pieces.filter((piece) => {
        return piece.prix <= maxPrice
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});


//    buton filtrer desccription
const boutonFilterByDescription = document.querySelector(".btn-filter-by-description");
boutonFilterByDescription.addEventListener("click", () => {
    const piecesFiltrees = pieces.filter((piece) => {
        return piece.description ? true : false
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

// Récupérer les noms des pièces dans une liste

let nomsEtPrix = pieces.map(piece => [piece.nom, piece.prix]);

// Filtre les pièces trop chères
for (let i = pieces.length -1 ; i >= 0; i--){
    if (pieces[i].prix > 35) {
        nomsEtPrix.splice(i, 1);
    };
};

const abordablesElements = document.createElement('ul');

for (let i of nomsEtPrix) {
    const nomElement = document.createElement('li');
    nomElement.innerText = `${i[0]} - ${i[1]} €`;
    abordablesElements.appendChild(nomElement);
};

document.querySelector('.abordables').appendChild(abordablesElements)

// // Filtre les pièces non disponibles

nomsEtPrix = pieces.map(piece => [piece.nom, piece.prix]);

for (let i = pieces.length - 1 ; i  >= 0 ; i--) {
    if (! pieces[i].disponibilite) {
        nomsEtPrix.splice(i, 1);
    };
};

const availableElements = document.createElement("ul");

for (let i of nomsEtPrix) {
    const nomElement = document.createElement('li');
    nomElement.innerText = `${i[0]} - ${i[1]} €`;
    availableElements.appendChild(nomElement);
}

document.querySelector('.disponible').appendChild(availableElements)

document.querySelector(".fiches").innerHTML = "";