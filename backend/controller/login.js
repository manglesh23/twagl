const { generateToken } = require("../middleware/generateToken");
const User = require("../models/user");

/*--------------------------------------------------------------*/
/*----------------User Login Page-------------------------------*/
/*--------------------------------------------------------------*/

const login=async(req,res)=>{
    const {mobileNumber,password}=req.body;
    const findUser= await User.findOne({mobileNumber});
    if(!findUser || !findUser.comparePassword(password)){
        res.status(404).json({msg:"Incorrect Credentils"});
    }
    console.log(findUser);
    let token= generateToken(findUser._id);
    res.status(200).json({token:token});
}

module.exports={login};