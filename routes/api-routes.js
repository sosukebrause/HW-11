// const store = require("../db/store.js");
const express = require("express");
const router = express.Router();
const util = require("util");
const fs = require("fs");
const store = require("../db/store");

router.get("/notes", (req, res) => {
  console.log("hit me");
  store
    .getNotes()
    .then((note) => {
      res.json(note);
      console.log(note);
    })
    .catch((err) => res.status(500).json(err));
});

router.delete("/notes/:id", (req, res) => {
  // find by id // res.send(req.params.id);
  // console.log(parseInt(req.params.id));
  const id = parseInt(req.params.id);
  showTodo(id)
    .then((todo) => res.json(todo))
    .catch((err) => res.json(err));
});

router.post("/notes", (req, res) => {
  store
    .createNote(req.body)
    .then((note) => {
      res.json(note);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

const todoArray = [];
router.post("/todo", (req, res) => {
  todoArray.push(req.body);
  // console.log(todoArray);
  res.json(todoArray);
});
// /api/all

module.exports = router;
