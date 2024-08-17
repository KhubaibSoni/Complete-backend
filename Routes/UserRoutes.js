const express = require('express')
const {signUp,login} = require('../Controllers/UserController')

const router = express.Router()

router.post("/login",login)
router.post("/SignUp" , signUp)


module.exports = router