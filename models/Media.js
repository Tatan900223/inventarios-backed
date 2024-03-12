// Importamos de mongoose
const { Schema, model } = require('mongoose');

const MediaSchema = Schema({
    
serial:{ type: String, required: true, unique:true },
titulo:{ type: String, required: true },
sinopsis:{ type: String, required: true },
url:{ type: String, required: true, unique:true },
imagen:{ type: String, required: true },
fechaCreacion: { type: Date, required: true },
fechaActualizacion: { type: Date, required: true },
añoEstreno:{ type: Number, required: true },

//Utilizamos un tipo de conexión de Obejeto

generoPrincipal: {type: mongoose.Schema.Types.ObjectId, ref: 'Genero', required:true },
directorPrincipal: {type: mongoose.Schema.Types.ObjectId, ref: 'Dierector', required:true },
productoraPrincipal: {type: mongoose.Schema.Types.ObjectId, ref: 'Productora', required:true },
tipoPrincipal: {type: mongoose.Schema.Types.ObjectId, ref: 'Tipo', required:true },




  });

  module.exports = model('Media', MediaSchema);