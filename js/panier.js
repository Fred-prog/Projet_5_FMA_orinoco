// Fonction affichage le panier est vide -------------------------------------------

function PanierVide() {
    let divAlertPanier = document.createElement('div');
    let para = document.createElement('p');
    let panierVide = document.createTextNode("Le panier est actuellement vide !");

    divAlertPanier.classList.add("jumbotron", "col", "my-5", "alert", "alert-info", "text-center")
    para.classList.add("display-4")

    let box = document.getElementById("bloc_A");
    box.appendChild(divAlertPanier);
    divAlertPanier.appendChild(para);
    para.appendChild(panierVide)
}
// -----------------------------------------------------------------------------
// Fonction supprime Item ------------------------------------------------------
function removeItems() {
    if (document.querySelector("#stop")) {
        document.getElementById("stop").remove();
        let array = JSON.parse(localStorage["basket"]);
        array.forEach(function (item, index, arrayLine) {
            if (item.quantity < 1) {
                arrayLine.splice(index, 1);
            }
        })
        localStorage.setItem("basket", JSON.stringify(array));
    }
}

function clearItems() {
    let array = JSON.parse(localStorage["basket"]);
    console.log(array);
    console.log(array.length);
    if (array.length == "0") {
        localStorage.clear();
        PanierVide();
        let blocB = document.getElementById('bloc_B');
        blocB.classList.add("invisible");
    }
}

// Fonction Bouton retirer produit ---------------------------------------
function removeProduct() {
    let boutonsMoins = document.querySelectorAll('#moins');
    boutonsMoins.forEach(boutonRemove => {
        let productId = boutonRemove.getAttribute('data-product');
        let products = JSON.parse(localStorage.getItem("basket"));
        boutonRemove.addEventListener('click', function () {
            products.forEach(itemProduct => {
                if (productId == itemProduct.id) {
                    console.log(productId);
                    itemProduct.quantity--;
                }
                localStorage.setItem("basket", JSON.stringify(products));
                document.location.reload();
            });

        })
    });
}

// Fonction Bouton ajouter produit----------------------------------------

function addProduct() {
    let boutonsPlus = document.querySelectorAll('#plus');
    boutonsPlus.forEach(boutonAdd => {
        let productId = boutonAdd.getAttribute('data-product');
        let products = JSON.parse(localStorage.getItem("basket"));
        boutonAdd.addEventListener('click', function () {
            products.forEach(itemProduct => {
                if (productId == itemProduct.id) {
                    console.log(productId);
                    itemProduct.quantity++;
                    if (itemProduct.quantity == 0) {
                        console.log('STOP');
                    }
                }
                localStorage.setItem("basket", JSON.stringify(products));
                document.location.reload();
            });

        })
    });
}
//----------------------------------------------------------

