const User = require("../db/entities/User");
const Evaluator = require("../db/entities/Evaluator");
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


router.post('/login', async function(req, res) {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if(!user) {
        return res.status(401).json({success: false, message: "Invalid password", data: {}})
    }

    const isValid = bcrypt.compareSync(req.body.password, user?.dataValues.password);
    console.log(isValid);
    const isStudent = user?.dataValues.role !== 'professor';
    let completeUser;
    if(isStudent) {
        completeUser = await User.findOne({
            include: [{
                model: Evaluator,
                where: {userId: user?.dataValues.id}
            }]}
        )
    }


    if(isValid) {
        const returnedUser = isStudent ? completeUser.dataValues : user.dataValues;
        delete returnedUser.password;
        const token = jwt.sign({
            data: JSON.stringify(returnedUser)
        }, 'secret', { expiresIn: '1h' })
        return res.status(200).json(token);
    } else {
        return res.status(401).json({success: false, message: "Invalid password", data: {}})
    }
})

router.post('/register', async (req, res) => {
    const encryptedPassword = await bcrypt.hashSync(req.body.password, 12);
    const user = await User.create({...req.body, ...{
        password: await encryptedPassword
    }});

    if(user.role !== 'professor') {
        await Evaluator.create({userId: user.id, grade: 0})
    }
    if(!user) {
        return res.status(400).json();
    }

    return res.status(200).json();
})

module.exports = router;
