const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const { jwtKey } = require('../confidential/jwtKey')

module.exports = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).send("You must be logged in.")
    }
    const token = authorization.replace("Bearer", "");
    jwt.verify(token, jwtKey, async (err, payload) => {
        if (err) {
            console.log("!!", err);
            return res.status(401).send("Unauthorized user");
        }
        const { userID } = payload
        if (mongoose.isValidObjectId(userID)) {
            const user = await User.findById('63f39cb41b90a5a202feeaae', (err) => {
                // return res.status(401).send(err);
                console.log("error..",err);
            }).clone().catch(function (err) {
                return res.status(401).send(err);
            });
            req.user = user;
            next();
        }


    })
}


// User.findById(new ObjectID(leave.userId), function (err, user) {
    // user.filedLeaves.pull(leave._id);
    // user.save();
//   });
//   next();

