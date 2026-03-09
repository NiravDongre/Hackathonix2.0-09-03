const jwt = require("jsonwebtoken")

const auth = (req,res,next) => {

    const token = req.headers.token

    if(!token){
        throw new AppError ("No token",401)
    }


    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.userid = decoded.id

        next()

    }catch(err){
        throw new AppError ("No token",401) 
    }
}

module.exports = auth