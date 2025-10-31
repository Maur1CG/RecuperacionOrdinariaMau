

const API_URL = 'https://retoolapi.dev/zigfdK/tbProductos'; // 

/**
 * @returns {Promise<Array>} Lista de productos.
 */
class IndexService {
    static async getProductos() {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) {
                throw new Error('Error al obtener datos: ' + res.statusText);
            }
            return await res.json();
        } catch (error) {
            console.error('Error en IndexService.getProductos:', error);
            throw new Error('Error de conexión con la API.');
        }
    }
}