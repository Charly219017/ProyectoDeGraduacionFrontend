<template>
  <div class="mantenimiento-productos-container">
    <div class="mantenimiento-header">
      <h1 class="text-3xl font-bold text-gray-800">Mantenimiento de Productos</h1>
      <button 
        @click="abrirFormulario('crear')"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        + Nuevo Producto
      </button>
    </div>

    <productos-tabla 
      :productos="productos" 
      :cargando="cargando"
      @editar="abrirFormulario('editar', $event)" 
      @eliminar="eliminarProductoConfirmar"
    />

    <producto-form-modal
      :mostrar="mostrarModal"
      :modo="modoFormulario"
      :producto-data="formulario"
      :categorias="categorias"
      @cerrar="cerrarModal"
      @guardar="guardarProducto"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProductosTabla from '../components/Inventario/ProductosTabla.vue';
import ProductoFormModal from '../components/Inventario/ProductoFormModal.vue';
import InventarioService from '../services/inventario.js';

const productos = ref([]);
const categorias = ref([]);
const cargando = ref(true);
const mostrarModal = ref(false);
const modoFormulario = ref('crear');

const formulario = ref({});

const obtenerDatos = async () => {
  cargando.value = true;
  try {
    const [productosRes, categoriasRes] = await Promise.all([
      InventarioService.obtenerProductos(),
      InventarioService.obtenerCategorias()
    ]);
    productos.value = productosRes.data;
    categorias.value = categoriasRes.data;
  } catch (error) {
    console.error('Error al obtener datos de inventario:', error);
    alert('Hubo un error al cargar los datos. Por favor, intente más tarde.');
  } finally {
    cargando.value = false;
  }
};

const abrirFormulario = (modo, producto = null) => {
  modoFormulario.value = modo;
  if (modo === 'crear') {
    formulario.value = {
      nombre_producto: '',
      descripcion: '',
      id_categoria: null,
      precio_unitario: 0,
      stock_minimo: 0,
      stock_actual: 0 // Default value for new products
    };
  } else {
    formulario.value = { ...producto };
  }
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const guardarProducto = async (datosProducto, modo) => {
  try {
    if (modo === 'crear') {
      await InventarioService.crearProducto(datosProducto);
    } else {
      await InventarioService.actualizarProducto(datosProducto.id_producto, datosProducto);
    }
    await obtenerDatos();
    cerrarModal();
  } catch (error) {
    console.error('Error al guardar el producto:', error);
    alert(`Error al guardar el producto: ${error.response?.data?.mensaje || error.message}`);
  }
};

const eliminarProductoConfirmar = async (id) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
    try {
      await InventarioService.eliminarProducto(id);
      await obtenerDatos();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert(`Error al eliminar el producto: ${error.response?.data?.mensaje || error.message}`);
    }
  }
};

onMounted(() => {
  obtenerDatos();
});
</script>

<style scoped>
.mantenimiento-productos-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
  font-family: 'Inter', sans-serif;
  background: #f6f8fc;
  min-height: 100vh;
}

.mantenimiento-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 24px 32px;
}

.mantenimiento-header h1 {
  color: #333;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.mantenimiento-header button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 28px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.07);
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
}

.mantenimiento-header button:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.15);
}
</style>