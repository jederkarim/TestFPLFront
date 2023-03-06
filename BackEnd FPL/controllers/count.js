const Users = require('../models/users');

exports.newDownload = async (req, res) => {
    try {
      const count =  await Users.findByIdAndUpdate(req.user._id)
      if(count.Downloads < 5){
        await Users.findByIdAndUpdate(req.user._id, {$inc:{Downloads: +1}}, {new: true})
      res.send({message: 'downloaded succefully'})
      }
      else {
        res.status(400).json({message: "Only five downloads for month"})
      }
    } catch (error) {
      res.status(500).json({message: error.message}); 
    }
  }