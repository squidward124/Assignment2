var restIds       = ["bella", "sakura", "spice", "green", "prime", "olive"];

var restNames     = ["Bella Cucina", "Sakura Sushi", "Spice Garden",
                     "Green Leaf", "The Prime Cut", "Olive & Vine"];

var restCuisines  = ["Italian", "Japanese", "Indian",
                     "Plant-Based", "Steakhouse", "Mediterranean"];

var restAvgPrices = [35, 55, 30, 28, 90, 45];

var restDeposits  = [20, 30, 15, 15, 50, 25];

var restVegan     = [true,  false, true,  true,  false, true];
var restHalal     = [false, true,  true,  true,  false, true];
var restFamily    = [true,  false, true,  true,  false, true];
var restDate      = [true,  true,  false, true,  true,  true];
var restBusiness  = [false, true,  true,  false, true,  false];

function findIndex(id) {

    for (var i = 0; i < restIds.length; i++) {
        if (restIds[i] == id) {
            return i;
        }
    }

    return -1;
}

function getRestaurantFromURL() {

    var url = location.href;

if (url.match(/restaurant=bella/))  { return "bella";  }
    if (url.match(/restaurant=sakura/)) { return "sakura"; }
    if (url.match(/restaurant=spice/))  { return "spice";  }
    if (url.match(/restaurant=green/))  { return "green";  }
    if (url.match(/restaurant=prime/))  { return "prime";  }
    if (url.match(/restaurant=olive/))  { return "olive";  }

return "";
}

function validateRegistration() {

var errMsg = "";

var username = document.getElementById("username").value;
    if (username == "") {
        errMsg += "Username is required.\n";
    } else if (username.length < 5) {
        errMsg += "Username must be at least 5 characters.\n";
    } else if (!username.match(/^[A-Za-z0-9_]+$/)) {
        errMsg += "Username can only contain letters, numbers and underscores.\n";
    }

var email = document.getElementById("email").value;
    if (email == "") {
        errMsg += "Email is required.\n";
    } else if (!email.match(/^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z][A-Za-z]+$/)) {
        errMsg += "Please enter a valid email address.\n";
    }

var phone = document.getElementById("phone").value;
    if (phone == "") {
        errMsg += "Phone number is required.\n";
    } else if (!phone.match(/^[0-9]+$/)) {
        errMsg += "Phone must contain digits only.\n";
    } else if (phone.length < 8 || phone.length > 15) {
        errMsg += "Phone must be between 8 and 15 digits.\n";
    }

var pass = document.getElementById("password").value;
    if (pass == "") {
        errMsg += "Password is required.\n";
    } else {
        if (pass.length < 10) {
            errMsg += "Password must be at least 10 characters.\n";
        }
        if (!pass.match(/[A-Z]/)) {
            errMsg += "Password must contain an uppercase letter.\n";
        }
        if (!pass.match(/[a-z]/)) {
            errMsg += "Password must contain a lowercase letter.\n";
        }
        if (!pass.match(/[0-9]/)) {
            errMsg += "Password must contain a digit.\n";
        }

        if (pass.match(/^[A-Za-z0-9]+$/)) {
            errMsg += "Password must contain a special character.\n";
        }
    }

var pass2 = document.getElementById("confirmPassword").value;
    if (pass2 == "") {
        errMsg += "Please confirm your password.\n";
    } else if (pass2 != pass) {
        errMsg += "Passwords do not match.\n";
    }

var gender = "";
    if (document.getElementById("genderFemale").checked)     { gender = "female";    }
    if (document.getElementById("genderMale").checked)       { gender = "male";      }
    if (document.getElementById("genderNonbinary").checked)  { gender = "nonbinary"; }
    if (document.getElementById("genderPreferNot").checked)  { gender = "prefer";    }
    if (gender == "") {
        errMsg += "Please select a gender option.\n";
    }

if (document.getElementById("country").value == "") {
        errMsg += "Please select your country / region.\n";
    }

if (errMsg != "") {
        alert(errMsg);
        return false;
    }

alert("Registration successful! Welcome to Plate & Place, " + username + ".");
    document.getElementById("registerForm").reset();
    return false;
}

function initReservation() {

var fromURL = getRestaurantFromURL();
    if (fromURL != "") {
        document.getElementById("restaurant").value = fromURL;
    }

document.getElementById("restaurant").onchange       = updateDeposit;
    document.getElementById("paymentVoucher").onclick    = updatePaymentFields;
    document.getElementById("paymentOnline").onclick     = updatePaymentFields;
    document.getElementById("sameAsEmail").onclick       = copyEmailToBilling;
    document.getElementById("reservationForm").onsubmit  = validateReservation;

updateDeposit();
}

