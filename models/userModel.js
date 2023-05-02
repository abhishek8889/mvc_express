const mongoose = require('mongoose');


// This is the way to create schema :
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    contact:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    profile_image:{
        type:String,
    },
    is_admin:{
        type:Number,
        required:true,
        default:0,
    },
    is_verified:{
        type:Number,
        default:0,
    },
    status:{
        type:Number,
        required:true,
        default:true,
    },
    created_at:{
        type: Date, 
        default: Date.now()
    },
    updated_at:{
        type: Date, 
        default: Date.now()
    }
});

//This is how we can create the modal : 

module.exports = mongoose.model('User',userSchema);
