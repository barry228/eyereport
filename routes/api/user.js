const express = require('express');
const app = express()
const router = express.Router();
const bcrypt = require('bcryptjs');
// const mongoose = require('mongoose');
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const flash = require('connect-flash');
const session = require('express-session');


//load user model
const User = require('../../models/User').User;

//load user report model
const Report = require('../../models/Report').Report;


//SETUP FLASH AND SESSION
app.use(session({
    secret: 'n5t77y9t57ytn7ty5,hj893754yncg3,c.,hc297hc47g.4rg7,ghh.xyh,9btrbr29875t0y5',
    saveUninitialized: false, //If set to true, this session will be
    // saved on the server on each request no matter if
    // something changed or not.
    resave: false,
    cookie: { maxAge: Date.now() + 3600000 }
}));



//GLOBAL VARIABLES
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success-message');
    res.locals.error_message = req.flash('error-message');
    res.locals.messages = require('express-messages')(req, res);
    res.locals.isAuthenticated = req.user ? true : false;  //tenary operators
    res.locals.user = req.user || null;
    next();
});

//  app.use(flash());




//@route        GET api/users/test
//@discription  Tests users route
//@access       public  
router.get('/test', (req, res) => res.json({ msg: 'users works' }));

//@route        POST api/users/signup
//@discription  signup user
//@access       public  

router.post('/signup', (req, res) => {

    let = {
        name,
        phonenumber,
        email,
        password,
        confirmpassword,


    } = req.body;




    User.findOne({ email: email }).then((user) => {
        if (user) {
            req.flash('error-message', 'Email address taken');
            res.redirect('/api/users/signup');

        }


        if (password != confirmpassword) {
            req.flash('error-message', 'Passwords do not match, Please try again');
            res.redirect('/api/users/signup');
        }
        else {


            const newuser = new User({
                name,
                phonenumber,
                email,
                password,
                confirmpassword,




            });

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newuser.password, salt, (err, hash) => {
                    newuser.password = hash;
                    // newuser.save();  

                    req.flash("success-message", "Signup Successful");
                    res.redirect('/api/users/home');
                    newuser.save();
                })
                
            })
           
      };        



    }).catch((err) => console.log(err));




});


//@route        GET api/users/signup
//@discription  signup user
//@access       public  


router.get('/signup', (req, res) => {
    res.render('signup')
});


//@route        GET api/users/signin
//@discription  signin user
//@access       private  

router.get('/signin', (req, res) => {
    res.render('signin')
});




router.post('/signin', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/api/users/index',
        failureRedirect: '/api/users/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/index', (req, res) => {
    res.render('index')
});


//@route        GET api/users/report
//@discription  report user
//@access       private  

router.get('/report', (req, res) => {
    res.render('report')
});

//@route        POST api/users/report
//@discription  report user
//@access       private  

router.post('/report', (req, res) => {

    let = {
        location,
        report,
        lat

    } = req.body;

    const newreport = new Report({
        location,
        report,
        lat


    });

    newreport.save()

    req.flash("success-message", "Your Report Has Been Sent.");
    res.redirect('/api/users/report')


});

//@route        GET api/users/home
//@discription  home user
//@access       public 


router.get('/home', (req, res) => {
    res.render('home')
});

//@route        GET api/users/blog
//@discription  blog user
//@access       public 


router.get('/blog', (req, res) => {
    res.render('blog')
});



module.exports = router;