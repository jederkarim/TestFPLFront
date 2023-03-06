const Categorie = require('../Models/categories')


exports.addCategorie = async (req, res, next) => {
    try {
   
        await Categorie.create(req.body)   
        res.send({message: "Categorie created successfully."})
    } catch (error) {
        next();
    }
};
exports.getAllCategorie = async (req, res, next) => {
    try {
        let categories = await Categorie.find()
        res.send(categories);
    } catch (error) {
        next();
    }
};

exports.getOneCategorie = async (req, res, next) => {
    try {
        let categories = await Categorie.findById(req.params.id)
        res.send(categories);
    } catch (error) {
        next();
    }
};

exports.updateCategorie = async (req, res, next) => {
    try {
         await Categorie.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.send({message: "Categorie has been updated successfully."})
    }
    catch (error) {
        next();
    }
};

exports.deleteCategorie = async (req, res, next) => {
    try {
         await Categorie.findByIdAndRemove(req.params.id);
        res.send({message: "Categorie has been delated successfully."});
    } catch (error) {
        next()
    }
};
