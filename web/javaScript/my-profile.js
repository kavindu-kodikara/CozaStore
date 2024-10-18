

async function loadDetails() {

    const response = await  fetch("LoadMyProfile");

    if (response.ok) {

        const json = await response.json();
        console.log(json);

        if (json.success) {
            document.getElementById("fname").value = json.details.fname;
            document.getElementById("lname").value = json.details.lname;
            document.getElementById("password").value = json.details.password;
        }

    } else {
        console.log("Error loading details");
    }

}

async function  saveDetails() {

    const data = {
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        pw1: document.getElementById("newPassword").value,
        pw2: document.getElementById("ReNewPassword").value
    };

    const response = await fetch(
            "UpdateMyDetails",
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
            

            Swal.fire({
                title: 'Success!',
                text: json.content,
                icon: 'success',
                confirmButtonText: 'Okay'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
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
        console.log("Error while updating details");
        Swal.fire({
            title: 'Error!',
            text: "Something went wrong please try again later.",
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }


}
