const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 8,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
  },
  dob: Date,
  password: {
    type: String,
    required: true
  }
},{
  toJSON: {
    transform: (doc, ret, opts) =>{
      delete ret.password;
      delete ret.v;
      console.log(ret);
      return ret;
    }
  }
});

userSchema.pre("save", function(){
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
});

userSchema.methods.comparePassword = function (password){
  const isValid = bcrypt.compareSync(password, this.password);
  return isValid
}

const User = mongoose.model("User", userSchema);

module.exports = User;
