const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000; // Define el puerto que deseas usar
const connection = require('./dbConfig'); 

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Servidor Node.js en funcionamiento!');
});

app.post('/api/insertData', (req, res) => {
    const data = req.body;
  
    // Realiza las validaciones aquí
    if (
      !data.Representante ||
      !data.CURP ||
      !data.Nombre ||
      !data.Paterno ||
      !data.Materno ||
      !data.Telefono ||
      !data.Correo ||
      !data.Nivel ||
      !data.Municipio ||
      !data.Asunto
    ) {
      // Si falta algún campo requerido, responde con un código de estado 400 (Bad Request)
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(data.Correo)) {
      // Si el correo electrónico no es válido, responde con un código de estado 400 y un mensaje de error
      return res.status(400).json({ error: 'Correo electrónico inválido' });
    }
  
    // Aquí debes realizar la inserción de datos en la base de datos
    // Configura y ejecuta la consulta SQL para insertar los datos
  
    const sql = 'INSERT INTO Turnos (Representante, CURP, Nombre, Paterno, Materno, Telefono, Correo, Nivel, Municipio, Asunto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';



    connection.query(
      sql,
      [data.Representante, data.CURP, data.Nombre, data.Paterno, data.Materno, data.Telefono, data.Correo, data.Nivel, data.Municipio, data.Asunto],
      (error) => {
        if (error) {
          console.error('Error al insertar datos en la base de datos:', error);
          return res.status(500).json({ error: 'Error al insertar datos' });
        }
        return res.status(200).json({ mensaje: 'Los datos son válidos y se han procesado correctamente' });
      }
      
    );
  });

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
