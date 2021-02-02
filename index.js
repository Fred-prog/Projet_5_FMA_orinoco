/*requete GET*/


let request = new XMLHttpRequest();
request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        console.log(response)


        let i = 0;
        while (i < response.length) {
            
            //récuperation des données serveur via la requete
            nameT = response[i].name;
            img = response[i].imageUrl;
            description = response[i].description;
            price = Math.floor(response[i].price/100);
            id = response[i]._id;

            //variable qui prends la valeur des données
            let newName = document.createTextNode(nameT);
            let newImg = document.createTextNode(img);
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


            // Création de class de conteneur
            let colClass = colDiv.classList.add("col-6", "mt-5");
            divCard.classList.add("card");
            cardImg.classList.add("card-img-top");
            divCardBody.classList.add("card-body");
            h5CardTitle.classList.add("card-title");
            paraCardDesc.classList.add("card-text");
            paraCardPrice.classList.add("card-text");
            buttonCard.classList.add("href", "btn", "btn-primary", "w-25");
            
            let suPrice = document.createTextNode("Prix : ");
            let money = document.createTextNode(" " + "euro");


            //Construction des element du DOM
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

            
            let adress2 = "http://localhost:3000/api/teddies/" + id;
        
           cardImg.setAttribute("src", img);
           buttonCard.setAttribute("href", "produit.html?id=" + id)


            spanName.setAttribute("id", "nameTeddy");
            spanDesc.setAttribute("id", "descTeddy");
            spanDesc.setAttribute("id", "priceTeddy");


            let ajoutImg = document.getElementById("imgTeddy");
            let ajoutName = document.getElementById("nameTeddy");
            let ajoutDesc = document.getElementById("descTeddy");
            let ajoutPrice = document.getElementById("priceTeddy");

        
    
            i++;
        }

    }
};
request.open("GET", "http://localhost:3000/api/teddies/");
request.send();