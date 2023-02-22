
'use strict';
const express = require('express')
var app = express();
app.use(express.json());
const {error,success}=require('../utils/Constants')

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
    console.log(err.message, err);
  }
})


router.post("/signin", async (req, res) => {
  const { userid, password } = req.body
  console.log("request body", req.body);
  var value= {}


  if (password != '' && userid != '') {
    var user = await User.find({ })
    .clone()
    .catch((err)=> { console.log("error in finding user", err) });
    // console.log(">>>>>>>>", user);

    user.map((item,index)=>{
      if(item.username == userid || item.email== userid){
        console.log("its here",item);
        value=item;
      }
    })

    if (!value) {
      return res.status(401).send(error("User is not registered"))
    } else {
      try {
        await value.comparePassword(password)
        const token = jwt.sign({ userID: user._id }, jwtKey)
        res.status(200).send({ tokenID:token, success:success('Successfully loged in') })
      } catch (err) {
        console.log(err);
        return res.status(401).send(error('Password or Email/ Username not matched.'))
        // return res.status(401).send("Password or Email/Username not matched." + `\n` + err)
      }
    }
  }
  else {
    return res.status(401).send(error("Password or Email/Username is missing."))
  }
})

/*router.post("/login",async(req,res,next)=>{
  const {userid,password}=req.body;

  console.log("userid :",req.body.userid,'\n',"password: ",req.body.password);

  var user={}

  user=  User.findOne({userid}).clone().catch(err=>{
  res.status(200).send(err)
  })

  const {sumit}='sumit'
  // User.find({},{$all:'sumit'},function (err, adminLogins) {
  //   if (err) return console.error(err);
  //   console.log(adminLogins);``
  // }).select({username:userid},function(err,res){
  //   if(err)
  //   console.log("errr",err);
  //   else{
  //     console.log("res...",res);
  //   }
  // })

  User.find({  }, (err, user) => {
    if (err) {
      console.log(err);
      return;
    }
    
    console.log(user);
  });
  user.then((res)=>{
    console.log("........",res);
  })

  res.status(200).send(user)
})
*/


module.exports = router;