
// frontend/src/vistas/ReclutamientoCriterios.vue
<template>
  <div class="reclutamiento-criterios-container">
    <div class="reclutamiento-header">
      <h1 class="text-3xl font-bold text-gray-800">Gestión de Criterios</h1>
      <button 
        @click="abrirFormulario('crear')"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        + Nuevo Criterio
      </button>
    </div>

    <criterios-tabla 
      :criterios="criterios" 
      :cargando="cargando"
      @editar="abrirFormulario('editar', $event)" 
      @eliminar="eliminarCriterio"
    />

    <criterio-form-modal
      :mostrar="mostrarModal"
      :modo="modoFormulario"
      :criterio-data="formulario"
      @cerrar="cerrarModal"
      @guardar="guardarCriterio"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CriteriosTabla from '../components/Reclutamiento/CriteriosTabla.vue';
import CriterioFormModal from '../components/Reclutamiento/CriterioFormModal.vue';
import ReclutamientoService from '../services/reclutamiento.js';
import { useAuthStore } from '../store/index.js';

const criterios = ref([]);
const cargando = ref(true);
const mostrarModal = ref(false);
const modoFormulario = ref('crear');

const authStore = useAuthStore();
const formulario = ref({
  id_criterio: null,
  nombre_criterio: '',
  descripcion: ''
});

const obtenerDatos = async () => {
  cargando.value = true;
  try {
    const respuesta = await ReclutamientoService.obtenerCriterios();
    criterios.value = respuesta;
  } catch (error) {
    console.error('Error al obtener criterios:', error);
  } finally {
    cargando.value = false;
  }
};

const abrirFormulario = (modo, criterio = null) => {
  modoFormulario.value = modo;
  if (modo === 'crear') {
    formulario.value = {
      id_criterio: null,
      nombre_criterio: '',
      descripcion: ''
    };
  } else {
    formulario.value = { ...criterio };
  }
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const guardarCriterio = async (datosCriterio, modo) => {
  try {
    if (modo === 'crear') {
      await ReclutamientoService.crearCriterio(datosCriterio);
    } else {
      await ReclutamientoService.actualizarCriterio(datosCriterio.id_criterio, datosCriterio);
    }
    await obtenerDatos();
    cerrarModal();
  } catch (error) {
    window.alert(`Error al guardar el criterio: ${error.message}`);
  }
};

const eliminarCriterio = async (id) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar este criterio?')) {
    try {
      await ReclutamientoService.eliminarCriterio(id);
      await obtenerDatos();
    } catch (error) {
      window.alert(`Error al eliminar el criterio: ${error.message}`);
    }
  }
};

onMounted(() => {
  obtenerDatos();
});
</script>

<style scoped>
.reclutamiento-criterios-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
  font-family: 'Inter', sans-serif;
  background: #f6f8fc;
  min-height: 100vh;
}

.reclutamiento-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 24px 32px;
}

.reclutamiento-header h1 {
  color: #333;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.reclutamiento-header button {
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

.reclutamiento-header button:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.15);
}

</style>
