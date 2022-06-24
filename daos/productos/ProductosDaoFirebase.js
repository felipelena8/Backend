import ContenedorFirebase from "../../contenedores/contenedorFirebase.js";

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("productos");
  }
  async insert(obj) {
    this.write(obj);
  }
  async delete(id) {
    try {
      const doc = this.query.doc(id.toString());
      await doc.delete();
    } catch (e) {
      console.error(e);
    }
  }
  async update(id, producto) {
    try {
      const doc = this.query.doc(id.toString());
      const objUpdate = {};
      for (let [key, value] of Object.entries(producto)) {
        if (value != undefined) {
          objUpdate[key] = producto[key];
        }
      }
      await doc.update(objUpdate);
    } catch (e) {
      console.error(e);
    }
  }
}
export default ProductosDaoFirebase;
