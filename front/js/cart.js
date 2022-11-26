//Récuperation des produits dans le localStorage.
let products = [];
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));
const cartAndFormContainer = document.getElementById('cartAndFormContainer');

//Affichage des produits dans le panier.

  if(productInLocalStorage === null || productInLocalStorage == 0) {

    const divElementNull = document.createElement("div");
    divElementNull.classList.add("cart__empty");

    const pElementNull = document.createElement("p");
    pElementNull.innerText = "Le panier est vide.";

    document.querySelector("#cart__items").appendChild(divElementNull);
    divElementNull.appendChild(pElementNull);
  }

  else{

    //Boucle pour l'intégration avec les données du localStorage.
    for (i = 0; i < productInLocalStorage.length; i++) {

      products.push(productInLocalStorage[i].id);

      //Appel de l'API avec la méthode fetch + l'id du produit dans le localStorage.
      fetch('http://localhost:3000/api/products/' + productInLocalStorage[i].id)
      .then(response => response.json())
      .then(data => { 
        console.log(data);
        priceElementCartContentTitlePrice.innerHTML =  `${data.price}` + " €";
      })
      .catch(_error => {
      alert('Pardon, un problème est survenu');
      });

      //Création avec createElement d'un <p> pour le prix.
      let priceElementCartContentTitlePrice = document.createElement("p");

      //Création avec createElement d'un <article>.
      const articleElementCart = document.createElement("article");
      articleElementCart.classList.add("cart__item");
      articleElementCart.setAttribute("data-id", productInLocalStorage[i].id);
      articleElementCart.setAttribute("data-color", productInLocalStorage.color);

      //Création avec createElement d'une <div>.
      const divElementCartImg = document.createElement("div");
      divElementCartImg.classList.add("cart__item__img");

      //Création avec createElement d'une <img>.
      const imageElementCartImg = document.createElement("img");
      imageElementCartImg.src = `${productInLocalStorage[i].image}`;
      imageElementCartImg.alt = `${productInLocalStorage[i].alt}`;

      //Création avec createElement d'une <div>.
      const divElementCartContent = document.createElement("div");
      divElementCartContent.classList.add("cart__item__content");

      //Création avec createElement d'une <div>.
      const divElementCartContentTitlePrice = document.createElement("div");
      divElementCartContentTitlePrice.classList.add("cart__item__content__titlePrice");

      //Création avec createElement d'un <h2>.
      const titleElementCartContentTitlePrice = document.createElement("h2");
      titleElementCartContentTitlePrice.innerHTML = `${productInLocalStorage[i].name}`;

      //Création avec createElement d'un <p> pour la couleur.
      const colorElementCartContentTitlePrice = document.createElement("p");
      colorElementCartContentTitlePrice.innerHTML = `${productInLocalStorage[i].color}`;

      //Création avec createElement d'une <div>.
      const divElementCartContentSettings = document.createElement("div");
      divElementCartContentSettings.classList.add("cart__item__content__settings");

      //Création avec createElement d'une <div>.
      const divElementCartContentSettingsQuantity = document.createElement("div");
      divElementCartContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");

      //Création avec createElement d'un <p> pour la quantité.
      const pElementCartContentSettingsQuantity = document.createElement("p");
      pElementCartContentSettingsQuantity.innerText = "Qté : ";

      //Création avec createElement d'un <input>.
      const inputElementCartContentSettingsQuantity = document.createElement("input");
      inputElementCartContentSettingsQuantity.setAttribute("type", "number");
      inputElementCartContentSettingsQuantity.classList.add("itemQuantity");
      inputElementCartContentSettingsQuantity.setAttribute("name", "itemQuantity");
      inputElementCartContentSettingsQuantity.setAttribute("min", "1");
      inputElementCartContentSettingsQuantity.setAttribute("max", "100");
      inputElementCartContentSettingsQuantity.value = `${productInLocalStorage[i].quantity}`;

      //Création avec createElement d'une <div>.
      const divElementCartContentSettingsDelete = document.createElement("div");
      divElementCartContentSettingsDelete.classList.add("cart__item__content__settings__delete");

      //Création avec createElement d'un <p> "supprimer".
      const pElementCartContentSettingsDelete = document.createElement("p");
      pElementCartContentSettingsDelete.classList.add("deleteItem");
      pElementCartContentSettingsDelete.innerText = "Supprimer";

      //Organisation de l'orde pour les enfants/parents.
      const itemCart = document.getElementById('cart__items');
      itemCart.appendChild(articleElementCart);
      articleElementCart.appendChild(divElementCartImg);
      divElementCartImg.appendChild(imageElementCartImg);
      articleElementCart.appendChild(divElementCartContent);
      divElementCartContent.appendChild(divElementCartContentTitlePrice);
      divElementCartContentTitlePrice.appendChild(titleElementCartContentTitlePrice);
      divElementCartContentTitlePrice.appendChild(colorElementCartContentTitlePrice);
      divElementCartContentTitlePrice.appendChild(priceElementCartContentTitlePrice);
      divElementCartContent.appendChild(divElementCartContentSettings);
      divElementCartContentSettings.appendChild(divElementCartContentSettingsQuantity);
      divElementCartContentSettingsQuantity.appendChild(pElementCartContentSettingsQuantity);
      divElementCartContentSettingsQuantity.appendChild(inputElementCartContentSettingsQuantity);
      divElementCartContentSettings.appendChild(divElementCartContentSettingsDelete);
      divElementCartContentSettingsDelete.appendChild(pElementCartContentSettingsDelete);
    }
  };

  //Modification de la quantitée des éléments dans le panier.
  function changeQtt() {
    const itemQtt = document.querySelectorAll('.itemQuantity');
    for (let j = 0; j < itemQtt.length; j++) {
      itemQtt[j].addEventListener('change', (event) => {
      event.preventDefault();
      //Nouvelle quantité sauvegardée dans un tableau, dans le localStorage.
      const itemNewQtt = itemQtt[j].value;
      const newLocalStorage = {
        id: productInLocalStorage[j].id,
        image: productInLocalStorage[j].image,
        alt: productInLocalStorage[j].alt,
        name: productInLocalStorage[j].name,
        color: productInLocalStorage[j].color,  
        quantity: itemNewQtt,
      };

      //Actualisation du localStorage.
      productInLocalStorage[j] = newLocalStorage;
      localStorage.setItem('product', JSON.stringify(productInLocalStorage));

      if (itemQtt[j].value > 100){
        alert('Le nombre maximum de produits est de 100.');
        return false;
      };

      if (itemQtt[j].value <= 0){
        alert('Le nombre minimum de produits est de 1 article.');
        return false;
      };

      alert('Votre panier est à jour.');
      totalArticles();
      priceAmount();
        })
    }

  }
  changeQtt();

  //Suppresion des articles dans le panier.
  function deleteArticle() {
    const deleteItem = document.querySelectorAll('.deleteItem');

    for (let k = 0; k < deleteItem.length; k++) { 
      deleteItem[k].addEventListener('click', (event) => {
      event.preventDefault();

      //Enregistrement de la couleur et de l'id séléctionné avec le bouton supprimer.
      const deleteId = productInLocalStorage[k].id;
      const deleteColor = productInLocalStorage[k].color;

      //Filtrer l'élément cliqué.
      productInLocalStorage = productInLocalStorage.filter( elt => elt.id !== deleteId || elt.color !== deleteColor);
        
      //Envoie des nouvelles données dans le localStorage.
      localStorage.setItem('product', JSON.stringify(productInLocalStorage));

      alert('Votre article a bien été supprimé.');
      window.location.href = "cart.html";
      });
    }
  }
  deleteArticle();

  //Total des articles dans le panier.
  function totalArticles() {
    var totalItems = 0;
    for (l in productInLocalStorage) {
      const newQuantity = parseInt(productInLocalStorage[l].quantity, 10);

      totalItems += newQuantity;
    }
      const totalQuantity = document.getElementById('totalQuantity');
      totalQuantity.textContent = totalItems;
  }
  totalArticles();

 //Montant total dans le panier.
 function priceAmount() {
  const calculPrice = [];
  for (let i in productInLocalStorage) {

    fetch('http://localhost:3000/api/products/' + productInLocalStorage[i].id)
    .then(response => response.json())
    .then(data => { 

      const cartAmount = data.price * productInLocalStorage[i].quantity;
      calculPrice.push(cartAmount);

      const reduce = (previousValue, currentValue) => currentValue + previousValue;
      total = calculPrice.reduce(reduce);

      const totalPrice = document.getElementById('totalPrice');
      totalPrice.textContent = total;
  })
  .catch(_error => {
  alert('Pardon, un problème est survenu');
  });

  }
}
priceAmount();

  //Envoie d'un formulaire pour vérifier les informations de l'utilisateur.
  function postForm() {
    const order = document.getElementById('order');
    order.addEventListener('click', (event) => {
      event.preventDefault();

    //Données du formulaire dans un objet.
    const contact = {
      firstName : document.getElementById('firstName').value,
      lastName : document.getElementById('lastName').value,
      address : document.getElementById('address').value,
      city : document.getElementById('city').value,
      email : document.getElementById('email').value
    }

    //Contôle du prénom.
    function controlFirstName() {
      const validFirstName = contact.firstName;
      if (/^[^0-9_!¡?÷?¿\\+=@#$%^&*(){}|~<>;:[\]]{3,20}$/.test(validFirstName)) {
        return true;
      } else {
        let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
        firstNameErrorMsg.innerText = "Veuillez vérifier le prénom.";
      }
    } 

    //Contrôle du nom.
    function controlName() {
      const validName = contact.lastName;
      if (/^[^0-9_!¡?÷?¿\\+=@#$%^&*(){}|~<>;:[\]]{3,20}$/.test(validName)) {
        return true;
      } else {
        let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
        lastNameErrorMsg.innerText = "Veuillez vérifier le nom.";
      }
    }

    //Contrôle de l'adresse.
    function controlAddress() {
      const validAddress = contact.address;
      if (/^([0-9a-zA-Z'àâéèêôùûçÀÂÉÈÔÙÛÇ\s-]{1,50})$/.test(validAddress)) {
        return true;
      } else {
        let addressErrorMsg = document.getElementById('addressErrorMsg');
        addressErrorMsg.innerText = "Veuillez vérifier l'adresse.";
      }
    } 

    //Contrôle de la ville.
    function controlCity() {
      const validAddress = contact.city;
      if (/^[^[^0-9_!¡?÷?¿\\+=@#$%^&*(){}|~<>;:[\]]{3,20}$/.test(validAddress)) {
        return true;
      } else {
        let cityErrorMsg = document.getElementById('cityErrorMsg');
        cityErrorMsg.innerText = "Veuillez vérifier le nom de la ville.";
      }
    }

    //Contrôle de l'adresse email.
    function controlEmail() {
      const validEmail = contact.email;
      if (/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(validEmail)) {
        return true;
      } else {
        let emailErrorMsg = document.getElementById('emailErrorMsg');
        emailErrorMsg.innerText = "L'adresse Email est non valide.";
      }
    }

    //Contrôle de la quantité.
    function controlQttProduct() {
      if (productInLocalStorage === null || productInLocalStorage == 0){
        return false;
      }
      else{
        return true;
      }
    }
    controlQttProduct();


    //Après vérification, envoie de l'objet contact dans le localStorage.
    function validControl() {
      if (controlFirstName() && controlName() && controlAddress() && controlCity() && controlEmail() && controlQttProduct()) {
        localStorage.setItem('contact', JSON.stringify(contact));
        return true;
      }
      else {
          alert("Merci de vérifier les informations du formulaire ou l'ajout d'un article minimum pour passer commande.")
          return false;
        }
    }
    validControl()

    //Valeurs du formulaire + produits sélectionnés dans un objet.
    const sendFormData = {
      contact,
      products,
    }

    //Envoie du formulaire + localStorage au serveur.
    const options = {
      method: 'POST',
      body: JSON.stringify(sendFormData),
      headers: { 
        'Content-Type': 'application/json',
      }
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('orderId', data.orderId);
          if (validControl()) {
            document.location.href = 'confirmation.html?id='+ data.orderId;
          }
      });

  })
  }
  postForm();