
//Appel de l'API avec la méthode fetch.
fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(data => { 
    productSection(data);
  })
  .catch(_error => {
    alert('Pardon, un problème est survenu');
  });

//Fonction qui appelle les datas "products" dans l'API.
function productSection(data) {
    console.log(data);
    //Boucle for pour créer les cartes produits de façon dynamique.
    for (let i = 0; i < data.length; i++) {

      const aElement = document.createElement("a");
      aElement.href = `./product.html?id=${data[i]._id}`;

      const articleElement = document.createElement("article");

      const imageElement = document.createElement("img");
      imageElement.src = `${data[i].imageUrl}`;
      imageElement.alt = `${data[i].altTxt}`;

      const nameElement = document.createElement("h3");
      nameElement.classList.add("productName");
      nameElement.innerHTML = `${data[i].name}`;

      const descriptionElement = document.createElement("p");
      descriptionElement.classList.add("productDescription");
      descriptionElement.innerHTML = `${data[i].description}`;

      const products = document.querySelector(".items");
      products.appendChild(aElement);
      aElement.appendChild(articleElement);
      articleElement.appendChild(imageElement);
      articleElement.appendChild(nameElement);
      articleElement.appendChild(descriptionElement);
    }
};