const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = (req, res, next) =>{
    const {authorization} = req.headers
    const payload = jwt.verify(authorization, 'gghkjhjhftyhkjjljokoiyuyrtradxcgvhbjknkjn');
    console.log(payload);
    User.findOne({username: payload.username})
    .then(user =>{
        req.user = user
        next()
    })

}

module.exports = auth;