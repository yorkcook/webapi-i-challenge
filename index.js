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
  if (userID) {
    Users.findById(userID)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The user information could not be retrieved" });
      });
  } else {
    res.status(404).json({ message: "The user with that ID does not exist." });
  }
});

server.post("/users", (req, res) => {
  const user = req.body;
  if (user.name && user.bio) {
    Users.insert(user)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res.status(500).json({
          error: "Error when trying to add that homie to the database"
        });
      });
  } else {
    res
      .status(400)
      .json({ message: "We need the name and bio to add someone!" });
  }
});

server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const update = req.body;
  if (update.name && update.bio) {
    Users.update(id, update)
      .then(updated => {
        if (updated) {
          res.status(200).json(updated);
        } else {
          res.status(404).json({
            message: "The user with the specified id does not exist."
          });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The user information could not be modified." });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide both user name and bio" });
  }
});

server.delete("./users/:id", (req, res) => {
  const { id } = req.params.id;

  if (id) {
    Users.remove(id)
      .then(user => {
        res.status(200).json({ message: "User successfully eliminated" });
      })
      .catch(error => {
        res.status(500).json({ error: "The user could not be eliminated." });
      });
  } else {
    res.status(404).json({ message: "That user already don't exist bro!" });
  }
});

server.listen(port, () => console.log("We are doing it!"));
