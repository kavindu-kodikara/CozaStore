
async function create_acoount() {
    
    const data = {
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };
    
    const response = await fetch(
            "SignUp",
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
        
        if (json.success){
            
            window.location = "verify-account.html";
            
        }else{
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

