import User from '../models/User.js';
// import {  validationResult } from "express-validator";
// const db = require('../db')
import bcrypt from "bcrypt";

import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken"
const JWT_SECRET ="thisisgranddragon"
export const registerController =

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
        console.log(error)
        res.json({success:false})
    } 
}

export const loginController =
    async (req, res) => {
      let success = false;
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