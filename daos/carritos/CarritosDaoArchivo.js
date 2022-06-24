import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";
class CarritosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("DB/carritos.json");
  }
  async mayorId() {
    const carritos = await this.listarAll();
    let id = Math.max(0, ...carritos.map((cart) => cart.id)) + 1;
    return id;
  }
  async insert(obj) {
    const objs = await super.listarAll();
    obj.id = await this.mayorId();
    objs.push(obj);
    await super.write(objs);
  }
  async delete(id) {
    const objs = await super.listarAll();
    await super.write(objs.filter((obj) => obj.id != id));
  }
  async agregarProducto(id, producto) {
    let carts = await super.listarAll();
    carts = carts.map((cart) => {
      if (cart.id == id) {
        cart.productos.push(producto);
      }
      return cart;
    });
    await super.write(carts);
  }
  async deleteProducto(idCart, idProd){
    let carts = await super.listarAll();
    let cartsModificados = carts.map(cart=> {if(cart.id ==idCart){
        cart.productos= cart.productos.filter(prod=>prod.id!=idProd)
    }return cart})
    await super.write(cartsModificados)
  }
}
export default CarritosDaoArchivo;
