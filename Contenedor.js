const fs = require('fs')

class Contenedor {
    static idGlobal = 0
    constructor(nombre) {
        this.nombre = nombre
        this.objetos = []
    }
    save(object) {
        Contenedor.idGlobal += 1
        object.id = Contenedor.idGlobal
        this.objetos.push(object)
        fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(this.objetos)).then(() => { console.log('Objeto cargado correctamente') }).catch(err => console.error(err))
        return Contenedor.idGlobal
    }
     getById(id) {
        const data = fs.readFileSync(this.nombre, 'utf-8')
        const dataParseada = JSON.parse(data)
        return dataParseada.find(obj => obj.id == id)
    }
    getAll(){
        const data = fs.readFileSync(this.nombre, 'utf-8')
        const dataParseada =JSON.parse(data)
        return dataParseada
    }
    deleteById(id){
        fs.promises.readFile(this.nombre, 'utf-8')
        .then(data=> JSON.parse(data))
        .then(data=>data.filter(obj => obj.id!= id))
        .then(data=> fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(data))).catch(err => console.error(err))
    }
    deleteAll(){
        fs.promises.writeFile(`./${this.nombre}`," ").then(()=>console.log("Objetos eliminados")).catch(err => console.error(err))
    }
}
module.exports = Contenedor