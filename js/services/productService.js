// productService.js

const API_URL = 'https://retoolapi.dev/zigfdK/tbProductos';

// Obtener todos los productos
export async function getProducts() {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return [];
    }
}

// Agregar un producto
export async function addProduct(product) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        return await response.json();
    } catch (error) {
        console.error('Error al agregar producto:', error);
    }
}

// Actualizar un producto
export async function updateProduct(id, product) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        return await response.json();
    } catch (error) {
        console.error('Error al actualizar producto:', error);
    }
}

// Eliminar un producto
export async function deleteProduct(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
    }
}
