class Carrito{
    static id=1
    constructor(productos){
        this.id = Carrito.id
        this.productos=productos
        Carrito.id+=1
    }
}
module.exports = Carrito;