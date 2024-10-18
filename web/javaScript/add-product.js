
async function loadComponents() {
    const response = await fetch("LoadAddProductComponents");

    if (response.ok) {

        const json = await response.json();

        if (json.success) {

            const categoryList = json.categoryList;
            const subCategoryList = json.subCategoryList;
            const colorList = json.colorList;
            const sizeList = json.sizeList;

            loadSelect(categoryList, "category", ["id", "name"]);
            loadSelect(subCategoryList, "sub-category", ["id", "name"]);
            loadSelect(colorList, "color", ["id", "name"]);
            loadSelect(sizeList, "size", ["id", "name"]);

        }


    } else {
        console.log("Error");
        Swal.fire({
            title: 'Error!',
            text: "Something went wrong please try again later.",
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }
}


function loadSelect(list, elementId, propertyArray) {
    const element = document.getElementById(elementId);
    list.forEach(item => {
        let optionTag = document.createElement("option");
        optionTag.value = item[propertyArray[0]];
        optionTag.innerHTML = item[propertyArray[1]];
        element.appendChild(optionTag);
    });
}

async function addProduct() {
    const data = new FormData();
    data.append("categoryId", document.getElementById("category").value);
    data.append("subCategoryId", document.getElementById("sub-category").value);
    data.append("title", document.getElementById("title").value);
    data.append("colorId", document.getElementById("color").value);
    data.append("sizeId", document.getElementById("size").value);
    data.append("price", document.getElementById("price").value);
    data.append("qty", document.getElementById("qty").value);
    data.append("description", document.getElementById("description").value);

    data.append("image1", document.getElementById("image1").files[0]);
    data.append("image2", document.getElementById("image2").files[0]);
    data.append("image3", document.getElementById("image3").files[0]);


    const response = await fetch(
            "AddProduct",
            {
                method: "POST",
                body: data
            }
    );

    if (response.ok) {

        const json = await response.json();
        console.log(json);
        console.log(json.content);

        if (json.success) {

            console.log(json.content);

            Swal.fire({
                title: 'Success!',
                text: json.content,
                icon: 'success',
                confirmButtonText: 'Okay'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location = 'add-product.html';
                }
            });

        } else {
            Swal.fire({
                title: 'Error!',
                text: json.content,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }


    } else {
        console.log("Error");
        Swal.fire({
            title: 'Error!',
            text: "Something went wrong please try again later.",
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }
}