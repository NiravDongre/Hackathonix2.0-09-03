const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { registerSchema } = require("../schema/user.schema")

exports.register = async (req,res,next) => {

    try{
    const result = registerSchema.safeParse(req.body)

    if(!result.success){
        return res.status(400).json({
            error: result.error.errors
        })
    }
    const { username,email,password } = result.data

    const user = await User.findOne({email})

    if(user){
        throw new AppError ("User exists",400)

    }

    const hash = await bcrypt.hash(password,10)

    const newUser = await User.create({
        username,
        email,
        password:hash
    })

    return res.json(newUser)
}catch(err){
    next(err)
}
}


exports.login = async (req,res,next) => {

    try{

    const result = loginSchema.safeParse(req.body)

    if(!result.success){
        return res.status(400).json({
            error: result.error.errors
        })
    }

    const { email, password } = result.data

    const user = await User.findOne({email})

    if(!user){
       throw new AppError ("Invalid credentials",400)

    }

    const match = await bcrypt.compare(password ,user.password)

    if(!match){
        throw new AppError ("Invaid credentials",400)
    }

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.json({token})

}catch(e){
    next(err)
}
}