class Producto{
constructor(nombre, descripcion, codigo, foto, precio, stock){
    this.nombre=nombre
    this.timestamp=Date.now()
    this.descripcion=descripcion
    this.codigo=codigo
    this.foto=foto
    this.precio=precio
    this.stock=stock
    }
}

export default Producto;