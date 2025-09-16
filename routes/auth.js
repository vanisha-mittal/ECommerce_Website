const express = require('express');
const User = require('../models/User');
const router = express.Router();
const passport=require('passport');

// show form for signup
router.get('/register',(req,res)=>{
    res.render('auth/signup')
})

//register a user
router.post('/register',async (req,res)=>{
    try{
        let {email,password,username,role}=req.body;
        let user=new User({email,username,role});
        const newUser=await User.register(user,password);
        req.login( newUser , function(err){
            if(err){return next(err)}
            req.flash('success' , 'welcome,  you are registed succesfully');
            return res.redirect('/products');
        })
    }
    catch (e) {
        res.flash("error",e.message);
        return res.redirect("/register");
    }

})

//login form
router.get('/login',(req,res)=>{
    res.render('auth/login')
})

// login by user
router.post('/login',
    passport.authenticate('local', {
        failureRedirect:'/login',
        failureMessage:true
    }),
    async (req,res)=>{
    req.flash('success','welcome back');
    res.redirect('/products');

})

//logout
router.get("/logout",(req,res)=>{
    ()=>{
        req.logout();
    }
    req.flash("success","goodbye")
    res.redirect("/login");
})

module.exports = router;