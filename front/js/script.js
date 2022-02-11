//variable pour reprendre la requète API
let products = []
//requète
fetch("http://localhost:3000/api/products")
    .then(function(products){
        if (products.ok){
            return products.json();
        }
    })
    .then(function(value){
        console.log(value);
    })
    .catch(function(error){
});

//--variable pour cibler la ligne 0
//let productName = products.name[0];
//--vairable pour modifier le nom du produit dans le DOM


let elt = document.getElementsByClassName("productName");
elt.textContent = "hello";


//boucle for of pour afficher chaque product

//innerHTLM pour afficher le tableau dans HTML

