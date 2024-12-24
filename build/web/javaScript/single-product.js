
async function loadSingleViewProduct() {

  
    const parameters = new URLSearchParams(window.location.search);

    if (parameters.has("id")) {
        const productId = parameters.get("id");
        

        const response = await fetch("LoadSingleProduct?id=" + productId);

        if (response.ok) {

            const json = await response.json();
            console.log(json);

            const id = json.product.id;

            document.getElementById("image1-img").src = "product-images/" + id + "/image1.png";
            document.getElementById("image2-img").src = "product-images//" + id + "//image2.png";
            document.getElementById("image3-img").src = "product-images//" + id + "//image3.png";
            
            document.getElementById("image1-a").href = "product-images/" + id + "/image1.png";
            document.getElementById("image2-a").href = "product-images//" + id + "//image2.png";
            document.getElementById("image3-a").href = "product-images//" + id + "//image3.png";






           document.getElementById("title").innerHTML = json.product.title;
           document.getElementById("price").innerHTML ="Rs. "+ new Intl.NumberFormat("en-US").format(json.product.price) +" .00";
           document.getElementById("description").innerHTML = json.product.description;
           document.getElementById("size").innerHTML = json.product.size.name;
           document.getElementById("color").innerHTML = json.product.color.name;
           document.getElementById("category").innerHTML = json.product.subCategory.category.name +" - "+json.product.subCategory.name;
          
          
          
          
          
          
          


           document.getElementById("add-to-cart-main").addEventListener(
                   "click",
                   (e) => {
               addToCart(json.product.id, document.getElementById("add-to-cart-qty").value);
               e.preventDefault();
           }
           );



            

        } else {
            window.location = "index.html";
        }

    } else {
        window.location = "index.html";
    }


}

async  function addToCart(id, qty) {
    console.log("add" + id);
    console.log("qty" + qty);

    const response = await  fetch(
            "AddToCart?id=" + id + "&qty=" + qty,
            );

    if (response.ok) {
        const json = await response.json();

        if (json.success) {
            console.log(json.content);
            Swal.fire({
                title: 'Success!',
                text: json.content,
                icon: 'success',
                confirmButtonText: 'Okay'
            })
        } else {
            console.log(json.content);
            Swal.fire({
                title: 'Error!',
                text: json.content,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }

    } else {
        console.log("error");
         Swal.fire({
            title: 'Error!',
            text: "Something went wrong please try again later.",
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }

}