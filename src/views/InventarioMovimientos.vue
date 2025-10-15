<template>
  <div class="mantenimiento-movimientos-container">
    <div class="mantenimiento-header">
      <h1 class="text-3xl font-bold text-gray-800">Gestión de Movimientos de Inventario</h1>
      <button 
        @click="abrirFormulario"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        + Nuevo Movimiento
      </button>
    </div>

    <movimientos-tabla 
      :movimientos="movimientos" 
      :cargando="cargando"
    />

    <movimiento-form-modal
      :mostrar="mostrarModal"
      :productos="productos"
      @cerrar="cerrarModal"
      @guardar="guardarMovimiento"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MovimientosTabla from '../components/Inventario/MovimientosTabla.vue';
import MovimientoFormModal from '../components/Inventario/MovimientoFormModal.vue';
import InventarioService from '../services/inventario.js';

const movimientos = ref([]);
const productos = ref([]);
const cargando = ref(true);
const mostrarModal = ref(false);

const obtenerDatos = async () => {
  cargando.value = true;
  try {
    // Also fetch products for the modal dropdown
    const [movimientosRes, productosRes] = await Promise.all([
      InventarioService.obtenerMovimientos(),
      InventarioService.obtenerProductos()
    ]);
    movimientos.value = movimientosRes.data;
    productos.value = productosRes.data;
  } catch (error) {
    console.error('Error al obtener datos de inventario:', error);
    alert('Hubo un error al cargar los datos. Por favor, intente más tarde.');
  } finally {
    cargando.value = false;
  }
};

const abrirFormulario = () => {
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const guardarMovimiento = async (datosMovimiento) => {
  try {
    await InventarioService.crearMovimiento(datosMovimiento);
    // After creating a movement, the stock of a product changes, so we refresh both.
    await obtenerDatos();
    cerrarModal();
  } catch (error) {
    console.error('Error al registrar el movimiento:', error);
    alert(`Error al registrar el movimiento: ${error.response?.data?.mensaje || error.message}`);
  }
};

onMounted(() => {
  obtenerDatos();
});
</script>

<style scoped>
.mantenimiento-movimientos-container {
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