const User = require("../models/user");
const jwt = require('jsonwebtoken');
const create = (user) => User.create(user);
const find = (req) => User.find({"_id":req.user._id.toString()}, { firstname: 1, _id: 0 });
const deleteDocument = (_id) => User.deleteOne({ _id });
const updateDocument = (_id, body) => User.findOneAndUpdate({ _id }, body);

const login  = async({username, password})=>{
    const user = await User.findOne({username}).exec();
    const isValid = await user.comparePassword(password);
    if(!isValid){
        throw new Error('UN_AUTH')
    }
    const token = jwt.sign({
        username, _id: user.id,
        maxAge: '1d'
    }, 'gghkjhjhftyhkjjljokoiyuyrtradxcgvhbjknkjn')

    return token
}
module.exports = { create, find, deleteDocument, updateDocument, login };



