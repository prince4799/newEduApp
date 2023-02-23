'use strict';
const express = require('express')
var app = express();
app.use(express.json());
const {error,success}=require('../utils/Constants')
const mongoose = require('mongoose')
const contentrouter = express.Router();
const Contents = require('../models/Content');
const jwtAuth=require('../middleware/authkeys')
// jwtAuth,(req, res)

mongoose.model('Contents')

contentrouter.post("/upload", async (req, res) => {

    const { videolink, thumbnail, title } = req.body;
    console.log("upload", req.body)
  
    try {
      const videos = new Contents({ videolink, thumbnail, title })
      await videos.save();
      res.status(200).send(success({ "msg": "Video saved successfully" }))
    } catch (err) {
      if(err.keyValue){
        res.status(400).send(error({ "msg": Object.keys(err.keyValue) + " is invalid"}))
      }
        else{
            console.log("error in else catch",err);
          res.status(400).send({error:error(err.message)})
        }
      console.log("error in catch",err.message, err);
    }
  })

  contentrouter.get("/load",  jwtAuth ,async (req, res) => {
    console.log("trying in load");

    try {
        console.log("trying in try");
        var contents = await Contents.find({ })
        .clone()
        .catch((err)=> { console.log("error in finding user", err) });
    if(contents)
      res.status(200).send(success({ "msg": "Video loaded successfully" ,"contents":contents}))
      else{
        console.log("error in try",err);
      res.status(400).send({error:error(err.message)})
    }
    } catch (err) {
        console.log("trying in try");

      /*if(err.keyValue){
        res.status(400).send(error({ "msg": Object.keys(err.keyValue) + " is invalid"}))
      }
        else{
            console.log("error in else catch",err);
          res.status(400).send({error:error(err.message)})
        }*/
      console.log("error in catch",err.message, err);
    }
  })

  
  module.exports=contentrouter