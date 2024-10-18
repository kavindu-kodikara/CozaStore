function openLoading() {
  document.getElementById("loading").classList.replace("d-none", "d-block");
}

signUpButton = document.getElementById("signUp");
signInButton = document.getElementById("signIn");
container = document.getElementById("container");

//signUpButton.addEventListener("click", () => {
//  container.classList.add("right-panel-active");
//});

//signInButton.addEventListener("click", () => {
//  container.classList.remove("right-panel-active");
//});

function changeview() {
  var signIn = document.getElementById("signInDiv");
  var signUp = document.getElementById("signUpDiv");

  signIn.classList.toggle("d-none");
  signUp.classList.toggle("d-none");
}

function signUp() {
  var fn = document.getElementById("fname");
  var e = document.getElementById("email");
  var p = document.getElementById("password");
  var rp = document.getElementById("repassword");

  var f = new FormData();

  f.append("fn", fn.value);
  f.append("e", e.value);
  f.append("p", p.value);
  f.append("rp", rp.value);

  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "success") {
        document.getElementById("msg").innerHTML = t;
        document.getElementById("msg").className = "bi bi-check2-circle fs-5";
        document.getElementById("alertdiv").className = "alert alert-success";
        document.getElementById("msgdiv").className = "d-block";
        window.location.reload();
      } else {
        document.getElementById("msg").innerHTML = t;
        document.getElementById("msgdiv").className = "d-block";
      }
    }
  };

  r.open("POST", "signUpProcces.php", true);
  r.send(f);
}

function signIn() {
  var e = document.getElementById("siemail");
  var p = document.getElementById("sipassword");
  var r = document.getElementById("rememberme");

  var f = new FormData();

  f.append("e", e.value);
  f.append("p", p.value);
  f.append("r", r.checked);

  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "success") {
        window.location = "index.php";
      } else {
        document.getElementById("msg2").innerHTML = t;
      }
    }
  };

  r.open("POST", "signInProcess.php", true);
  r.send(f);
}

function MobilesignUp() {
  var fn = document.getElementById("Mfname");
  var e = document.getElementById("Memail");
  var p = document.getElementById("Mpassword");
  var rp = document.getElementById("Mreoassword");

  var f = new FormData();

  f.append("fn", fn.value);
  f.append("e", e.value);
  f.append("p", p.value);
  f.append("rp", rp.value);

  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "success") {
        window.location = "index.php";
      } else {
        document.getElementById("msgmobile2").innerHTML = t;
      }
    }
  };

  r.open("POST", "signUpProccesMobile.php", true);
  r.send(f);
}

function MobileSignIn() {
  var e = document.getElementById("siemail");
  var p = document.getElementById("MsignPassword");
  var r = document.getElementById("Mrememberme");

  var f = new FormData();

  f.append("e", e.value);
  f.append("p", p.value);
  f.append("r", r.checked);

  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "success") {
        window.location = "index.php";
      } else {
        document.getElementById("msgmobile1").innerHTML = t;
      }
    }
  };

  r.open("POST", "signInProcessMobile.php", true);
  r.send(f);
}

var bm;
function forgotPass() {
  var email = document.getElementById("siemail");

  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "success") {
        alert(
          "Verification code has sent to your email. Please check your inbox"
        );
        var m = document.getElementById("model");
        bm = new bootstrap.Modal(m);
        bm.show();
      } else {
        alert(t);
      }
    }
  };

  r.open("GET", "forgotPasswordProcess.php?e=" + email.value, true);
  r.send();
}
var bm;
function forgotPassMobile() {
  var email = document.getElementById("siemail");

  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "success") {
        alert(
          "Verification code has sent to your email. Please check your inbox"
        );
        var m = document.getElementById("model");
        bm = new bootstrap.Modal(m);
        bm.show();
      } else {
        alert(t);
      }
    }
  };

  r.open("GET", "forgotPasswordProcess.php?e=" + email.value, true);
  r.send();
}

function showPassword1() {
  var i = document.getElementById("npi");
  var eye = document.getElementById("e1");

  if (i.type == "password") {
    i.type = "text";
    eye.className = "bi bi-eye-fill";
  } else {
    i.type = "password";
    eye.className = "bi bi-eye-slash-fill";
  }
}

function showPassword2() {
  var i = document.getElementById("rnp");
  var eye = document.getElementById("e2");

  if (i.type == "password") {
    i.type = "text";
    eye.className = "bi bi-eye-fill";
  } else {
    i.type = "password";
    eye.className = "bi bi-eye-slash-fill";
  }
}

