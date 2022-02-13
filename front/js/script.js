//URL API
const API = "http://localhost:3000/api/products"; 
//requète
fetch(API)
    .then(function(res){
        return res.json();
    })
//for of intégration des données en HTML
    .then(function(products){
        for (data of products){
            document.getElementById("items")
            .innerHTML += `
            <a href="./product.html?id=${data._id}">
                <article>
                    <img src="${data.imageUrl}" alt="${data.altTxt}">
                    <h3 class="productName">${data.name}</h3>
                    <p class="productDescription">${data.description}</p>
                </article>
            </a>
            `;
        }
    })
//si erreur
    .catch(function(error){
        alert(error);
    })
