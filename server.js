const { Router } = require("express");
const express = require("express");
const {
  escribirCarritos,
  escribirProductos,
  leerCarritos,
  leerProductos,
  mayorId,
} = require("./persistencia.js");
const Carrito = require("./carrito");
const Producto = require("./Producto");

const productoRouter = Router();
const carritoRouter = Router();

let carritos = leerCarritos() || [];
const administrador = true;
let productos = leerProductos() || [];
Producto.id = mayorId(productos);
Carrito.id = mayorId(carritos);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Endpoints de productos
productoRouter.get("/:id?", (req, res) => {
  let id = req.params.id;
  if (id == undefined) {
    return res.json(productos);
  }
  return res.json(productos.find((prod) => prod.id == id));
});

productoRouter.post("/", (req, res) => {
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
    productos.push(producto);
    escribirProductos(productos);
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
      id,
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock
    );
    productos = productos.map((prod) => {
      if (prod.id != Number(id)) {
        return prod;
      } else {
        return prodModificado;
      }
    });
    escribirProductos(productos);
    return res.send("Operacion realizada");
  }
  return res.json({
    error: -1,
    descripcion: "ruta 'productos/id' metodo 'put' no autorizada",
  });
});

productoRouter.delete("/:id", (req, res) => {
  if (administrador) {
    const id = Number(req.params.id);
    productos = productos.filter((prod) => prod.id != id);
    escribirProductos(productos);
    return res.status(201).send("Operacion finalizada");
  }
  return res.json({
    error: -1,
    descripcion: "ruta 'productos/id' metodo 'put' no autorizada",
  });
});
//Final endpoints productos

//Endpoints carrito
carritoRouter.post("/", (req, res) => {
  const newCarro = new Carrito([]);
  carritos.push(newCarro);
  escribirCarritos(carritos);
  return res.send(`Carrito creado. ID: ${newCarro.id}`);
});

carritoRouter.delete("/:id", (req, res) => {
  let id = req.params.id;
  carritos = carritos.filter((carro) => carro.id != id);
  escribirCarritos(carritos);
  return res.send(`Carrito eliminado. ID: ${id}`);
});

carritoRouter.get("/:id/productos", (req, res) => {
  let id = req.params.id;
  let carrito = carritos.find((carro) => carro.id == id);
  if (carrito) {
    return res.json(carrito.productos);
  }
  return res.send("El carrito no tiene productos");
});

carritoRouter.post("/:id/productos", (req, res) => {
  let idCarrito = req.params.id;
  let idsProds = req.body;
  console.log(idsProds);
  let prods = productos.filter((prod) => idsProds.includes(prod.id));
  console.log(prods);
  carritos = carritos.map((carro) => {
    if (carro.id == idCarrito) {
      carro.productos = [...carro.productos, ...prods];
    }
    return carro;
  });
  escribirCarritos(carritos);
  res.send('Productos agregados al carrito')
});

carritoRouter.delete('/:id/productos/:id_prod', (req,res)=>{
    let {id, id_prod:idProd}= req.params
    carritos=carritos.map(carro=> {if(carro.id == id){
        carro.productos = carro.productos.filter(prod=> prod.id != idProd)
        console.log(carro.productos);
    }return carro})
    res.send(`Producto ID: ${idProd} eliminado del carrito ID: ${id}`)
})
//Final endpoints carrito

app.listen(8080, () => {
  console.log("Servidor corriendo en puerto 8080");
});

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