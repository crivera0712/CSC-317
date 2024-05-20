import express from 'express'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ecommercePath = path.join(__dirname, '../..');
//const ecommercePath = path.join(__dirname, '../../');


app.use(express.static(ecommercePath));

app.get('/', (req, res) => {
    const indexPath = path.join(ecommercePath, 'Frontend', 'ww.html', 'index.html');
    console.log('Serving index.html from:', indexPath); // Log the index.html path
    res.sendFile(indexPath);
});

import {getUsers, getUser, createUser, userLogin} from './database.js'
app.use(express.json())
app.use(cors())
app.set("view engine", "ejs")
// EXPRESS BACKEND CODE


app.get("/users", async (req, res) => {
    const users = await getUsers()
    res.send(users)
})

app.post("/login", async (req, res) => {
    console.log("In the login feature");
    //const email = req.query.loginEmail;
    //const password = req.query.loginPass;
    const {email, password} = req.body;
    console.log(email);
    console.log(password);
    const user = await userLogin(email, password);
    console.log("Passed user login function");
    res.status(201).send(user)
});

app.get("/users/:id", async (req, res) => {
    const id = req.params.id    
    const user = await getUser(id)
    //res.send(user)
    if (!user){
        console.log("user does not exist")
    }
    res.render("user.ejs",{
        user,
    });

})

app.post("/newUser", async (req, res)=> {
    const {first_name, last_name, email, password} = req.body
    const user = await createUser(first_name, last_name, email, password)
    res.status(201).send(user)
})


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


app.post('/auth', function(request, response) {
    // Capture the input fields
    let email = request.body.loginEmail;
    let password = request.body.loginPass;
    // Ensure the input fields exist and are not empty
    if (email && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                request.session.loggedin = true;
                request.session.email = email;
                // Redirect to home page
                response.redirect('/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});


app.listen(8080, () => {
    console.log('Server is running on port 8080')
})


