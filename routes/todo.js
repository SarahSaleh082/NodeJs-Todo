const express = require("express");
const router = express.Router();
const validateMDTodo = require('../middlewares/validateTodo');
const {
  create,
  find,
  deleteDocument,
  updateDocument,
  findByUser,
} = require("../controllers/todo");
const Todo = require("../models/todo");

router.get("/", async (req, res, next) => {
  find(req)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.get("/:userId", (req, res, next) => {
  findByUser(req.params.userId)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.post("/", async(req, res, next) => {
  const todo = req.body;
  todo.user = req.user._id;
  const arrDB = await Todo.find({});
  todo.id = arrDB.length + 1;
  create(todo)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.delete("/:id", validateMDTodo, (req, res, next) => {
  const id = req.params.id;
  deleteDocument(id)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.patch("/:id", validateMDTodo, (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  updateDocument(id, body)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

module.exports = router;
