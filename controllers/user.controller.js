const User = require("../models/user.model")

exports.getProfile = async(req,res)=>{

    const user = await User.findById(req.userid)
    .select("-password")

    res.json(user)
}