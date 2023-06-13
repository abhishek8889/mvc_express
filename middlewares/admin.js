const User = require('../models/userModel');
const isLogin = async (req, res, next) => {
    try {
        let user = await User.findOne({_id:req.session.user_id});
        if (req.session.user_id && user.is_admin == 1) {
        } else {
            res.redirect('/login');
        }
        next();
    } catch (error) {
        console.log(error.message);
    }
}

const isLogout = async (req, res, next) => {
    try {
        let user = await User.findOne({_id:req.session.user_id});
        if (req.session.user_id && user.is_admin == 1) {
            res.redirect('/admin-dash');
        }
        next();
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    isLogin,
    isLogout,
}