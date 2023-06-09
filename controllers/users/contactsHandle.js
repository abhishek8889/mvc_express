const session = require('express-session');
const User = require('../../models/userModel');
const Contact = require('../../models/contactModel');

const addUser = async (req,res)=>{
    res.render('user/add-contacts');
}
const contactList = async(req,res)=>{
    res.render('user/contactlist');
}
const editContact = async(req,res)=>{
    res.render('user/edit-contacts');
}
const addUserProcess = async (req,res)=>{
    const contact =  new Contact({
        user_id:req.session.user_id,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        remark:req.body.remark
    });
    const result = await contact.save();
    if(result){
        const message = 'You have succesfully added a contact';
        const redirectUrl = `/user/add-contact?message=${encodeURIComponent(message)}`;
        res.redirect(redirectUrl);
    }
    else{
        const message =  'There is an error in adding process';
        const redirectUrl = `/user/add-contact?message=${encodeURIComponent(message)}`;
        res.redirect(redirectUrl);
    }
}

module.exports = {
    addUser,
    contactList,
    editContact,
    addUserProcess
}