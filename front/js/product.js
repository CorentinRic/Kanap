//---------------------Affichage du produit.

//SearchParams pour pouvoir manipuler plus facilement les requêtes URL.
let url = new URL(window.location.href).searchParams;
let newId = url.get("id");

//Création des constantes et variables nécessaires pour la page.
const image = document.getElementsByClassName('item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');
var imageURL = "";
var imageAlt = "";

//Appel de l'api, avec un nouvel URL pour chaque produits avec le nouvel Id.
fetch("http://localhost:3000/api/products/" + newId)
  .then(res => res.json())
  .then(data => { 
    productChoice(data);
  })
  .catch(_error => {
    alert('Pardon, un problème est survenu');
  });

//Fonction productChoice qui gère l'intégration dynamique de chaque possibilité de produit, avec les bonnes données.
function productChoice(data){
  image[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
  imageURL = data.imageUrl;
  imageAlt = data.altTxt;
  title.innerHTML = `<h1>${data.name}</h1>`;
  price.innerText = `${data.price}`;
  description.innerText = `${data.description}`;

  //Boucle for in qui gère le choix des couleurs possibles, du au plusieurs choix possibles dans les datas colors.
  for (number in data.colors) {
    colors.options[colors.options.length] = new Option(
      data.colors[number],
      data.colors[number]
    );
  }
}


//---------------------Choix utilisateurs.

const selectQuantity = document.getElementById('quantity');
const selectColors = document.getElementById('colors');

const addToCart = document.getElementById('addToCart');
//Création d'un EventListener au click de l'ajout du panier addToCart.
addToCart.addEventListener('click', (event) => {
  event.preventDefault();

  const selection = {
    id: newId,
    image: imageURL,
    alt: imageAlt,
    name: title.textContent,
    color: selectColors.value,
    quantity: selectQuantity.value,
  };

  //Conversion des données JSON en objets JS + recherche des produits dans le local storage.
  let productInLocalStorage =  JSON.parse(localStorage.getItem('product'));

  //Ajout des produits dans le local storage.
  const addProductLocalStorage = () => {

  productInLocalStorage.push(selection);

  localStorage.setItem('product', JSON.stringify(productInLocalStorage));
  }

  let addConfirm = () => {
    alert('Le produit est dans le panier');
  }

  let update = false;
  
  //Contraintes d'ajout dans le panier.
  if (selectQuantity.value > 100){
    alert('Le nombre maximum de produits est de 100.');
    return false;
  }

  if (selectQuantity.value <= 0){
    alert('Veuillez ajouter au minimum un article.');
    return false;
  }

  if (selectColors.value <= 0){
    alert('Veuillez sélectionner une couleur.');
    return false;
  }

  //Si des produits se trouvent dans le local storage.
  if (productInLocalStorage) {

   productInLocalStorage.forEach (function (productOk, key) {
    if (productOk.id == newId && productOk.color == selectColors.value) {
      productInLocalStorage[key].quantity = parseInt(productOk.quantity) + parseInt(selectQuantity.value);
      localStorage.setItem('product', JSON.stringify(productInLocalStorage));
      update = true;
      addConfirm();
    }
  });

    if (!update) {
    addProductLocalStorage();
    addConfirm();
    }
  }
  //Création d'un tableau avec les éléments choisi par l'utilisateur si rien dans le local Storage.
  else {
    productInLocalStorage = [];
    addProductLocalStorage();
    addConfirm();
  }
});