const express = require("express")
const User = require("../models/User")
const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtsecret = 'iamahappyperson'

router.post('/createuser', [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt);
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        })
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.json({ success: false });
    }
})
router.post('/loginuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
    }
    let email = req.body.email
    try {
        let userData = await User.findOne({ email });
        const pwdCompare = await bcrypt.compare(req.body.password,userData.password);
        if (!userData || (!pwdCompare)) {
            return res.status(400).json({ success: false, errors: "Wrong credentials." })
        }
        const data = {
            user:{
                id : userData.id
            }
        }
        const authToken = jwt.sign(data,jwtsecret);
        res.json({ success: true , authToken:authToken});
    } catch (err) {
        console.log(err);
        res.json({ success: false });
    }
})
module.exports = router;