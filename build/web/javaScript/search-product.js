

async  function loadComponents() {

    const response = await  fetch("LoadData");

    if (response.ok) {
        const json = await  response.json();
        console.log(json);

        //load category list
        loadOption("category", json.categoryList);
        //load condition list
        loadOption("color", json.colorList);
        //load storage list
        loadOption("storage", json.sizeList);


        updateProductView(json);


    } else {
        console.log("error");
    }

}

function loadOption(prefix, dataList) {
    let Options = document.getElementById(prefix + "-options");
    let Li = document.getElementById(prefix + "-li");
    Options.innerHTML = "";

    let categoryList = dataList;
    categoryList.forEach(data => {
        let LiClone = Li.cloneNode(true);
        LiClone.innerHTML = data.name;
        Options.appendChild(LiClone);
    });

    //start: template JS
    const categoryOptions = document.querySelectorAll('#' + prefix + '-options li');
    categoryOptions.forEach(option => {
        option.addEventListener('click', function () {
            categoryOptions.forEach(opt => opt.classList.remove('chosen'));
            this.classList.add('chosen');
        });
    });
    //end: template JS
}

async function searchProducts(firstResult) {

    //get search data
    let category_name = document.getElementById("category-options").querySelector(".chosen")?.querySelector("a").innerHTML;
    let condition_name = document.getElementById("condition-options").querySelector(".chosen")?.querySelector("a").innerHTML;
    let color_name = document.getElementById("color-options").querySelector(".chosen")?.querySelector("a").style.backgroundColor;
    let storage_name = document.getElementById("storage-options").querySelector(".chosen")?.querySelector("a").innerHTML;
    let sort_text = document.getElementById("st-sort").value;
    let price_range_start = $('#slider-range').slider('values', 0);
    let price_range_end = $('#slider-range').slider('values', 1);

    const data = {
        category_name: category_name,
        condition_name: condition_name,
        color_name: color_name,
        storage_name: storage_name,
        sort_text: sort_text,
        price_range_start: price_range_start,
        price_range_end: price_range_end,
        firstResult: firstResult
    };



    const response = await  fetch(
            "SearchProducts",
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
            updateProductView(json)
        }

    } else {
        console.log("error");
    }
}

var st_product = document.getElementById("st-product");

var currentPage = 0;

function updateProductView(json) {
    //load product list
    let st_product_container = document.getElementById("st-product-container");
    st_product_container.innerHTML = "";

    json.productList.forEach(product => {
        let st_product_clone = st_product.cloneNode(true);

        st_product_clone.querySelector("#st-product-img").src = "product-images/" + product.id + "/image1.png";
        st_product_clone.querySelector("#st-product-price").innerHTML = "Rs." + new Intl.NumberFormat("en-US").format(product.price) + ".00";
        st_product_clone.querySelector("#st-product-title").innerHTML = product.title;

        st_product_container.appendChild(st_product_clone);
    });

    //load paigination

    let paigination_container = document.getElementById("st-pagination-container");
    let paigination_btn = document.getElementById("st-pagination-btn");
    paigination_container.innerHTML = "";

    let pages = Math.ceil(json.allProductCount / 6);

    if (currentPage != 0) {
        let paigination_btn_clone_prev = paigination_btn.cloneNode(true);
        paigination_btn_clone_prev.innerHTML = "Prev";
        paigination_btn_clone_prev.addEventListener("click", e => {
            currentPage--
            searchProducts(currentPage * 6);
        });
        paigination_container.appendChild(paigination_btn_clone_prev);
    }



    for (let i = 0; i < pages; i++) {
        let paigination_btn_clone = paigination_btn.cloneNode(true);
        paigination_btn_clone.innerHTML = i + 1;

        paigination_btn_clone.addEventListener("click", e => {
            currentPage = i;
            searchProducts(i * 6);
        });
        paigination_container.appendChild(paigination_btn_clone);
    }

    if (currentPage != (pages-1)) {

        let paigination_btn_clone_next = paigination_btn.cloneNode(true);
        paigination_btn_clone_next.innerHTML = "Next";
        paigination_btn_clone_next.addEventListener("click", e => {
            currentPage++
            searchProducts(currentPage * 6);
        });
        paigination_container.appendChild(paigination_btn_clone_next);
    }



}