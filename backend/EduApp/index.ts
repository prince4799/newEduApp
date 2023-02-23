'use strict';
const express = require('express')
const body=require('body-parser')
const mongoose=require('mongoose')
const bodyParser = require('body-parser');

const app = express()
const port = 5500
app.use(express.json());
const {mongoUrl}=require("./src/confidential/mongoKey")


require('./src/models/User')
const jwtAuth=require('./src/middleware/authkeys')
const router=require('./src/routes/authroutes');
const contentrouter=require('./src/routes/contentroute')
app.use(bodyParser.json())
app.use("/auth",router)
// app.use("/contents",contentrouter)



mongoose.connect(mongoUrl,{useNewUrlParser: false})

mongoose.set('strictQuery', false)

mongoose.connection.on('connected',()=>{
  console.log("You are now connected to mongo");
  
})

mongoose.connection.on('error',(err)=>{
  console.log("not connected to the mongo",err);
  
})

app.get('/', jwtAuth,(req, res) => {
    res.status(200).send("You get that"+JSON.stringify(req.body)+JSON.stringify(req.user))
    console.log("requestfrom get/",req.user);
    
  })

  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
 