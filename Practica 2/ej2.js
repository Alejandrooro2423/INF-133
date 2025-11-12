const categorias = [];
const express = require('express');
const app = express();
app.use(express.json()); // permite leer JSON desde el body
//POST
app.post('/categorias', (req, res) => {
  const { nombre, descripcion } = req.body;
  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Faltan campos requeridos.' });
  }

  const nuevaCategoria = { nombre, descripcion };
  categorias.push(nuevaCategoria); // Guarda en el arreglo

  res.status(201).json({
    mensaje: 'Categoría registrada con éxito.',
    categoria: nuevaCategoria
  });
});
//Guardadas
app.get('/categorias', (req, res) => {
  res.json({ categorias });
});
//HOST
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});


