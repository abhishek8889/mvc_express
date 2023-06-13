const mongoose = require('mongoose');
// Create Schema
const contactSchema = mongoose.Schema({
    user_id:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    remark:{
        type:String,
        required:false,
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

module.exports = mongoose.model('Contact',contactSchema);