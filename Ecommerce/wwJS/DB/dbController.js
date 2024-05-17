
//CLIENT SIDE CODE

async function postData (url = 'http://localhost:8080/users',  email, password) 
{
    console.log('sending post request: ', JSON.stringify({email, password}))
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
    return user;
}

function validateForm(form){
    console.log("In validate form");
    const email = form.email.value;
    const password = form.password.value;

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (!email||!password){
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

function submitForm() {
    console.log('submitForm called'); // Debug log
    const form = document.getElementById('signupForm');
        if (!validateForm(form)){
            console.Console('form not validated')
            return;
        }

        console.log('after the if block'); // Debug log
        const email = form.email.value;
        const password = form.password.value;
        postData('http://localhost:8080/users', email, password)
            .then(user => {
                console.log('User successfully signed up:', user);
                // Redirect or display success message
                
            })
            .catch(error => {
                console.error('Error signing up:', error);
            });
}