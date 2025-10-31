// js/indexService.js
// Lógica de comunicación con la API para la vista del directorio.

const API_URL = 'https://retoolapi.dev/zigfdK/tbProductos'; // ¡URL ACTUALIZADA!

/**
 * Servicio para obtener todos los productos.
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