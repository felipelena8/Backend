const Producto = require("./Producto")
class ContenedorProductos{
    static id = 1
    constructor(){
        this.contenedorProductos = []
    }
    agregarProducto(producto){
        producto.id = ContenedorProductos.id
        this.contenedorProductos.push(producto)
        ContenedorProductos.id++
        return producto
    }
    eliminarProducto(id){
        const productosSobrantes = this.contenedorProductos.filter(prod=> prod.id !== id)
        if(this.contenedorProductos.find(prod => prod.id === id) === undefined){
            return false
        }
        this.contenedorProductos = productosSobrantes
        return true
    }
    buscarProducto(id){
        let prod = this.contenedorProductos.find(prod=> prod.id === id)
        return prod
    }
    actualizarProducto(id, producto){
        let seActualizo = true
        let indice = this.contenedorProductos.findIndex(prod => prod.id === id)
        if (indice == -1){
            seActualizo = false
        }else{
            producto.id = id
            this.contenedorProductos[indice] = producto
        }
        return seActualizo
    }
    productos(){
        return this.contenedorProductos
    }
}
module.exports = ContenedorProductos