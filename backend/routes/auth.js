const express= require('express')
const User= require('../models/User')
const router= express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const { body, validationResult } = require('express-validator');
const { findOne } = require('../models/User');

const JWT_SECRET= "wizeewigkonhijaantekya"

let success= false;

//ROUTE 1: Create a User using: POST "/api/auth/createuser". No Login required.
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Minimum length of password should be 5').isLength({ min: 5 }),
], async (req,res)=>{

    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try{

        let success=false;

    //Check whether user with this email exists already
    let user= await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({success, error: "A user with this email exists already"})
    }
    const salt= await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.password,salt)
    // Create new user
    user= await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data={
        user:{
            id: user.id
        }
      }
      const authtoken=jwt.sign(data,JWT_SECRET);
      //console.log(authtoken);

    // res.json(user)
    success=true;
    res.json({success, authtoken})

    } catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
      
})


//ROUTE 2: Login a User using: POST "/api/auth/login". No Login required.
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req,res)=>{

    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}= req.body;

    try{

        let success=false;

        let user= await User.findOne({email})
        if(!user){

            return res.status(400).json({success, error: "Please try to login with correct credentials"})
        }

        const passwordCompare= await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error: "Please try to login with correct credentials"})
        }

        const data={
            user:{
                id: user.id
            }
          }
          const authtoken=jwt.sign(data,JWT_SECRET);
          success=true;
        //   console.log("Login Successfull")
          res.send({success, authtoken});
    } catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }



})


//ROUTE 3: Get user details using: POST "/api/auth/getuser". No Login required.
router.post('/getuser',fetchuser, async (req,res)=>{
        try {
            userId=req.user.id
            const user= await User.findById(userId).select("-password")
            res.send(user)
        } catch (error) {
            console.log(error.message);
                res.status(500).send("Internal Server Error")
        }
})

module.exports= router