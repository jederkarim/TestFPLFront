const express = require('express');
const router = express.Router();
const passport = require('passport');
const { addCategorie, getAllCategorie, getOneCategorie, updateCategorie, deleteCategorie } = require('../controllers/categoriesController');

router.post("/categorie"/*, passport.authenticate('bearer', { session: false })*/,addCategorie);
router.get('/categorie',/* passport.authenticate('bearer', { session: false }),*/ getAllCategorie);
router.get('/categorie/:id'/*, passport.authenticate('bearer', { session: false })*/,getOneCategorie);
router.put('/categorie/:id'/*, passport.authenticate('bearer', { session: false })*/,updateCategorie);
router.delete('/categorie/:id'/*, passport.authenticate('bearer', { session: false })*/,deleteCategorie);



module.exports = router;