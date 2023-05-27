const express = require('express');
const path = require('path');

// Constantes
const PORT=  8080;

// Inicializaciones
const app = express();

// Configuraciones
app.set('port', process.env.PORT || PORT);

// middlewares
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(express.urlencoded({extended: false}));
app.use(express.json());



// Rutas


// Publico
app.use(express.static(path.join(__dirname, 'public')));

// Iniciando servidor
app.listen(app.get('port'), () => {
    console.log(`Server running  in: http://localhost:${app.get('port')}`);
});