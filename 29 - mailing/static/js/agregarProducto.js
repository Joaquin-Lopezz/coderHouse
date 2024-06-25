document.addEventListener('DOMContentLoaded', async () => {
    const formProducto = document.querySelector('form');

    const productos = await fetchData();
    mostrarProductos(productos);

    formProducto?.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = formProducto.title.value;
        const description = formProducto.description.value;
        const price = parseInt(formProducto.price.value);
        const thumbnail = formProducto.thumbnail.value;
        const code = formProducto.code.value;
        const stock = parseInt(formProducto.stock.value);
        const category = formProducto.category.value;
        const statusCheckbox = document.getElementById('status');
        const status = statusCheckbox.checked;

        const queryString = new URLSearchParams({
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
            status,
        });

        const response = await fetch('/api/productos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: queryString,
        });

        if (response.status == 200) {
            alert('Producto agregado a la base de datos');
            location.reload();
        }
        if (response.status == 500) {
            alert('Clave duplicada');
        }
    });
});

const fetchData = async () => {
    try {
        const response = await fetch('/api/productos', {
            method: 'GET',
        });

        if (response.ok) {
            const data = await response.json();
            return data; // Aquí puedes procesar los datos recibidos
        } else {
            console.error('Error al obtener los datos:', response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
};

function mostrarProductos(productos) {
    const container = document.getElementById('productos-container');

    productos.forEach((producto, index) => {
        const productoElem = document.createElement('div');
        productoElem.className = 'producto-container';

        const detailsElem = document.createElement('div');
        detailsElem.className = 'producto-details';

        const formContainer = document.createElement('div');
        formContainer.className = 'form-container';

        const botonId = `miBoton-${index}`;
        const botonIdUpdate = `miBoton1-${index}`;

        detailsElem.innerHTML = `
            <h2>${producto.title}</h2>
            <p>ID: ${producto._id}</p>
            <p>${producto.description}</p>
            <p>Precio: $${producto.price}</p>
            <p>Thumbnail: ${producto.thumbnail}</p>
            <p>Code: ${producto.code}</p>
            <p>Stock: ${producto.stock}</p>
            <p>Category: ${producto.category}</p>
            <p>Status: ${producto.status}</p>
            <button id="${botonId}" type="submit">Eliminar</button>
            <button id="${botonIdUpdate}" type="submit">Editar</button>
        `;

        productoElem.appendChild(detailsElem);
        productoElem.appendChild(formContainer);
        container.appendChild(productoElem);

        const miBoton = document.getElementById(botonId);
        const miBoton1 = document.getElementById(botonIdUpdate);

        miBoton.addEventListener('click', async () => {
            try {
                const response = await fetch(`/api/productos/${producto._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status == 200) {
                    alert('Se eliminó el producto correctamente');
                    location.reload();
                } else {
                    alert('Error al eliminar el producto');
                }
            } catch (error) {
                console.error(
                    'Hubo un problema con la operación fetch: ' + error.message
                );
            }
        });

        miBoton1.addEventListener('click', () => {
            mostrarFormularioEdicion(producto, formContainer);
        });
    });
}

function mostrarFormularioEdicion(producto, formContainer) {
    const formEdicionExistente = document.getElementById('form-edicion');
    if (formEdicionExistente) {
        formEdicionExistente.remove();
    }

    const formEdicion = document.createElement('form');
    formEdicion.id = 'form-edicion';
    formEdicion.className = 'form-edicion';
    formEdicion.innerHTML = ` 

     
        <h3>Editar Producto</h3>
        <div class="form-group">
            <label>Title:</label>
            <input type="text" id="edit-title" value="${
                producto.title
            }" required>
        </div>
        <div class="form-group">
            <label>Description:</label>
            <input type="text" id="edit-description" value="${
                producto.description
            }" required>
        </div>
        <div class="form-group">
            <label>Price:</label>
            <input type="number" id="edit-price" value="${
                producto.price
            }" required>
        </div>
        <div class="form-group">
            <label>Thumbnail:</label>
            <input type="text" id="edit-thumbnail" value="${
                producto.thumbnail
            }" required>
        </div>
    
        <div class="form-group">
            <label>Stock:</label>
            <input type="number" id="edit-stock" value="${
                producto.stock
            }" required>
        </div>
        <div class="form-group">
            <label>Category:</label>
            <input type="text" id="edit-category" value="${
                producto.category
            }" required>
        </div>
        <div class="form-group">
            <label>Status:</label>
            <input type="checkbox" id="edit-status" ${
                producto.status ? 'checked' : ''
            }>
        </div>
        <button type="submit">Guardar Cambios</button>
        <button type="button" id="cancelar-edicion">Cancelar</button>
    `;

    formContainer.appendChild(formEdicion);

    formEdicion.addEventListener('submit', async (event) => {
        event.preventDefault();
        await enviarFormularioEdicion(producto._id);
    });

    document
        .getElementById('cancelar-edicion')
        .addEventListener('click', () => {
            formEdicion.remove();
        });
}

async function enviarFormularioEdicion(productId) {
    const title = document.getElementById('edit-title').value;
    const description = document.getElementById('edit-description').value;
    const price = parseInt(document.getElementById('edit-price').value);
    const thumbnail = document.getElementById('edit-thumbnail').value;

    const stock = parseInt(document.getElementById('edit-stock').value);
    const category = document.getElementById('edit-category').value;
    const status = document.getElementById('edit-status').checked;

    const queryString = new URLSearchParams({
        title,
        description,
        price,
        thumbnail,
        stock,
        category,
        status,
    });

    const response = await fetch(`/api/productos/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString,
    });

    if (response.status == 200) {
        alert('Producto actualizado correctamente');
        location.reload();
    } else {
        alert('Error al actualizar el producto');
    }
}
