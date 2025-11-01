
const form = document.getElementById('producto-form');
const nombreEl = document.getElementById('nombre');
const stockEl = document.getElementById('stock');
const precioEl = document.getElementById('precio');
const categoriaEl = document.getElementById('categoria');
const descripcionEl = document.getElementById('descripcion');
const imagenFileEl = document.getElementById('imagen-file');
const imagenUrlEl = document.getElementById('imagen-url');
const idEl = document.getElementById('producto-id');
const cancelBtn = document.getElementById('btn-cancel');
const submitBtn = document.getElementById('btn-submit');
const tbody = document.getElementById('productos-tbody');



function renderizarTabla(productos) {
    tbody.innerHTML = '';
    if (!productos || productos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center">No hay productos registrados.</td></tr>`;
        return;
    }
    productos.forEach(prod => {
        tbody.innerHTML += `
            <tr>
                <td><img src="${prod.image || 'img/default-product.png'}" alt="${prod.nombre}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
                <td>${prod.nombre}</td>
                <td>${prod.stock}</td>
                <td>$${prod.precio}</td>
                <td>${prod.categoria}</td>
                <td>
                    <button onclick="adminController.cargarParaEditar('${prod.id}')" class="btn btn-sm btn-success me-1">Actualizar</button>
                    <button onclick="adminController.borrarProducto('${prod.id}')" class="btn btn-sm btn-danger">Eliminar</button>
                </td>
            </tr>
        `;
    });
}


class AdminController {
    constructor() {
        this.configurarEventos();
        this.cargarProductos();
    }

    configurarEventos() {
        form.addEventListener('submit', this.manejarSubmit.bind(this));
        cancelBtn.addEventListener('click', this.resetearFormulario.bind(this));
    }

    async cargarProductos() {
        try {
            const productos = await AdminService.getProductos();
            renderizarTabla(productos);
        } catch (error) {
            tbody.innerHTML = `<tr><td colspan="6"> Error al cargar la tabla: ${error.message}</td></tr>`;
        }
    }

    async manejarSubmit(e) {
        e.preventDefault();

        let imageUrl = imagenUrlEl.value;
        try {
            if (imagenFileEl.files.length > 0) {
                alert("Subiendo imagen... por favor espere.");
                imageUrl = await AdminService.uploadImage(imagenFileEl.files[0]);
            }

            const payload = {
                nombre: nombreEl.value,
                stock: parseInt(stockEl.value),
                precio: parseFloat(precioEl.value),
                categoria: categoriaEl.value,
                descripcion: descripcionEl.value,
                image: imageUrl 
            };

            if (idEl.value) {
                // UPDATE
                await AdminService.updateProducto(idEl.value, payload);
                alert(" Registro actualizado.");
            } else {
                // CREATE
                await AdminService.createProducto(payload);
                alert(" Registro agregado.");
            }

        } catch (error) {
            alert(` Error en la operación: ${error.message}`);
            console.error(error);
        } finally {
            this.resetearFormulario();
            this.cargarProductos();
        }
    }

    async cargarParaEditar(id) {
        try {
            const p = await AdminService.getProductoById(id);

            nombreEl.value = p.nombre;
            stockEl.value = p.stock; 
            precioEl.value = p.precio;
            categoriaEl.value = p.categoria;
            descripcionEl.value = p.descripcion;
            imagenUrlEl.value = p.image;

            imagenFileEl.value = '';
            idEl.value = p.id;

            submitBtn.textContent = 'Actualizar';
            cancelBtn.hidden = false;
        } catch (error) {
            alert(` No se pudo cargar el producto: ${error.message}`);
        }
    }

    async borrarProducto(id) {
        if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            return;
        }
        try {
            await AdminService.deleteProducto(id);
            alert(" El registro fue eliminado.");
        } catch (error) {
            alert(` Falló la eliminación: ${error.message}`);
        } finally {
            this.cargarProductos();
        }
    }

    resetearFormulario() {
        form.reset();
        idEl.value = '';
        imagenUrlEl.value = '';
        submitBtn.textContent = 'Agregar';
        cancelBtn.hidden = true;
    }
}


const adminController = new AdminController();
window.adminController = adminController;