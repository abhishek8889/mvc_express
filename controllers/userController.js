// First call the model 
const User = require('../models/userModel');

const registerUser = async (req,res)=> {
    try{
        const user = await new User({
            name:req.body.name,
            email:req.body.email,
            contact:req.body.contact,
            password:req.body.password
        });
        const result = await user.save();
        res.send('data is succesfully saved' + req.body.name + req.body.email+req.body.contact+req.body.password);
    }catch(error){  
        res.send(error.message);
    }
};
module.exports = {
    registerUser
}