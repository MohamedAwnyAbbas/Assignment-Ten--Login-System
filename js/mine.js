//Sign-up Ids
let signupLink = document.getElementById("signupLink");
let loginBox = document.getElementById("login-box");
let signupBox = document.getElementById("signup-box");
let signinBtn = document.getElementById("signin-btn");
let signupName = document.getElementById("signupName");
let signupMail = document.getElementById("signupMail");
let signupPass = document.getElementById("signupPass");
let signupBtn = document.getElementById("signupBtn");
let signupStatus = document.getElementById("signup-status");

//Login Ids
let loginMail = document.getElementById("loginMail");
let loginPass = document.getElementById("loginPass");
let loginBtn = document.getElementById("loginBtn");
let loginStatus = document.getElementById("login-status");
let welcomeStatus = document.getElementById("welcome");

//Logout Ids
let logoutBtn = document.getElementById("logout");

//Arrays
let uAccount = [];

//Regex
let nameCheck = /(^[a-z][a-z]+$)|(^[a-z][a-z]+\d$)|(^[a-z][a-z]*\d\d+$)/i;
let mailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let passCheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

// Add Account (Sign up) function
function addAccount()
{
    if(isValid()==true&&accountExists()==false)
    {
        let addAccount = {uName:signupName.value, uMail:signupMail.value, uPass:signupPass.value};
        uAccount.push(addAccount);
        localStorage.setItem("userAccount", JSON.stringify(uAccount));
        clearInputs();
    }
}

//Clear inputs value function
function clearInputs()
{
    signupName.value = "";
    signupMail.value = "";
    signupPass.value = "";
}
if(signupBtn&&!signupBtn.hidden)
{
    signupBtn.addEventListener("click",addAccount)
}


// Change Login page to Sign up
if(signupLink&&!signupLink.hidden)
{
    signupLink.addEventListener("click", function(){
        loginBox.classList.replace("d-block", "d-none");
        signupBox.classList.replace("d-none","d-block");
    })    
}

// Change Sign up to login
if(signinBtn&&!signinBtn.hidden)
{
    signinBtn.addEventListener("click",function(){
        signupBox.classList.replace("d-block","d-none");
        loginBox.classList.replace("d-none","d-block");
    })
}


// Validation function 
function isValid()
{
    if(nameCheck.test(signupName.value) && mailCheck.test(signupMail.value) && passCheck.test(signupPass.value))
    {
        signupStatus.innerHTML = `<p class= "text-center text-success">Success</p>`
        return true;
    }
    else if(nameCheck.test(signupName.value)!= true || signupName.value == "")
    {
        signupStatus.innerHTML = `<p class= "text-center text-danger">Invalid Name</p>`
    }
    else if(mailCheck.test(signupMail.value)!=true || signupMail.value == "")
    {
        signupStatus.innerHTML = `<p class= "text-center text-danger">Invalid Mail</p>`
    }
    else if(passCheck.test(signupPass.value)!=true || signupPass.value == "")
    {
        signupStatus.innerHTML = `<p class= "text-center text-danger">Invalid Password</p>`
    }
    return false;

}

// User whether exsists or not validation function
function accountExists()
{
    for(let i =0; i<uAccount.length; i++)
    {
        if(signupName.value == uAccount[i].uName || signupMail.value == uAccount[i].uMail || signupPass.value == uAccount[i].uPass)
        {
            signupStatus.innerHTML = `<p class= "text-center text-danger">Account already exists</p>`
            return true;
        }
        
    }
    return false;
}

//Login function

function isLogin()
{
    let userAccountData = localStorage.getItem("userAccount");
    uAccount = JSON.parse(userAccountData);
    let loggedIn = false;
    for(let i =0; i<uAccount.length;i++)
    {
        if(loginMail.value == uAccount[i].uMail && loginPass.value == uAccount[i].uPass)
        {
            localStorage.setItem("userName",uAccount[i].uName);
            loggedIn = true;  
        }
    }
    if(loggedIn)
    {
        window.location.href = "login.html";
        return true;
    }
    else
    {
        loginStatus.innerHTML = `<p class= "text-center text-danger">Incorrect Email or Password</p>`;
        return false;
    }
}
if(loginBtn&&!loginBtn.hidden)
{
    loginBtn.addEventListener("click",isLogin);
}

let name = localStorage.getItem("userName");
if(welcomeStatus!= null)
{
    welcomeStatus.innerHTML = `<span>Welcome ${name}</span>`;
}

//Logout function

function isLogout()
{
    window.location.href = "index.html";
    localStorage.removeItem("userName");
}
if(logoutBtn&&!logoutBtn.hidden)
{
    logoutBtn.addEventListener("click",isLogout);
}



