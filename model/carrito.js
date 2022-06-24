import mongoose from "mongoose";
const {Schema, model} = mongoose;

const carrito = new Schema({productos:[], id:{type:Number, index:{unique:true}}})
const carro = new model('Carritos', carrito)

export default carro