function resetPassword() {
  var e = document.getElementById("siemail");
  var np = document.getElementById("npi");
  var rp = document.getElementById("rnp");
  var v = document.getElementById("vc");

  var f = new FormData();

  f.append("e", e.value);
  f.append("np", np.value);
  f.append("rp", rp.value);
  f.append("v", v.value);

  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "success") {
        bm.hide();
        alert("Password reset success");
      } else {
        alert(t);
      }
    }
  };

  r.open("POST", "resetPassword.php", true);
  r.send(f);
}

function signOut() {
  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "success") {
        window.location = "index.php";
      } else {
        alert(t);
      }
    }
  };

  r.open("GET", "signoutProcess.php", true);
  r.send();
}

function brekfast() {
  var breakfastDiv = document.getElementById("breakfastDiv");
  var lunchDiv = document.getElementById("lunchDiv");
  var dinnerDiv = document.getElementById("dinnerDiv");
  var breakfastbtn = document.getElementById("breakfastbtn");
  var lunchbtn = document.getElementById("lunchbtn");
  var dinnerbtn = document.getElementById("dinnerbtn");
  var note = document.getElementById("note");
  var noteMb = document.getElementById("noteMb");

  lunchDiv.classList.add("d-none");
  dinnerDiv.classList.add("d-none");
  breakfastDiv.classList.remove("d-none");

  note.innerHTML =
    "Please order your Breakfast before 9.00 AM. We will deliver your order before 10.00 AM";
  noteMb.innerHTML =
    "Please order your Breakfast before 9.00 AM. We will deliver your order before 10.00 AM";

  lunchbtn.classList.remove("bgr");
  dinnerbtn.classList.remove("bgr");
  breakfastbtn.classList.add("bgr");
}

function lunch() {
  var breakfastDiv = document.getElementById("breakfastDiv");
  var lunchDiv = document.getElementById("lunchDiv");
  var dinnerDiv = document.getElementById("dinnerDiv");
  var breakfastbtn = document.getElementById("breakfastbtn");
  var lunchbtn = document.getElementById("lunchbtn");
  var dinnerbtn = document.getElementById("dinnerbtn");
  var note = document.getElementById("note");
  var noteMb = document.getElementById("noteMb");

  lunchDiv.classList.remove("d-none");
  dinnerDiv.classList.add("d-none");
  breakfastDiv.classList.add("d-none");

  note.innerHTML =
    "Please order your Lunch before 12.00 AM. We will deliver your order before 1.00 PM";
  noteMb.innerHTML =
    "Please order your Lunch before 12.00 AM. We will deliver your order before 1.00 PM";

  lunchbtn.classList.add("bgr");
  dinnerbtn.classList.remove("bgr");
  breakfastbtn.classList.remove("bgr");
}

function dinner() {
  var breakfastDiv = document.getElementById("breakfastDiv");
  var lunchDiv = document.getElementById("lunchDiv");
  var dinnerDiv = document.getElementById("dinnerDiv");
  var breakfastbtn = document.getElementById("breakfastbtn");
  var lunchbtn = document.getElementById("lunchbtn");
  var dinnerbtn = document.getElementById("dinnerbtn");
  var note = document.getElementById("note");
  var noteMb = document.getElementById("noteMb");

  lunchDiv.classList.add("d-none");
  dinnerDiv.classList.remove("d-none");
  breakfastDiv.classList.add("d-none");

  note.innerHTML =
    "Please order your Dinner before 6.00 PM. We will deliver your order before 7.00 PM";
  noteMb.innerHTML =
    "Please order your Dinner before 6.00 PM. We will deliver your order before 7.00 PM";

  lunchbtn.classList.remove("bgr");
  dinnerbtn.classList.add("bgr");
  breakfastbtn.classList.remove("bgr");
}

function allProduct(cid) {
  var f = new FormData();

  f.append("cid", cid);

  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if ((t = "success")) {
        window.location = "allProduct.php";
      }
    }
  };

  r.open("POST", "loadProductCategory.php", true);
  r.send(f);
}

function pload(id) {
  var f = new FormData();

  f.append("cid", id);

  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      document.getElementById("product").innerHTML = t;
    }
  };

  r.open("POST", "loadProduct.php", true);
  r.send(f);
}

function singleProductView(id) {
  var f = new FormData();

  f.append("id", id);

  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;

      if ((r = "success")) {
        window.location = "singleProductView.php";
      } else {
        alert(t);
      }
    }
  };

  r.open("POST", "SingleProductViewProcess.php", true);
  r.send(f);
}

function selectHalf(id) {
  if (document.getElementById("half").checked) {
    var size = "half";
    document.getElementById("size").innerHTML = "Half";
  } else if (document.getElementById("full").checked) {
    var size = "full";
    document.getElementById("size").innerHTML = "Full";
  }

  var f = new FormData();

  f.append("size", size);
  f.append("id", id);

  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      document.getElementById("price").innerHTML = "Rs. " + t + " .00";
    }
  };

  r.open("POST", "size.php", true);
  r.send(f);
}

