const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const user = require('./controllers/userController');
const userRoute = require('./routes/userRoutes');
const moment = require('moment');
const app = express();
//set view engine 
app.set('view engine','ejs');
// set folder directory and folder name 
app.set('views','./views');

app.use((req, res, next) => {
    res.locals.moment = moment;
    next();
  });
app.use('/',userRoute);
app.listen(8080,()=>{
    console.log('server is start');
});