const User = require('../models/user');

const validateMDUser = async(req, res, next)=>{
    const loginID = req.user._id.toString();
    const userID = req.params.id;
    const userDoc = await User.findOne({_id: userID});
    if(loginID != userDoc._id.toString()){
        res.json("You don't have a permission");
    }
    next();
    // console.log(userID,todo);
    
}




module.exports = validateMDUser;