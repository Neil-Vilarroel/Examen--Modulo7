const User = require('../models/user');
const router = require('express').Router();
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Router } = require('express');

// esquema para registrar usuario
const schemeRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
});

// esquema para login user 
const schemeLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
});

// para el login de user 
router.post('/login', async (request, response) => 
{
    // Valida los datos del usuario por medio del body, en el error manda un 400
    const { error } = schemeLogin.validate(request.body);
    if (error) 
        return response.status(400).json({ error: error.details[0].message })

    // corrobora la existencia del email, en el error lo indica
    const user = await User.findOne({ email: request.body.email });
    if (!user)
        return response.redirect("/usuarioNoEncontrado")

    // confirma si la contraseña corresponde al email, en el error lo indica
    const validPassword = await bcrypt.compare(request.body.password, user.password);
    if (!validPassword)
    return response.redirect("/claveNoEncontrada")
    
    // Token para mayor seguridad
  
    // si todo es positivo permite el ingreso del user 
    // response.header('auth-token', token).json({
    //     error: null,
    //     data: {token},
    //     mensaje: 'Exito, bienvenido'
    // });

    response.redirect("/pacientes");
}),

// Método para registrar a un usuario
router.post('/register', async (request, response) =>
{
    // valida datos del body con un request

    const { error } = schemeRegister.validate(request.body);

    if (error) {
        return response.status(400).json(
            {
                error: error.details[0].message
            }
        )
    }

    // confirma que solo existe un correo por user 
    const isEmailExist = await User.findOne({ email: request.body.email });
    if (isEmailExist) {
        return response.status(400).json({ error: 'Email ya registrado' });
    }

    // Encriptación de la contraseña con bcrypt
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(request.body.password, salt);

    // Creación de nuestro usuario
    const user = new User(
        {
            name: request.body.name,
            email: request.body.email,
            password: password //password encriptada en lineas anteriores
        });
    
    try {
        const savedUser = await user.save();
        response.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        response.status(400).json({error});
    }
    
});


module.exports = router; 