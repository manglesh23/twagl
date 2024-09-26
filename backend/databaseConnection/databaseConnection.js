const mongoose=require('mongoose');

const URI=process.env.DATABASE_KEY;

/*--------------------------------------------*/
/*-------------Database Connection------------*/
/*--------------------------------------------*/

const connectDatabase=async()=>{
    try{
    await mongoose.connect(URI);
    console.log("Database connection");
    }catch(e){
        return{
            error:true,
            details:e
        }
    }
}

module.exports={connectDatabase};