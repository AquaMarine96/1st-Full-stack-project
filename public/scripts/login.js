let studButton = document.querySelector("#user");
let staffButton = document.querySelector("#admin");
let backButton = document.querySelector("#back");

studButton.addEventListener("click", ()=> {
    document.querySelector(".secondary-buttons").style.display = "flex";
    document.querySelector(".primary-buttons").style.display = "none";
    backButton.style.display = "block";
})
staffButton.addEventListener("click", ()=> {
    document.querySelector(".login-admin").style.display = "block";
    document.querySelector(".primary-buttons").style.display = "none";
    backButton.style.display = "block";
})

let signUpButton = document.querySelector("#sign-up");
let logInButton = document.querySelector("#log-in");

signUpButton.addEventListener("click", ()=> {
    document.querySelector(".signup-form").style.display = "block";
    document.querySelector(".secondary-buttons").style.display = "none";
    
})

logInButton.addEventListener("click", ()=> {
    document.querySelector(".login-user").style.display = "block";
    document.querySelector(".secondary-buttons").style.display = "none";
})

backButton.addEventListener("click", ()=> {
    backButton.style.display = "none";
});

//Account validation


//let password2 = document.querySelector("#password2")

function blanks(){
    if (email.value.length == 0 || password.value.length == 0 ){
        alert("Παρακαλώ συπληρώστε όλα τα πεδία")
        console.log("user didnt fill in all the fields")
    };
};

function emailVerify(){
               
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email.value)){
        return true;
    }
    else{
        console.log("email is not valid")
        return false;

    }
              
};

function passwordVerify(){
                
    if (/^[a-zA-Z]+\d+[!@#$%^&*]$/.test(password.value)  && password.value.length >= 8){                    
    return true;  
    }
    else{               
                        
    console.log("password is not valid")
    //alert("password needs to have at least one uppercase letter, one number, a single special character and be at least 8 characters long");
    return false;
    }
};


// function passCheck(pass2){
                               
//     if(pass2.value === pass.value){
//         return true;   
//     }
//     else{
//         alert("Passwords do not match")
//         console.log("passwords do not match")
//         return false;
// };
// };



// function isEmail(email) {
//     blanks();
//     emailVerify();
//     passwordVerify();
//     //passCheck();
//     if(emailVerify() && passwordVerify() && passCheck()){
//         alert("Επιτυχής εγγραφή")    
//     console.log("user entered")
//     }
//     else{
//         console.log("not succesfull")
//         "/".refreshPage();
//     };
//     //go to the main page again

// };

//Login validation

function loggedIn(form){
    let submiting = form.querySelector("input[type='submit']");
    submiting.addEventListener("click", ()=>{
        let email = form.querySelector("#email")
        let password = form.querySelector("#password")
        blanks();
        emailVerify();
        passwordVerify();
        //passCheck(password);
        if(emailVerify() && passwordVerify()){
            alert("Επιτυχής εγγραφή")
            form.action = "homapage.hbs"
            form.method = "POST" 
        console.log("user entered")
        }
        else{
            console.log("not succesfull")
            form.action = "#"
            form.method = "GET"
        };
    });
    
    
};

let signForm = document.querySelector(".signup-form");
//loggedIn(signForm);

//Submit button for the sign in and log form

// let submitSign= document.querySelector("#sign-submit");
// let submitLog = document.querySelector("#log-submit");

// submitSign.addEventListener("click", isEmail);
// submitLog.addEventListener("click", loggedIn);



    