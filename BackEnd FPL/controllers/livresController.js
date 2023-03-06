const Livre = require('../Models/livres')

exports.addlivre = async (req, res, next) => {
    try {
     
        await Livre.create(req.body)   
        res.send({message: "livre created successfully."})
    } catch (error) {
        next();
    }
};

exports.getAlllivres = async (req, res, next) => {
    try {
        let livre = await Livre.find()
        res.send(livre);
    } catch (error) {
        next();
    }
};


exports.getOnelivre = async (req, res, next) => {
    try {
        let livre = await Livre.findById(req.params.id)
        res.send(livre);

    } catch (error) {
        next();
    }
};

exports.updatelivre = async (req, res, next) => {
    try {
        await Livre.findByIdAndUpdate(req.params.id, req.body)
        const livre = await Livre.findOne({_id:req.params.id})
        res.send({ message: "livre has been updated successfully.", data :livre })
        
    }
    catch (error) {
        res.status(500).send(error.message)
        next();
    }
};

exports.deletelivre = async (req, res, next) => {
    try {
        await Livre.findByIdAndRemove(req.params.id);
        res.send({ message: "livre has been delated successfully." });
    } catch (error) {
        next()
    }
};

