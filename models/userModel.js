const mongoose = require('mongoose');

// This is the way to create schema :
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
    }
});

//This is how we can create the modal : 

module.exports = mongoose.model('User',userSchema);