function basic_search() {
  var txt = document.getElementById("basic_search_txt");
  var select = document.getElementById("basic_search_select");

  var f = new FormData();

  f.append("txt", txt.value);
  f.append("select", select.value);

  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      document.getElementById("basic_search_div").innerHTML = t;
    }
  };

  r.open("POST", "basic_search_process.php", true);
  r.send(f);
}

function cartDivClose() {
  var cartDiv = document.getElementById("cartDiv");
  cartDiv.classList.remove("cartdiv", "d-lg-block");
  cartDiv.classList.add("d-lg-none");
  window.location.reload();
}

var emptyModel;
var model;
function addToCart(pid, cid) {
  var qty = document.getElementById("qty").value;
  var cartDiv = document.getElementById("cartDiv");

  if (cid == 1 || cid == 2 || cid == 3 || cid == 4 || cid == 5) {
    if (document.getElementById("half").checked) {
      var size = 1;
    } else if (document.getElementById("full").checked) {
      var size = 2;
    }
  } else {
    var size = 0;
  }

  var myarray;
  var adCategoryCount = 0;

  var f = new FormData();
  f.append("pid", pid);
  f.append("qty", qty);
  f.append("size", size);
  f.append("cid", cid);
  f.append("myarray", myarray);
  f.append("adCategoryCount", adCategoryCount);

  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;

      if (t == "Sign") {
        window.location = "sign.php";
      } else if (t == "qty") {
        document.getElementById("qty").classList.add("is-invalid");
      } else if (t == "emptyAddress") {
        var em = document.getElementById("emptyModel");
        emptyModel = new bootstrap.Modal(em);
        emptyModel.show();
      } else if (t == "notInArea") {
        var em = document.getElementById("model");
        model = new bootstrap.Modal(em);
        model.show();
      } else {
        document.getElementById("itemDiv").innerHTML = t;
        cartDiv.classList.remove("d-none");
        cartDiv.classList.add("cartdiv", "d-block");
      }
    }
  };

  r.open("POST", "addToCart.php", true);
  r.send(f);
}

var emptyModel;
var model;
function addToCartWithAdFood(pid, cid, adCategoryCount) {
  var qty = document.getElementById("qty").value;
  var cartDiv = document.getElementById("cartDiv");

  if (cid == 1 || cid == 2 || cid == 3 || cid == 4 || cid == 5) {
    if (document.getElementById("half").checked) {
      var size = 1;
    } else if (document.getElementById("full").checked) {
      var size = 2;
    }
  } else {
    var size = 0;
  }

  var array = [];
  for (var x = 0; x < adCategoryCount; x++) {
    var id = "adSelect" + x;
    var adSelect = document.getElementById(id).value;
    array[x] = adSelect;
  }

  var myarray = JSON.stringify(array);

  var f = new FormData();
  f.append("pid", pid);
  f.append("qty", qty);
  f.append("size", size);
  f.append("cid", cid);
  f.append("myarray", myarray);
  f.append("adCategoryCount", adCategoryCount);

  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;

      if (t == "Sign") {
        window.location = "sign.php";
      } else if (t == "qty") {
        document.getElementById("qty").classList.add("is-invalid");
      } else if (t == "emptyAddress") {
        var em = document.getElementById("emptyModel");
        emptyModel = new bootstrap.Modal(em);
        emptyModel.show();
      } else if (t == "notInArea") {
        var em = document.getElementById("model");
        model = new bootstrap.Modal(em);
        model.show();
      } else {
        document.getElementById("itemDiv").innerHTML = t;
        cartDiv.classList.remove("d-none");
        cartDiv.classList.add("cartdiv", "d-block");
      }
    }
  };

  r.open("POST", "addToCart.php", true);
  r.send(f);
}

var emptyModel2;
var model2;

function singleProductBuy(pid, cid) {
  var qty = document.getElementById("qty").value;

  if (cid == 1 || cid == 2 || cid == 3 || cid == 4 || cid == 5) {
    if (document.getElementById("half").checked) {
      var size = 1;
    } else if (document.getElementById("full").checked) {
      var size = 2;
    }
  } else {
    var size = 0;
  }

  var adCategoryCount = 0;
  var myarray;

  var f = new FormData();
  f.append("pid", pid);
  f.append("qty", qty);
  f.append("size", size);
  f.append("cid", cid);
  f.append("myarray", myarray);
  f.append("adCategoryCount", adCategoryCount);

  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;

      if (t == "Sign") {
        window.location = "sign.php";
      } else if (t == "qty") {
        document.getElementById("qty").classList.add("is-invalid");
      } else if (t == "emptyAddress") {
        var em = document.getElementById("emptyModel");
        emptyModel2 = new bootstrap.Modal(em);
        emptyModel2.show();
      } else if (t == "notInArea") {
        var em = document.getElementById("model");
        model2 = new bootstrap.Modal(em);
        model2.show();
      } else if (t == "success") {
        window.location = "checkout.php";
      } else {
        alert(t);
      }
    }
  };

  r.open("POST", "singleProductBuy.php", true);
  r.send(f);
}

