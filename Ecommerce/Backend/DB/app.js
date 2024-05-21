import express from 'express'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 8080;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ecommercePath = path.join(__dirname, '../../Frontend');
const dataBase = path.join(__dirname, '../../');


app.use(express.static(ecommercePath));
app.use(express.static(dataBase));

app.get('/', (req, res) => {
    res.sendFile(path.join(ecommercePath,'ww.html', 'index.html'));
});

import {getUsers, getUser, createUser, userLogin, changePassword} from './database.js'
app.use(express.json())
app.use(cors())
app.set("view engine", "ejs")
// EXPRESS BACKEND CODE

app.get('/:page', (req, res) => {
    const page = req.params.page;
    const page2 = `${page}`;
    console.log(page2)
    const filePath = path.join(ecommercePath, 'ww.html', page2);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('FUCK');
        }
    });
});


app.get("/users", async (req, res) => {
    const users = await getUsers()
    res.send(users)
})

app.post("/login", async (req, res) => {
    try {
        console.log("In the login feature");
        const { email, password } = req.body;
        console.log("Email:", email);
        console.log("Password:", password);
        
        const user = await userLogin(email, password);
        console.log("Passed user login function");
        
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(401).send({ error: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.get("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getUser(id);
        
        if (!user) {
            console.log("User does not exist");
            return res.status(404).send({ error: "User not found" });
        }
        
        res.render("user.ejs", { user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.post("/newUser", async (req, res)=> {
    const {first_name, last_name, email, password} = req.body
    const user = await createUser(first_name, last_name, email, password)
    res.status(201).send(user)
})

app.post("/Paction", async (req, res)=> {
    const {id, password} = req.body;
    const updatedPassword = await changePassword(id, password);
    if(updatedPassword){
        res.status(200).send(user);
    } else {
        res.status(401).send({ error: "cannot update password" });
    }
    
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log('Server is running on `${PORT}')
})


