const User = require("../db/entities/User");
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/login', async function(req, res) {
    console.log(req.body);
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    const isValid = bcrypt.compareSync(req.body.password, user.dataValues.password);

    if(isValid) {
        const returnedUser = user.dataValues;
        delete returnedUser.password;
        return res.status(200).json(returnedUser);
    } else {
        return res.status(401).json({success: false, message: "Invalid password", data: {}})
    }
    
})

module.exports = router;