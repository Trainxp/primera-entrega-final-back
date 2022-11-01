import { Router } from "express";
import { Productos } from "../src/Dao/index.js";
import { verifyRole } from "../src/Verificador/Validador.js";
// import { ApiProductos } from "../src/ProductosApi.js"; 


const routerProductos = Router();




routerProductos.get("/",async (req,res) =>{
    const productos = await Productos.getAll();
    res.send(productos) 

} );


routerProductos.get('/:id', async(req, res) => {
    const{id}=req.params
    const productId =  await Productos.getById(Number(id))
    if (productId) {
        res.json(productId)      
    } else {
        res.json({"error":"Producto no encontrado"});
    }
})



routerProductos.post("/",verifyRole ,async (req, res) => {
    const {title,price,thumbnail, code, description,stock } =req.body
    if (title&&price&&thumbnail&&code&&description&&stock) {
        const producto = await Productos.save({title,price,thumbnail,stock,code,description , timestamp : new Date().toLocaleDateString()}) 
        res.send({ id:producto, "mensaje" : "se agrego el producto   " })
    } else {
        res.json({"mensaje" : "producto mal ingresado " })
    }
})


routerProductos.put('/:id', (req, res) => {
    const{id}=req.params
    const {title,price,thumbnail} =req.body
    if (title&&price&&thumbnail) {
        // const producto = ApiProductos.put( id, {title,price,thumbnail}) 
        res.send({ id:producto, "mensaje" : "se cambio el producto " })
    } else {
        res.json({"mensaje" : "producto mal ingresado " })
    }
})

routerProductos.delete("/:id", (req,res)=> {
    const{id}=req.params
    // const producto = ApiProductos.deleteById(id)
    if (!producto) {
        res.json(producto)      
    } else {
        res.json({"error":"Producto no encontrado"});
    }
})


export {routerProductos};