function singleProductBuyWithAdFood(pid, cid, adCategoryCount) {
  var qty = document.getElementById("qty").value;

  if (cid == 1 || cid == 2 || cid == 3 || cid == 4 || cid == 5) {
    if (document.getElementById("half").checked) {
      var size = 1;
    } else if (document.getElementById("full").checked) {
      var size = 2;
    }
  } else {
    var size = 0;
  }

  var array = [];
  for (var x = 0; x < adCategoryCount; x++) {
    var id = "adSelect" + x;
    var adSelect = document.getElementById(id).value;
    array[x] = adSelect;
  }

  var myarray = JSON.stringify(array);

  var f = new FormData();
  f.append("pid", pid);
  f.append("qty", qty);
  f.append("size", size);
  f.append("cid", cid);
  f.append("myarray", myarray);
  f.append("adCategoryCount", adCategoryCount);

  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;

      if (t == "Sign") {
        window.location = "sign.php";
      } else if (t == "qty") {
        document.getElementById("qty").classList.add("is-invalid");
      } else if (t == "emptyAddress") {
        var em = document.getElementById("emptyModel");
        emptyModel2 = new bootstrap.Modal(em);
        emptyModel2.show();
      } else if (t == "notInArea") {
        var em = document.getElementById("model");
        model2 = new bootstrap.Modal(em);
        model2.show();
      } else if (t == "success") {
        window.location = "checkout.php";
      } else {
        alert(t);
      }
    }
  };

  r.open("POST", "singleProductBuy.php", true);
  r.send(f);
}

function deleteCartAll(email) {
  var f = new FormData();
  f.append("email", email);

  var r = new XMLHttpRequest();
  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "success") {
        window.location.reload();
      } else {
        alert(t);
      }
    }
  };

  r.open("POST", "deleteCartAll.php", true);
  r.send(f);
}

function deleteCart(cid) {
  var f = new FormData();
  f.append("cid", cid);

  var r = new XMLHttpRequest();
  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "success") {
        window.location.reload();
      } else {
        alert(t);
      }
    }
  };

  r.open("POST", "deleteCart.php", true);
  r.send(f);
}

var bm;

function selectCartAll() {
  if (document.getElementById("cartSelectAll").checked) {
    var check = 1;
  } else {
    var check = 0;
  }

  var f = new FormData();

  f.append("check", check);

  var r = new XMLHttpRequest();
  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "success") {
        window.location.reload();
        document.getElementById("cartSelectAll").checked = true;
      } else if (t == "address") {
        var m = document.getElementById("model");
        bm = new bootstrap.Modal(m);
        bm.show();
      } else {
        alert(t);
      }
    }
  };

  r.open("POST", "cartSelectAll.php", true);
  r.send(f);
}

function cartSelect(id, x) {
  if (document.getElementById("cartSelect" + x).checked) {
    var check = 1;
  } else {
    var check = 0;
  }

  var f = new FormData();

  f.append("check", check);
  f.append("id", id);

  var r = new XMLHttpRequest();
  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if ((t = "success")) {
        window.location.reload();
      } else {
        alert(t);
      }
    }
  };

  r.open("POST", "cartSelect.php", true);
  r.send(f);
}

function qty_inc() {
  var input = document.getElementById("qty");
  if (input.value < 100) {
    var newValue = parseInt(input.value) + 1;
    input.value = newValue.toString();
  } else {
    alert("maximum quantity has achieved");
    input.value = 100;
  }
}

function qty_dec(minQty) {
  var input = document.getElementById("qty");
  if (input.value > minQty) {
    var newValue = parseInt(input.value) - 1;
    input.value = newValue.toString();
  } else {
    alert("minimum quantity has achieved");
    input.value = minQty;
  }
}

function selectTime(tid) {
  var f = new FormData();
  f.append("tid", tid);

  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "success") {
        window.location.reload();
      } else {
        alert(t);
      }
    }
  };

  r.open("POST", "selectTime.php", true);
  r.send(f);
}

