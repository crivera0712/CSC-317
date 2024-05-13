const db = require("./db");

function updateRow() {
  const [id,password] = process.argv.slice(2);
  db.run(
    `UPDATE sharks SET password = ? WHERE id = ?`,
    [password, id],
    function (error) {
      if (error) {
        console.error(error.message);
      }
      console.log(`Row ${id} has been updated`);
    }
  );
}

updateRow();
