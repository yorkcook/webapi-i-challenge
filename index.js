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

server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const update = req.body;
  if (update.name && update.bio) {
    Users.update(id, changes)
      .then(updated => {
        if (updated) {
          res.status(200).json(updated);
        } else {
          res
            .status(404)
            .json({
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
      .json({ message: "The user information could not be modified." });
  }
});

server.delete("./users/:id", (req, res) => {
  const user = req.params.id;
  Users.remove(user)
    .then(user => {
      if (user) {
        res.status(200).json({ message: "User succesfully deleted" });
      } else {
        res
          .status(400)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

server.listen(port, () => console.log("We are doing it!"));
