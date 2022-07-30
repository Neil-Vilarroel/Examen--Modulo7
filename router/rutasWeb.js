const { application } = require("express");
const express = require("express");
const router = express.Router();

router.get('/', (request, response) => {
    response.render("index", {titulo: "Ingresa tus datos para acceder"});
});

router.get('/usuarioNoEncontrado', (request, response) => {
    response.render("index", {titulo: "Email no registrado en el sitio"});
});

router.get('/claveNoEncontrada', (request, response) => {
    response.render("index", {titulo: "La clave es incorrecta, reintente"});
});

router.get('/404', (request, response) => {
    response.render("404", {titulo: "Sitio no encontrado"});
});
module.exports = router;

