<template>
  <div class="mantenimiento-categorias-container">
    <div class="mantenimiento-header">
      <h1 class="text-3xl font-bold text-gray-800">Mantenimiento de Categorías</h1>
      <button 
        @click="abrirFormulario('crear')"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        + Nueva Categoría
      </button>
    </div>

    <categorias-tabla 
      :categorias="categorias" 
      :cargando="cargando"
      @editar="abrirFormulario('editar', $event)" 
      @eliminar="eliminarCategoriaConfirmar"
    />

    <categoria-form-modal
      :mostrar="mostrarModal"
      :modo="modoFormulario"
      :categoria-data="formulario"
      @cerrar="cerrarModal"
      @guardar="guardarCategoria"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CategoriasTabla from '../components/Inventario/CategoriasTabla.vue';
import CategoriaFormModal from '../components/Inventario/CategoriaFormModal.vue';
import InventarioService from '../services/inventario.js';

const categorias = ref([]);
const cargando = ref(true);
const mostrarModal = ref(false);
const modoFormulario = ref('crear');

const formulario = ref({
  id_categoria: null,
  nombre_categoria: '',
  descripcion: ''
});

const obtenerDatos = async () => {
  cargando.value = true;
  try {
    const response = await InventarioService.obtenerCategorias();
    categorias.value = response.data;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    alert('Hubo un error al cargar las categorías. Por favor, intente más tarde.');
  } finally {
    cargando.value = false;
  }
};

const abrirFormulario = (modo, categoria = null) => {
  modoFormulario.value = modo;
  if (modo === 'crear') {
    formulario.value = {
      id_categoria: null,
      nombre_categoria: '',
      descripcion: ''
    };
  } else {
    formulario.value = { ...categoria };
  }
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const guardarCategoria = async (datosCategoria, modo) => {
  try {
    if (modo === 'crear') {
      await InventarioService.crearCategoria(datosCategoria);
    } else {
      await InventarioService.actualizarCategoria(datosCategoria.id_categoria, datosCategoria);
    }
    await obtenerDatos();
    cerrarModal();
  } catch (error) {
    console.error('Error al guardar la categoría:', error);
    alert(`Error al guardar la categoría: ${error.response?.data?.mensaje || error.message}`);
  }
};

const eliminarCategoriaConfirmar = async (id) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
    try {
      await InventarioService.eliminarCategoria(id);
      await obtenerDatos();
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
      alert(`Error al eliminar la categoría: ${error.response?.data?.mensaje || error.message}`);
    }
  }
};

onMounted(() => {
  obtenerDatos();
});
</script>

<style scoped>
.mantenimiento-categorias-container {
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