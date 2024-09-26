const User = require("../models/user");
/*--------------------------------------------------------------*/
/*---------------User Registration page-------------------------*/
/*--------------------------------------------------------------*/

const signUp=async(req,res)=>{
 try{
   const{name,emailId,mobileNumber,password}=req.body;
   console.log(name,emailId,mobileNumber,password);
   
   let user= await User.create({
    name,
    emailId,
    mobileNumber,
    password
   });

   res.status(200).json({msg:user});
}catch(e){
    return{
        error:true,
        details:e
    }
}
}

module.exports={signUp};