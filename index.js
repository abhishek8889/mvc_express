const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const user = require('./controllers/userController');
//set view engine 
app.set('view engine','ejs');
// set folder directory and folder name 
app.set('views','./views');

// // use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.render('homepage');
});

app.get('/register',(req,res)=>{
    res.render('authentication/register');
});
app.post('/register',user.registerUser);

app.listen(8080,()=>{
    console.log('server is start');
});