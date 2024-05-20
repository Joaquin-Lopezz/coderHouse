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
    const carritoId = cart['_id'];
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
            
            <button id="${botonId}" type="submit">añadir producto al carrito</button>
            `;

        container.appendChild(productoElem);

        //creamos evento para cada botonId
        const miBoton = document.getElementById(botonId);

        miBoton.addEventListener('click', async () => {
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
            alert('se agrego el producto al carrito');
        });
    });
}
