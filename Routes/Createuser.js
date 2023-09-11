// /** @format */

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
// const db = require('../db')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET ="thisisgranddragon"

 router.post(
  "/createuser",
  [
      body("email", "enter a valid email").isEmail(),
      body("name", "enter a valid name").isLength({ min: 5 }),
    body("password", "password must be 5 charactor").isLength({ min: 5 }),
  ],
  async (req, res) => {
            let success = false
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success,errors: errors.array() });
            }
            const salt = await bcrypt.genSalt(10)
            var  secPassword = await bcrypt.hash(req.body.password,salt)
      try {
         
    await  User.create({
        name : req.body.name,
        password : secPassword,
        email : req.body.email,
        location : req.body.location
    })
      
    console.log('sign up')
    res.json({success:true})
       
    } catch (error) {
        console.log("hii bro eror")
        console.log(error)
        res.json({success:false})
    }
   
})

  //Authenticate a user using : post '/api/auth/login no login required
  // ROUTE_2
  router.post(
    "/login",
    [
      // body('name','enter avalid name').isLength({ min: 3 }),
      body("email", "enter a valid email").isEmail(),
      body("password", "password cannot be blank").exists(),
    ],
    async (req, res) => {
      let success = false;
      // if there are errors , return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      try {
        let user = await User.findOne({ email });
        if (!user) {
          success = false;
          return res
            .status(400)
            .json({ error: "please try to correct login creadientials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
          success = false;
          return res
            .status(400)
            .json({
              success,
              error: "please try to correct login creadientials",
            });
        }
        // payload woh data h jo user jisko m bhejunga
        const data = {
          user: {
            id: user.id,
          },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        //   m ek token bhejunga or us token me user ki id bhejunga jo database se milegi.
        // jab bhi jwt ko server se dispatch krunga ,tab me usko sign krunga uske secret se
        success = true;
        console.log("login")
        res.json({ success, authtoken });
      } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
      }
    }
  );
module.exports = router;
