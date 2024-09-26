const jwt= require('jsonwebtoken');
require('dotenv').config();

/*--------------------------------------------------------------*/
/*-------------Token Generation based on document id------------*/
/*--------------------------------------------------------------*/

const generateToken=(id)=>{
    let token=jwt.sign({id},process.env.SECRET_KEY,{expiresIn:"1d"});
    return token;
}

module.exports={generateToken};