import ContenedorMongo from "../../contenedores/contenedorMongo.js";
import carro from "../../model/carrito.js";
class CarritosDaoMongo extends ContenedorMongo {
  constructor() {
    super(carro);
  }
  async insert(obj) {
    let id = await this.mayorID();
    obj.id = id+1
    await this.model.insertMany(obj)
  }
  async delete(id) {
    await this.model.deleteOne({"id":id})
  }
  async agregarProducto(id, producto) {
    let obj = await this.model.findOne({"id":id})
    if(obj !=null && producto != null){
      obj.productos.push(producto)
    }
    return await obj.save()
  }
  async deleteProducto(idCart, idProd) {
    let obj = await this.model.findOne({"id":Number(idCart)})
    if (obj != null){
      obj.productos= await obj.productos.filter(prod=>prod.id!=idProd)
    }
    return await obj.save()
  }
  async mayorID(){
    let id
    try{
        id = (await this.model.findOne().sort({
            "id": -1
        })).id

    }catch (e){
        id = 0
    }
    return await id;
  }
}
export default CarritosDaoMongo;
