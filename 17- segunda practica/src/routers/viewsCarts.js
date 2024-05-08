import { Router } from 'express';
import { cartsManager } from '../dao/models/mongodb.js';
import { productosModelo as productosManager } from '../dao/models/productosModels.js';

export const viewsCarts = Router();

viewsCarts.get('/:cid', async (req, res) => {
    //obtener los productos que tenga un carrito segun el id que ingrese
    try {
        const carritoId = req.params.cid;
        const carritoP = await cartsManager
            .findById(carritoId)
            .populate({ path: 'products.producto', model: productosManager }).lean();
        
        if (!carritoP) {
            return res
                .status(404)
                .send(`no existe el carrito con id: ${carritoId} `);
        }
     
        let carts= carritoP.products
      
        res.setHeader('Content-type', 'text/html');
        res.render('carts.handlebars',{carts : carts, carritoId})
        //res.send(carritoP)
    } catch (error){
        res.send(error)
    }
});