var pm;
var checkoutM;
function paymentModel() {
  var m2 = document.getElementById("model2");
  checkoutM = new bootstrap.Modal(m2);
  checkoutM.show();
  var r = new XMLHttpRequest();
  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "success") {
        setTimeout(pmShow, 1500);
      } else if (t == "none") {
        document.getElementById("timeError").classList.remove("d-none");
        document.getElementById("timeError").classList.add("d-block");
        // alert(t);
      } else {
        alert(t);
      }
    }
  };

  r.open("POST", "deliverTimeCheck.php", true);
  r.send();
}

function pmShow() {
  var m = document.getElementById("model");
  pm = new bootstrap.Modal(m);
  checkoutM.hide();
  pm.show();
}

var adressM;
function checkout() {
  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "success") {
        window.location = "checkout.php";
      } else if (t == "address") {
        var m = document.getElementById("model");
        adressM = new bootstrap.Modal(m);
        adressM.show();
      }
    }
  };

  r.open("POST", "checkoutProcess.php", true);
  r.send();
}

var chandeDilivaryAddressM;
function chandeDilivaryAddress() {
  var m = document.getElementById("addressModal");
  chandeDilivaryAddressM = new bootstrap.Modal(m);
  chandeDilivaryAddressM.show();
}

function cardPayment() {
  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "login") {
        alert("Please log in or sign up");
        window.location = "sign.php";
      } else {
        var obj = JSON.parse(t);
        // alert(obj["hash"]);

        var mail = obj["mail"];
        var amount = obj["amount"];
        // Payment completed. It can be a successful failure.
        payhere.onCompleted = function onCompleted(orderId) {
          console.log("Payment completed. OrderID:" + orderId);

          cardPaymentSuccess(obj["id"], obj["invoice_id"]);
          // Note: validate the payment and show success or failure page to the customer
        };

        // Payment window closed
        payhere.onDismissed = function onDismissed() {
          // Note: Prompt user to pay again or show an error page
          console.log("Payment dismissed");
        };

        // Error occurred
        payhere.onError = function onError(error) {
          // Note: show an error page
          console.log("Error:" + error);
        };

        // Put the payment variables here
        var payment = {
          sandbox: true,
          merchant_id: "1221102", // Replace your Merchant ID
          return_url: "http://localhost/GameaKade/checkout.php", // Important
          cancel_url: "http://localhost/GameaKade/checkout.php", // Important
          notify_url: "http://sample.com/notify",
          order_id: obj["id"],
          items: "",
          amount: amount,
          currency: "LKR",
          hash: obj["hash"], // *Replace with generated hash retrieved from backend
          first_name: obj["fname"],
          last_name: obj["lname"],
          email: mail,
          phone: obj["mobile"],
          address: obj["address"],
          city: obj["city"],
          country: "Sri Lanka",
          delivery_address: obj["address"],
          delivery_city: obj["city"],
          delivery_country: "Sri Lanka",
          custom_1: "",
          custom_2: "",
        };

        // Show the payhere.js popup, when "PayHere Pay" is clicked
        // document.getElementById('payhere-payment').onclick = function (e) {
        payhere.startPayment(payment);
        // };
      }
    }
  };

  r.open("POST", "cardPayment.php", true);
  r.send();
}

function printInvoice() {
  var body = document.body.innerHTML;
  var page = document.getElementById("page").innerHTML;
  document.body.innerHTML = page;
  window.print();
  document.body.innerHTML = body;
}

function cardPaymentSuccess(id, invoice_id) {
  var r = new XMLHttpRequest();
  var f = new FormData();
  f.append("id", id);

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "success") {
        window.location = "invoice.php?id=" + invoice_id;
        // alert("invoice.php?id="+invoice_id);
      }
    }
  };

  r.open("POST", "cardPaymentSuccess.php", true);
  r.send(f);
}

function cashOnDelivery() {
  var r = new XMLHttpRequest();
  var f = new FormData();
  // // f.append("id", id);
  // alert(id);

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      window.location = "invoice.php?id=" + t;
      // alert(t);
    }
  };

  r.open("POST", "cashOnDelivery.php", true);
  r.send(f);
}

function editProfile() {
  document.getElementById("nameDiv").classList.add("d-none");
  document
    .getElementById("nameInputDiv")
    .classList.replace("d-none", "d-block");

  document.getElementById("passwordDiv").classList.add("d-none");
  document
    .getElementById("passwordInputDiv")
    .classList.replace("d-none", "d-block");

  document.getElementById("editBtn").classList.add("d-none");
  document.getElementById("saveBtn").classList.replace("d-none", "d-block");
}

function showPassword() {
  var icon = document.getElementById("pIcon");
  var input = document.getElementById("passwordInput");

  if (input.type == "password") {
    input.type = "text";
    icon.className = "bi bi-eye-slash fs-5";
  } else {
    input.type = "password";
    icon.className = "bi bi-eye fs-5";
  }
}

