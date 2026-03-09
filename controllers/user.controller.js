const User = require("../models/user.model")
const AppError = require("../utils/AppError")

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

exports.updateProfile = async (req, res, next) => {
  try {

    const { bio, image } = req.body

    const user = await User.findByIdAndUpdate(
      req.userid,
      { bio, image },
      { new: true }
    ).select("-password")

    if(!user){
      throw new AppError("User not found",404)
    }

    res.json({
      message: "Profile updated",
      user
    })

  } catch (err) {
    next(err)
  }
}