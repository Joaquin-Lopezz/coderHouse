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
<
        `;

        productoElem.appendChild(detailsElem);
        productoElem.appendChild(formContainer);
        container.appendChild(productoElem);


            try {
                const response = await fetch(`/api/productos/${producto._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });


                    alert('Se eliminó el producto correctamente');
                    location.reload();
                } else {
                    alert('Error al eliminar el producto');
                }
            } catch (error) {

            mostrarFormularioEdicion(producto, formContainer);
        });
    });
}

function mostrarFormularioEdicion(producto, formContainer) {

    if (formEdicionExistente) {
        formEdicionExistente.remove();
    }
