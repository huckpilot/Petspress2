// get access to the sqlite3 module
var sqlite3 = require('sqlite3').verbose();
// specify which file is the database
var db = new sqlite3.Database('pets.db');

console.log("Welcome to the CRUD Petspress. Please enter (C)reate, (R)ead, (U)pdate, or (D)elete")

process.stdin.on("data", function(data) {
    var input = data.toString().trim();
    if (input.toUpperCase() === "C") {
        console.log('Please enter a name and type in the following manner: new Name type')
    } else if (input.toUpperCase() === "R"){
        input = "";
        db.all("SELECT * FROM pets;" , function(err, rows) {
            if(err) { 
                throw err; 
            }
            console.log(rows);
        });
    } else if (input.toUpperCase() === "U") {
        console.log('Please enter the id of the person to update, and then a new name and number in the following format: id# Name number')
    } else if (input.toUpperCase() === "D") {
        console.log('Please enter the id of the person to delete in the following format: delete #')
    } else if (input.split(" ")[0].toLowerCase() === "new") {
        db.run("INSERT INTO pets (name, type) VALUES(?, ?);", input.split(" ")[1], input.split(" ")[2], function(err) {
            if(err) { 
                throw err; 
            }
      var id = this.lastID; //weird way of getting id of what you just inserted
      db.get("SELECT * FROM pets WHERE id = ?;", id, function(err, row) {
        if(err) { 
            throw err; 
        }
        console.log(row);
      });
    });
    } else if (input.split(" ")[0].toLowerCase() === "delete") {
        db.run("DELETE FROM pets WHERE id = ?;", input.split(" ")[1], function(err) {
            if(err) { 
                throw err; 
            }
        });
    } else if (Number(input.split(" ")[0]) != NaN) {
        db.run("UPDATE pets SET name = ?, type = ? WHERE id = ?", input.split(" ")[1], input.split(" ")[2], input.split(" ")[0], function (err) {
            if(err) { 
                throw err; 
            }
        });
    }
});