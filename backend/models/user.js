const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

/*--------------------------------------------------------------*/
/*----------------------User Model------------------------------*/
/*--------------------------------------------------------------*/

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

/*--------------------------------------------------------------*/
/*----------------Encrypted password helper---------------------*/
/*--------------------------------------------------------------*/

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    let hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  });

/*--------------------------------------------------------------*/
/*------------------Compare Password while login----------------*/
/*--------------------------------------------------------------*/
  
  userSchema.methods.comparePassword = async function (password) {
    console.log(password, this.password);
    return await bcrypt.compare(password, this.password);
  };

  const User= mongoose.model("User",userSchema);
  module.exports=User;

  