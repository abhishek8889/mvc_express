const express = require("express");
const bodyParser = require("body-parser");
const userRoute = express();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');


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

//register
userRoute.get('/register',(req,res)=>{
    res.render('authentication/register');
});
userRoute.post('/register',upload.single('profile_image'),userController.registerUser);

// login
userRoute.get('/login',(req,res)=>{
    res.render('authentication/login');
});
userRoute.post('/login',userController.loginUser);


module.exports = userRoute;