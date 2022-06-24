import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";
class ProductosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("DB/productos.json");
  }
  async mayorId() {
    const productos = await this.listarAll();
    let id = Math.max(0,...productos.map((prod) => prod.id,))+1
    return id
  }
  async insert(obj) {
    const objs = await super.listarAll();
    obj.id= await this.mayorId()
    objs.push(obj);
    super.write(objs);
  }
  async delete(id) {
    const objs = await super.listarAll();
    await super.write(objs.filter((obj) => obj.id != id ));
  }
  async update(id, producto){
    const prods = await super.listarAll();
    producto.id = id
    await super.write(prods.map(prod=> {if (prod.id==id) {
      for (let key in producto) {
        if(producto[key]==undefined){
          producto[key]=prod[key]
        }
      }
      console.log(producto);
      return producto
    }else{return prod}}))
  }
}
export default ProductosDaoArchivo;
