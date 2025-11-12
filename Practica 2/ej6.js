// Ejercicio 8
let categorias = [];
let productos = [
  { id: 1, nombre: 'Computadora', descripcion: 'Portátil', categoriaId: 1 },
  { id: 2, nombre: 'Teclado', descripcion: 'Accesorio', categoriaId: 1 },
  { id: 3, nombre: 'Comic', descripcion: 'Historieta de ficción', categoriaId: 2 }
];
let categoriaId = 1;
let productoId = 1;
const express = require('express');
const app = express();
app.use(express.json()); 
// POST
app.post('/categorias', (req, res) => {
  const { nombre, descripcion } = req.body;
  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Faltan campos.' });
  }
  const nuevaCategoria = { id: categoriaId++, nombre, descripcion };
  categorias.push(nuevaCategoria);
  res.status(201).json({
    mensaje: 'Categoría registrada con éxito.',
    categoria: nuevaCategoria
  });
  app.post('/productos', (req, res) => {
  const { nombre, precio, stock, categoria_id } = req.body;
  // Validación básica
  if (!nombre || precio === undefined || stock === undefined || !categoria_id) {
    return res.status(400).json({ error: 'Faltan campos requeridos.' });
  }
  // Verifica que la categoría exista
  const categoria = categorias.find(cat => cat.id === categoria_id);
  if (!categoria) {
    return res.status(404).json({ error: 'La categoría no existe.' });
  }
  // Crear producto
  const nuevoProducto = {
    id: productoId++,
    nombre,
    precio,
    stock,
    categoriaId: categoria_id
  };
  productos.push(nuevoProducto);

  res.status(201).json({
    mensaje: 'Producto registrado con éxito.',
    producto: nuevoProducto
  });
});
});
//GET
app.get('/categorias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const categoria = categorias.find((cat) => cat.id === id);
  if (!categoria) {
    return res.status(404).json({ error: 'Categoría no encontrada.' });
  }
  // Busca Productos Id
  const productosDeCategoria = productos.filter((prod) => prod.categoriaId === id);
  res.json({ categoria, productos: productosDeCategoria });
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
    return res.status(400).json({ error: 'Faltan campos.' });
  }
  categoria.nombre = nombre;
  categoria.descripcion = descripcion;

  res.json({ mensaje: 'Se ha actualizado la categoria.', categoria });
});
//DELETE
app.delete('/categorias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const categoriaIndex = categorias.findIndex(cat => cat.id === id);
  if (categoriaIndex === -1) {
    return res.status(404).json({ error: 'Categoría no encontrada.' });
  }
  // Elimina la categoría 
  categorias.splice(categoriaIndex, 1);
  // Elimina todos los productos de esa categoría
  const productosEliminados = productos.filter(prod => prod.categoriaId === id);
  productos = productos.filter(prod => prod.categoriaId !== id);
  res.json({
    mensaje: 'Categoría y productos eliminados.',
    productosEliminados: productosEliminados
  });
});
//HOST
app.listen(3001, () => {
  console.log('Servidor Alejandro escuchando en el puerto 3001');
});





