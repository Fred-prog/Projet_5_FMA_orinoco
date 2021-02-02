const produitId = window.location.search;
console.log(produitId);

const urlParams = new URLSearchParams(produitId);
let idprod = urlParams.get('id');
console.log(idprod);


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

get("http://localhost:3000/api/teddies/", function (response) {
        let arrayTeddies = JSON.parse(response);
        let i = 0;
        while (i < arrayTeddies.length) {
    
            if (arrayTeddies[i]._id == idprod) {
                let cle = arrayTeddies[i]._id
    
                console.log(cle.toString());
    
                tName = arrayTeddies[i].name;
                img = arrayTeddies[i].imageUrl;
                description = arrayTeddies[i].description;
                price = Math.floor(arrayTeddies[i].price / 100);
                colorsTab = arrayTeddies[i].colors;
    
    
                let cardImg = document.querySelector(".card-img-top");
                cardImg.setAttribute("src", img);
    
                let nameteddy = document.querySelector(".card-title");
                let newName = document.createTextNode(tName);
                nameteddy.appendChild(newName);
    
                let descriptionId = document.getElementById("idDesc");
                let newDesc = document.createTextNode(description);
                descriptionId.appendChild(newDesc);
    
                let priceId = document.getElementById("idPrice");
                let newPrice = document.createTextNode(price);
                priceId.appendChild(newPrice);
    
    
    
                //tant que pour le choix de couleurs
                let u = 0;
                while (u < colorsTab.length) {
                    let color = colorsTab[u];
    
                    let choix = document.getElementById("couleur");
                    const option = document.createElement("option");
                    let newColor = document.createTextNode(color);
    
                    choix.appendChild(option);
                    option.appendChild(newColor);
    
                    u++;
                };
    
                // Fonction vérification de la section couleur
                function removeSuccess() {
                    if (document.querySelector("#success")) {
                        document.getElementById("success").remove();
                    }
                }

                // fonction suppression warning
                function removeNul() {
                    if (document.querySelector("#warning")) {
                        document.getElementById("warning").remove();
                    }
    
                }
    
                // message d'alerte /choix de couleur
                function messageChoixCouleur() {
                    removeNul();
                    removeSuccess()
                    let colorNul = document.getElementById('add');
                    let warning = document.createElement("p");
                    const danger = ["mt-3", "alert", "alert-danger"]
                    warning.setAttribute("id", "warning")
                    warning.classList.add(...danger);
                    let test = document.createTextNode("Veuillez choisir une couleur ! ")
                    colorNul.appendChild(warning);
                    warning.appendChild(test);
                };
    
                // fonction ajout au panier
                function messageAddInBasket() {
                    removeNul();
                    removeSuccess();
                    let addOk = document.getElementById('add');
                    let alertOk = document.createElement("p");
                    const valid = ["mt-3", "alert", "alert-success"]
                    alertOk.setAttribute("id", "success")
                    alertOk.classList.add(...valid);
                    let valideText = document.createTextNode("Votre produit est ajouté au panier")
                    addOk.appendChild(alertOk);
                    alertOk.appendChild(valideText);
                }
    
    
                //----------------------------------------------------------------
    
                console.log(localStorage.length);
    
    
                //----------------------------------------------------------------
    
                //bouton choix couleur
                let ajoutP = document.getElementById('addBasket');
                ajoutP.addEventListener('click', function () {
                    let color = document.querySelector('select').value;
                    // vérification couleurs choisie
                    if (color == 'null') {
                        messageChoixCouleur();
                    } else {
    
                        let dataTeddy = [];
    
                        if (localStorage.length == 0) {
    
    
                            dataTeddy.push({
                                id: cle,
                                quantity: 1
                            });
                            localStorage.setItem("basket", JSON.stringify(dataTeddy));
                            messageAddInBasket();
                        } else {
                            dataTeddy = JSON.parse(localStorage.getItem("basket"));
                            let exist = false
                            dataTeddy.forEach(item => {
                                if (item.id == cle) {
                                    exist = true;
                                    item.quantity++;
                                }
                            });
                            if (exist == false) {
                                dataTeddy.push({
                                    id: cle,
                                    quantity: 1
    
                                });
                            }
                            localStorage.setItem("basket", JSON.stringify(dataTeddy));
                            messageAddInBasket();
                        }
                    };
    
                });
    
    
            }
            i++;
        }
    });


    //}
//};
//request.open("GET", "http://localhost:3000/api/teddies/");
//request.send();