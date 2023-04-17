const mongoose = require('mongoose')
const { Schema } = mongoose

const clientSchema = new Schema({
  clientNum: { 
    type: Number,
    required: true 
  },
  clientPrenom: { 
    type: String,
    required: true 
  },
  clientNom: { 
    type: String,
    required: true 
  },
  clientFonction: { 
    type: String,
    required: true 
  },
  clientTelephone: { 
    type: Number,
    required: true 
  },
  clientEmail: { 
    type: String,
    required: true 
  },
  clientEntreprise: { 
    type: String,
    required: true 
  },
  clientDateAjout: { 
    type: Date,
    required: true 
  },
  clientAdresse1: { 
    type: String,
    required: true 
  },
  clientAdresse2: { 
    type: String,
    required: false 
  },
  clientCodePostal: { 
    type: Number,
    required: true 
  },
  clientVille: { 
    type: String,
    required: true 
  },
  clientPays: { 
    type: String,
    required: true 
  },
});

module.exports = mongoose.model('Client', clientSchema)