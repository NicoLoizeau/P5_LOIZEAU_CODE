let cartArray = JSON.parse(localStorage.getItem("cartArray"));
let orderId = "";

if (cartArray === null || cartArray.length === 0){
    let titleCartEmpty = document.getElementById("cartAndFormContainer")
    titleCartEmpty.innerHTML = `<h1>Votre panier est vide</h1>`
}
else{
    let API = "http://localhost:3000/api/products"; 
//requète API
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
//////////afficher les articles en panier //////////
function displayData(cartArray, data){
    try {
        let sumQuanttity = 0;
        let sumPrice = 0
        for (let i = 0; i < cartArray.length; i++){
            for (let j = 0; j < data.length; j++){
                if (cartArray[i].ID === data[j]._id){
    
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
        /////// calcul des totaux ///////
        let totalQuantity = document.getElementById("totalQuantity");
        let totalPrice = document.getElementById("totalPrice");
            sumQuanttity += cartArray[i].quantity;
            sumPrice += (cartArray[i].quantity * data[j].price)
        totalQuantity.textContent = sumQuanttity;
        totalPrice.textContent = sumPrice;


            }}}
        
        ////////// modif des quantités /////////////
        let quantityCart = document.getElementsByClassName("itemQuantity");
        let item = document.getElementsByClassName("cart__item");
        for (let i = 0; i < cartArray.length; i++){//surveillance des quantités
            quantityCart[i].addEventListener('change', function(modifPanier){
                modifPanier.stopPropagation();
                modifPanier.preventDefault();
    
            let itemQuantity = quantityCart[i].value;
            let itemId = item[i].dataset.id;
            let itemColor = item[i].dataset.color;

            let itemModified = {//def du produits avec les quantités modifiées 
                ID : itemId,
                couleur : itemColor,
                quantity : parseInt(itemQuantity, 10)
            }
            console.log(itemModified);
            if (cartArray){
                let item = cartArray.find(// si trouvé dans le panier ID + color ajoute la quantité et push dans le local storage
                    (item) =>
                    (item.ID == itemModified.ID && item.couleur == itemModified.couleur)
                    );
                if (item){
                    item.quantity = itemModified.quantity;
                    localStorage.setItem("cartArray", JSON.stringify(cartArray));
                    window.location.href = "cart.html";//actualisation de la page  
                    return;
                }
                cartArray.push(itemModified);
                localStorage.setItem("cartArray", JSON.stringify(cartArray));
                }      
            })
        }
        console.log(cartArray);

        /////////suppressions/////////

        let deleteItem = document.getElementsByClassName("deleteItem");
        for (let i = 0; i < cartArray.length; i++){//surveillance des suppressions
            deleteItem[i].addEventListener('click', function(deleteItemWatch){
                deleteItemWatch.stopPropagation();
                deleteItemWatch.preventDefault();
    
            cartArray.splice([i], 1);
            localStorage.setItem("cartArray", JSON.stringify(cartArray));
            window.location.href = "cart.html";//actualisation de la page
            }
            )}
        }
    
        catch (error) {
        console.error(error)
        }
}
///////// déclaration des variables de controle////////

let firstNameRegex, 
    lastNameRegex, 
    cityRegex, 
    addressRegex, 
    mailRegex 
    = false ;

    //////whatch and control first name///// 
let firstName = document.getElementById("firstName");
    firstName.addEventListener('change', function(firstNameWatch){
    console.log(firstName.value);
let regexText = /^([A-Z]{1}[A-Za-z- ]+)$/;  //lettres avec au moins une majuscule et -" "
    if (regexText.test(firstName.value)){
        document.getElementById("firstNameErrorMsg").textContent = ""
        return firstNameRegex = true;
    } else {
        document.getElementById("firstNameErrorMsg").textContent = "Le format de votre prénom n'est pas valide"
        return firstNameRegex = false;
}});

    //////whatch and control last name///// 
let lastName = document.getElementById("lastName");
    lastName.addEventListener('change', function(lastNameWatch){
    console.log(lastName.value);
let regexText = /^([A-Z]{1}[A-Za-z- ]+)$/;  //lettres avec au moins une majuscule et -" "
    if (regexText.test(lastName.value)){
        document.getElementById("lastNameErrorMsg").textContent = ""
        return lastNameRegex = true;
    } else {
        document.getElementById("lastNameErrorMsg").textContent = "Le format de votre nom n'est pas valide"
        return lastNameRegex = false;
}});

    //////whatch and control city///// 
let city = document.getElementById("city");
    city.addEventListener('change', function(cityWatch){
    console.log(city.value);
let regexText = /^([A-Z]{1}[A-Za-z- ]+)$/; //lettres avec au moins une majuscule et -" "
    if (regexText.test(city.value)){
        document.getElementById("cityErrorMsg").textContent = ""
        return cityRegex = true;
    } else {
        document.getElementById("cityErrorMsg").textContent = "Le format de votre ville n'est pas valide"
        return cityRegex = false;
    }});

    //////whatch and control adress///// 
let address = document.getElementById("address");
    address.addEventListener('change', function(addressWatch){
    console.log(address.value);
let regexAddress = /^[a-zA-Z0-9- ,]{5,50}$/;  //entre 5 et 50 alpha + -," "
    if (regexAddress.test(address.value)){
        document.getElementById("addressErrorMsg").textContent = ""
        return addressRegex = true;
    } else {
        document.getElementById("addressErrorMsg").textContent = "Le format de votre adresse n'est pas valide"
        return addressRegex = false;
}});

    //////whatch and control email///// 
let mail = document.getElementById("email");
    mail.addEventListener('change', function(mailWatch){
    console.log(mail.value);
let regexMail = /^\w+([\._-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  // alpha + .-_ + alpha + @ + alpha + . + 2 ou 3 aplha
    if (regexMail.test(mail.value)){
        document.getElementById("emailErrorMsg").textContent = ""
        return mailRegex = true;
    } else {
        document.getElementById("emailErrorMsg").textContent = "Le format de votre email n'est pas valide"
        return mailRegex = false;
}});

//////formulaire/////
let contact = {};
let order = document.getElementById("order")
order.addEventListener('click', function(orderWatch){
    orderWatch.stopPropagation();
    orderWatch.preventDefault();

    if (    //si formulaire valide
        firstNameRegex === true &&
        lastNameRegex === true &&
        cityRegex === true &&
        addressRegex === true &&
        mailRegex === true
        ) {
            contact = {
                firstName : firstName.value, 
                lastName : lastName.value,
                address : address.value,
                city : city.value, 
                email : mail.value,
            }
            let products = []
                for (let i = 0; i < cartArray.length; i++){
                   let productsId = [cartArray[i].ID];
                   products.splice(i, 0 ,productsId);
                }

        ///////send order /////
        let sendOrder = "http://localhost:3000/api/products/order"
            fetch(sendOrder, {
            method: "POST",
            body: JSON.stringify({contact, products}),
            headers: {"Accept": "application/json", "Content-type": "application/json"}})
            .then((response) => {
            return response.json();
            })
            .then((server) => {
                orderId = server.orderId;
            })
        if (orderId != ""){
            location.href = "confirmation.html?id="+orderId;
        }
    } else if (cartArray.length = 0)  {
        let titleCartEmpty = document.getElementById("cartAndFormContainer")
        titleCartEmpty.innerHTML = `<h1>Vous ne pouvez pas commander un panier vide !</h1>`
    }     
})