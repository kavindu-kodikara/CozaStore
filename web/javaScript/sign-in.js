
async function SignIn() {
    
    var btn = document.getElementById("btn-submit");
    
    btn.innerHTML = '<div class="text-center"><div class="spinner-border " role="status"><span class="visually-hidden">Loading...</span></div></div>'

    const user_dto = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };


    const response = await  fetch(
            "SignIn",
            {
                method: "POST",
                body: JSON.stringify(user_dto),
                headers: {
                    "Content-Type": "application/json"
                }
            }

    );

    if (response.ok) {
        const json = await response.json();
        console.log(json);
        btn.innerHTML = "Sign In"
        
        

        if (json.success) {
            window.location = "index.html";
        } else {

            if (json.content === "unverified") {
                console.log(json.content);
                window.location = "verify-account.html";

            } else {

                
                Swal.fire({
                    title: 'Error!',
                    text: json.content,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }

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