function showPassword1() {
  var icon = document.getElementById("pIcon1");
  var input = document.getElementById("passwordInput1");

  if (input.type == "password") {
    input.type = "text";
    icon.className = "bi bi-eye-slash fs-5";
  } else {
    input.type = "password";
    icon.className = "bi bi-eye fs-5";
  }
}

var editProfileBm;
var editProfileLoading;
function editProfileCheck() {
  var m = document.getElementById("model");
  editProfileLoading = new bootstrap.Modal(m);
  editProfileLoading.show();

  var m2 = document.getElementById("model2");
  editProfileBm = new bootstrap.Modal(m2);

  var name = document.getElementById("name").value;
  var password = document.getElementById("passwordInput").value;

  var r = new XMLHttpRequest();
  var f = new FormData();
  f.append("name", name);
  f.append("password", password);

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;

      if (t == "name50+") {
        document
          .getElementById("nameErrorDiv")
          .classList.replace("d-none", "d-block");
        document.getElementById("nameError").innerHTML =
          "Name must have less than 50 characters";
        document
          .getElementById("name")
          .classList.replace("myProfileInput", "myProfileError");
      } else if (t == "passwordError") {
        document
          .getElementById("passwordErrorDiv")
          .classList.replace("d-none", "d-block");
        document.getElementById("passwordError").innerHTML =
          "Passwort must be between 5 - 20 charactors";
        document
          .getElementById("passwordInput")
          .classList.replace("myProfileInput", "myProfileError");
      } else if (t == "verify") {
        editProfileLoading.hide();
        editProfileBm.show();
      } else {
        editProfileLoading.hide();
        alert(t);
      }
    }
  };

  r.open("POST", "editProfileCheck.php", true);
  r.send(f);
}

function editProfileProccess() {
  var name = document.getElementById("name").value;
  var password = document.getElementById("passwordInput").value;
  var vc = document.getElementById("vc").value;

  var r = new XMLHttpRequest();
  var f = new FormData();
  f.append("name", name);
  f.append("password", password);
  f.append("vc", vc);

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "success") {
        editProfileBm.hide();
        signOut();
      } else {
        alert(t);
      }
    }
  };

  r.open("POST", "editProfileProccess.php", true);
  r.send(f);
}

function setAsDefultAddress(id) {
  var r = new XMLHttpRequest();
  var f = new FormData();
  f.append("id", id);

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "success") {
        window.location.reload();
      } else {
        alert(t);
      }
    }
  };

  r.open("POST", "setAsDefultAddress.php", true);
  r.send(f);
}

var addNewAddressModel;
function addNewAddress() {
  var m = document.getElementById("model");
  addNewAddressModel = new bootstrap.Modal(m);
  addNewAddressModel.show();
}

function loadDistrict() {
  var id = document.getElementById("provinceSelect").value;

  var r = new XMLHttpRequest();
  var f = new FormData();
  f.append("id", id);

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "0") {
        document.getElementById("districtSelect").innerHTML =
          "<option selected>Select your district</option>";
      } else {
        document.getElementById("districtSelect").innerHTML = t;
      }
    }
  };

  r.open("POST", "loadDistrict.php", true);
  r.send(f);
}

function loadCity() {
  var id = document.getElementById("districtSelect").value;

  if (id != 7) {
    document.getElementById("cityDiv").classList.add("d-none");
  } else {
    document.getElementById("cityDiv").classList.replace("d-none", "d-block");

    var r = new XMLHttpRequest();
    var f = new FormData();
    f.append("id", id);

    r.onreadystatechange = function () {
      if (r.readyState == 4) {
        var t = r.responseText;
        if (t == "0") {
          document.getElementById("citySelect").innerHTML =
            "<option selected>Select your city</option>";
        } else {
          document.getElementById("citySelect").innerHTML = t;
        }
      }
    };

    r.open("POST", "loadCity.php", true);
    r.send(f);
  }
}

var addNewAddressLoadingModel;
function saveNewAddress() {
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var mobile = document.getElementById("mobile").value;
  var province = document.getElementById("provinceSelect").value;
  var district = document.getElementById("districtSelect").value;
  var address = document.getElementById("address").value;

  if (district == "7") {
    addNewAddressModel.hide();

    var m2 = document.getElementById("model2");
    addNewAddressLoadingModel = new bootstrap.Modal(m2);
    addNewAddressLoadingModel.show();

    if (district == 7) {
      var city = document.getElementById("citySelect").value;
    } else {
      var city = 4;
    }

    var f = new FormData();
    f.append("fname", fname);
    f.append("lname", lname);
    f.append("mobile", mobile);
    f.append("province", province);
    f.append("district", district);
    f.append("address", address);
    f.append("city", city);

    var r = new XMLHttpRequest();

    r.onreadystatechange = function () {
      if (r.readyState == 4) {
        t = r.responseText;
        if (t == "success") {
          setInterval(newAddressSuccess, 1500);
        }
        // alert(t);
      }
    };

    r.open("POST", "saveNewAddress.php", true);
    r.send(f);
  }else{
    alert("Sorry, we are not available for your district yet!!")
  }
}

