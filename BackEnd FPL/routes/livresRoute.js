const express = require('express');
const router = express.Router();
const passport = require('passport');
const { addlivre, getAlllivres, getOnelivre, updatelivre, deletelivre } = require('../controllers/livresController');
const upload = require('../middlewares/upload')



router.post('/livres', /*[passport.authenticate('bearer', { session: false }), upload.single('picture') ],*/addlivre);
router.get('/livres',/* passport.authenticate('bearer', { session: false }),*/getAlllivres);
router.get('/livres/:id',/* passport.authenticate('bearer', { session: false }),*/getOnelivre);
router.put('/livres/:id',/* [passport.authenticate('bearer', { session: false }), upload.single('picture')],*/updatelivre);
router.delete('/livres/:id',/* passport.authenticate('bearer', { session: false }),*/deletelivre);



module.exports = router;