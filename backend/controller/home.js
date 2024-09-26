const home=async(req,res)=>{
    res.status(200).json({msg:"Home page"});
    // res.send("Home page")
}

module.exports={home};