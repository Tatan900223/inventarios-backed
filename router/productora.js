//Creamos las rutas
const { Router } = require('express');
const Productora = require('../models/Productora');
const { validationResult, check } = require('express-validator');

const router = Router();

//Responda a la solicitud Registro productora

router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),


], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array });
        }

        let productora = new Productora();
        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.fechaCreacion = new Date;
        productora.fechaActualizacion = new Date;
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;

        productora = await productora.save();
        res.send(productora);
        console.log(productora);


    } catch (error) {
        console.log(error);
    }

});

// Metodo Get Listar Productora
router.get('/', async function (req, res) {

    try {

        const productoras = await Productora.find();
        res.send(productoras);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un Error');
    }
});

//Metodo Put - Actualizar Usuario

router.put('/:productoraId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),


], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array });
        }

        // Validación de productora  que se esté creando, no esté creado
        let productora = await Productora.findById(req.params.productoraId);
        if (!productora) {
            return res.status(400).send('Productora no existe');
        }

        //Validación productora ya existe
        const existeProductora = await Productora.findOne({ _id: { $ne: productora._id }, nombre: req.body.nombre });
        if (existeProductora) {
            return res.status(400).send('Productora ya Existe');
        }

        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.descripcion = req.body.descripcion;
        productora.slogan = req.body.slogan;
        productora.fechaActualizacion = new Date;

        productora = await productora.save();

        res.send(productora);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar productora');

    }
});
module.exports = router;
