// productController.js
import { getProducts, addProduct, updateProduct, deleteProduct } from './productService.js';

const tableBody = document.getElementById('table-body');
const form = document.getElementById('product-form');
const submitBtn = document.getElementById('submit-btn');
let editId = null;

// Cargar productos en la tabla
async function loadProducts() {
    const products = await getProducts();
    tableBody.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.nombreProducto}</td>
            <td>${product.categoriaProducto}</td>
            <td>${product.descripcionProducto}</td>
            <td>$${product.precioProducto}</td>
            <td>${product.stockProducto}</td>
            <td>
                <button class="btn btn-warning btn-sm edit-btn">Editar</button>
                <button class="btn btn-danger btn-sm delete-btn">Eliminar</button>
            </td>
        `;
        // Editar producto
        row.querySelector('.edit-btn').addEventListener('click', () => {
            form.nombreProducto.value = product.nombreProducto;
            form.categoriaProducto.value = product.categoriaProducto;
            form.descripcionProducto.value = product.descripcionProducto;
            form.precioProducto.value = product.precioProducto;
            form.stockProducto.value = product.stockProducto;
            submitBtn.textContent = 'Actualizar';
            editId = product.id;
        });
        // Eliminar producto
        row.querySelector('.delete-btn').addEventListener('click', async () => {
            if (confirm('¿Deseas eliminar este producto?')) {
                await deleteProduct(product.id);
                alert('Producto eliminado correctamente');
                loadProducts();
            }
        });
        tableBody.appendChild(row);
    });
}

// Manejar envío del formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const productData = {
        nombreProducto: form.nombreProducto.value,
        categoriaProducto: form.categoriaProducto.value,
        descripcionProducto: form.descripcionProducto.value,
        precioProducto: parseFloat(form.precioProducto.value),
        stockProducto: parseInt(form.stockProducto.value)
    };

    if (editId) {
        await updateProduct(editId, productData);
        alert('Producto actualizado correctamente');
        submitBtn.textContent = 'Agregar';
        editId = null;
    } else {
        await addProduct(productData);
        alert('Producto agregado correctamente');
    }

    form.reset();
    loadProducts();
});

// Inicializar
loadProducts();
