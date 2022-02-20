let searchUrl = new URLSearchParams(document.location.search);
let orderIdUrl = searchUrl.get("id");
let orderId = document.getElementById("orderId");
orderId.textContent = orderIdUrl;