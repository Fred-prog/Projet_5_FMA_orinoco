/*for (let i = 0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    console.log(key, localStorage.getItem(key));}

localStorage.clear();*/

/* 
Function GET REQUEST 
*/
let get = function (url, success) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            success(request.responseText);
        }
    }
    request.open('GET', url, true);
    request.send();
}


let getposts = function () {
    get("http://localhost:3000/api/teddies/", function (response) {

    });
}



let post = function (url, jsonBody) {
    let request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(jsonBody));
}

//post("url", contact);


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

function removeItems() {
    if (document.querySelector("#stop")) {
        document.getElementById("stop").remove();

        array.forEach(function (item, index, array) {
            if (item.quantity < 1) {
                array.splice(index, 1);
            }
        });
        localStorage.setItem("basket", JSON.stringify(array));
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


if (localStorage.length == "0") {
    PanierVide();
    let blocB = document.getElementById('bloc_B');
    blocB.classList.add("invisible");

    console.log('Votre panier est vide ! ');
} else {

    let blocB = document.getElementById('bloc_B');
    blocB.classList.add("visible");

    get("http://localhost:3000/api/teddies/", function (response) {
        let arrayTeddies = JSON.parse(response);
        let array = JSON.parse(localStorage["basket"]);
        console.log(array);

        let j = 0;
        while (j < arrayTeddies.length) {

            array.forEach(item => {
                if (item.id == arrayTeddies[j]._id) {

                    nameT = arrayTeddies[j].name;
                    imgT = arrayTeddies[j].imageUrl;
                    descriptionT = arrayTeddies[j].description;
                    priceT = Math.floor(arrayTeddies[j].price / 100);
                    quantityT = item.quantity;
                    idt = arrayTeddies[j]._id;

                    let bName = document.createTextNode(nameT);
                    let bImage = imgT;
                    let bDesc = document.createTextNode(descriptionT);
                    let bPrice = document.createTextNode(priceT);
                    let bQuantity = document.createTextNode(quantityT);

                    let divLine = document.createElement('div');

                    let divBox = document.createElement('div');
                    let divButtons = document.createElement('div');


                    let sousDivButton = document.createElement('div');
                    let buttonMin = document.createElement('button');

                    let spanInput = document.createElement('span');

                    let buttonMax = document.createElement('button');


                    // CARTE PRODUIT 
                    let divCard = document.createElement('div');
                    let divCardH = document.createElement('div');
                    let divImg = document.createElement('div');
                    let divCardImg = document.createElement('img');
                    let divCardBody = document.createElement('div');
                    let h4CardTitle = document.createElement('h4');
                    let paraCardDesc = document.createElement('p');
                    let paraCardPrice = document.createElement("p");
                    let divQt = document.createElement('div');
                    let paraCardQt = document.createElement('p');
                    let retirer = document.createTextNode("Retirer");
                    let ajouter = document.createTextNode("Ajouter");

                    divLine.classList.add("row");
                    divBox.classList.add("col", "mt-3");
                    divBox.setAttribute("id", "test");
                    divBox.setAttribute("product-id", item.id) //item.id);
                    //divBox2.classList.add("col-2", "mt-3", "card");
                    //buttonBox2.classList.add("btn", "btn-primary", "mt-3")
                    divCard.classList.add("card");
                    divCardH.classList.add("card-horizontal");
                    divImg.classList.add("image", "w-25");
                    divCardImg.classList.add("img-thumbnail")
                    divCardBody.classList.add("card-body", "w-25");
                    h4CardTitle.classList.add("card-title");
                    paraCardDesc.classList.add("card-text");
                    divQt.classList.add("prix-horizontal", "w-25");
                    paraCardPrice.classList.add("price");

                    divButtons.classList.add("input-group-btn", "w-25", "d-flex", "justify-content-center", "align-self-center");
                    buttonMin.classList.add("btn", "btn-default", "btn-number", "text-primary");
                    buttonMin.setAttribute("id", "moins");

                    buttonMax.classList.add("btn", "btn-default", "btn-number", "text-primary");
                    buttonMax.setAttribute("id", "plus");

                    spanInput.classList.add("p-4", "text-center", "text-danger")


                    let box = document.getElementById("bloc_A");

                    box.appendChild(divLine);
                    divLine.appendChild(divBox);
                    divBox.appendChild(divCard);
                    divCard.appendChild(divCardH);
                    divCardH.appendChild(divImg);
                    divImg.appendChild(divCardImg);

                    divCardImg.setAttribute("src", bImage);


                    divCardH.appendChild(divCardBody);
                    divCardBody.appendChild(h4CardTitle);
                    h4CardTitle.appendChild(bName);

                    divCardBody.appendChild(paraCardDesc);
                    paraCardDesc.appendChild(bDesc);

                    divCardBody.appendChild(paraCardPrice);
                    paraCardPrice.appendChild(bPrice);

                    divCardH.appendChild(divButtons);
                    divButtons.appendChild(sousDivButton);
                    sousDivButton.appendChild(buttonMin);
                    buttonMin.classList.add("border")

                    buttonMin.setAttribute("type", "button");
                    buttonMin.setAttribute("data-type", "minus");
                    buttonMin.setAttribute("data-field", "quant[1]");
                    buttonMin.setAttribute("data-product", item.id);
                    buttonMin.appendChild(retirer);

                    divButtons.appendChild(sousDivButton);
                    sousDivButton.appendChild(spanInput);
                    spanInput.appendChild(bQuantity);

                    divButtons.appendChild(sousDivButton);
                    sousDivButton.appendChild(buttonMax)

                    buttonMax.classList.add("border")
                    buttonMax.setAttribute("type", "button");
                    //buttonMin.setAttribute("data-type", "min");
                    buttonMax.setAttribute("data-field", "quant[1]");
                    buttonMax.setAttribute("data-product", item.id);
                    buttonMax.appendChild(ajouter);

                    if (item.quantity < 1) {
                        divLine.setAttribute("id", "stop");
                    }
                    removeItems();
                }
            })
            j++;
        }
        removeProduct();
        addProduct();
    });




    //formulaire création des Elements------------------------------------

    // let divLine2 = document.createElement('div');
    // let divBoxForm = document.createElement('div');
    // let divButtonForm = document.createElement('div');
    // let divForm = document.createElement('div');

    createInput();

    


    // divLine2.setAttribute("id", "blocForm");
    // divLine2.classList.add("container");
    // divBoxForm.classList.add("row", "mt-5");
    // divButtonForm.setAttribute("id", "valideBox");
    // divButtonForm.classList.add("row");
    // divForm.classList.add("col-6", "border");

    


    // let bloc = document.getElementById("bloc");
    // let divfacture = document.createElement('div');

    // bloc.after(divLine2);
    // divLine2.appendChild(divBoxForm);
    // divLine2.appendChild(divButtonForm);
    // divBoxForm.appendChild(divForm);
    // divBoxForm.appendChild(divfacture);
    // divForm.appendChild(formulaire);

    // formulaire.appendChild(formGroupFName);
    // formGroupFName.appendChild(labelFName);
    // labelFName.appendChild(firstName);
    // formGroupFName.appendChild(blocFName);
    // blocFName.appendChild(inputFName);


    // formulaire.appendChild(formGroupLName);
    // formGroupLName.appendChild(labelLName);
    // labelLName.appendChild(lastName);
    // formGroupLName.appendChild(blocLName)
    // blocLName.appendChild(inputLName);


    // formulaire.appendChild(formGroupAddress);
    // formGroupAddress.appendChild(labelAddress);
    // labelAddress.appendChild(adresse);
    // formGroupAddress.appendChild(blocAddress);
    // blocAddress.appendChild(inputAddress);


    // formulaire.appendChild(formGroupCity);
    // formGroupCity.appendChild(labelCity);
    // labelCity.appendChild(Ville);
    // formGroupCity.appendChild(blocCity);
    // blocCity.appendChild(inputCity);


    // formulaire.appendChild(formGroupEmail);
    // formGroupEmail.appendChild(labelEmail);
    // labelEmail.appendChild(email);
    // formGroupEmail.appendChild(blocEmail);
    // blocEmail.appendChild(inputEmail);

    //Fin ---- formulaire création des Elements------------------------------------




    // Début bloc FACTURE --------------------------------------------------------

    let divTabFacture = document.createElement('div');
    //en-tete de tableau
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let trHead = document.createElement('tr');
    let thQt = document.createElement('th');
    let thDesc = document.createElement('th');
    let thPu = document.createElement('th');
    let thPtt = document.createElement('th');
    //Titre de tableau
    let titreQtt = document.createTextNode('QT');
    let titreDesc = document.createTextNode('Descriptif');
    let titrePu = document.createTextNode('Prix U');
    let titrePtt = document.createTextNode('Prix Total');

    //body tableau
    let tbody = document.createElement('tbody');

    //class tete de tableau
    divfacture.classList.add("col-6", "border");
    table.classList.add("table", "table-bordered", "mt-2");
    thQt.setAttribute("scope", "col");
    thDesc.setAttribute("scope", "col");
    thPu.setAttribute("scope", "col");
    thPtt.setAttribute("scope", "col");

    //class body de tableau
    tbody.setAttribute("id", "tbody");


    divfacture.appendChild(divTabFacture);
    divTabFacture.appendChild(table);
    table.appendChild(thead);
    thead.appendChild(trHead);
    trHead.appendChild(thQt);
    thQt.appendChild(titreQtt);
    trHead.appendChild(thDesc);
    thDesc.appendChild(titreDesc);
    trHead.appendChild(thPu);
    thPu.appendChild(titrePu);
    trHead.appendChild(thPtt);
    thPtt.appendChild(titrePtt);
    table.appendChild(tbody);


    get("http://localhost:3000/api/teddies/", function (response) {
        let arrayTeddies = JSON.parse(response);

        let fact = JSON.parse(localStorage["basket"]);
        console.log(fact);

        let total = 0;
        let k = 0;
        while (k < arrayTeddies.length) {

            fact.forEach(itemFac => {
                if (arrayTeddies[k]._id == itemFac.id) {
                    priceTeddy = Math.floor(arrayTeddies[k].price / 100);
                    nameTeddy = arrayTeddies[k].name;
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


                    let span = document.createElement('span');
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

                    //     function removeLigneTab() {
                    //         fact.forEach(function (item, index, array) {
                    //             if (item.quantity < 1) {
                    //                 array.splice(index, 1);
                    //             }
                    //         });

                    //     }
                    // removeLigneTab();
                }
            });
            k++;
        }

        console.log(fact);
        //Affichage du total dans le Tableau facture
        let test = "oui c'est bon"
        console.log(total, test);

        let tBody = document.getElementById("tbody");
        let trTitreTotal = document.createElement('tr');
        let thVide = document.createElement('th');
        let tdTitreTotal = document.createElement('td');
        let titreTotal = document.createTextNode('TOTAL');
        let trMontantTotal = document.createElement('tr');
        let thMontantVide = document.createElement('th');
        let tdMontantTotal = document.createElement('td')

        let tdTt = document.createElement('td');
        let totalAffiche = document.createTextNode(total);

        thVide.setAttribute("colspan", "3");
        thVide.classList.add("bg-secondary");
        thMontantVide.setAttribute("colspan", "3");
        thMontantVide.classList.add("bg-secondary");


        tBody.after(trTitreTotal);
        trTitreTotal.appendChild(thVide);
        trTitreTotal.appendChild(tdTitreTotal);
        tdTitreTotal.appendChild(titreTotal);

        trTitreTotal.after(trMontantTotal);
        trMontantTotal.appendChild(thMontantVide);
        trMontantTotal.appendChild(tdMontantTotal);
        tdMontantTotal.appendChild(totalAffiche);

        // let contact = new Object();
        // contact.firstName = inputFName.value;
        // contact.lastName = inputLName.value;
        // contact.address = inputAddress.value;
        // contact.city = inputCity.value;
        // contact.email = inputEmail.value;

        // console.log(contact);





        let buttonValide = document.createElement('button');
        let valide = document.createTextNode('validez votre commande');

        divButtonForm.classList.add("text-right", "flex-row-reverse");
        buttonValide.classList.add("pull-right", "btn-lg", "mt-3");
        buttonValide.setAttribute("id", "bouton_valide");

        divButtonForm.appendChild(buttonValide);
        buttonValide.appendChild(valide);

        let validation = document.getElementById('bouton_valide');

        let prenomValidation = /^[a-zA-Zéèîï][a-zéèàçîïôö]+([-'\s][a-zA-Zéèîï][a-zéèàçîïôö]{2,20})?/;

        // Partie regex expression régulière 

        let nomValidation = /[A-Z]+([-'\s][A-Z]{2,20})?/;
        let adresseValidation = /[a-zA-Z0-9]+[-'\s][a-zA-Zéèîïôöûüç]+([-'\s][a-zA-Zéèîï][a-zéèàçîïôö]+)?/;
        let villeValidation = /[A-Z]+([-'\s][A-Z]+)?/;
        let emailValidation = /[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-zA-Z]{2,10}/;


        function testPrenom() {
            let inputFN = document.querySelector('#firstName');

            if (inputFN.valueMissing) {
                inputFName.classList.add('bg-danger');
                inputFName.setAttribute("placeholder", "Information incorrect !");
            } else if (prenomValidation.test(inputFN.value) == false) {
                console.log(inputFN.value);
                inputFName.classList.add('bg-warning');
                inputFName.setAttribute("placeholder", "Information incorrect !");
            } else {
                inputFName.classList.add('border-success');
                inputFName.classList.replace('bg-warning', 'bg-white');
                console.log(inputFN.value);

            }
        }

        function nom_Manquant() {
            let inputLN = document.querySelector('#lastName');
            if (nomValidation.test(inputLN.value) == false) {
                inputLName.classList.add('bg-warning');
                inputLName.setAttribute("placeholder", "Information incorrect !");
            } else {
                inputLName.classList.add('border-success');
            }
        }

        function adresse_Manquant() {
            let inputUAddress = document.querySelector('#addressUser');
            if (adresseValidation.test(inputUAddress.value) == false) {
                inputAddress.classList.add('bg-warning');
                inputAddress.setAttribute("placeholder", "Information incorrect !");
            } else {
                inputAddress.classList.add('border-success');
            }
        }

        function ville_Manquant() {
            let inputUCity = document.querySelector('#cityUser');
            if (villeValidation.test(inputUCity.value) == false) {
                inputUCity.classList.add('bg-warning');
                inputUCity.setAttribute("placeholder", "Information incorrect !");
            } else {
                inputUCity.classList.add('border-success');

            }
        }

        function email_Manquant() {
            let inputUEmail = document.querySelector('#emailUser');
            if (emailValidation.test(inputUEmail.value) == false) {
                inputUEmail.classList.add('bg-warning');
                inputUEmail.setAttribute("placeholder", "Information incorrect !");
            } else {
                inputUEmail.classList.add('border-success');
            }
        }


        validation.addEventListener('click', function () {
            testPrenom();
            nom_Manquant();
            adresse_Manquant();
            ville_Manquant();
            email_Manquant();

            //console.log(inputFN.value);

            let contact = new Object();
            contact.firstName = inputFName.value;
            contact.lastName = inputLName.value;
            contact.address = inputAddress.value;
            contact.city = inputCity.value;
            contact.email = inputEmail.value;

            console.log(contact);

            let products = [];
            let arrayId = JSON.parse(localStorage["basket"]);
            arrayId.forEach(elementId => {
                products.push(elementId.id);
                console.log(products);
            });
        })


    });


    function createInput(params) {
        const datas = [{
                name: "firstname",
                text: "Prénom : ",
                placeholder : "Entrer votre Prénom"
            },
            {
                name: "lastname",
                text: "Nom : ",
                placeholder : "Entrer votre Nom"
            },
            {
                name: "address",
                text: "Adresse : ",
                placeholder : "Entrer votre Adresse"
            },
            {
                name: "city",
                text: "Ville : ",
                placeholder : "Entrer votre Ville"
            },
            {
                name: "email",
                text: "E-mail : ",
                placeholder : "Entrer votre E-mail"
            }
        ]

        let formulaire = document.querySelector('.formulaire');

        datas.forEach(data => {

            let div = document.createElement('div');
            let label = document.createElement('label');
            let text = document.createTextNode(data.text);
            let input = document.createElement('input');

            formulaire.appendChild(div);
            div.appendChild(label);
            label.appendChild(text);
            div.appendChild(input);

            
            
            // formGroupFName.classList.add("form-group");
            label.setAttribute("for", data.name);
            input.classList.add("form-control", "col-5", "mb-2");
            input.setAttribute("id", data.name);
            input.setAttribute("type", "text");
            input.setAttribute("placeholder", data.placeholder);
        });
    }
    // let formulaire = document.createElement('form');

    // let formGroupFName = document.createElement('div');

    // let labelFName = document.createElement('label');
    // let firstName = document.createTextNode("Prénom :");
    // let inputFName = document.createElement('input');
    

  

    //removeSpanFirstname();
    //message_prenom_manquant();

    // function removeSpanFirstname() {
    //     if (document.querySelector('#spanFN')) {
    //         document.getElementById("spanFN").remove();
    //     }
    // }
    // function message_prenom_manquant() {
    // if (document.querySelector('.inputFN_alert')) {

    //          let spanFName = document.createElement('span');
    //           spanFName.setAttribute("id", "spanFN");
    //         spanFName.classList.add("text-danger", "ml-3");
    //           inputFName.after(spanFName);
    //           let firstName_M = document.getElementById('spanFN');
    //           let textPrenom_M = document.createTextNode('Prénom manquant');
    //           firstName_M.appendChild(textPrenom_M);
    //      }
    //  }


    //constructeur creer un objet 


    // function addCommand() {
    //     let formFName = h

    //     let request = new XMLHttpRequest();
    //     request.open("POST", "http://localhost:3000/api/teddies/");
    //     request.onreadystatechange = function () {
    //         if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

    //         }
    //     }
    //     request.setRequestHeader("Content-Type", "application/json");
    //     request.send();
    // }

    // ***************************************************************************


    // let buttonValide = document.createElement('button');
    // let valide = document.createTextNode('validez votre commande');

    // divButtonForm.classList.add("text-right", "flex-row-reverse");
    // buttonValide.classList.add("pull-right", "btn-lg", "mt-3");
    // buttonValide.setAttribute("id", "bouton_valide");

    // divButtonForm.appendChild(buttonValide);
    // buttonValide.appendChild(valide);

    // let validation = document.getElementById('bouton_valide');
    // let inputFN = document.getElementById('firstName');
    // let firstName_M = document.getElementById('spanFN');
    // let textPrenom_M = document.createTextNode('Prénom manquant');
    // let prenomValidation = /^[a-zA-Zéèîï][a-zéèàçîïôö]+([-'\s][a-zA-Zéèîï][a-zéèàçîïôö]+)?/;
    // let testValidation = prenomValidation.test(inputFN.value);


    // validation.addEventListener('click', f_valid);

    // function f_valid(e) {

    //     if (inputFN.value == null){
    //         e.preventDefault();
    //         firstName_M.appendChild(textPrenom_M);
    //     }
    // }


    console.log('Il y a une nouvelle entrée ! ');
};