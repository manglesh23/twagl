const jwt= require('jsonwebtoken');
require('dotenv').config();

/*-------------------------------------------------------------------------*/
/*-------------Token Verification of user and added to req.user------------*/
/*-------------------------------------------------------------------------*/

const verifyToken=async(req,res,next)=>{
    console.log("verify");
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token=req.headers.authorization.split(" ")[1];

            let decode= jwt.verify(token,process.env.SECRET_KEY);
            console.log("Decode:-",decode)
            req.user=decode;
            next();
        }catch(e){
            console.error(e);
            return{
                error:true,
                details:e
            }
        }
    }else{
        res.status(401).json({msg:"Token expired or not available"});
    }
}

module.exports={verifyToken};