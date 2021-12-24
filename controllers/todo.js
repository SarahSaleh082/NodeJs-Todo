const Todo = require("../models/todo");

const create = (todo) => Todo.create(todo);
const find = (req) => {
  const queires = req.query
  const limit = queires.limit ? queires.limit : 4;
  const skip = queires.skip ? queires.skip : 0;
  const userID = req.user._id.toString();
  
  return Todo.find({user: userID})
    .limit(+limit)
    .skip(+skip)
    .populate("user");
};

const deleteDocument = (id) => Todo.deleteOne({ id });
const updateDocument = (id, body) => Todo.findOneAndUpdate({ id }, body);

const findByUser = (userId) => Todo.find({ user: userId }).populate("user");

module.exports = { create, find, deleteDocument, updateDocument, findByUser };
