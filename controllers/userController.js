// First call the model 
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const securePassword = async (password)=>{
    try{
        const hashPassword = await bcrypt.hash(password,10);
        return hashPassword;
    }catch(error){
        console.log(error.message);
    }
}

// send verification mail : 
const sendVerifyMail = async(name , email, user_id)=>{
    try{
        // create transporter : 
        const transporter = nodemailer.createTransport({
            host: 'smtp.elasticemail.com',
            port: 2525,
            secure:false,
            requireTls:true,
            auth:{
                user:'developer.ashar@gmail.com',
                pass:'8DE67A7C3CAEBA0A22CA3023C18A4726D3CB',
            }
        });
        // create mail options that what parameter we want to send :
        const mailOptions = {
            from:'developer.ashar@gmail.com',
            to: email,
            subject:'Verification of mail.',
            html:`<p> Please <a href='http://localhost:8080/verify-mail?id=${user_id}'> verify your mail</a> to activate your account.`,
        }
        // send mail 
        transporter.sendMail(mailOptions, function(error,info){
            if(error){
                console.log('there is something error in sending mail : ' + error);
            }else{
                console.log(`Your email has been sent : ${info}`);
            }
        });
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
            sendVerifyMail(req.body.name,req.body.email,result._id);
            res.render('authentication/register',{message:"You have succesfully registered please verify you mail for active your account."});
        }else{
            res.render('authentication/register',{message:"Sorry there must be some error please retry register process."});
        }
    }catch(error){  
        res.send(error.message);
    }
};
const loginUser = async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({email:email});
        if(userData){
            // check password 
            const passwordMatch = await bcrypt.compare(password,userData.password); // return true if password matched :
            if(passwordMatch){
                if(userData.is_verified == 0){ // check user mail is verified or not ? 
                    res.render('authentication/login',{message:"Sorry your email is not verified please verify your email."});
                }else{
                    req.session.user_id = userData._id;
                    if(userData.is_admin == 1){
                        res.redirect('/admin-dash');
                    }else{
                        res.redirect('/user-dash');
                    }
                }
            }else{
                res.render('authentication/login',{message:"Sorry your email or password is incorrect."});
            }
        }else{
            res.render('authentication/login',{message:"Sorry your email or password is incorrect."});
        }
    }catch(error){
        res.send(error.message);
    }
}
const verifyMail = async (req,res)=>{
        try {
            const updateUser  = await User.updateOne({_id:req.query.id},{$set:{is_verified:1}});
            console.log(updateUser);
            res.render('authentication/email-verified');
        } catch (error) {
            console.log(error.message);
        }
}
const userLogout = async (req,res)=>{
    req.session.destroy();
    res.redirect('/login');
}
module.exports = {
    registerUser,
    loginUser,
    verifyMail,
    userLogout
}