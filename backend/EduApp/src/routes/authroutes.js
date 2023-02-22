
'use strict';
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { jwtKey } = require('../confidential/jwtKey')
const router = express.Router();
const User = mongoose.model('User');


router.post("/signup", async (req, res) => {

  const { email, password, username, contact } = req.body;
  console.log("signup", req.body)

  try {
    const user = new User({ email, password, username, contact })
    await user.save();
    const tokenKey = jwt.sign({ userID: user._id }, jwtKey)
    res.status(200).send({ "msg": "User saved successfully", "status": "true", tokenKey })
  } catch (err) {
    res.status(400).send({ "msg": Object.keys(err.keyValue) + " is invalid", "status": false })
    // res.status(400).send({"msg":err.message,"status":false})
    // res.status(400).send(err.keyValue)
    console.log(err.message, err);


  }
})


router.post("/signin", async (req, res) => {
  console.log("signin", req.body.userid)

  // const { password } = req.body
  const { userid,password } = req.body

  // const {userid}='pva.com';
  if (password!='' && userid!='') {
    const user = await User.findOne({ userid:'prince'})
    console.log("........",user);
    if (!user) {
      return res.status(401).send("User is not registered")
    } else {
      try {
        await user.comparePassword(password)
        const token = jwt.sign({ userID: user._id }, jwtKey)
        res.status(200).send({ token })
      } catch (err) {
        console.log(err);
        return res.status(401).send("if..Password or Email/Username is missing." + err)
      }
    }
  }
  else {
    return res.status(401).send("else...Password or Email/Username is missing.")
  }




})




module.exports = router;