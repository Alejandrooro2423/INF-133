const express = require('express');
const app = express();
app.use(express.json()); // permite leer JSON desde el body
//POST
app.post('/categorias', (req, res) => {
  const { nombre, descripcion } = req.body;

  // Pequeña validación por si falta algún dato
  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Faltan campos requeridos.' });
  }

  // Aquí normalmente guardarías la categoria en una base de datos
  // Pero para el ejemplo, solo la mostramos
  res.status(201).json({
    mensaje: 'Categoría registrada con éxito.',
    categoria: { nombre, descripcion }
  });
});
//HOST
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
