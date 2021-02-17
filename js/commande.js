const produitId = window.location.search;
console.log(produitId);

const urlParams = new URLSearchParams(produitId);
let idCommande = urlParams.get('id');
let totalCommande = urlParams.get('total');
console.log(idCommande);
console.log(totalCommande);

let messageCom = document.getElementById("messageId");
let phraseId = document.createTextNode("Votre numéro de commande est le : " + idCommande);
let messagePrix = document.getElementById("messageTotal");
let phraseTotal = document.createTextNode("Le montant de votre achat est de : " + totalCommande + " euros.");

messageCom.appendChild(phraseId);
messagePrix.appendChild(phraseTotal);