function updateDeposit() {

var id = document.getElementById("restaurant").value;
    var idx = findIndex(id);

if (idx == -1) {
        document.getElementById("depositDisplay").innerHTML =
            "Please select a restaurant to see the deposit amount.";
        document.getElementById("depositAmount").value = "";
        return;
    }

document.getElementById("depositDisplay").innerHTML =
        "Deposit for <strong>" + restNames[idx] +
        "</strong>: <strong>$" + restDeposits[idx] + ".00</strong>";
    document.getElementById("depositAmount").value = restDeposits[idx];
}

function updatePaymentFields() {

var voucherChecked = document.getElementById("paymentVoucher").checked;
    var onlineChecked  = document.getElementById("paymentOnline").checked;

if (voucherChecked == true) {
        document.getElementById("voucherSection").className = "payment-section active";
        document.getElementById("cardSection").className    = "payment-section";
    }
    if (onlineChecked == true) {
        document.getElementById("voucherSection").className = "payment-section";
        document.getElementById("cardSection").className    = "payment-section active";
    }
}

function copyEmailToBilling() {
    if (document.getElementById("sameAsEmail").checked == true) {

        document.getElementById("billingEmail").value =
            document.getElementById("email").value;
        document.getElementById("billingEmail").setAttribute("readonly", "readonly");
    } else {

        document.getElementById("billingEmail").removeAttribute("readonly");
    }
}

function validateReservation() {
    var errMsg = "";

if (document.getElementById("fullName").value == "") {
        errMsg += "Please enter your full name.\n";
    }

var email = document.getElementById("email").value;
    if (email == "") {
        errMsg += "Email is required.\n";
    } else if (!email.match(/^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z][A-Za-z]+$/)) {
        errMsg += "Please enter a valid email address.\n";
    }

var phone = document.getElementById("phone").value;
    if (phone == "") {
        errMsg += "Phone number is required.\n";
    } else if (!phone.match(/^[0-9]+$/)) {
        errMsg += "Phone must contain digits only.\n";
    } else if (phone.length < 10) {
        errMsg += "Phone must contain at least 10 digits.\n";
    }

if (document.getElementById("restaurant").value == "") {
        errMsg += "Please choose a restaurant.\n";
    }

var dateVal = document.getElementById("reservationDate").value;
    if (dateVal == "") {
        errMsg += "Please pick a reservation date.\n";
    } else {

        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = today.getMonth() + 1;
        var dd = today.getDate();

        if (mm < 10) { mm = "0" + mm; }
        if (dd < 10) { dd = "0" + dd; }
        var todayStr = yyyy + "-" + mm + "-" + dd;

        if (dateVal < todayStr) {
            errMsg += "Reservation date cannot be in the past.\n";
        }
    }

if (document.getElementById("reservationTime").value == "") {
        errMsg += "Please choose a reservation time.\n";
    }

var guests = document.getElementById("guests").value;
    if (guests == "") {
        errMsg += "Please enter the number of guests.\n";
    } else if (isNaN(guests) || parseInt(guests) < 1) {
        errMsg += "Number of guests must be greater than 0.\n";
    }

var method = "";
    if (document.getElementById("paymentVoucher").checked) { method = "voucher"; }
    if (document.getElementById("paymentOnline").checked)  { method = "online";  }

    if (method == "") {
        errMsg += "Please select a payment method.\n";
    } else if (method == "voucher") {

        if (document.getElementById("voucherCode").value == "") {
            errMsg += "Please enter your voucher code.\n";
        }
    } else if (method == "online") {

        var cardType = document.getElementById("cardType").value;
        var cardNumber = document.getElementById("cardNumber").value;
        if (cardType == "") {
            errMsg += "Please choose a card type.\n";
        }
        if (cardNumber == "") {
            errMsg += "Card number is required.\n";
        } else if (!cardNumber.match(/^[0-9]+$/)) {
            errMsg += "Card number must contain digits only.\n";
        } else if (cardType == "amex" && cardNumber.length != 15) {
            errMsg += "Amex cards must be 15 digits.\n";
        } else if (cardType == "visa" && cardNumber.length != 16) {
            errMsg += "Visa cards must be 16 digits.\n";
        } else if (cardType == "mastercard" && cardNumber.length != 16) {
            errMsg += "Mastercard cards must be 16 digits.\n";
        }
    }

