const express = require("express")
const router = express.Router()

const {register,login} = require("../controllers/auth.controller")

router.post("/register",register)
router.post("/login",login)

const {getProfile} = require("../controllers/user.controller")
const auth = require("../middleware/auth.middleware")



module.exports = router