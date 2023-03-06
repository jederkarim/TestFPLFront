
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const categorieSchema = new Schema({
    nomcategorie: {
        type: String,
        // required: [true, 'Nomcategorie field is required']
      },
    listeDesLivres:[{type:Schema.Types.ObjectId,ref:'livre'}]    
},{
    timestamps: true,
    versionKey: false
});

const Categorie = mongoose.model('categories',categorieSchema,'categories');
module.exports = Categorie;