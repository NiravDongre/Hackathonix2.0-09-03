const User = require("../models/user.model")

exports.getProfile = async(req,res,next)=>{

    try{

    const user = await User.findById(req.userid)
    .select("-password")

    if(!user){
    throw new AppError("User not found",404)
    }

    res.json(user)
}catch(err){
    next(err)
}
}