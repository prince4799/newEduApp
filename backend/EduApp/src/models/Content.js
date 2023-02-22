'use strict';
const mongoose = require('mongoose')
// const {isEmail,isMobilePhone}=require('validator')

const ContentSchema = new mongoose.Schema({
    videolink: {
        type: String,
        unique: true,
        required: [true, "Please enter the link"],
        // validate:[isEmail,"Please Enter valid Email."]
    },
    thumbnail: {
        type: String,
        unique: false,
        required: true,
        // minlength: [8, "Password must be minimum 8 characters long."],

    },
    title: {
        type: String,
        unique: false,
        required: [true, "Please enter title."],
    }

})
mongoose.set('strictQuery', true);






mongoose.model('Contents', ContentSchema)