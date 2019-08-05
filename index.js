// implement your API here

const port = 5000;

const Users = require("./data/db.js");

const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("You are going to be great!");
});

server.get("/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});

server.get("/users/:id", (req, res) => {
  const userID = req.params.id;
  Users.findById(userID)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

server.listen(port, () => console.log("We are doing it!"));
