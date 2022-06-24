import ContenedorFirebase from "../../contenedores/contenedorFirebase.js";
class CarritosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("carritos");
  }
  async insert(obj) {
    this.write(obj);
  }
  async delete(id) {
    try {
        const doc = this.query.doc(id.toString())
        await doc.delete()
    } catch (e) {
        console.error(e);
    }
  }
  async update(id, producto) {
    try {
      const doc = this.query.doc(id.toString())
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
  async agregarProducto(id, producto) {
    try {
        const doc = await this.query.doc(id.toString())
        const resp = await doc.get()
        const prods = resp.data().productos
        prods.push(producto)
        await doc.update({productos: prods});
      } catch (e) {
        console.error(e);
      }
  }
  async deleteProducto(id, idProd) {
    try {
        const doc = await this.query.doc(id.toString())
        const resp = await doc.get()
        const prods = resp.data().productos.filter(prod=> prod.id != idProd)
        await doc.update({productos: prods});
      } catch (e) {
        console.error(e);
      }
  }
}
export default CarritosDaoFirebase;
