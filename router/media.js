//Creamos las rutas
const { Router } = require('express');
const media = require('../models/Media');
const { validationResult, check } = require('express-validator');
const Media = require('../models/Media');

const router = Router();

//Responda a la solicitud Registro tipoPrincipal

router.post('/', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check('url', 'invalid.url').not().isEmpty(),
    check('imagen', 'invalid.imagen').not().isEmpty(),
    check('fechaCreacion', 'invalid.fechaCreacion').not().isEmpty(),
    check('fechaActualizacion', 'invalid.fechaActualizacion').not().isEmpty(),
    check('anoEstreno', 'invalid.anoEstreno').not().isEmpty(),
    check('generoPrincipal', 'invalid.generoPrincipal').not().isEmpty(),
    check('directorPrincipal', 'invalid.directorPrincipal').not().isEmpty(),
    check('productoraPrincipal', 'invalid.productoraPrincipal').not().isEmpty(),
    check('tipoPrincipal', 'invalid.tipoPrincipal').not().isEmpty(),




], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array });
        }
            const existeMediaPorSerial = await Media.findOne({ serial: req.body.serial });
            if (existeMediaPorSerial) {
                return res.status(400).send('Ya existe el serial para otra Pelicula-Serie');
            }

            let media = new Media();
            media.serial = req.body.serial;
            media.titulo = req.body.titulo;
            media.sinopsis = req.body.sinopsis;
            media.url = req.body.url;
            media.imagen = req.body.imagemn;
            media.fechaCreacion = new Date();
            media.fechaActualizacion = new Date();
            media.anoEstreno = req.body.anoEstreno;
            media.generoPrincipal = req.body.generoPrincipal._id;
            media.directorPrincipal = req.body.directorPrincipal._id;
            media.productoraPrincipal = req.body.productoraPrincipal._id;
            media.tipoPrincipal = req.body.tipoPrincipal._id;

            media = await media.save();
            res.send(media);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear tipoPrincipal de Media')
    }

});

module.exports = router;
