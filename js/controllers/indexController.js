// js/indexController.js
// Lógica para renderizar los productos en la página principal.

const container = document.getElementById('cards-container');

/**
 * Renderiza la lista de productos en la página principal.
 * @param {Array} productos 
 */
function renderizarProductos(productos) {
    container.innerHTML = '';
    if (!productos || productos.length === 0) {
        container.innerHTML = `<p class="text-center">No hay productos disponibles.</p>`;
        return;
    }

    productos.forEach(prod => {
        // Usamos los campos: image, nombre, categoria, precio, stock, descripcion
        container.innerHTML += `
            <div class="card">
                <header>
                    <img 
                        src="${prod.image || 'img/default-product.png'}" 
                        alt="${prod.nombre}" 
                        loading="lazy"
                        style="height: 160px; object-fit: cover;"
                    />
                </header>
                <footer>
                    <h2 class="card-title">${prod.nombre}</h2>
                    <p>🏷️ **Categoría:** ${prod.categoria}</p>
                    <p>💰 **Precio:** $${prod.precio ? parseFloat(prod.precio).toFixed(2) : 'N/A'}</p>
                    <p>📦 **Stock:** ${prod.stock || 0}</p>
                    <small>${prod.descripcion ? prod.descripcion.substring(0, 50) + '...' : 'Sin descripción'}</small>
                </footer>
            </div>
        `;
    });
}

/**
 * Función principal para cargar los datos en la página.
 */
async function cargarDirectorio() {
    try {
        const productos = await IndexService.getProductos();
        renderizarProductos(productos);
    } catch (err) {
        container.innerHTML = `<article aria-label="Error" data-theme="dark"><p>❌ Error al cargar el directorio: ${err.message}</p></article>`;
        console.error('Error en IndexController:', err);
    }
}

window.addEventListener('DOMContentLoaded', cargarDirectorio);