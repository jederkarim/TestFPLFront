
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const livreSchema = new Schema({
    Titre: {
        type: String,
        // required: [true, 'Title field is required']
      },
    Auteur: {
      type: String,
        // required: [true, 'Auteur field is required']

    }, 
    Description:  {
      type: String,
        // required: [true, 'Descriptions field is required']
    },
    Contenue: String,
    categories:[ 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "category"
        }
      ],
      Download: {
        type: Number,
        default: 0
      }
}, {
    timestamps: true,
    versionKey: false
});

const Livre = mongoose.model('livre', livreSchema,'livre');
module.exports = Livre;