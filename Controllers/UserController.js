const mongoose = require('mongoose');
const User = require('../Models/UserModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const TokenCreator = (_id)=> {
return jwt.sign({_id} , process.env.SECRETS , {expiresIn : '2d'})
}

const signUp = async (req , res)=>{
const {Username,email,password} =req.body
    try {
        const user = await User.signup(Username , email,password)
        const token =  TokenCreator(user._id)
        res.status(200).json({email , token })
    } catch (error) {
        res.status(400).json({message:error.message}) 
    }
 
}

const login = async (req , res)=>{
    const {email,password} =req.body
    try {
        const user = await User.login(email,password)
        const token = TokenCreator(user._id)
        res.status(200).json({user, token})
    } catch (error) {
      res.status(400).json({message:error.message}) 
    }
}

module.exports ={
    signUp,
    login
}