import { logger } from "../../src/utils/logger";

          window.addEventListener('load', async () => {
    //traemos el usuario y guardamos su id   
    //obtengo el carrito con id usuario o lo creo  
    //obtenemos los prodcutos disponibles   
    const userResponse = await fetch('/api/usuarios/current');

    
    const usuarioJson = await userResponse.json();
    const usuario = usuarioJson.payload;

    
    const carrito = await fetch(`/api/carrito/${usuario['_id']}`, {
        method: 'POST',
    });
    const cart = await carrito.json();


    
    const carritoId = cart.carrito['_id'];
    const response = await fetch('/api/productos', {
        method: 'GET',
    });

    const productos = await response.json();
    
    productosAddcarrito(productos, carritoId);
});

function productosAddcarrito(productos, carritoId) {
    //iteramos los productos  y lo mostramos en la views agregamos un botton a cada poducto
    const container = document.getElementById('productos-container');

    productos.forEach((producto, index) => {
        const productoElem = document.createElement('div');


        const botonId = `miBoton-${index}`;

        productoElem.innerHTML = `
            <h2>${producto.title}</h2>
            <p>${producto.description}</p>
            <p>Precio: $${producto.price}</p>
            <p>(${producto.stock} disponibles) 
            
            <button id="${botonId}" type="submit">añadir al carrito</button>
            `;

        container.appendChild(productoElem);

        //creamos evento para cada botonId
        const miBoton = document.getElementById(botonId);
        
        miBoton.addEventListener('click', async () => {
            try {
                const response = await fetch(
                    `api/carrito/addProduct/${carritoId}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ producto }), 
                    }
                );

                if(response.status == 200){
                     alert('se agrego el producto al carrito');
                }else{
                    alert('error al agregar producto al carrito')
                }
                    
            } catch (error) {
                logger.error(`${error}`)
             
            }
            

            
                
        });
    });
}
