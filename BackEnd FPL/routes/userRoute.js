const express = require('express'); 
const router = express.Router();
const passport = require('passport');
const { adduser, getAlluser, getOneuser, updateuser, deleteuser } = require('../controllers/usersController');
const upload = require('../middlewares/upload')



router.post('/user'/*, [passport.authenticate('bearer', { session: false }), upload.single('picture') ]*/,adduser);
router.get('/user'/*, passport.authenticate('bearer', { session: false })*/,getAlluser);
router.get('/user/:id'/*, passport.authenticate('bearer', { session: false })*/,getOneuser);
router.put('/user/:id'/*, [passport.authenticate('bearer', { session: false }), upload.single('picture')]*/,updateuser);
router.delete('/user/:id'/*, passport.authenticate('bearer', { session: false })*/,deleteuser);



module.exports = router; 

