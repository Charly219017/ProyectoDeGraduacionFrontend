
// frontend/src/vistas/Bienestar.vue
<template>
  <div class="bienestar-container">
    <div class="bienestar-header">
      <h1 class="text-3xl font-bold text-gray-800">Gestión de Bienestar</h1>
      <button 
        @click="abrirFormulario('crear')"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        + Nueva Actividad
      </button>
    </div>

    <actividades-list 
      :actividades="actividades" 
      :cargando="cargando"
      @editar="abrirFormulario('editar', $event)" 
      @eliminar="eliminarActividad"
    />

    <actividad-form-modal
      :mostrar="mostrarModal"
      :modo="modoFormulario"
      :actividad-data="formulario"
      @cerrar="cerrarModal"
      @guardar="guardarActividad"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ActividadesList from '../components/Bienestar/ActividadesList.vue';
import ActividadFormModal from '../components/Bienestar/ActividadFormModal.vue';
import { 
  obtenerTodasActividadesBienestar, 
  crearActividadBienestar, 
  actualizarActividadBienestar, 
  eliminarActividadBienestar as eliminarActividadApi
} from '../services/bienestar.js';
import { useAuthStore } from '../store/index.js';

const actividades = ref([]);
const cargando = ref(true);
const mostrarModal = ref(false);
const modoFormulario = ref('crear');

const authStore = useAuthStore();
const formulario = ref({
  id_actividad: null,
  nombre_actividad: '',
  descripcion: '',
  fecha: ''
});

const obtenerDatos = async () => {
  cargando.value = true;
  try {
    const respuesta = await obtenerTodasActividadesBienestar();
    actividades.value = respuesta;
  } catch (error) {
    console.error('Error al obtener actividades:', error);
  } finally {
    cargando.value = false;
  }
};

const abrirFormulario = (modo, actividad = null) => {
  modoFormulario.value = modo;
  if (modo === 'crear') {
    formulario.value = {
      id_bienestar: null,
      nombre_actividad: '',
      descripcion: '',
      fecha_actividad: ''
    };
  } else {
    formulario.value = { ...actividad };
  }
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const guardarActividad = async (datosActividad, modo) => {
  try {
    if (modo === 'crear') {
      await crearActividadBienestar(datosActividad);
    } else {
      await actualizarActividadBienestar(datosActividad.id_bienestar, datosActividad);
    }
    await obtenerDatos();
    cerrarModal();
  } catch (error) {
    window.alert(`Error al guardar la actividad: ${error.message}`);
  }
};

const eliminarActividad = async (id) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar esta actividad?')) {
    try {
      await eliminarActividadApi(id);
      await obtenerDatos();
    } catch (error) {
      window.alert(`Error al eliminar la actividad: ${error.message}`);
    }
  }
};

onMounted(() => {
  obtenerDatos();
});
</script>

<style scoped>
.bienestar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
  font-family: 'Inter', sans-serif;
  background: #f6f8fc;
  min-height: 100vh;
}

.bienestar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 24px 32px;
}

.bienestar-header h1 {
  color: #333;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.bienestar-header button {
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

.bienestar-header button:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.15);
}

</style>