function newAddressSuccess() {
  document.getElementById("modelBody2").innerHTML =
    '<div class="mt-4 mb-4 center"><div class="alert alert-success" role="alert">Address added successfull &nbsp; <i class="bi bi-check-circle"></i></div></div>';
}

function deleteAddress(id) {
  var r = new XMLHttpRequest();
  var f = new FormData();
  f.append("id", id);

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "success") {
        window.location.reload();
      }
      alert(t);
    }
  };

  r.open("POST", "deleteAddress.php", true);
  r.send(f);
}

function cancelOrder(id) {
  var r = new XMLHttpRequest();

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      if (t == "success") {
        window.location = "recentOrder.php";
      } else {
        alert(t);
      }
    }
  };

  r.open("GET", "cancelOrder.php?id=" + id, true);
  r.send();
}

function adminSignIn() {
  var email = document.getElementById("adminEmail").value;
  var password = document.getElementById("adminPassword").value;

  var jsonReqObj = { email: email, password: password };
  var jsonTxt = JSON.stringify(jsonReqObj);

  var r = new XMLHttpRequest();
  var f = new FormData();
  f.append("jsonReqTxt", jsonTxt);

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var jsonRespTxt = r.responseText;
      var jsonRespObj = JSON.parse(jsonRespTxt);

      if (jsonRespObj.msg == "done") {
        window.location = "adminDashbord.php";
      } else {
        alert(jsonRespObj.msg);
      }
    }
  };

  r.open("POST", "adminSignInProcess.php", true);
  r.send(f);
}

var detailsBM;
function detailsModel(invoice_id) {
  openLoading();

  var r = new XMLHttpRequest();
  var f = new FormData();
  f.append("invoice_id", invoice_id);

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var m = document.getElementById("model");
      detailsBM = new bootstrap.Modal(m);
      detailsBM.show();
      setTimeout(closeLoadingAdminPdetails, 1200);
    }
  };

  r.open("POST", "adminNeworderDetailsProcess.php", true);
  r.send(f);

  function closeLoadingAdminPdetails() {
    document.getElementById("modelBody").innerHTML = r.responseText;
  }
}

function adminOrderStatusChange(invoice_id, status_id) {
  var r = new XMLHttpRequest();
  var f = new FormData();
  f.append("invoice_id", invoice_id);
  f.append("status_id", status_id);

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      window.location.reload();
    }
  };

  r.open("POST", "adminOrderStatusChangePrecess.php", true);
  r.send(f);
}

function adminSearch() {
  var txt = document.getElementById("txt").value;
  var select = document.getElementById("select").value;

  var r = new XMLHttpRequest();
  var f = new FormData();
  f.append("t", txt);
  f.append("s", select);

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      document.getElementById("pBody").innerHTML = r.responseText;
    }
  };

  r.open("POST", "adminSearchProcess.php");
  r.send(f);
}

function editProduct(id) {
  var img = document.getElementById("img");
  var title = document.getElementById("title").value;
  var ctg = document.getElementById("ctg").value;

  var r = new XMLHttpRequest();
  var f = new FormData();

  f.append("image", img.files[0]);
  f.append("title", title);
  f.append("id", id);
  f.append("ctg", ctg);

  if (ctg == 1 || ctg == 2 || ctg == 3 || ctg == 4 || ctg == 5) {
    var p_half = document.getElementById("p_half").value;
    var p_full = document.getElementById("p_full").value;

    f.append("p_half", p_half);
    f.append("p_full", p_full);
  } else if (ctg == 6 || ctg == 7 || ctg == 8) {
    var price = document.getElementById("price").value;
    f.append("price", price);
  }

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      alert(r.responseText);
      window.location.reload();
    }
  };

  r.open("POST", "adminEditProdutProcess.php", true);
  r.send(f);
}

function adminselectSize(curruntId, pid) {
  var cid = document.getElementById("ctg").value;

  var r = new XMLHttpRequest();
  var f = new FormData();
  f.append("cid", cid);
  f.append("pid", pid);
  f.append("curruntId", curruntId);

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      t = r.responseText;
      if (t == "done") {
        window.location.reload();
      } else if (t == "same") {
      } else {
        alert(t);
      }
    }
  };

  r.open("POST", "adminselectSize.php", true);
  r.send(f);
}

