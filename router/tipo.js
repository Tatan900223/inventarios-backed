//Creamos las rutas
const { Router } = require('express');
const Tipo = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const router = Router();

//Responda a la solicitud Registro tipo

router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),


], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array });
        }

        let tipo = new Tipo();
        tipo.nombre = req.body.nombre;
        tipo.estado = req.body.estado;
        tipo.fechaCreacion = new Date;
        tipo.fechaActualizacion = new Date;
        tipo.descripcion = req.body.descripcion;

        tipo = await tipo.save();
        res.send(tipo);
        console.log(tipo);


    } catch (error) {
        console.log(error);
    }

});

// Metodo Get Listar Tipo
router.get('/', async function (req, res) {

    try {

        const tipos = await Tipo.find();
        res.send(tipos);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un Error');
    }
});

//Metodo Put - Actualizar Tipo

router.put('/:tipoId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),


], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array });
        }

        // Validación de Tipo  que se esté creando, no esté creado
        let tipo = await Tipo.findById(req.params.tipoId);
        if (!tipo) {
            return res.status(400).send('El Tipo no existe');
        }

        //Validación tipo ya existe
        const existeTipo = await Tipo.findOne({ _id: { $ne: tipo._id }, nombre: req.body.nombre });
        if (existeTipo) {
            return res.status(400).send('El Tipo ya Existe');
        }

        tipo.nombre = req.body.nombre;
        tipo.estado = req.body.estado;
        tipo.descripcion = req.body.descripcion;
        tipo.fechaActualizacion = new Date;

        tipo = await tipo.save();

        res.send(tipo);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar tipo');

    }
});

module.exports = router;
