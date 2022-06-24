import { db } from "../config.js";
class ContenedorFirebase {
  constructor(colec) {
    this.query = db.collection(colec);
  }
  async listarAll() {
    try {
      const resp = await this.query.get();
      const docs = resp.docs;
      const objs = docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      return objs;
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }
  async listar(id) {
    try {
      const doc = await this.query.doc(id.toString());
      const resp = await doc.get();
      const obj = { id: resp.id, ...resp.data() };
      return await obj;
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }
  async write(obj) {
    try {
      await this.query.add({ ...obj });
    } catch (e) {
      console.error(e);
    }
  }
}

export default ContenedorFirebase;
