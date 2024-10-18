

async function loadCart() {
    const response = await  fetch(
            "LoadCartItems",
            );

    if (response.ok) {
        const json = await response.json();

        console.log(json);

        let cartProduct = document.getElementById("cart-row");
        document.getElementById("cart-table").innerHTML = "";
        document.getElementById("cart-table").innerHTML = '<tr class="table_head"><th class="column-1">Product</th><th class="column-2"></th><th class="column-3">Price</th><th class="column-4">Quantity</th><th class="column-5">Total</th></tr>';

        var tot = 0;

        json.forEach(item => {

            console.log(item.qty);
            let productClone = cartProduct.cloneNode(true);

            //change other tags
            productClone.querySelector("#cart-product-title").innerHTML = item.product.title;
            productClone.querySelector("#cart-product-price").innerHTML =  "Rs. "+ item.product.price;
            productClone.querySelector("#cart-product-subTot").innerHTML = "Rs. "+ item.product.price * item.qty;
            productClone.querySelector("#cart-product-qty").value = item.qty;
            productClone.querySelector("#cart-product-img").src = "product-images//" + item.product.id + "//image1.png";
            
            tot = tot + (item.product.price * item.qty);

            document.getElementById("cart-table").appendChild(productClone);

        });
        
        document.getElementById("cart-tot").innerHTML = "Rs. "+tot;

    } else {
        console.log("error");
    }
}

