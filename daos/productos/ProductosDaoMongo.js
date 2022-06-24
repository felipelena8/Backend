import ContenedorMongo from "../../contenedores/contenedorMongo.js";
import productos from "../../model/productos.js";

class ProductosDaoMongo extends ContenedorMongo {
  constructor( ){
    super(productos);
  }
  async insert(obj) {
    let id = await this.mayorID();
    obj.id = id+1
    await this.model.insertMany(obj)
  }
  async delete(id) {
    await this.model.deleteOne({"id":id})
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
  async update(id, producto){
    let obj = await this.model.findOne({"id":id})
    for (let key in obj) {
        if(producto[key]!=undefined){
          obj[key] = producto[key]
        }
    }
    return obj.save()
  }
}
export default ProductosDaoMongo;