if (document.getElementById("sameAsEmail").checked == false) {
        var billing = document.getElementById("billingEmail").value;
        if (billing == "") {
            errMsg += "Billing email is required.\n";
        } else if (!billing.match(/^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z][A-Za-z]+$/)) {
            errMsg += "Please enter a valid billing email.\n";
        }
    }

if (errMsg != "") {
        alert(errMsg);
        return false;
    }
    return true;
}

function handleRecommend() {

var dietary = "";
    if (document.getElementById("dietaryNone").checked)  { dietary = "none";  }
    if (document.getElementById("dietaryVegan").checked) { dietary = "vegan"; }
    if (document.getElementById("dietaryHalal").checked) { dietary = "halal"; }

    var budget = "";
    if (document.getElementById("budgetUnder30").checked) { budget = "under30"; }
    if (document.getElementById("budget30to50").checked)  { budget = "30-50";   }
    if (document.getElementById("budget50to80").checked)  { budget = "50-80";   }
    if (document.getElementById("budgetOver80").checked)  { budget = "over80";  }

    var purpose = "";
    if (document.getElementById("purposeFamily").checked)   { purpose = "family";   }
    if (document.getElementById("purposeDate").checked)     { purpose = "date";     }
    if (document.getElementById("purposeBusiness").checked) { purpose = "business"; }

if (dietary == "" || budget == "" || purpose == "") {
        alert("Please answer all three questions before searching.");
        return false;
    }

var html = "";
    var count = 0;

for (var i = 0; i < restIds.length; i++) {

var dietaryOk = true;
        if (dietary == "vegan" && restVegan[i] == false) { dietaryOk = false; }
        if (dietary == "halal" && restHalal[i] == false) { dietaryOk = false; }

var budgetOk = false;
        if (budget == "under30" && restAvgPrices[i] <= 30) { budgetOk = true; }
        if (budget == "30-50"  && restAvgPrices[i] > 30 && restAvgPrices[i] <= 50) { budgetOk = true; }
        if (budget == "50-80"  && restAvgPrices[i] > 50 && restAvgPrices[i] <= 80) { budgetOk = true; }
        if (budget == "over80" && restAvgPrices[i] > 80) { budgetOk = true; }

var purposeOk = false;
        if (purpose == "family"   && restFamily[i]   == true) { purposeOk = true; }
        if (purpose == "date"     && restDate[i]     == true) { purposeOk = true; }
        if (purpose == "business" && restBusiness[i] == true) { purposeOk = true; }

if (dietaryOk == true && budgetOk == true && purposeOk == true) {

            html += "<article class=\"restaurant-card\">";
            html += "<img src=\"images/" + restIds[i] + ".svg\" alt=\"" + restNames[i] + " illustration\">";
            html += "<div class=\"card-body\">";
            html += "<h3>" + restNames[i] + "</h3>";
            html += "<span class=\"cuisine-tag\">" + restCuisines[i] + "</span>";
            html += "<div class=\"card-meta\">";
            html += "<span>Avg <strong>$" + restAvgPrices[i] + "</strong> / person</span>";
            html += "<span>Deposit <strong>$" + restDeposits[i] + "</strong></span>";
            html += "</div>";

            html += "<a class=\"btn btn-block\" href=\"reservation.html?restaurant=" +
                    restIds[i] + "\">Reserve at " + restNames[i] + "</a>";
            html += "</div>";
            html += "</article>";
            count = count + 1;
        }
    }

if (count == 0) {
        document.getElementById("recommendation-results").innerHTML =
            "<div class=\"no-results\"><h3>No matches found</h3>" +
            "<p>We couldn't find a restaurant that fits all of your " +
            "preferences. Try widening your dietary or budget choice." +
            "</p></div>";
    } else {

        var heading = "<h2>We found " + count + " match";
        if (count > 1) {
            heading += "es";
        }
        heading += "</h2>";
        document.getElementById("recommendation-results").innerHTML =
            heading + "<div class=\"restaurant-list\">" + html + "</div>";
    }

return false;
}

function init() {

    if (document.getElementById("registerForm") != null) {
        document.getElementById("registerForm").onsubmit = validateRegistration;
    }

    if (document.getElementById("reservationForm") != null) {
        initReservation();
    }

    if (document.getElementById("recommendForm") != null) {
        document.getElementById("recommendForm").onsubmit = handleRecommend;
    }
}

window.onload = init;
