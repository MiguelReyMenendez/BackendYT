const express = require('express');
const router = express.Router();

const verifyToken = require('../functions/validate-token'); // Ruta correcta a tu función
const getPlaylistsFromYouTube = require('../functions/getPlaylists'); // Importa la función



router.get('/get', verifyToken, async (req, res) => {
    try {
        const channelId = 'UC_x5XG1OV2P6uZZ5FSM9Ttw'; // Reemplaza con tu channelId
        const playlists = await getPlaylistsFromYouTube(channelId);

        res.json({
            error: null,
            data: playlists
        });
    } catch (error) {
        console.error('Error al obtener las listas de reproducción:', error);
        res.status(500).json({ error: 'Error al obtener las listas de reproducción' });
    }
});

module.exports = router;
