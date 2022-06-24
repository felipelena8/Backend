import mongoose from "mongoose";
const {Schema, model} = mongoose;

const prod = new Schema({id:{type:Number, index:{unique:true}}, nombre:String, timestamp:String, descripcion:String,codigo:Number,foto:String,precio:Number,stock:Number})
const productos= new model('Productos', prod)
export default productos;