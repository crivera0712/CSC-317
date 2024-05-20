
//CLIENT SIDE CODE

async function getLogin(url, email, password){
    console.log('sign in form called')
    console.log('Email:', email);
    console.log('Password:', password);
    const response = await fetch (url, {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    const user = await response.json();
    console.log("user is returned")
    return user; 
}

async function getLoginForm(){
    console.log('Login form called'); // Debug log
    const form = document.getElementById('loginForm');
    console.log('after form');
    const email = form.loginEmail.value;
    const password = form.loginPass.value;
    console.log('calling postLogin')
    const loginUrl = 'https://csc-317.onrender.com/login'; // Debugging
    console.log('URL:', loginUrl); 
    getLogin(loginUrl, email, password)
    .then(user => {
        console.log('User successfully logged in:', user.id);
        // Redirect or display success message
        window.location.href = 'http://localhost:8080/users/'+user.id;
    })
    .catch(error => {
        console.error('Error logging in:', error);
    });
}

async function postData (url = 'http://localhost:8080/newUser', first_name, last_name, email, password) 
{
    console.log('sending post request: ', JSON.stringify({first_name, last_name, email, password}))
    const response = await fetch (url, {
        method: "POST",
        body: JSON.stringify({first_name, last_name, email, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    });        
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    const user = await response.json();
    return user;
}


function validateForm(form){
    console.log("In validate form");
    const first_name = form.first_name.value;
    const last_name = form.last_name.value;
    const email = form.email.value;
    const password = form.password.value;

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (!email||!password||!first_name||!last_name){
        alert('All fields are required');
        return false;
    }
    if (!emailRegex.test(email)){
        alert('Please enter a valid email');
        return false;
    }
    console.log(email);
    console.log(password);
    return true;
}

function submitSuForm() {
    console.log('submitForm called'); // Debug log
    const form = document.getElementById('signupForm');
        if (!validateForm(form)){
            console.log('form not validated')
            return;
        }

        console.log('after the if block'); // Debug log
        const first_name = form.first_name.value;
        const last_name = form.last_name.value;
        const email = form.email.value;
        const password = form.password.value;
        postData('http://localhost:8080/newUser',first_name, last_name, email, password)
            .then(user => {
                console.log('User successfully signed up:', user.id);
                // Redirect or display success message
                window.location.href = 'http://localhost:8080/users/'+user.id;
            })
            .catch(error => {
                console.error('Error signing up:', error);
            });
}


