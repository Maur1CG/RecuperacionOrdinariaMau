import { obtenerProductos } from '../services/productService.js';

export default function indexController() {
  const container = document.getElementById('cards-container');

  async function mostrarProductos() {
    const productos = await obtenerProductos();
    container.innerHTML = '';
    if (!productos || productos.length === 0) {
      container.innerHTML = `<p style="text-align:center;">No hay productos disponibles</p>`;
      return;
    }
    productos.forEach(prod => {
      container.innerHTML += `
        <div class="card">
          <img src="${prod.imagen}" alt="${prod.nombreProducto}" />
          <h2>${prod.nombreProducto}</h2>
          <p><strong>Categoría:</strong> ${prod.categoriaProducto}</p>
          <p><strong>Precio:</strong> $${prod.precioProducto}</p>
          <p>${prod.descripcionProducto}</p>
        </div>
      `;
    });
  }

  window.addEventListener('DOMContentLoaded', mostrarProductos);
}
