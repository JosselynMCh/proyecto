const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3001;

// Conexión a PostgreSQL
const pool = new Pool({
    user: 'postgres',       // tu usuario de PostgreSQL
    host: 'localhost',
    database: 'prueba',    // tu base de datos
    password: 'Josselyn', // tu contraseña de PostgreSQL
    port: 5432,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Ruta para el formulario
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para registrar datos
app.post('/registrar', async (req, res) => {
    const { nombre, dni } = req.body;
    try {
        // Verifica qué está llegando desde el formulario
        console.log("Datos recibidos:", nombre, dni);

        const resultado = await pool.query(
            'INSERT INTO empleados(nombre, dni) VALUES($1, $2)',
            [nombre, dni]
        );

        console.log("Resultado de inserción:", resultado.rowCount);
        res.send('✅ Empleado registrado correctamente');
    } catch (err) {
        console.error("💥 Error al registrar:", err); // Mostrará error en consola
        res.status(500).send('❌ Error al registrar: ' + err.message); // Mostrará mensaje real en el navegador
    }
});


// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
