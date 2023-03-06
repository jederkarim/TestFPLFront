const User = require('../models/users')
const bcrypt = require("bcryptjs");



exports.adduser = async (req, res) => {
    try {
        const verif = await User.findOne({ email: req.body.email })
        if (verif) {
            res.status(400).send({ message: 'E-mail already in use.' })

        } else {
            const salt = await bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash;

            await User.create(req.body)     
            res.send({message: "User created successfully."})

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'error serveur' })
    }
}

exports.getAlluser = async (req, res, next) => {
    try {
        let user = await User.find()
        res.send(user);
    } catch (error) {
        res.status(500).json({ message: error.message || 'error serveur' });
        next();
    }
};

exports.getOneuser = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id)
        res.send(user);
    } catch (error) {
        res.status(500).json({ message: error.message || 'error serveur' });
        next();
    }
};

exports.updateuser = async (req, res, next) => {
    try {
        const verif = await User.findOne({ email: req.body.email })
        if (verif) {
            res.status(400).send({ message: 'E-mail exists' })
        }
        else {
            if( req.body.password != ""){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }else{
                delete  req.body.password;
            }
            await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.send({ message: 'User has been updated.' })
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'error serveur' });
        next();
    }
};

exports.deleteuser = async (req, res, next) => {
    try {
        let user = await User.findByIdAndRemove(req.params.id);
        res.send({message: 'User has been deleted successfully.'});
    } catch (error) {
        res.status(500).json({ message: error.message || 'error serveur' });
        next();
    }
};
