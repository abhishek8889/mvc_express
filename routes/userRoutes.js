const express = require("express");
const bodyParser = require("body-parser");
const userRoute = express();
const userController = require('../controllers/userController');
const userDashController = require('../controllers/users/dashboard');
const adminController = require('../controllers/admin/dashboard');
const userContactHandle = require('../controllers/users/contactsHandle');
const userList = require('../controllers/admin/UserList');

const multer = require('multer');
const path = require('path');
const session = require('express-session'); // isntall npm package for session
const config = require('../config/config');
userRoute.use(session({secret:config.sessionSecret})); //  and use it in userRoute 
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
userRoute.set('view engine','ejs');
// set folder directory and folder name 
userRoute.set('views','./views');


userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({extended:true}));
//use multer to store files and images: 
const storage = multer.diskStorage({
    // first define the destination where you want to store files
    destination: (req,file,cb)=>{
        cb(null,path.join(__dirname,'../public/userImages'));
    },
    // create file name that you want to give to the image: 
    filename:(req,file,cb)=>{
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }
});

const upload = multer({storage:storage});

/////////////////// Register /////////////////////////////
userRoute.get('/',function(req,res){
    res.render('index');
});
userRoute.get('/register',auth.isLogout,(req,res)=>{
    res.render('authentication/register');
});
userRoute.post('/register',upload.single('profile_image'),userController.registerUser);

////////////////// Login  //////////////////////////////
userRoute.get('/login',auth.isLogout,(req,res)=>{
    res.render('authentication/login');
});
userRoute.post('/login',userController.loginUser);
userRoute.get('/verify-mail',userController.verifyMail);

///////////////// Logout  /////////////////////////////
userRoute.get('/logout',userController.userLogout);

/////////////// ::Admin Routes:: //////////////////////
userRoute.get('/admin-dash',admin.isLogin,adminController.dashboard);
userRoute.get('/admin/user-list',admin.isLogin,userList.userlist);

//////////////// User Routes ///////////////////////////
userRoute.get('/user-dash',auth.isLogin,userDashController.dashboard);
userRoute.get('/user/add-contact',auth.isLogin,userContactHandle.addUser);
userRoute.get('/user/contact-list',auth.isLogin,userContactHandle.contactList);
userRoute.get('/user/edit-contact',auth.isLogin,userContactHandle.editContact);
userRoute.post('/add-user-process',auth.isLogin,userContactHandle.addUserProcess);
module.exports = userRoute;