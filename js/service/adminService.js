

const API_URL = 'https://retoolapi.dev/zigfdK/tbProductos'; // 

const IMG_API_URL = 'https://api.imgbb.com/1/upload?key=99f84e0bab707d47c84f0499ce6af4d7'; 

/**
 *
 */
class AdminService {
    // --- CRUD: READ ---
    static async getProductos() {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Falló al cargar la tabla.');
        return await res.json();
    }

    static async getProductoById(id) {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error('Producto no encontrado.');
        return await res.json();
    }

    // --- CRUD: CREATE ---
    static async createProducto(payload) {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Falló la creación del registro.');
        return true;
    }

    // --- CRUD: UPDATE ---
    static async updateProducto(id, payload) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Falló la actualización del registro.');
        return true;
    }

    // --- CRUD: DELETE ---
    static async deleteProducto(id) {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Falló la eliminación del registro.');
        return true;
    }

    // --- Subida de Imagen (ImgBB) ---
    static async uploadImage(file) {
        const fd = new FormData();
        fd.append('image', file);
        const res = await fetch(IMG_API_URL, { method: 'POST', body: fd });
        const obj = await res.json();
        
        if (obj.success && obj.data.url) {
            return obj.data.url;
        }
        throw new Error('Respuesta de ImgBB inválida o fallida.');
    }
}