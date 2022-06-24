import mongoose from "mongoose"
import admin from 'firebase-admin'
import {readFileSync} from "fs"

const URL = 'mongodb://127.0.0.1:27017/proyectoFinal'
const connection = mongoose.connect(URL,{useNewUrlParser:true})

const serviceAccount = JSON.parse(readFileSync("./DB/key.json",'utf-8'))
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://proyectofinal-5e90a.firebaseio.com'
})

const db = admin.firestore()


export {connection,db}