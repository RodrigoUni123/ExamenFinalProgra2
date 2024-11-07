let express = require('express');
let router = express.Router();

const juegos = require('../controllers/JuegosAlquilados.controller.js');

router.post('/api/juegos/create', juegos.create);
router.get('/api/juegos/onebyid/:id', juegos.getJuegoById);
router.put('/api/juegos/update/:id', juegos.updateById);
router.delete('/api/juegos/delete/:id', juegos.deleteById);

module.exports = router;