function afficheItems(reponse, tab) {
    let j = 0;
    while (j < reponse.length) {

        tab.forEach(item => {
            if (item.id == reponse[j]._id) {

                nameT = reponse[j].name;
                imgT = reponse[j].imageUrl;
                descriptionT = reponse[j].description;
                priceT = Math.floor(reponse[j].price / 100);
                quantityT = item.quantity;
                idt = reponse[j]._id;

                let bName = document.createTextNode(nameT);
                let bImage = imgT;
                let bDesc = document.createTextNode(descriptionT);
                let bPrice = document.createTextNode(priceT);
                let bQuantity = document.createTextNode(quantityT);

                let divRow = document.createElement('div');
                divRow.classList.add("row");

                let divBox = document.createElement('div');
                divBox.classList.add("col", "mt-3");
                divBox.setAttribute("id", "test");
                divBox.setAttribute("product-id", item.id);

                // CARTE PRODUIT 
                let divCard = document.createElement('div');
                divCard.classList.add("card", "border-info");

                let divCardRow = document.createElement('div');
                divCardRow.classList.add("row", "no-gutters")

                let divImg = document.createElement('div');
                divImg.classList.add("col-12", "col-md-4");
                
                let divCardImg = document.createElement('img');
                divCardImg.classList.add("img-fluid", "img-thumbnail", "mx-md-2", "my-md-2");
                
                let divColBody= document.createElement('div');
                divColBody.classList.add("col-md-5");

                let divCardBody = document.createElement('div');
                divCardBody.classList.add("card-body");

                let h4CardTitle = document.createElement('h4');
                h4CardTitle.classList.add("card-title");

                let paraCardDesc = document.createElement('p');
                paraCardDesc.classList.add("card-text");

                let paraCardPrice = document.createElement("p");
                paraCardPrice.classList.add("price", "font-weight-bold");
                let money = document.createTextNode(" " + " €");

                let divQt = document.createElement('div');
                divQt.classList.add("prix-horizontal", "w-25");

                let retirer = document.createTextNode("Retirer");
                let ajouter = document.createTextNode("Ajouter");


                let divButtons = document.createElement('div');
                divButtons.classList.add("col-md-12", "col-lg-3", "input-group-btn", "d-flex", "justify-content-center", "align-self-center", "mb-2");

                let sousDivButton = document.createElement('div');

                let buttonMin = document.createElement('button');
                buttonMin.setAttribute("id", "moins");
                buttonMin.classList.add("btn", "btn-default", "btn-number", "text-primary");
                buttonMin.setAttribute("type", "button");
                buttonMin.setAttribute("data-type", "minus");
                buttonMin.setAttribute("data-field", "quant[1]");
                buttonMin.setAttribute("data-product", item.id);


                let spanInput = document.createElement('span');
                spanInput.classList.add("p-4", "text-center", "text-danger");

                let buttonMax = document.createElement('button');
                buttonMax.classList.add("btn", "btn-default", "btn-number", "text-primary");
                buttonMax.setAttribute("id", "plus");
                buttonMax.classList.add("border")
                buttonMax.setAttribute("type", "button");
                buttonMax.setAttribute("data-field", "quant[1]");
                buttonMax.setAttribute("data-product", item.id);


                let box = document.getElementById("bloc_A");

                box.appendChild(divRow);
                divRow.appendChild(divBox);
                divBox.appendChild(divCard);
                divCard.appendChild(divCardRow);
                divCardRow.appendChild(divImg);
                divImg.appendChild(divCardImg);

                divCardImg.setAttribute("src", bImage);

                divCardRow.appendChild(divColBody); 
                divColBody.appendChild(divCardBody);
                divCardBody.appendChild(h4CardTitle);
                h4CardTitle.appendChild(bName);

                divCardBody.appendChild(paraCardDesc);
                paraCardDesc.appendChild(bDesc);

                divCardBody.appendChild(paraCardPrice);
                paraCardPrice.appendChild(bPrice);
                bPrice.after(money);

                divCardRow.appendChild(divButtons);
                divButtons.appendChild(sousDivButton);
                sousDivButton.appendChild(buttonMin);
                buttonMin.classList.add("border")
                buttonMin.appendChild(retirer);

                divButtons.appendChild(sousDivButton);
                sousDivButton.appendChild(spanInput);
                spanInput.appendChild(bQuantity);

                divButtons.appendChild(sousDivButton);
                sousDivButton.appendChild(buttonMax)
                buttonMax.appendChild(ajouter);

                if (item.quantity < 1) {
                    divRow.setAttribute("id", "stop");
                }
                removeItems();
                
            }
        });
        j++;
    }
}


//----------------------------------------------------------

if (localStorage.length == "0") {
    PanierVide();
    let blocB = document.getElementById('bloc_B');
    blocB.classList.add("invisible");

    console.log('Votre panier est vide ! ');
} else {

    let blocB = document.getElementById('bloc_B');
    blocB.classList.add("visible");

    get("http://localhost:3000/api/teddies/").then(resolve => {
        let arrayTeddies = JSON.parse(resolve);
        let array = JSON.parse(localStorage["basket"]);

        afficheItems(arrayTeddies, array);
        removeProduct();
        addProduct();
    }).catch(catchError);

    get("http://localhost:3000/api/teddies/").then(resolve => {
        let arrayTeddies = JSON.parse(resolve);
        let fact = JSON.parse(localStorage["basket"]);
        afficheFacture(arrayTeddies, fact);
     }).catch(catchError);

    
    console.log('Il y a une nouvelle entrée ! ');
};


function creaProduct() {
    let products = [];
                let arrayId = JSON.parse(localStorage["basket"]);
                arrayId.forEach(elementId => {
                    products.push(elementId.id);
                    console.log(products);
                });
}


