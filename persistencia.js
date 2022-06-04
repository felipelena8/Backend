const fs = require("fs");

function escribirProductos(productos) {
  try {
    fs.writeFileSync("productos.txt", JSON.stringify(productos));
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

function leerProductos() {
  try {
    return JSON.parse(fs.readFileSync("productos.txt") );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

function escribirCarritos(carrito) {
  try {
    fs.writeFileSync("carrito.txt", JSON.stringify(carrito));
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

function leerCarritos() {
  try {
    return JSON.parse(fs.readFileSync("carrito.txt"));
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
function mayorId(lista){
  if(lista.length != 0){
    return Math.max(...lista.map((item) => item.id))+1;
  }else{
    return 1
  }
}
module.exports = {
  escribirCarritos,
  escribirProductos,
  leerCarritos,
  leerProductos,mayorId
};
