import express from "express"
import { __dirname } from "./utils.js"
import handlebars from "express-handlebars"
import {Server} from "socket.io"
import viewRouter from "./routes/view.router.js"
import productRouter from "./routes/products.router.js"
import ProductManager from "./controllers/productManager.js"

const app =express()
const PORT=8080;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))
app.engine("handlebars",handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine","handlebars")
app.use("/api",productRouter)
app.use("/",viewRouter)


const httpServer=app.listen(PORT,()=>{
    console.log("conectado")
})

const productmanager=new ProductManager(__dirname+"/database/products.json")
 const socketServer = new  Server(httpServer)

socketServer.on("connection",async (socket)=>{
    console.log("nuevo cliente")
    const products = await productmanager.getProducts({});
    socket.emit('productos', products);

    socket.on('addProduct', async data => {
        await productmanager.addProduct(data);
        const updatedProducts = await productmanager.getProducts({}); 
    socket.emit('productosupdated', updatedProducts);
      });

      socket.on("deleteProduct", async (id) => {
        console.log("ID del producto a eliminar:", id);
        const deletedProduct = await productmanager.deleteProduct(id);
        const updatedProducts = await productmanager.getProducts({});
        socketServer.emit("productosupdated", updatedProducts);
      });
     

     

})


