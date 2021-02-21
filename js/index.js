/*Fonction affichage de produit........*/
function afficheTeddies(produits) {

    let i = 0;
    while (i < produits.length) {

        //récuperation des données serveur via la requete
        nameT = produits[i].name;
        img = produits[i].imageUrl;
        description = produits[i].description;
        price = Math.floor(produits[i].price / 100);
        id = produits[i]._id;

        //variable qui prends la valeur des données
        let newName = document.createTextNode(nameT);
        let newDesc = document.createTextNode(description);
        let newPrice = document.createTextNode(price);

        //déclaration de variable avec des éléments conteneur
        const colDiv = document.createElement("div");
        const divCard = document.createElement("div");
        const cardImg = document.createElement("img");
        const divCardBody = document.createElement("div");
        const h5CardTitle = document.createElement("h5");
        const paraCardDesc = document.createElement("p");
        const paraCardPrice = document.createElement("p");
        const spanName = document.createElement("span");
        const spanDesc = document.createElement("span");
        const spanPrice = document.createElement("span");
        const buttonCard = document.createElement("a");


        // Création de class des conteneurs
        let colClass = colDiv.classList.add("col-12", "col-lg-6", "mt-5", "d-flex");
        divCard.classList.add("card", "border", "border-info");
        cardImg.classList.add("card-img-top", "border-bottom");
        divCardBody.classList.add("card-body");
        h5CardTitle.classList.add("card-title", "font-weight-bold");
        paraCardDesc.classList.add("card-text");
        paraCardPrice.classList.add("card-text", "font-weight-bold");
        buttonCard.classList.add("btn", "btn-primary", "col-5", "col-lg-3");

        let suPrice = document.createTextNode("Prix : ");
        let money = document.createTextNode(" " + " €");

        //Construction des éléments du DOM
        let box = document.getElementById("super");

        box.appendChild(colDiv);
        box.insertBefore(colDiv, colClass);

        colDiv.appendChild(divCard);
        divCard.appendChild(cardImg);

        divCard.appendChild(divCardBody);

        divCardBody.appendChild(h5CardTitle);
        h5CardTitle.appendChild(spanName)
        spanName.appendChild(newName)

        divCardBody.appendChild(paraCardDesc);
        paraCardDesc.appendChild(spanDesc);
        spanDesc.appendChild(newDesc);

        divCardBody.appendChild(paraCardPrice);

        paraCardPrice.appendChild(suPrice);
        paraCardPrice.appendChild(spanPrice);
        spanPrice.appendChild(newPrice);
        spanPrice.appendChild(money);


        divCardBody.appendChild(buttonCard);

        let buttonText = document.createTextNode("Choisir");
        buttonCard.appendChild(buttonText);

        buttonCard.setAttribute("id", "button");

        cardImg.setAttribute("src", img);
        buttonCard.setAttribute("href", "produit.html?id=" + id);

        spanName.setAttribute("id", "nameTeddy");
        spanDesc.setAttribute("id", "descTeddy");
        spanDesc.setAttribute("id", "priceTeddy");

        i++;
    }
};
// requete GET -----------------------------------------------------------------

get("http://localhost:3000/api/teddies/").then(resolve => {

    let productTeddies = JSON.parse(resolve);
    afficheTeddies(productTeddies);
}).catch(catchError);