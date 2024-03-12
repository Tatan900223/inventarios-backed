//Creamos las rutas
const { Router } = require('express');
const Director = require('../models/Director');
const { validationResult, check } = require('express-validator');


const router = Router();

//Responda a la solicitud Crear Director

router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),


], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array });
        }

        let director = new Director();
        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.fechaCreacion = new Date;
        director.fechaActualizacion = new Date;

        director = await director.save();
        res.send(director);
        console.log(director);

    } catch (error) {
        console.log(error);
    }
});
// Metodo Get Listar Director
router.get('/', async function (req, res) {

    try {

        const directores = await Director.find();
        res.send(directores);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un Error');
    }

});

//Metodo Put - Actualizar Usuario

router.put('/:directorId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),


], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array });
        }

        // Validación director ya existe
        let director = await Director.findById(req.params.directorId);
        if (!director) {
            return res.status(400).send('Director no existe');
        }

        //Validación director ya existe
        if (director) {
            const existeDirector = await Director.findOne({ _id: { $ne: director._id }, nombre: req.body.nombre });
            if (existeDirector) {
                return res.status(400).send('Director ya Existe');
            }
        }

        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.fechaActualizacion = new Date;

        director = await director.save();

        res.send(director);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar usuario');

    }

});
module.exports = router;
