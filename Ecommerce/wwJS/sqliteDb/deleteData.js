const db = require("./db");

async function deleteRow() {
  const [id] = process.argv.slice(2);
  db.run(`DELETE FROM sharks WHERE id = ?`, [id], function (error) {
    if (error) {
      return console.error(error.message);
    }
    console.log(`Row with the ID ${id} has been deleted`);
  });
}

deleteRow();
