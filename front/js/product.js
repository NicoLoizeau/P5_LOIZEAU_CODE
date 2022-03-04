//récupération de l'id
let searchUrl = new URLSearchParams(document.location.search);
if (searchUrl.has('id')) {
    let productId = searchUrl.get("id");
    //URL API
    let API = "http://localhost:3000/api/products/" + productId;
    //requète
    fetch(API)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data)
            document.title = data.name;
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
            for (let i = 0; i < allColors.length; i++) {
                color.innerHTML += `<option value=${data.colors[i]}>${data.colors[i]}</option>`;
            }
            //si erreur
        })
        .catch(function (error) {
            console.error(error);
        })
    //ajout au panier
    const colorChoice = document.querySelector("#colors");
    const quantity = document.querySelector("#quantity");
    //event clic & add à cart
    let ajouterAuPanier = document.getElementById("addToCart");

    ajouterAuPanier.addEventListener('click', function (add) {
        if (colorChoice.value == "") {
            alert("--SVP, choisissez une couleur --");
        }
        else if (quantity.value < 1) {
            alert("Ajoutez la quantité d'articles");
        }
        else if (quantity.value > 100) {
            alert("Vous ne pouvez commander que 100 articles !");
        }
        else {
            let colorChoiceValue = colorChoice.value;
            let panier = {
                ID: productId,
                couleur: colorChoiceValue,
                quantity: parseInt(quantity.value, 10),
            }
            alert(quantity.value + " ajouté à votre panier");
            console.log(panier);

            //////localStorage//////
            let cartArray = JSON.parse(localStorage.getItem("cartArray"));

            if (cartArray) {
                let item = cartArray.find(// si trouvé dans le panier ID + color ajoute la quantité et push dans le local storage
                    (item) =>
                        item.ID === panier.ID && item.couleur === panier.couleur
                );
                if (item) {
                    item.quantity = item.quantity + panier.quantity;
                    localStorage.setItem("cartArray", JSON.stringify(cartArray));
                    console.log(item.quantity);
                    return;
                }
                cartArray.push(panier);
                localStorage.setItem("cartArray", JSON.stringify(cartArray));
            }
            else { // si pas de local storage push le produit
                let newTabLocalStorage = [];
                newTabLocalStorage.push(panier);
                localStorage.setItem("cartArray", JSON.stringify(newTabLocalStorage));
            }
            //test   

            console.log(cartArray)
        }


    })
}