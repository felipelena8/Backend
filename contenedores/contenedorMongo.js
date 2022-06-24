import {connection} from "../config.js";
class ContenedorMongo{
    constructor(model){
        this.db = connection;
        this.model = model
    }
    async listarAll(){
        let objs = await this.model.find({})
        return await objs
    }
    async listar(id){
        let obj = await this.model.findOne({"id":id})
        return await obj
    }
    async write(objs){
        try{
            await this.model.insertMany(objs)
        }catch (e){
            console.error(e);
        }
    }
}

export default ContenedorMongo;