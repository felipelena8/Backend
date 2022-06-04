class Producto{
static id = 1
constructor(nombre, descripcion, codigo, foto, precio, stock){
    this.id=Producto.id
    this.nombre=nombre
    this.timestamp=Date.now()
    this.descripcion=descripcion
    this.codigo=codigo
    this.foto=foto
    this.precio=precio
    this.stock=stock
    Producto.id+=1
    }
}

module.exports = Producto