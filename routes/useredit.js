const router = require('express').Router();
const User = require('../models/user');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../functions/validate-token')

router.put('/edit', verifyToken, async (req, res) => {
    // Recuperar el ID del usuario autenticado desde el token
    const userId = req.user.id;

    // Validar la entrada (nombre, contraseña y playlistId)
    const schemaEdit = Joi.object({
        name: Joi.string().min(6).max(255),
        password: Joi.string().min(6).max(1024),
        playlistId: Joi.string() 
    });

    const { error } = schemaEdit.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        // Buscar y actualizar el usuario en la base de datos
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    name: req.body.name,
                    password: req.body.password,
                    playlistId: req.body.playlistId
                }
            },
            { new: true }
        );

        res.json({
            error: null,
            data: user,
            message: 'Información de usuario actualizada'
        });
    } catch (error) {
        res.status(400).json({ error });
    }
});

module.exports = router;
