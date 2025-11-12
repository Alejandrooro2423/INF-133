let categorias = [];
let productos = [
  { id: 1, nombre: 'Laptop', descripcion: 'Portátil', categoriaId: 1 },
  { id: 2, nombre: 'Mouse', descripcion: 'Accesorio', categoriaId: 1 },
  { id: 3, nombre: 'Novela', descripcion: 'Libro de ficción', categoriaId: 2 }
];
let categoriaId = 1; // Para IDs autoincrementables
let productoId = 1;
const express = require('express');
const app = express();
app.use(express.json()); // permite leer JSON desde el body
//POST
app.post('/categorias', (req, res) => {
  const { nombre, descripcion } = req.body;
  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Faltan campos requeridos.' });
  }
  const nuevaCategoria = { id: categoriaId++, nombre, descripcion };
  categorias.push(nuevaCategoria);
  res.status(201).json({
    mensaje: 'Categoría registrada con éxito.',
    categoria: nuevaCategoria
  });
});
//GET
app.get('/categorias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const categoria = categorias.find((cat) => cat.id === id);
  if (!categoria) {
    return res.status(404).json({ error: 'Categoría no encontrada.' });
  }
  // Busca productos que tengan ese categoriaId
  const productosDeCategoria = productos.filter((prod) => prod.categoriaId === id);
  res.json({ categoria, productos: productosDeCategoria });
});
//Guardadas GET
app.get('/categorias', (req, res) => {
  res.json({ categorias });
});
//PUT
app.put('/categorias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const categoria = categorias.find((cat) => cat.id === id);
  if (!categoria) {
    return res.status(404).json({ error: 'Categoría no encontrada.' });
  }

  const { nombre, descripcion } = req.body;
  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Faltan campos requeridos.' });
  }

  categoria.nombre = nombre;
  categoria.descripcion = descripcion;

  res.json({ mensaje: 'Categoría actualizada.', categoria });
});
//HOST
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});


