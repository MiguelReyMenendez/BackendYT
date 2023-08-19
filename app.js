const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const auth = require('./routes/auth');
const playlists = require('./routes/playlists');

const app = express();

app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/playlists', playlists);

const server = app.listen(process.env.PORT || 3000, () => {
    const protocol = 'http';
    const address = server.address().address;
    const host = address === '::' ? 'localhost' : address;
    const port = server.address().port;
    console.log(`🚀 Servidor en funcionamiento en ${protocol}://${host}:${port}`);
});
