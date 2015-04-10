// get access to the sqlite3 module
var sqlite3 = require('sqlite3').verbose();
// specify which file is the database
var db = new sqlite3.Database('rolodex.db');

console.log("Welcome to the CRUD Rolodex. Please enter (C)reate, (R)ead, (U)pdate, or (D)elete")

process.stdin.on("data", function(data) {
    var input = data.toString().trim();
    if (input.toUpperCase() === "C") {
        console.log('Please enter a name and phone number in the following manner: new Name number')
    } else if (input.toUpperCase() === "R"){
        input = "";
        db.all(/*get all entries here*/, function(err, rows) {
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
        db.run(/* insert name and phone into entries using ?*/, input.split(" ")[1], input.split(" ")[2], function(err) {
            if(err) { 
                throw err; 
            }
      var id = this.lastID; //weird way of getting id of what you just inserted
      db.get(/*Get a single row from entries by searching with id*/, id, function(err, row) {
        if(err) { 
            throw err; 
        }
        console.log(row);
      });
    });
    } else if (input.split(" ")[0].toLowerCase() === "delete") {
        db.run(/*Delete the row with the id entered */, input.split(" ")[1], function(err) {
            if(err) { 
                throw err; 
            }
        });
    } else if (Number(input.split(" ")[0]) != NaN) {
        db.run(/*Update a row in entries by finding the row by id and changing name and phone*/, input.split(" ")[1], input.split(" ")[2], input.split(" ")[0], function (err) {
            if(err) { 
                throw err; 
            }
        });
    }
});