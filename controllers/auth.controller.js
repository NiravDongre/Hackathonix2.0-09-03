const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async(req,res)=>{

    const {name,email,password} = req.body

    const user = await User.findOne({email})

    if(user){
        return res.status(400).json({message:"User exists"})
    }

    const hash = await bcrypt.hash(password,10)

    const newUser = await User.create({
        name,
        email,
        password:hash
    })

    res.json(newUser)
}


exports.login = async(req,res)=>{

    const {email,password} = req.body

    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json({message:"Invalid credentials"})
    }

    const match = await bcrypt.compare(password,user.password)

    if(!match){
        return res.status(400).json({message:"Invalid credentials"})
    }

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.json({token})
}