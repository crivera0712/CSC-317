const db = require("./db");

function insertRow(){
const [email, password] = process.argv.slice(2);
db.run(
'INSERT INTO sharks (email, password) VALUES (?,?)',
[email, password],
function (error){
    if (error) {
    console.error(error.message);
    }
    console.log(`Inserted a row with the ID: ${this.lastID}`);
    }
    );
}

insertRow();
