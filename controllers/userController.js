// First call the model 
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const securePassword = async (password)=>{
    try{
        const hashPassword = await bcrypt.hash(password,10);
        return hashPassword;
    }catch(error){
        console.log(error.message);
    }
}
const registerUser = async (req,res)=> {
    try{
        const hashPassword = await securePassword(req.body.password);
        const user =  new User({
            name:req.body.name,
            email:req.body.email,
            contact:req.body.contact,
            password:hashPassword,
            profile_image:req.file.filename,
            is_admin:0,
            status:1,
            created_at: Date.now(),
            updated_at: Date.now(),
        });
        const result = await user.save();
        if(result){
            res.render('authentication/register',{message:"You have succesfully registered please verify you mail for active your account."});
        }else{
            res.render('authentication/register',{message:"Sorry there must be some error please retry register process."});
        }
    }catch(error){  
        res.send(error.message);
    }
};
const loginUser = (req,res)=>{
    try{
        if(req.body){
            res.send(
                req.body.email+req.body.password
            );
        }else{
            res.send(`No data found`);
        }
    }catch(error){
        res.send(error.message);
    }
}
module.exports = {
    registerUser,loginUser
}