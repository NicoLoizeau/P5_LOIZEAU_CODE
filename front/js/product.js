//récupération de l'id
let searchUrl = new URLSearchParams(document.location.search);
let productId = searchUrl.get("id"); 
//URL API
let API = "http://localhost:3000/api/products/"+productId; 
//requète
fetch(API)
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        console.log(data)
        window.parent.document.title = data.name;
        let image = document.getElementsByClassName("item__img");
        image[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">
         `;
        let name = document.getElementById("title");
        name.textContent = data.name;
        let price = document.getElementById("price");
        price.textContent = data.price;
        let description = document.getElementById("description");
        description.textContent = data.description;
        let color = document.getElementById("colors");
        let allColors = data.colors;
            for (let i = 0; i < allColors.length; i++){
            color.innerHTML += `<option value=${data.colors[i]}>${data.colors[i]}</option>`;
            }
//si erreur
    })
    .catch(function(error){
        alert(error);
    })

//ajout au panier
let colorChoice = document.getElementsById("colors").value;
console.log(colorChoice)
    //ajouter vérif choix de la couleur
let quantity = document.getElementById("quantity").value;
    //ajouter vérif quantity between 1-100
    //event clic & add à cart
let ajouterAuPanier = document.getElementsByClassName("item__content__addButton")
    ajouterAuPanier[0].addEventListener('click', function(add){
    add.stopPropagation();
    if (colorChoice = "--SVP, choisissez une couleur --"){
    alert("--SVP, choisissez une couleur --"); 
    }
    else if (quantity < 1){
    alert("Ajoutez la quantité d'articles");
    }
    else if (quantity > 100){
    alert("Vous ne pouvez commander que 100 articles !");
    }
/*localStorage.setItem(productId,colorChoice,quantity)
*/
//this.alert("ça marche !")
})
