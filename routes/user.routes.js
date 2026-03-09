const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth.middleware")
const { updateProfile } = require("../controllers/user.controller")
const {getProfile} = require("../controllers/user.controller")

router.patch("/profile", auth, updateProfile)
router.get("/profile",auth,getProfile)

module.exports = router