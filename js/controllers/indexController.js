
const container = document.getElementById('cards-container');



/**
 * 
 * @param {Array} productos 
 */
function renderizarProductos(productos) {
    container.innerHTML = '';
    if (!productos || productos.length === 0) {
        container.innerHTML = `<div class="col-12"><div class="alert alert-info text-center">No hay productos disponibles.</div></div>`;
        return;
    }

    productos.forEach(prod => {
        container.innerHTML += `
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <img 
                        src="${prod.image || 'img/default-product.png'}" 
                        class="card-img-top" 
                        alt="${prod.nombre}"
                        style="height: 200px; object-fit: cover;"
                    />
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${prod.nombre}</h5>
                        <p class="card-text mb-1"><span class="badge bg-secondary">${prod.categoria}</span></p>
                        <p class="card-text mb-2 fw-bold text-success fs-4">$${prod.precio ? parseFloat(prod.precio).toFixed(2) : 'N/A'}</p>
                        <ul class="list-unstyled small mt-auto">
                            <li> Stock: ${prod.stock || 0}</li>
                            <li><small class="text-muted">${prod.descripcion ? prod.descripcion.substring(0, 50) + '...' : 'Sin descripción'}</small></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    });
}




async function cargarDirectorio() {
    try {
        const productos = await IndexService.getProductos();
        renderizarProductos(productos);
    } catch (err) {
        container.innerHTML = `<article aria-label="Error" data-theme="dark"><p> Error al cargar el directorio: ${err.message}</p></article>`;
        console.error('Error en IndexController:', err);
    }
}

window.addEventListener('DOMContentLoaded', cargarDirectorio);