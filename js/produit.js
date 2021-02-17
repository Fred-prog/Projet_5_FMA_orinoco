const produitId = window.location.search;
console.log(produitId);

const urlParams = new URLSearchParams(produitId);
let idprod = urlParams.get('id');
console.log(idprod);

//tant que pour le choix de couleurs
function selectCouleur(colors) {
    let u = 0;
    while (u < colors.length) {
        let color = colors[u];
        
        let choix = document.getElementById("couleur");
        const option = document.createElement("option");
        let newColor = document.createTextNode(color);
        
        choix.appendChild(option);
        option.appendChild(newColor);
        u++;
    };
}

function afficheteddy(array, idProduct ) {
    
    let i = 0;
    while (i < array.length) {
        
        if (array[i]._id == idProduct) {
            let cle = array[i]._id
            
            console.log(cle.toString());
            
            tName = array[i].name;
            img = array[i].imageUrl;
            description = array[i].description;
            price = Math.floor(array[i].price / 100);
            colorsTab = array[i].colors;
            
            
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
            
            selectCouleur(colorsTab);

            document.getElementById('addBasket').addEventListener('click', function test() {
                let verifCouleur = valideColor();
                if (verifCouleur == false) {
                    messageChoixCouleur();
                } else {
                    add(idProduct);
                }
            })
            //document.getElementById('addBasket').addEventListener('click', function() {


            //});
            
        }
        i++;
    }
}

// fonction suppression success
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
    removeSuccess();
    let colorNul = document.getElementById('add');
    let warning = document.createElement("p");
    const danger = ["mt-3", "alert", "alert-danger"]
    warning.setAttribute("id", "warning")
    warning.classList.add(...danger);
    let messageChoix = document.createTextNode("Veuillez choisir une couleur ! ")
    colorNul.appendChild(warning);
    warning.appendChild(messageChoix);
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

function test() {
    let verifCouleur = valideColor();
    if (verifCouleur == false) {
        messageChoixCouleur();
    } else {
        add();
    }
}


//----------------------------------------------------------------
function valideColor() {
    let color = document.querySelector('select').value;
    // vérification couleurs choisie
    if (color == 'null') {
        return false;
    }
}    

function add(cleProduct) {
    {
        let dataTeddy = [];
        if (localStorage.length == 0) {
            dataTeddy.push({
                id: cleProduct,
                quantity: 1
            });
            localStorage.setItem("basket", JSON.stringify(dataTeddy));
            messageAddInBasket();
        } else {
            dataTeddy = JSON.parse(localStorage.getItem("basket"));
            let exist = false
            dataTeddy.forEach(item => {
                if (item.id == cleProduct) {
                    exist = true;
                    item.quantity++;
                }
            });
            
            if (exist == false) {
                dataTeddy.push({
                    id: cleProduct,
                    quantity: 1
                    
                });
            }
            localStorage.setItem("basket", JSON.stringify(dataTeddy));
            messageAddInBasket();
        }
    }
}


get("http://localhost:3000/api/teddies/").then(resolve => {

    let arrayTeddy = JSON.parse(resolve);
    afficheteddy(arrayTeddy, idprod);
}).catch(catchError);