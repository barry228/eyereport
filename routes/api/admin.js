const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");

//load admin model
const Admin = require("../../models/Admin").Admin;

//load report model
const Report = require("../../models/Report").Report;

//@route        GET api/admin/test
//@discription  Tests admin route
//@access       public
router.get("/test", (req, res) => res.json({ msg: "admin works" }));

// //@route        GET api/admin/register
// //@discription  Register admin
// //@access       public

//the admin details

const admin = new Admin({
  firstname: "Barnabas",
  lastname: "Habu",
  phonenumber: "08107550721",
  email: "habupanshak@gmail.com",
  password: "123456",
  userType: "Admin"
});
bcrypt.genSalt(10, function(err, salt) {
  bcrypt.hash(admin.password, salt, (err, hash) => {
    admin.password = hash;
    // admin.save();
    // console.log(admin)
    // req.flash("success-message", "Signup Successful");
  });
  // res.redirect('/api/admin/adminsignin');

  //@route        GET api/users/adminsignin
  //@discription  signin admin
  //@access       private

  router.get("/adminsignin", (req, res) => {
    res.render("adminsignin");
  });

  //passport for admin
  // passport.use(
  //   new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
  //     //match user
  //     Admin.findOne({ email: email })
  //       .then(admin => {
  //         if (!admin) {
  //           return done(null, false, {
  //             message: "Sorry this email has not been  registered"
  //           });
  //         }

  //         //match password
  //         bcrypt.compare(password, admin.password, (err, isMatch) => {
  //           if (err) throw err;

  //           if (isMatch) {
  //             return done(null, admin);
  //           } else
  //             done(null, false, {
  //               message: "Sorry the Password is not registered"
  //             });
  //         });
  //       })
  //       .catch(err => console.log(err));
  //   })
  // );
  passport.serializeUser((admin, done) => {
    done(null, admin.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, admin) => {
      done(err, admin);
    });
  });

  //@route        POST api/users/adminsignin
  //@discription  signin admin
  //@access       private

  router.post("/adminsignin", (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/api/admin/adminindex",
      failureRedirect: "/api/admin/adminsignin",
      failureFlash: true
    })(req, res, next);
  });

  //@route        GET api/users/adminindex
  //@discription  index admin
  //@access       private

  router.get("/adminindex", (req, res) => {
    Report.find({}, (err, report) => {
      res.render("adminindex", {
        report: report
      });
    });
  });

  // });
});

module.exports = router;
