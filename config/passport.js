const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//load user model
const User = require('../models/User').User;

//load user model
// const Admin = require('../models/Admin').Admin;



module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField:'email'},(email,password,done)=>{
            //match user
            User.findOne({email})
            .then(user =>{
                if(!user){
                    return done(null, false, 'error-message', 'Invalid User' );
                }

                //match password
                bcrypt.compare(password, user.password, (err, isMatch)=>{
                    if(err) throw err;

                    if(isMatch){
                        return done (null, user);
                    }else done(null, false, {message:'Sorry the Password is not registered'})
               }); 
            })
            .catch(err => console.log(err));
        })
    );



// second possibility

    passport.serializeUser((user,done)=>{
        done(null, user.id);
    });
    passport.deserializeUser((id,done)=>{
        User.findById(id, (err,user)=>{
            done(err,user);
        });
    });
}


