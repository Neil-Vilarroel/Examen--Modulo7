// declaraciones 
const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const { body } = require('express-validator');
require('dotenv').config()

const app = express();

// para capturar el body con bodyParser
app.use(bodyParser.urlencoded( {extended: false}));
app.use(bodyParser.json());

// datos para la conexion a MongoDB
const uri = "mongodb+srv://neil-villarroel:87412369@cluster0.l4weh.mongodb.net/paciente?retryWrites=true&w=majority";

console.log(uri) 



// Me conecto a MongoDB
mongoose.connect(uri,
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }
)
    .then( () => console.log("Base de datos conectada"))
    .catch( e => console.log(e))

    app.use(express.static('views/template'))

// Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



// Importar el enrutador
const authRoutes = require('./router/auth');



// codigo de los enrutadores
app.use('/api/user', authRoutes);
app.use('/pacientes', require('./router/pacientesRouter'));
app.use('/', require('./router/rutasWeb'))
app.use('/user', require('./router/auth'))



// aplicacion de los routes de index.js
app.get('/', (request, response) =>{
    response.json({
        estado: true,
        mensaje: 'Todo bien'
    })
});

// inicio del server 
const PORT = 2000;
app.listen(PORT, () =>{
    console.log("Servidor funcionando en el puerto 2000.")
})