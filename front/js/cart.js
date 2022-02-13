let cartArray = JSON.parse(localStorage.getItem("cartArray"));
console.log(cartArray[0].ID)

if (cartArray.lenght === 0 ){
    alert("le panier est vide")
}
else{
    
    for (let i = 0; i < cartArray.lenght; i++){
        document.getElementById("cart_items").innerHTML +=
    `<article class="cart__item" data-id="${cartArray[i].ID}" data-color="${cartArray[i].couleur}">
        <div class="cart__item__img">
            <img src="../images/product01.jpg" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>Nom du produit</h2>
                <p>Vert</p>
                <p>42,00 €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`
    }
}