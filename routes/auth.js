const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const users = mongoose.model("Users");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys/keys');

router.post('/api/register',(req,res)=>{
    console.log("New req")
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(422).json({error: "Please enter all the fields"})
    }
    
    users.findOne({
        email: email
    }).then(savedUser=>{
        if(savedUser){
            return res.status(422).json({error: "User already exists with the email " + email})
        }
        bcryptjs.hash(password,10).then(hashedPass=>{
            const user = new users({
                name,
                email,
                password: hashedPass
            })
    
            user.save().then(user=>{
                res.json({
                    message: "Saved succesfully"
                })
            }).catch(e=>{
                console.log(e);
            })
        })
        
    
 
        
        
        
    }).catch(e=>{
        console.log(e);
    })
    
})

router.post('/api/signin',(req,res)=>{
    const {email,password} = req.body;

    users.findOne({
        email:email
    }).then(foundUser=>{
        bcryptjs.compare(password,foundUser.password).then(match=>{
            if(!match){
                return res.status(422).json({
                    error: "Invalid email or password"
                })
            }
            const token = jwt.sign({_id: foundUser._id},JWT_SECRET);

            const {firstName,lastName, email} = foundUser
            res.json({
                token,
                user: {
                    firstName,
                    lastName,
                    email
                }
            })
        })
    }).catch(err=>{
        return res.status(422).json({
            error: "Invalid email or password"
        })
    })

})

module.exports = router;