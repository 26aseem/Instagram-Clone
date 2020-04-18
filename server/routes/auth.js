
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const requireLogin = require('../middlewares/requiredLogin')



router.post('/signup', (req,res) => {
    const { name, email, username, password, url } = req.body
    if(!name || !email || !username || !password){
        return res.status(422).json({
            error: "Please fill all the Fields"
        })
    }
    User.findOne({
        $or : [
            {email:email},
            {username: username}
            ]
        })
    .then((savedUser) => {
        if(savedUser){
            res.status(402).json({
                error: "Username or Email is already registered"
            })
        }
        bcrypt.hash(password, 15)
        .then(hashedPass=> {
            const user = new User({
                name,
                username,
                email,
                password: hashedPass,
                profilePic: url
                
            })
    
            user.save()
            .then(user => {
                res.json({
                    message: "Registered Successfully"
                })
            })
            .catch(err=> {
                console.log(err)
            })
        })
        .catch(err=> {
            console.log(err)
        })
        
    })
    
    .catch(err => {
        console.log(err)
    })
})

router.post('/signin', (req,res) => {
    const {username, password} = req.body
    if(!username || !password){
        return res.status(422).json({
            error: "Please Fill all the Fields"
        })
    }

    User.findOne({
        username: username
    })
    .then(savedUser => {
        if(!savedUser){
            return res.status(403).json({
                error: "Invalid Username"
            })
        }
        bcrypt.compare(password, savedUser.password)
        .then(ifMatch => {
            if(ifMatch){
                console.log("Successfully Signed In")
                const token = jwt.sign({_id: savedUser._id}, process.env.SECRET)
                const {_id, name, email, username,followers,following,profilePic} = savedUser
                res.json({token,user:{_id,name,email,username,followers,following,profilePic}})
            }
            else{
                res.status(422).json({
                    error: "Invalid Password"
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    })

    .catch(err => {
        console.log(err)
    })
    
})

module.exports = router