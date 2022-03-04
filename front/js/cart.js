let cartArray = JSON.parse(localStorage.getItem("cartArray"));//récup du localStorage
let orderId = ""; //déclaration du n° de commande renvoyé par l'API

//vérification du panier et affichage à l'utilisateur si vide
if (cartArray === null || cartArray.length === 0) {
    let titleCartEmpty = document.getElementById("cartAndFormContainer")
    titleCartEmpty.innerHTML = `<h1>Votre panier est vide</h1>`
}
else {
    let API = "http://localhost:3000/api/products";
    //requète API
    fetch(API)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.length);
            displayData(cartArray, data);
        })
        .catch(function (error) {
            console.error(error);
        })
}
//////////afficher les articles en panier //////////
function displayData(cartArray, data) {
    try {
        let sumQuanttity = 0;   // déclaration de la variable du cumule des quantités
        let sumPrice = 0        //dé claration de la variable du prix des articles
        for (let i = 0; i < cartArray.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (cartArray[i].ID === data[j]._id) {   //lien sur ID entre API et localStorage

                    /////affichage des produits/////
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
                    <div class="cart__item__content__settings__delete" onclick="deleteItem(${cartArray[i].ID}, ${cartArray[i].couleur})">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>
        `

                    /////// calcul des totaux ///////
                    sumQuanttity += cartArray[i].quantity;
                    sumPrice += (cartArray[i].quantity * data[j].price)


                }
            }
        }
        displayTotal(sumQuanttity, sumPrice)


        ////////// modif des quantités /////////////

        let changeItems = document.getElementsByClassName("itemQuantity");
        for (let i = 0; i < changeItems.length; i++) {//surveillance des quantités
            changeItems[i].addEventListener('change', function (event) {
                changeItem(i, data);
            }
            )
        }

        /////////suppressions/////////

        let deleteItems = document.getElementsByClassName("deleteItem");
        for (let i = 0; i < deleteItems.length; i++) {//surveillance des suppressions
            deleteItems[i].addEventListener('click', function (event) {
                deleteItem(i, data);
            }
            )
        }
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
        = false;




let regexText = /^([A-Z]{1}[A-Za-z- ]+)$/;  //lettres avec au moins une majuscule et -" "
let regexAddress = /^[a-zA-Z0-9- ,]{5,50}$/;    //entre 5 et 50 alpha + -," "
let regexMail = /^\w+([\._-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;   //alpha + .-_ + alpha + @ + alpha + . + 2 ou 3 aplha
let titre = "";
let element = "";
let ErrorMsg = "";

/////fonction test regex //////
function verif(regex, value) {
    let test = regex.test(value);
    if (test) {
        return variableControle = true;
    } else {
        return variableControle = false;
    }
}
/////fonction message utilisateur/////
function message(ErrorMsg, test) {
    if (test) {
        ErrorMsg.textContent = ""
    } else {
        ErrorMsg.textContent = "Le format de votre ville n'est pas valide. Ex Paris"
    }
}


//////surveillance et contrôle first name///// 
titre = "firstName";
element = document.getElementById(`${titre}`);
ErrorMsg = document.getElementById(`${titre + "ErrorMsg"}`);
element.addEventListener('change', function (event) {
    verif(regexText, element.value);
    console.log(variableControle);
    message(ErrorMsg, variableControle);
    firstNameRegex = variableControle

    console.log(firstNameRegex);
});

//////surveillance et contrôle last name///// 
titre = "lastName";
element = document.getElementById(`${titre}`);
ErrorMsg = document.getElementById(`${titre + "ErrorMsg"}`);
element.addEventListener('change', function (event) {
    verif(regexText, element.value);
    message(ErrorMsg, lastNameRegex);
    lastNameRegex = variableControle;
    console.log(lastNameRegex);
});

//////surveillance et contrôle city///// 
titre = "city";
element = document.getElementById(`${titre}`);
ErrorMsg = document.getElementById(`${titre + "ErrorMsg"}`);
element.addEventListener('change', function (event) {
    verif(regexText, element.value);
    message(ErrorMsg, cityRegex);
    cityRegex = variableControle;
    console.log(cityRegex);
});

//////surveillance et contrôle adress///// 
let address = document.getElementById("address");
address.addEventListener('change', function (addressWatch) {
    console.log(address.value);
    if (regexAddress.test(address.value)) {      //affichage du test regex à l'utilisateur et stockage du résultat
        document.getElementById("addressErrorMsg").textContent = ""
        return addressRegex = true;
    } else {
        document.getElementById("addressErrorMsg").textContent = "Le format de votre adresse n'est pas valide. Ex: 10 rue du parc"
        return addressRegex = false;
    }
});

//////surveillance et contrôle email///// 
let mail = document.getElementById("email");
mail.addEventListener('change', function (mailWatch) {
    console.log(mail.value);
    if (regexMail.test(mail.value)) {                                //affichage du test regex à l'utilisateur et stockage du résultat
        document.getElementById("emailErrorMsg").textContent = ""
        return mailRegex = true;
    } else {
        document.getElementById("emailErrorMsg").textContent = "Le format de votre email n'est pas valide. Ex: john.doe@adresse.fr"
        return mailRegex = false;
    }
});

//////formulaire/////

////désactivation du bouton si form invalide/////
function disableBouton() {
    const submitBtn = document.getElementById('order');
    if (firstNameRegex === true &&
        lastNameRegex === true &&
        cityRegex === true &&
        addressRegex === true &&
        mailRegex === true) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}
//// surveillance des inputs/////
const inputs = document.getElementsByTagName("input");
for (let input of inputs) {
    console.log(input)
    input.addEventListener('change', (event) => {
        disableBouton();
    });
}

let contact = {};           //création de l'objet contact à envoyer à l'API
let order = document.getElementById("order")    //surveillance du click commande
order.addEventListener('click', function (orderWatch) {
    if (                    //si formulaire valide
        firstNameRegex === true &&
        lastNameRegex === true &&
        cityRegex === true &&
        addressRegex === true &&
        mailRegex === true
    ) {

        contact = {         //collect des données de l'objet contact
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: mail.value,
        }

        let products = []
        for (let i = 0; i < cartArray.length; i++) {
            let productsId = [cartArray[i].ID];
            products.splice(i, 0, productsId);
        }

        ///////envoie de la commande à l'API/////
        let sendOrder = "http://localhost:3000/api/products/order"
        fetch(sendOrder, {
            method: "POST",
            body: JSON.stringify({ contact, products }),
            headers: { "Accept": "application/json", "Content-type": "application/json" }
        })
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((server) => {
                orderId = server.orderId;

                if (orderId != "") {     //redirection vers la page confirmation avec l'Id de la commande
                    location.href = "confirmation.html?id=" + orderId;
                    localStorage.clear();
                }
            })
    }
})

////affichage du total/////
function displayTotal(sumQuanttity, sumPrice) {
    let totalQuantity = document.getElementById("totalQuantity");
    let totalPrice = document.getElementById("totalPrice");
    totalQuantity.textContent = sumQuanttity;
    totalPrice.textContent = sumPrice;

}

//// suppression /////
function deleteItem(i, data) {
    const item = cartArray[i];
    let prix = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i]._id === item.ID) {
            prix = data[i].price;
            break
        }
    }
    let totalQuantity = document.getElementById("totalQuantity").textContent;
    let totalPrice = document.getElementById("totalPrice").textContent;
    const sommeQuantity = Number(totalQuantity) - item.quantity
    const sommePrix = Number(totalPrice) - (item.quantity * prix)
    displayTotal(sommeQuantity, sommePrix)
    const articles = document.getElementsByClassName("cart__item")
    let article = null;
    for (let i = 0; i < articles.length; i++) {
        console.log(articles[i].dataset.id)
        if (
            articles[i].dataset.id === item.ID && articles[i].dataset.color === item.couleur
        ) {
            article = articles[i];
            console.log(prix);
            break
        }
    }
    const section = document.getElementById("cart__items");
    section.removeChild(article);
    console.log(article);
    cartArray.splice([i], 1);//suppression dans le array avec l'indice
    localStorage.setItem("cartArray", JSON.stringify(cartArray));//maj du localStorage

}


///////////changements quantité//////////////////
function changeItem(i, data) {
    const item = cartArray[i];
    const articles = document.getElementsByClassName("cart__item");
    let article = null;
    let itemModified = {};
    let quantity = document.getElementsByClassName("itemQuantity");
    let prix = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i]._id === item.ID) {
            prix = data[i].price;
            console.log(prix);
            break
        }
    }
    for (let i = 0; i < data.length; i++) {
        if (articles[i].dataset.id === item.ID && item.couleur === articles[i].dataset.color) {
            article = articles[i];
            console.log(prix)
            itemModified = {
                ID: article.dataset.id,
                couleur: article.dataset.color,
                quantity: parseInt(quantity[i].value, 10)
            };
            console.log(article);
            console.log(itemModified);
            break
        }
    }
    let totalQuantity = document.getElementById("totalQuantity").textContent;
    let totalPrice = document.getElementById("totalPrice").textContent;
    const sommeQuantity = Number(totalQuantity) - (item.quantity - itemModified.quantity);
    const sommePrix = Number(totalPrice) - ((item.quantity * prix) - itemModified.quantity * prix);
    displayTotal(sommeQuantity, sommePrix);
    cartArray.splice([i], 1, itemModified);//suppression dans le array avec l'indice
    localStorage.setItem("cartArray", JSON.stringify(cartArray));//maj du localStorage

}