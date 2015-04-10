//This is my recreation of the app that Crawford live coded in class. I am recreating this to get a better understanding of how the CRUD process works and how servers work. My other goal is to increase my understanding of javascript.

// Get access to the sqlite3 module
var sqlite3 = require("sqlite3");

//specify which file is the database
vat db = new sqlite3.Database('pets.db');

// This allows me to create the app
var express = require("express");
var app = express();

// var ejs sets the templating engine
var ejs = require("ejs");
app.set("view engine", "ejs");

//use body parser to parse the body
var bodyParser = require("body-parser");
//tell app which method to use when parsing
app.use(bodyParser.urlencoded({extended: false}))

//allow for method override
var methodOverride = require("method-override");
// tell app which override method to use
app.use(methodOverride('_method'))

// I will not need dummy data but I will add it to verify that the app is functioning before I connect my database to it. I also need to get more comfortable with objects.

//dummy data
var pets = {
  0: {
    id: 0,
    name: "fluffy",
    type: "hamster"
  }
}

// Used to give the pets unique id's. I set it to 1 becase I created a pet already. I may have to set this to 0 or even totally disregard once I connect my database.
var counter = 1;

// This redirects to /pets when someone does not specify a route and leaves it blank
app.get("/", function(req, res){
  res.redirect("/pets")
});

// This page is going to show all pets
app.get("/pets", function(req, res){
  res.render("index.ejs", {pets: pets})
});

// Show individual pet
app.get("/pet/:id", function(req, res){
  // Get pet id from url, set thisPet to appropriate pet
  var thisPet = pets[parseInt(req.params.id)]
  res.render("show.ejs", {thisPet: thisPet})
});

// Serve up a new page for a create pet form
app.get("/pets/new", function(req, res){
  res.render("new.ejs")
});

// Create the Pet and post it to your pets page
app.post("/pets", function(req, res){
  // Get info from req.body to make the new pet
  var newPet = {
    id: counter,
    name: req.body.name, 
    type: req.body.type
  };
  // Add newPet to pets object 
  pets[counter] = newPet
  // Increment counter for unique id
  counter++
  res.redirect("/pets")
});

// Send user to edit pet form
app.get("/pet/:id/edit", function(req, res){
  // Make changes to pet specified with id
  var thisPet = pets[parseInt(req.params.id)]
  res.render("edit.ejs", {thisPet: thisPet})
})

// Update a pet
app.put("/pet/:id", function(req, res){
  // Make changes to appropriate pet
  pets[parseInt(req.params.id)] = {
    id: parseInt(req.params.id),
    name: req.body.name,
    type: req.body.type
  }
  // Redirect to this pets page to see the changes
  res.redirect("/pet/" + parseInt(req.params.id))
});

// Delete a post
app.delete("/pet/:id", function(req, res){
  // Use delete keyword to delete the pet
  delete pets[parseInt(req.params.id)]
  // Go back to see pets page
  res.redirect("/pets")
});


app.listen(3000);
console.log('Listening on port 3000');
