const express = require('express');
const app = express();
app.use(express.json());
let categorias = [];
let productos = [];
let categoriaId = 1;
let productoId = 1;
// Crear 
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
});
// Listar 
app.get('/categorias', (req, res) => {
  res.json({ categorias });
});
// Obtener 
app.get('/categorias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const categoria = categorias.find(cat => cat.id === id);
  if (!categoria) {
    return res.status(404).json({ error: 'Categoría no encontrada.' });
  }
  const productosDeCategoria = productos.filter(prod => prod.categoriaId === id);
  res.json({ categoria, productos: productosDeCategoria });
});
// Actualizar
app.put('/categorias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const categoria = categorias.find(cat => cat.id === id);
  if (!categoria) {
    return res.status(404).json({ error: 'Categoría no encontrada.' });
  }
  const { nombre, descripcion } = req.body;
  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Faltan campos.' });
  }
  categoria.nombre = nombre;
  categoria.descripcion = descripcion;
  res.json({ mensaje: 'Categoría actualizada.', categoria });
});
// Eliminar 
app.delete('/categorias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const categoriaIndex = categorias.findIndex(cat => cat.id === id);
  if (categoriaIndex === -1) {
    return res.status(404).json({ error: 'Categoría no encontrada.' });
  }
  categorias.splice(categoriaIndex, 1);
  const productosEliminados = productos.filter(prod => prod.categoriaId === id);
  productos = productos.filter(prod => prod.categoriaId !== id);
  res.json({
    mensaje: 'Categoría y productos eliminados.',
    productosEliminados
  });
});
// Crear 
app.post('/productos', (req, res) => {
  const { nombre, precio, stock, descripcion, categoria_id } = req.body;
  if (!nombre || precio === undefined || stock === undefined || !categoria_id) {
    return res.status(400).json({ error: 'Faltan campos.' });
  }
  const categoria = categorias.find(cat => cat.id === categoria_id);
  if (!categoria) {
    return res.status(404).json({ error: 'La categoría no existe.' });
  }
  const nuevoProducto = {
    id: productoId++,
    nombre,
    precio,
    stock,
    descripcion,
    categoriaId: categoria_id
  };
  productos.push(nuevoProducto);
  res.status(201).json({
    mensaje: 'Producto registrado con éxito.',
    producto: nuevoProducto
  });
});
// Listar 
app.get('/productos', (req, res) => {
  const productosConCategoria = productos.map(prod => {
    const categoria = categorias.find(cat => cat.id === prod.categoriaId);
    return {
      id: prod.id,
      nombre: prod.nombre,
      descripcion: prod.descripcion,
      precio: prod.precio,
      stock: prod.stock,
      categoria: categoria ? categoria.nombre : 'Categoría no encontrada'
    };
  });
  res.json({ productos: productosConCategoria });
});
// Obtener 
app.get('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(prod => prod.id === id);
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado.' });
  }
  const categoria = categorias.find(cat => cat.id === producto.categoriaId);
  res.json({
    id: producto.id,
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    stock: producto.stock,
    categoria: categoria ? categoria.nombre : 'Categoría no encontrada'
  });
});
// Actualizar
app.put('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(prod => prod.id === id);
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado.' });
  }
  const { nombre, precio, stock, descripcion, categoria_id } = req.body;
  if (!nombre || precio === undefined || stock === undefined || !categoria_id) {
    return res.status(400).json({ error: 'Faltan campos.' });
  }
  const categoria = categorias.find(cat => cat.id === categoria_id);
  if (!categoria) {
    return res.status(404).json({ error: 'La categoría no existe.' });
  }
  producto.nombre = nombre;
  producto.precio = precio;
  producto.stock = stock;
  producto.descripcion = descripcion;
  producto.categoriaId = categoria_id;
  res.json({
    mensaje: 'Producto actualizado con éxito.',
    producto
  });
});
// PATCH 
app.patch('/productos/:id/stock', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(prod => prod.id === id);
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado.' });
  }
  const { cantidad } = req.body;
  if (typeof cantidad !== 'number') {
    return res.status(400).json({ error: 'Cantidad debe ser un número.' });
  }
  producto.stock += cantidad;
  res.json({
    mensaje: 'Stock actualizado.',
    producto
  });
});
// HOST
app.listen(3001, () => {
  console.log('Servidor escuchando en el puerto 3001');
});


