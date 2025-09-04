
// frontend/src/vistas/MantenimientoCarreras.vue
<template>
  <div class="mantenimiento-carreras-container">
    <div class="mantenimiento-header">
      <h1 class="text-3xl font-bold text-gray-800">Mantenimiento de Carreras</h1>
      <button 
        @click="abrirFormulario('crear')"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        + Nueva Carrera
      </button>
    </div>

    <carreras-tabla 
      :carreras="carreras" 
      :cargando="cargando"
      @editar="abrirFormulario('editar', $event)" 
      @eliminar="eliminarCarrera"
    />

    <carrera-form-modal
      :mostrar="mostrarModal"
      :modo="modoFormulario"
      :carrera-data="formulario"
      @cerrar="cerrarModal"
      @guardar="guardarCarrera"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CarrerasTabla from '../components/Mantenimiento/CarrerasTabla.vue';
import CarreraFormModal from '../components/Mantenimiento/CarreraFormModal.vue';
import CarreraService from '../services/carreras.js';
import { useAuthStore } from '../store/index.js';

const carreras = ref([]);
const cargando = ref(true);
const mostrarModal = ref(false);
const modoFormulario = ref('crear');

const authStore = useAuthStore();
const formulario = ref({
  id_carrera: null,
  nombre_carrera: ''
});

const obtenerDatos = async () => {
  cargando.value = true;
  try {
    const respuesta = await CarreraService.obtenerCarreras();
    carreras.value = respuesta;
  } catch (error) {
    console.error('Error al obtener carreras:', error);
  } finally {
    cargando.value = false;
  }
};

const abrirFormulario = (modo, carrera = null) => {
  modoFormulario.value = modo;
  if (modo === 'crear') {
    formulario.value = {
      id_carrera: null,
      nombre_carrera: ''
    };
  } else {
    formulario.value = { ...carrera };
  }
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const guardarCarrera = async (datosCarrera, modo) => {
  const usuarioActualId = authStore.usuario?.id_usuario;
  try {
    if (modo === 'crear') {
      await CarreraService.crearCarrera(datosCarrera, usuarioActualId);
    } else {
      await CarreraService.actualizarCarrera(datosCarrera.id_carrera, datosCarrera, usuarioActualId);
    }
    await obtenerDatos();
    cerrarModal();
  } catch (error) {
    window.alert(`Error al guardar la carrera: ${error.message}`);
  }
};

const eliminarCarrera = async (id) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar esta carrera?')) {
    const usuarioActualId = authStore.usuario?.id_usuario;
    try {
      await CarreraService.eliminarCarrera(id, usuarioActualId);
      await obtenerDatos();
    } catch (error) {
      window.alert(`Error al eliminar la carrera: ${error.message}`);
    }
  }
};

onMounted(() => {
  obtenerDatos();
});
</script>

<style scoped>
.mantenimiento-carreras-container {
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
