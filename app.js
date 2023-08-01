const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
const port = 3000;

// Configurar middleware para manejar subida de archivos
app.use(fileUpload());

// Ruta para el formulario de carga de archivos
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para manejar la subida de archivos
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No se ha seleccionado ningún archivo.');
  }

  const file = req.files.uploadedFile;
  const uploadPath = path.join(__dirname, 'uploads', file.name);

  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('Archivo subido correctamente.');
  });
});

// Ruta para acceder a los archivos almacenados
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor de almacenamiento iniciado en http://localhost:${port}`);
});
