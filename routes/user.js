const express = require("express");
const router = express.Router();

const { create, find, deleteDocument, updateDocument, login } = require("../controllers/user");
const validateMDUser = require('../middlewares/validateUser');
router.get("/", async (req, res) => {
  find(req)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.post("/", async (req, res, next) => {
  const user = req.body;
  create(user)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.post("/login", async (req, res, next) => {
  const {username, password} = req.body;
  
  login({username, password})
  .then((doc) => res.json(doc))
  .catch((e) => next(e));
});

router.delete("/:id",validateMDUser, async (req, res, next) => {
  const id = req.params.id;
  deleteDocument(id)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

router.patch("/:id",validateMDUser, async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  updateDocument(id, data)
    .then((doc) =>
      res.json({ message: "user was edited successfully", user: data })
    )
    .catch((e) => next(e));
});

module.exports = router;