function addProductSelectCtg() {
  var ctg = document.getElementById("ctg").value;

  if (ctg == 1 || ctg == 2 || ctg == 3 || ctg == 4 || ctg == 5) {
    document.getElementById("price").innerHTML =
      '<div class="col-6 mt-3"><div><label for="exampleFormControlInput1" class="form-label">Half Price</label><input type="text" class="form-control" id="p1" ></div></div><div class="col-6 mt-3"><div><label for="exampleFormControlInput1" class="form-label">Full Price</label><input type="text"  class="form-control" id="p2" ></div></div>';
  } else if (ctg == 6 || ctg == 7 || ctg == 8) {
    document.getElementById("price").innerHTML =
      '<div><label for="exampleFormControlInput1" class="form-label">Price</label><input type="text" class="form-control" id="p0" ></div>';
  } else {
  }
}

function addProduct() {
  var img = document.getElementById("img");
  var title = document.getElementById("title").value;
  var ctg = document.getElementById("ctg").value;
  var minimumQty = document.getElementById("minimumQty").value;

  var r = new XMLHttpRequest();
  var f = new FormData();

  f.append("image", img.files[0]);
  f.append("title", title);
  f.append("ctg", ctg);
  f.append("minimumQty", minimumQty);

  if (ctg == 1 || ctg == 2 || ctg == 3 || ctg == 4 || ctg == 5) {
    var p_half = document.getElementById("p1").value;
    var p_full = document.getElementById("p2").value;

    f.append("p_half", p_half);
    f.append("p_full", p_full);
  } else if (ctg == 6 || ctg == 7 || ctg == 8) {
    var price = document.getElementById("p0").value;
    f.append("price", price);
  }

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      alert(r.responseText);
    }
  };

  r.open("POST", "adminAddProdutProcess.php", true);
  r.send(f);
}

function blockuser(email) {
  var r = new XMLHttpRequest();
  var f = new FormData();
  f.append("email", email);
  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      if (r.responseText == "done") {
        window.location.reload();
      }
    }
  };

  r.open("POST", "blockUser.php", true);
  r.send(f);
}

function unBlockuser(email) {
  var r = new XMLHttpRequest();
  var f = new FormData();
  f.append("email", email);
  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      if (r.responseText == "done") {
        window.location.reload();
      }
    }
  };

  r.open("POST", "UnBlockUser.php", true);
  r.send(f);
}

function searchUsers() {
  var txt = document.getElementById("txt").value;

  var r = new XMLHttpRequest();
  var f = new FormData();
  f.append("t", txt);

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      document.getElementById("pBody").innerHTML = r.responseText;
    }
  };

  r.open("POST", "searchUsers.php");
  r.send(f);
}

function addTodaySpecial(mid) {
  var pid = document.getElementById("select" + mid).value;

  var r = new XMLHttpRequest();
  var f = new FormData();
  f.append("mid", mid);
  f.append("pid", pid);

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      if (r.responseText == "done") {
        location.reload();
      }
    }
  };

  r.open("POST", "addTodaySpecial.php", true);
  r.send(f);
}

function deleteTodaySpecial(pid, mid) {
  var r = new XMLHttpRequest();
  var f = new FormData();
  f.append("mid", mid);
  f.append("pid", pid);

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      if (r.responseText == "done") {
        location.reload();
      }
    }
  };

  r.open("POST", "deleteTodaySpecial.php", true);
  r.send(f);
}

function savereview(id) {
  var txt = document.getElementById("txt").value;
  var image = document.getElementById("img");

  var r = new XMLHttpRequest();
  var f = new FormData();
  f.append("id", id);
  f.append("txt", txt);

  var file_count = image.files.length;
  f.append("file_count", file_count);

  for (var x = 0; x < file_count; x++) {
    f.append("image" + x, image.files[x]);
  }

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      alert(r.responseText);
      Window.location.reload();
    }
  };

  r.open("POST", "saveReview.php", true);
  r.send(f);
}

var reviewLoadingM;
var reviewImgM;

function imgModel(rid) {
  var m2 = document.getElementById("model2");
  reviewLoadingM = new bootstrap.Modal(m2);
  reviewLoadingM.show();

  var r = new XMLHttpRequest();
  var f = new FormData();
  f.append("rid", rid);

  r.onreadystatechange = function () {
    if (r.readyState == 4) {
      var t = r.responseText;
      document.getElementById("modelBody1").innerHTML = t;
      setTimeout(reviewIMGmodel, 1500);
    }
  };

  r.open("POST", "reviewImgProcess.php", true);
  r.send(f);
}

function reviewIMGmodel() {
  var m1 = document.getElementById("model1");
  reviewImgM = new bootstrap.Modal(m1);
  reviewLoadingM.hide();
  reviewImgM.show();
}




































