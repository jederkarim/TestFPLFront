const User = require('../models/users')
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const randomString = require('randomstring')
const bcrypt = require('bcryptjs');


exports.login = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email })

        if (user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
                res.status(200).json({ message: "Login sucessfully.", token: token });
            } else {
                res.status(400).json({ message: "E-mail or password is invalid." });
            }
        } else {
            res.status(400).json({ message: "E-mail or password is invalid." });

        }
    }
    catch (error) {
        console.log(error);
        next();
    }
}

exports.register = async (req, res, next) => {

    try {
        const verif = await User.findOne({ email: req.body.email })
        if (verif) {
            res.status(400).send({ message: 'E-mail already in use.' })

        } else {
            const salt = await bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash;

            await User.create(req.body)
            res.send({ message: "User created successfully." })

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'error serveur' })
    }
}




