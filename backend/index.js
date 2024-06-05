const express = require('express');
const xmlController = require('./src/xmlController');
const cors = require('cors');

const app = express();
const port = 3001;

// Habilitar CORS para localhost:3000
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Middleware para parsear texto XML
app.use(express.text({ type: 'application/xml' }));

// Rutas para manejo de XML
app.use('/xml', xmlController);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

