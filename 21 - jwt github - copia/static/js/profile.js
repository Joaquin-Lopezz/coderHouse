const spans = document.querySelectorAll('span');

window.addEventListener('load', async () => {
    //carga los datos de mi perfil
    const response = await fetch('/api/usuarios/current');
    if (response.status === 403) {
        alert('necesitas loguearte para ver esta info!');
        return (window.location.href = '/login');
    }
    const result = await response.json();
    const usuario = result.payload;
    
    if (usuario[0]) {
        
        spans[0].innerHTML = usuario[0].nombre;
        spans[1].innerHTML = usuario[0].apellido;
        spans[2].innerHTML = usuario[0].email;
        spans[3].innerHTML = usuario[0].rol;
    } else {
        spans[0].innerHTML = 'admin';
        spans[1].innerHTML = 'admin';
        spans[2].innerHTML = 'admin';
        spans[3].innerHTML = 'admin';
    }

    //cargar los datos del carrito que corresponda
    //con el id de usuario usuario['_id']
    
    const carritoResponse = await fetch(`api/carrito/${usuario[0]['_id']}`, {
        method: 'POST',
    });

    if (carritoResponse.status == 200) {
        const carrito = await carritoResponse.json();
        /**/
 
        mostrarProductosDelCarrito(carrito.carrito.products);

        //1 tengo que iterar result para extrar el id del producto y el quantity
        //2 ir a buscar el producto e mostrarlo y
        // tambien acag
    }

    //agrega  Logout a la pagina de perfil
    const ul = document.querySelector('nav ul');
    const liLogout = document.createElement('li');
    ul?.appendChild(liLogout);
    const aLogout = document.createElement('a');
    liLogout.appendChild(aLogout);
    aLogout.innerHTML = 'logout';
    aLogout.href = '#';
    aLogout.addEventListener('click', logout);

    //agrega productos a la pagina de perfil
    const liProducto = document.createElement('li');
    ul?.appendChild(liProducto);
    const aProducto = document.createElement('a');
    liProducto.appendChild(aProducto);
    aProducto.innerHTML = 'productos';
    aProducto.href = '#';
    aProducto.addEventListener('click', producto);

    // @ts-ignore
    document.querySelector('div').style.display = 'block';
});

async function logout(event) {
    const response = await fetch('/api/sesiones/current', {
        method: 'DELETE',
    });

    if (response.status === 200) {
        window.location.href = '/login';
    } else {
        const error = await response.json();
        alert(error.message);
    }
}

async function producto(event) {
    const response = await fetch('/api/productos', {
        method: 'GET',
    });

    if (response.status === 200) {
        window.location.href = '/productos';
    }
}

async function mostrarProductosDelCarrito(productos) {
    const container = document.getElementById('productos-carrito');
    let precioFinal = 0;

    productos.forEach((producto) => {
        let totalProducto = producto.price * producto.quantity;
        precioFinal = precioFinal + totalProducto;

        const productoElem = document.createElement('div');

        productoElem.innerHTML = `
        <div style="border: 1px solid #e0e0e0; padding: 16px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <h2 style="font-size: 20px; margin-bottom: 10px; color: #333;">${producto.title}</h2>
        <p style="font-size: 14px; color: #777;">${producto.description}</p>
        <p style="font-size: 18px; font-weight: bold; color: #007bff;">ID: ${producto.idProduct} (Cantidad: ${producto.quantity})</p>
        <p style="font-size: 16px; color: #333; font-weight: bold;">Total: $${totalProducto}</p>
    </div>`;
        container.appendChild(productoElem);
    });

    const precioFinalElem = document.createElement('div');
    precioFinalElem.innerHTML = `
    <div style="display: inline-block; border: 2px solid #007bff; padding: 16px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
    <h1 style="font-size: 40px; font-weight: bold; color: #333; margin: 0;">TOTAL = $ ${precioFinal}</h1>
    </div>
    `;

    container.appendChild(precioFinalElem);
}
