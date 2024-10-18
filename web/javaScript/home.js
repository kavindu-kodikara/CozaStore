

async function checksignIn() {

    const response = await  fetch("CheckSignin");

    if (response.ok) {

        const json = await  response.json();

        console.log(json);

        const btn = document.getElementById("myAccountBtn");

        if (json.sign) {
            btn.innerHTML = "My Account";
            btn.href = "my-account.html";
        } else {
            btn.innerHTML = "Sign in";
            btn.href = "sign-in.html";
        }

    } else {
        console.log("Error in check signin");
    }

}

async function loadProductIndex() {

    const response = await  fetch("LoadProductIndex");

    if (response.ok) {

        const json = await response.json();
        console.log(json);

        let st_product_container = document.getElementById("st-product-container");
        let st_product = document.getElementById("st-product");
        st_product_container.innerHTML = "";

        json.productList.forEach(product => {
            let st_product_clone = st_product.cloneNode(true);

            st_product_clone.querySelector("#st-product-img").src = "product-images/" + product.id + "/image1.png";
            st_product_clone.querySelector("#st-product-price").innerHTML = "Rs." + new Intl.NumberFormat("en-US").format(product.price) + ".00";
            st_product_clone.querySelector("#st-product-title").innerHTML = product.title;
            st_product_clone.querySelector("#st-product-a").href="product-detail.html?id="+product.id;

            st_product_container.appendChild(st_product_clone);
        });

    } else {
        console.log("Error loading Product");
    }

}