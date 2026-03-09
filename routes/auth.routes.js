const express = require("express")
const router = express.Router()

const {register,login} = require("../controllers/auth.controller")

router.post("/register",register)
router.post("/login",login)

const {getProfile} = require("../controllers/user.controller")
const auth = require("../middleware/auth.middleware")

router.get("/profile",auth,getProfile)

module.exports = router