// fin Item Produit -----------------------------------------------------------
function afficheFacture(reponse, storage) {
    let total = 0;
    let k = 0;
    while (k < reponse.length) {

        storage.forEach(itemFac => {
            if (reponse[k]._id == itemFac.id) {
                priceTeddy = Math.floor(reponse[k].price / 100);
                nameTeddy = reponse[k].name;
                let idFac = itemFac.id;
                let QtFac = itemFac.quantity;

                let prixTt = priceTeddy * QtFac;
                total = total + prixTt;

                let bodyTable = document.getElementById('tbody');

                let trBody = document.createElement('tr');
                let thBodyQtt = document.createElement('th');
                let tdBodyDesc = document.createElement('td');
                let tdBodyPu = document.createElement('td');
                let tdBodyPtt = document.createElement('td');

                let idF = document.createTextNode(idFac);
                let qtF = document.createTextNode(QtFac);
                let PxU = document.createTextNode(priceTeddy);
                let Pxtt = document.createTextNode(prixTt);

                bodyTable.appendChild(trBody);
                trBody.appendChild(thBodyQtt);
                thBodyQtt.appendChild(qtF);
                trBody.appendChild(tdBodyDesc);
                tdBodyDesc.appendChild(idF);
                trBody.appendChild(tdBodyPu);
                tdBodyPu.appendChild(PxU);
                trBody.appendChild(tdBodyPtt);
                tdBodyPtt.appendChild(Pxtt);

                if (itemFac.quantity < 1) {
                    trBody.setAttribute("id", "stopFac");
                    document.getElementById("stopFac").remove();
                }
            }
        });
        k++;
    }
    //Affichage du total dans le Tableau facture
    let test = "oui c'est bon"

    let montant = document.getElementById('celluleMontant');
    let totalAffiche = document.createTextNode(total);
    montant.appendChild(totalAffiche);

    document.getElementById("firstName").addEventListener("input", testFirstname);
    document.getElementById("lastName").addEventListener("input", testLastname);
    document.getElementById("addressUser").addEventListener("input", testAddress);
    document.getElementById("cityUser").addEventListener("input", testCity);
    document.getElementById("emailUser").addEventListener("input", testEmail);
    //Bouton valider -----------------------------------------------------------------------------

    document.getElementById("bouton_valide").addEventListener('click', function (e) {

        //document.getElementById("firstName").addEventListener("input", test);
        let verifFirstname = testFirstname();
        let verifLastname = testLastname();
        let verifAddress = testAddress();
        let verifCity = testCity();
        let verifEmail = testEmail();

        if (verifFirstname && verifLastname && verifAddress && verifCity && verifEmail == true) {
            console.log("OK");
            let contact = new Object();
            contact.firstName = firstName.value;
            contact.lastName = lastName.value;
            contact.address = addressUser.value;
            contact.city = cityUser.value;
            contact.email = emailUser.value;

            let products = [];
            let arrayId = JSON.parse(localStorage["basket"]);
            arrayId.forEach(elementId => {
                products.push(elementId.id);
            });

            let body = new Object();
            body.contact = contact;
            body.products = products;

            console.log(body);

            post1("http://localhost:3000/api/teddies/order", body).then(resolve => {
                let testrequest = JSON.parse(resolve);
                console.log(testrequest);
                let orderId = testrequest.orderId
                document.location = "commande.html?id= " + orderId + "&total=" + total;
            });
            localStorage.clear();
        } else {
            console.log("Non OK");
            e.preventDefault();
        }
    })
    clearItems();
}
// Début bloc FACTURE ---------------------------------------------------------

// fin de la fonction ---------------------------------------------------------------

function testFirstname() {
    let prenom = document.querySelector('#firstName');
    let prenomValidation = /^[a-zA-Zéèîï][a-zéèàçîïôö]+([-'\s][a-zA-Zéèîï][a-zéèàçîïôö]{2,20})?/;
    if (prenomValidation.test(prenom.value) == false) {
        let erreur = document.getElementById('erreurFN');
        erreur.classList.replace("erreur_invisible", "erreur_visible");
        return false;
    } else {
        console.log(prenom.value);
        let erreur = document.getElementById('erreurFN');
        erreur.classList.replace("erreur_visible", "erreur_invisible");
        return true;
    }
}


function testLastname() {

    let nom = document.querySelector('#lastName');
    let nomValidation = /[A-Z]+([-'\s][A-Z]{2,20})?/;
    if (nomValidation.test(nom.value) == false) {
        let erreur = document.getElementById('erreurLN');
        erreur.classList.replace("erreur_invisible", "erreur_visible");
        return false;
    } else {
        console.log(nom.value);
        let erreur = document.getElementById('erreurLN');
        erreur.classList.replace("erreur_visible", "erreur_invisible");
        return true;
    }
}

function testAddress() {

    let adresse = document.querySelector('#addressUser');
    let adresseValidation = /[a-zA-Z0-9][-'\s][a-zA-Zéèîïôöûüç]+([-'\s][a-zA-Zéèîï][a-zéèàçîïôö]{5,20})?/;
    if (adresseValidation.test(adresse.value) == false) {
        let erreur = document.getElementById('erreurAddress');
        erreur.classList.replace("erreur_invisible", "erreur_visible");
        return false;
    } else {
        console.log(adresse.value);
        let erreur = document.getElementById('erreurAddress');
        erreur.classList.replace("erreur_visible", "erreur_invisible");
        return true;
    }
}


function testCity() {

    let ville = document.querySelector('#cityUser');
    let villeValidation = /[A-Z]+([-'\s][A-Z]{2,15})?/;
    if (villeValidation.test(ville.value) == false) {
        let erreur = document.getElementById('erreurVille');
        erreur.classList.replace("erreur_invisible", "erreur_visible");
        return false;
    } else {
        console.log(ville.value);
        let erreur = document.getElementById('erreurVille');
        erreur.classList.replace("erreur_visible", "erreur_invisible");
        return true;
    }
}


function testEmail() {

    let email = document.querySelector('#emailUser');
    let emailValidation = /[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-zA-Z]{2,10}/;
    if (emailValidation.test(email.value) == false) {
        let erreur = document.getElementById('erreuremail');
        erreur.classList.replace("erreur_invisible", "erreur_visible");
        return false;
    } else {
        console.log(email.value);
        let erreur = document.getElementById('erreuremail');
        erreur.classList.replace("erreur_visible", "erreur_invisible");
        return true;
    }
}