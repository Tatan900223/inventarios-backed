//Creamos las rutas
const { Router } = require('express');
const Genero = require('../models/Genero');
const { validationResult, check } = require('express-validator');

const router = Router();

//Responda a la solicitud Registro genero

router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),


], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array });
        }


        let genero = new Genero();
        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.descripcion = req.body.descripcion;
        genero.fechaCreacion = new Date;
        genero.fechaActualizacion = new Date;

        genero = await genero.save();
        res.send(genero);
        console.log(genero);


    } catch (error) {
        console.log(error);
    }

});

// Metodo Get Listar Genero
router.get('/', async function (req, res) {

    try {

        const generos = await Genero.find();
        res.send(generos);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un Error');
    }
});

//Metodo Put - Actualizar Usuario

router.put('/:generoId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),


], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array });
        }

        // Validación de Genero Pelicula que se esté creando, no esté creado
        let genero = await Genero.findById(req.params.generoId);
        if(!genero){
            return res.status(400).send('usuario no existe');
        }

        //Validación Genero ya existe
        const existeGenero = await Genero.findOne({_id: {$ne: genero._id}});
        if (existeGenero){
            return res.status(400).send('Pelicula ya Existe');
        }

        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.descripcion = req.body.descripcion;
        genero.fechaActualizacion = new Date;

        genero = await genero.save();
        
        res.send(genero);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar usuario');

    }

});

module.exports = router;









