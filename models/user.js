const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema(
    {
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }
})



const Usuario = mongoose.model('users', usuarioSchema);

module.exports = Usuario;