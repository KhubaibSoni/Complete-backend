const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require ('validator')
const bcyrpt = require('bcrypt')



const UserSchema = new Schema({
    Username:{
        type: String,
        unique : true
    },
    email:{
        type:String,
        required : true,
      
    },
    password:{
        type: String,
        required : true,
    }
})

UserSchema.statics.signup = async function(Username,email,password){

    if ( !Username ||!email || !password  ) {
        throw Error('All fields must be filled')
        }
            
    if(!validator.isEmail(email)){
        throw Error("Invalid Email")
    }
    
    
    
    const Emailexists= await this.findOne({email})

    if(Emailexists){
    throw Error("Email Already exits")
    }
      
    const salt = await  bcyrpt.genSalt(10)
    const hash = await bcyrpt.hash(password,salt)
    
    const user = await this.create({Username,email,password:hash})
    
    return user
    
    }

    UserSchema.statics.login = async function(email,password){

        if (!email || !password) {
        throw Error('All fields must be filled')
        }
            
        
        const user= await this.findOne({email})
        if(!user){
        throw Error("Incorrect Email")
        }

          
        
        const match = await bcyrpt.compare(password, user.password)
        
        if(!match)throw Error("Incorrect Password")
           
        
        
        return user
        
        }
        



module.exports = mongoose.model('User' , UserSchema)