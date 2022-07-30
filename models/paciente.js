const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pacienteSchema = new Schema(
    {
        nombre: String,
        especie: String,
        raza: String,
        fechaNacimiento: Number,
        nombreResponsable: String
        
    }
);

// Crear el modelo

const Paciente = mongoose.model('Pacientes', pacienteSchema);

module.exports = Paciente;