const express = require('express')
const Contenedor = require('./Contenedor')
const container = new Contenedor('productos.txt')
const app = express()
app.get('/productos', (req, res)=>{

    res.send(container.getAll())
})
app.get('/productoRandom', (req, res)=>{
    let array = container.getAll()
    res.send(array[Math.floor(array.length * Math.random())])
})
app.get('/', (req,res)=>{
    res.send('<h1>Bienvenidos</h1>')
})
const server = app.listen(8080, ()=>{
    console.log('Servidor HTTP corriendo en el puerto 8080');
})