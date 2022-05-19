const express = require("express");
const ContenedorProductos = require("./ContenedorProductos");
const { Router } = express;


const containerProds = new ContenedorProductos();
const productosRouter = Router();
const app = express();


app.set('views', './views')
app.set('view engine', 'ejs')
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("", express.static(__dirname + "/public"));
productosRouter.get("", (req, res) => {
  res.json(containerProds.productos());
});
productosRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const prod = containerProds.buscarProducto(id);
  if (prod === undefined) {
    return res.json({ error: "producto no encontrado" });
  }
  return res.json(prod);
});
productosRouter.post("", (req, res) => {
  console.log("Request post");
  const newProd = req.body;
  let finalProd = containerProds.agregarProducto(newProd);
  return res.sendFile(__dirname + "/public/index.html");
});

app.get("/productos", (req, res) => {
    const prods = {productos: containerProds.productos()}
    return res.render('index',prods)
});

productosRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  let seElimino = containerProds.eliminarProducto(id);
  if (!seElimino) {
    return res.send("El producto no se elimino o no existe");
  }
  return res.send("Se elimino correctamente");
});

productosRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const newProducto = req.body;
  const actualizado = containerProds.actualizarProducto(id, newProducto);
  res.send(
    `El producto ${actualizado ? "se actualizo correctamente" : "no existe"}`
  );
});

app.use("/api/productos", productosRouter);

const server = app.listen(8080, () => {
  console.log("Servidor HTTP corriendo en puerto 8080");
});
server.on("error", (error) => console.log(`Ha ocurrido un error: ${error}`));
