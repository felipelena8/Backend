const express = require("express");
const fs = require("fs");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const ContenedorProductos = require("./ContenedorProductos");

const containerProds = new ContenedorProductos();
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const messages = []
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.use("", express.static(__dirname + "/public"));
app.get("/api/productos", (req, res) => {
  res.json(containerProds.productos());
});
app.get("", (req, res) => {
  return res.render("index");
});
app.get("/api/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const prod = containerProds.buscarProducto(id);
  if (prod === undefined) {
    return res.json({ error: "producto no encontrado" });
  }
  return res.json(prod);
});

app.delete("/api/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  let seElimino = containerProds.eliminarProducto(id);
  if (!seElimino) {
    return res.send("El producto no se elimino o no existe");
  }
  return res.send("Se elimino correctamente");
});

app.put("/api/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const newProducto = req.body;
  const actualizado = containerProds.actualizarProducto(id, newProducto);
  res.send(
    `El producto ${actualizado ? "se actualizo correctamente" : "no existe"}`
  );
});

const server = httpServer.listen(8080, () => {
  console.log("Servidor HTTP corriendo en puerto 8080");
});
server.on("error", (error) => console.log(`Ha ocurrido un error: ${error}`));

io.on("connection", (socket) => {
  socket.emit("listProductos", containerProds.productos());
  socket.emit('listMessages', messages)
  console.log(`Bienvenido ${socket.id}`);
  socket.on("producto", (producto) => {
    containerProds.agregarProducto(producto);
    io.sockets.emit("listProductos", containerProds.productos());
  });
  socket.on('newMessage', msg =>{
    const now = new Date()
    if(!messages.length){
      fs.writeFileSync('mensajes.txt','')
    }
    messages.push(msg)
    io.sockets.emit('message', msg)
    try{
      fs.appendFileSync('mensajes.txt', `${msg.usuario}[${now.getDay()}/${now.getMonth()}/${now.getFullYear()}${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]:${msg.message}\n`)
  }catch(err){
      console.error('Se ha producido un error', err);
  }
  })
});
