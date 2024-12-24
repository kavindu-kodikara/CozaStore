

async function verification() {


    const data = {
        code: document.getElementById("code").value
    };

    const response = await fetch(
            "Verification",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }
    );

    if (response.ok) {

        const json = await response.json();
        console.log(json);

        if (json.success) {
            
            Swal.fire({
                title: 'Success!',
                text: json.content,
                icon: 'success',
                confirmButtonText: 'Okay'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location = 'index.html';
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


