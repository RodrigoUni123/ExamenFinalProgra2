const db = require('../config/db.config.js');
const Juego = db.Juegos;

exports.create = async (req, res) => {
    try {
        // Validación de los datos de entrada
        if (!req.body.nombre_juego || !req.body.genero || !req.body.plataforma) {
            return res.status(400).json({
                message: "Faltan datos requeridos: nombre_juego, genero o plataforma"
            });
        }

        // Creación del objeto juego
        const juego = {
            nombre_juego: req.body.nombre_juego,
            genero: req.body.genero,
            plataforma: req.body.plataforma,
            fecha_lanzamiento: req.body.fecha_lanzamiento,
            precio_alquiler: req.body.precio_alquiler,
            disponibilidad: req.body.disponibilidad,
            fecha_alquiler: req.body.fecha_alquiler,
            fecha_devolucion: req.body.fecha_devolucion,
            nombre_cliente: req.body.nombre_cliente,
            comentario: req.body.comentario
        };

        // Crear el juego en la base de datos
        const result = await Juego.create(juego);

        // Enviar la respuesta al cliente
        res.status(201).json({
            message: "Juego creado con éxito con id = " + result.id_juego,
            juego: result,
        });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        res.status(500).json({
            message: "Error al crear el juego",
            error: error.message
        });
    }
};


exports.getJuegoById = (req, res) => {
    let juegoId = req.params.id;
    Juego.findByPk(juegoId)
        .then(juego => {
            res.status(200).json({
                message: "Juego obtenido con éxito con id = " + juegoId,
                juego: juego
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener el juego",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let juegoId = req.params.id;
        let juego = await Juego.findByPk(juegoId);

        if (!juego) {
            res.status(404).json({
                message: "No se encontró el juego con id = " + juegoId,
                juego: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre_juego: req.body.nombre_juego,
                genero: req.body.genero,
                plataforma: req.body.plataforma,
                fecha_lanzamiento: req.body.fecha_lanzamiento,
                precio_alquiler: req.body.precio_alquiler,
                disponibilidad: req.body.disponibilidad,
                fecha_alquiler: req.body.fecha_alquiler,
                fecha_devolucion: req.body.fecha_devolucion,
                nombre_cliente: req.body.nombre_cliente,
                comentario: req.body.comentario
            };
            let result = await Juego.update(updatedObject, { returning: true, where: { id_juego: juegoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el juego con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Juego actualizado con éxito con id = " + juegoId,
                juego: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el juego con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let juegoId = req.params.id;
        let juego = await Juego.findByPk(juegoId);

        if (!juego) {
            res.status(404).json({
                message: "No existe un juego con id = " + juegoId,
                error: "404",
            });
        } else {
            await juego.destroy();
            res.status(200).json({
                message: "Juego eliminado con éxito con id = " + juegoId,
                juego: juego,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el juego con id = " + req.params.id,
            error: error.message,
        });
    }
}