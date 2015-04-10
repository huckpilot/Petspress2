var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('pets.db');
db.run("INSERT INTO pets (name, type) VALUES (?, ?), (?, ?), (?, ?), (?, ?)",
  'Rufus', 'Dog',
  'Spot', 'Cat',
  'Daisey', 'Sloth',
  'Banana', 'Monkey',
  function(err) {
    if (err) {
      throw err;
    }
  }
);