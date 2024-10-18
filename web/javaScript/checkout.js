
payhere.onCompleted = function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);

    // Show success alert
    Swal.fire({
        title: 'Success!',
        text: "Payment successful",
        icon: 'success',
        confirmButtonText: 'Cool'
    }).then((result) => {
        // If 'Cool' button is clicked, reload the page
        if (result.isConfirmed) {
            window.location.reload();  // Reload the page
        }
    });
};


// Payment window closed
payhere.onDismissed = function onDismissed() {
    console.log("Payment dismissed");


};

// Error occurred
payhere.onError = function onError(error) {

    console.log("Error:" + error);
};

async  function loadData() {
    const response = await  fetch(
            "LoadCheckout",
            );

    if (response.ok) {
        const json = await response.json();
        console.log(json);

        if (json.success) {

            //store response data
            const address = json.address;
            const cityList = json.cityList;
            const cartList = json.cartitemList;

            //load citis
            let citySelect = document.getElementById("city");
            citySelect.length = 1;

            cityList.forEach(city => {
                let cityOption = document.createElement("option");
                cityOption.innerHTML = city.name;
                cityOption.value = city.id;
                citySelect.appendChild(cityOption);
            });

            //load current address checkbox
            let currentAddressCheckbox = document.getElementById("checkbox1");
            currentAddressCheckbox.addEventListener("change", e => {
                let fname = document.getElementById("first-name");
                let lname = document.getElementById("last-name");
                let line1 = document.getElementById("address1");
                let line2 = document.getElementById("address2");
                let postalCode = document.getElementById("postal-code");
                let mobile = document.getElementById("mobile");

                if (currentAddressCheckbox.checked) {
                    fname.value = address.fname;
                    lname.value = address.lname;

                    citySelect.value = address.city.id;
                    citySelect.disabled = true;
                    citySelect.dispatchEvent(new Event("change"));

                    line1.value = address.line1;
                    line2.value = address.line2;
                    postalCode.value = address.postalCode;
                    mobile.value = address.mobile;
                } else {
                    fname.value = "";
                    lname.value = "";

                    citySelect.value = 0;
                    citySelect.disabled = false;
                    citySelect.dispatchEvent(new Event("change"));

                    line1.value = "";
                    line2.value = "";
                    postalCode.value = "";
                    mobile.value = "";
                }

            });

            //load cart items
            let st_item = document.getElementById("st-item-tr");
            let st_subTotle = document.getElementById("st-subtotal-tr");
            let st_shipping_tr = document.getElementById("st-shipping-tr");
            let st_order_total_tr = document.getElementById("st-order-total-tr");
            let st_tbody = document.getElementById("st-tbody");
            let payBtn = document.getElementById("payBtn");

            st_tbody.innerHTML = "";

            let subTot = 0;

            cartList.forEach(item => {
                let stitemClone = st_item.cloneNode(true);
                stitemClone.querySelector("#st-item-title").innerHTML = item.product.title;
                stitemClone.querySelector("#st-item-qty").innerHTML = item.qty;
                stitemClone.querySelector("#st-item-subtotal").innerHTML = "Rs." + new Intl.NumberFormat("en-US").format(item.product.price * item.qty);
                subTot += item.product.price * item.qty;

                st_tbody.appendChild(stitemClone);
            });

            st_subTotle.querySelector("#st-subtotal").innerHTML = "Rs." + new Intl.NumberFormat("en-US").format(subTot);
            st_tbody.appendChild(st_subTotle);


            //update total on change
            citySelect.addEventListener("change", e => {
                //update shipping chargers

                //get cart item count
                let itemCount = cartList.length;

                let shippingAmount = 0;

                if (citySelect.value == 1) {
                    //colombo
                    shippingAmount = itemCount * 300;
                } else {
                    //out of colombo
                    shippingAmount = itemCount * 500;
                }

                st_shipping_tr.querySelector("#st-shipping-amount").innerHTML = "Rs." + new Intl.NumberFormat("en-US").format(shippingAmount);
                st_tbody.appendChild(st_shipping_tr);

                //update total
                st_order_total_tr.querySelector("#st-order-total-amount").innerHTML = "Rs." + new Intl.NumberFormat("en-US").format(subTot + shippingAmount);
                st_tbody.appendChild(st_order_total_tr);

                st_tbody.appendChild(payBtn);

            });



            citySelect.dispatchEvent(new Event("change"));

        } else {
            window.location = "sign-in.html";
        }


    } else {
        console.log("error");
    }
}

async  function checkout() {
    //check address status
    let isCurrentAddress = document.getElementById("checkbox1").checked;

    //get address data
    let fname = document.getElementById("first-name");
    let lname = document.getElementById("last-name");
    let line1 = document.getElementById("address1");
    let line2 = document.getElementById("address2");
    let postalCode = document.getElementById("postal-code");
    let mobile = document.getElementById("mobile");
    let citySelect = document.getElementById("city");

    const data = {
        isCurrentAddress: isCurrentAddress,
        fname: fname.value,
        lname: lname.value,
        line1: line1.value,
        line2: line2.value,
        postalCode: postalCode.value,
        mobile: mobile.value,
        city: citySelect.value

    };


    const response = await  fetch(
            "Checkout",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }
    );

    if (response.ok) {
        const json = await  response.json();
        console.log(json);

        if (json.success) {
            console.log(json.payhereJson);
            payhere.startPayment(json.payhereJson);

        } else {
            console.log(json.msg);
        }

    } else {
        console.log("Error");
    }
}