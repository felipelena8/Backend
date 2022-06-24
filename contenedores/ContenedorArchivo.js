import {promises as fs} from 'fs'
class ContenedorArchivo{
    constructor(ruta){
        this.ruta = ruta
    }
    async listar(id){
        const objs = await this.listarAll()
        const buscado = objs.find(o=> o.id==id)
        return buscado
    }
    async listarAll(){
        try {
            const objs = await fs.readFile(this.ruta,'utf-8')
            return await JSON.parse(objs)
        } catch (e) {
            return []
        }
    }
    async write(objs){
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs)).catch(e=>console.error(`Error: ${e}`))
        } catch (e) {
            console.error(e);
        }
    }    
}
export default ContenedorArchivo;