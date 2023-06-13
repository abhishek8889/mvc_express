const User = require('../../models/userModel');
const moment = require('moment');
const userlist = async (req,res) =>{
    const userList = await User.find({is_admin:0});
    // console.log('hello call from user listhfgh');
    res.render('admin/userlist',{
        userList,
    });
}
module.exports = {
    userlist ,
};