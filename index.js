const express = require('express')
const app = express()
const verifyToken = require('./functions/validate-token.js')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


// Middlewares
var corsOptions = {
  origin: '*', // Aqui debemos reemplazar el * por el dominio del cliente
  optionsSuccessStatus: 200 // Es necesario para navegadores antiguos o algunos SmartTVs
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Conexión a la base de datos de MongoDB
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.DBNAME}.mongodb.net/?retryWrites=true&w=majority`
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a la base de datos')
  })
  .catch((e) => {
    console.log('Database error', e)
  })


//Routers
const authRoutes = require('./routes/auth.js')
const authGoogleRoutes = require('./routes/authGoogle.js')
const usereditRoutes = require('./routes/useredit.js')
const dashboardRoutes = require('./routes/dashboard')
const playlists = require('./routes/playlists');

app.use('/auth', authGoogleRoutes);
app.use('/api/user', authRoutes)
app.use('/api/profile/edit', verifyToken, usereditRoutes)
app.use('/api/dashboard', verifyToken, dashboardRoutes)
app.use('/playlists', playlists);
app.get('/', (req, res) => {
  res.json({ mensaje: 'YTPL API' })
})

const server = app.listen(process.env.PORT || 8002, () => {
    const protocol = 'http'
    const address = server.address().address
    const host = address === '::' ? 'localhost' : address
    const port = server.address().port
    console.log(`🚀 Servidor en funcionamiento en ${protocol}://${host}:${port}`)
  })