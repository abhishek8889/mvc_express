const session = require('express-session');
const User = require('../../models/userModel');
const dashboard = async (req,res)=>{
    const user_id = req.session.user_id;
    const userData = await User.findOne({_id:user_id});
    res.render('admin/index',{userData});
}

module.exports = {
    dashboard,
}