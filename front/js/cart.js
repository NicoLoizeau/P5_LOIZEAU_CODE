let cartArray = JSON.parse(localStorage.getItem("cartArray"));

if (cartArray === null || cartArray.length === 0){
    alert("le panier est vide")
}
else{
    let API = "http://localhost:3000/api/products"; 
//requète
fetch(API)
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        console.log(data);
        console.log(data.length);
        displayData(cartArray, data);
    })
    .catch(function(error){
        console.error(error);
    })
}
//afficher les articles en panier
function displayData(cartArray, data){
    try {
        for (let i = 0; i < cartArray.length; i++){
            for (let j = 0; j < data.length; j++){
                if (cartArray[i].ID === data[j]._id){
                    console.log(cartArray[i].ID)
    
            let canap = document.getElementById("cart__items");
            canap.innerHTML += `
        <article class="cart__item" data-id="${cartArray[i].ID}" data-color="${cartArray[i].couleur}">
            <div class="cart__item__img">
                <img src="${data[j].imageUrl} " alt="${data[j].altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${data[j].name}</h2>
                    <p>${cartArray[i].couleur}</p>
                    <p>${data[j].price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartArray[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>
        `
            }
        }}            
        console.log(cartArray);
        for (let i = 0; i < cartArray.length; i++){
        let quantityCart = document.getElementsByClassName("itemQuantity");
        let itemQuantity = quantityCart[i].value
        console.log(itemQuantity);
        let item = document.getElementsByClassName("cart__item");
        let itemId = item[i].dataset.id;
        console.log(itemId);
        
        }
    }
        catch (error) {
        console.error(error)
    }
}



