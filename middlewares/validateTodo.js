const Todo = require('../models/todo')
const validateMDTodo = async(req, res, next)=>{
    const userID = req.user._id.toString();
    const todoID = req.params.id;
    const todo = await Todo.findOne({_id: todoID});
    if(userID != todo.user.toString()){
        res.json("You don't have a permission");
    }
    next();
    // console.log(userID,todo);
    
}

module.exports = validateMDTodo;