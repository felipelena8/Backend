import "dotenv/config";
import Producto from "./daos/productos/Producto.js";
import Carrito from "./daos/carritos/Carrito.js";
import express from "express";
let contenedorProductos;
let contenedorCarritos;
if (process.env.DB == "mongo") {
  contenedorProductos = new (await import("./daos/productos/ProductosDaoMongo.js")).default();
  contenedorCarritos = new (await import("./daos/carritos/CarritosDaoMongo.js")).default();
} else if (process.env.DB == "firebase") {
  contenedorCarritos =new (await import("./daos/carritos/CarritosDaoFirebase.js")).default();
  contenedorProductos = new (await import("./daos/productos/ProductosDaoFirebase.js")).default();
} else {
  contenedorCarritos = new (await import("./daos/carritos/CarritosDaoArchivo.js")).default();
  contenedorProductos = new (await import("./daos/productos/ProductosDaoArchivo.js")).default();
}

const { Router } = express;
const productoRouter = Router();
const carritoRouter = Router();
const administrador = true;
const app = express();
productoRouter.get("/:id?", async (req, res) => {
  let id = req.params.id;
  if (id == undefined) {
    const prods = await contenedorProductos.listarAll();
    return res.json(prods);
  }
  const prod = await contenedorProductos.listar(id);
  return res.json(prod);
});

productoRouter.post("/", async (req, res) => {
  if (administrador) {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const producto = new Producto(
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock
    );
    contenedorProductos.insert(producto);
    return res.status(201).json(producto);
  } else {
    res.json({
      error: -1,
      descripcion: "ruta 'productos/' metodo 'post' no autorizada",
    });
  }
});

productoRouter.put("/:id", (req, res) => {
  if (administrador) {
    let id = req.params.id;
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const prodModificado = new Producto(
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock
    );
    contenedorProductos.update(id, prodModificado);
    return res.send("Operacion realizada");
  }
  return res.json({
    error: -1,
    descripcion: "ruta 'productos/id' metodo 'put' no autorizada",
  });
});

productoRouter.delete("/:id", async (req, res) => {
  if (administrador) {
    const id = req.params.id;
    contenedorProductos.delete(id);
    return res.status(201).send("Operacion finalizada");
  }
  return res.json({
    error: -1,
    descripcion: "ruta 'productos/id' metodo 'put' no autorizada",
  });
});

//Carrito endpoints
carritoRouter.post("/", (req, res) => {
  const newCarro = new Carrito([]);
  contenedorCarritos.insert(newCarro);
  return res.send(`Carrito creado`);
});

carritoRouter.delete("/:id", (req, res) => {
  let id = req.params.id;
  contenedorCarritos.delete(id);
  return res.send(`Carrito eliminado`);
});

carritoRouter.get("/:id/productos", async (req, res) => {
  let id = req.params.id;
  let carrito = await contenedorCarritos.listar(id);
  if (carrito) {
    return res.json(carrito.productos);
  }
  return res.send("El carrito no tiene productos");
});

carritoRouter.post("/:id/productos", async (req, res) => {
  let idCarrito = req.params.id;
  let idsProds = req.body;
  for (let i = 0; i < idsProds.length; i++) {
    const prod = await contenedorProductos.listar(idsProds[i]);
    await contenedorCarritos.agregarProducto(idCarrito, prod);
  }
  res.send("Productos agregados al carrito");
});

carritoRouter.delete("/:id/productos/:id_prod", (req, res) => {
  let { id, id_prod: idProd } = req.params;
  contenedorCarritos.deleteProducto(id, idProd);
  res.send(`Producto ID: ${idProd} eliminado del carrito ID: ${id}`);
});

app.listen(8080, () => {
  console.log("Servidor corriendo en puerto 8080");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/productos", productoRouter);
app.use("/carrito", carritoRouter);
app.use((req, res) => {
  res.json({
    error: {
      name: "Error",
      status: 404,
      descripcion: {
        ruta: req.path,
        metodo: req.method,
        error: "ruta no implementada",
      },
      statusCode: 404,
    },
  });
});
