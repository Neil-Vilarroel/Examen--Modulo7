const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())

const Paciente = require('../models/paciente');

// Ver todos los pacientes
router.get('/', async(request, response) =>
{
    try {
        const arrayPacientesDBM = await Paciente.find();

        response.render("pacientes", {
            arrayPacientes: arrayPacientesDBM
        });

    }catch (error) {
        console.log(error);
    }
})

// Código para dirigir la acción a la página Crear paciente
router.get('/crear', (request, response) => 
{
    response.render('crear');
})

// Código para crear paciente (agregar)
router.post('/agregarPaciente', async (request, response) => 
{
    console.log("********** agregarPaciente ************");
    const parametros = request.body;

    try {
        const pacienteBD = new Paciente(parametros);
        await pacienteBD.save();

        response.redirect('/pacientes');

    } catch (error) {
        console.log(error);
    }
})


// Código para ver el paciente (y posteriormente, modificarlo)
router.get('/verPaciente/:id', async (request, response) => 
{
    console.log("********** verPaciente **************");
    const id = request.params.id;

    const pacienteBD = await Paciente.findOne({_id: id});

    response.render("editarPaciente", {
        nombre: pacienteBD.nombre,
        especie: pacienteBD.especie,
        raza: pacienteBD.raza,
        // edad: pacienteBD.edad,
        nombreResponsable: pacienteBD.nombreResponsable,
        id: id
    });

})

// Código para modificar a un paciente
router.post('/verPaciente/editarPaciente', async (request, response) => 
{
    console.log("********** editarPaciente ************");
    const body = request.body;
    const id = request.body.id;
    console.log(body);

    try {

       const pacienteBD = await Paciente.findByIdAndUpdate(
    
                id, body, { useFindAndModify: false}
                
       )

       response.redirect('/pacientes');

    } catch (error) {
        console.log(error);
    }

})

// Método para eliminar un paciente ocupando método delete
router.delete('/:id', async (request, response) => 
{
    console.log("********* borrarPaciente *************");
    const id = request.params.id;
    console.log("ID", id);

    try {
        // Eliminar de MongoDB al paciente
        const pacienteDeleteBD = await Paciente.findByIdAndDelete({_id: id});
        console.log("pacienteDeleteBD", pacienteDeleteBD);

        response.redirect('/pacientes');

    } catch (error) {
        console.log(error);
    }


    // exportar la acción a la vista pacientes
})

module.exports = router;