// frontend/src/vistas/ReclutamientoAplicaciones.vue
<template>
  <div class="reclutamiento-aplicaciones-container">
    <div class="reclutamiento-header">
      <h1 class="text-3xl font-bold text-gray-800">Gestión de Aplicaciones</h1>
      <button 
        @click="abrirFormulario('crear')"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        + Nueva Aplicación
      </button>
    </div>

    <aplicaciones-tabla 
      :aplicaciones="aplicaciones" 
      :vacantes="vacantes"
      :candidatos="candidatos"
      :cargando="cargando"
      @editar="abrirFormulario('editar', $event)" 
      @eliminar="eliminarAplicacion"
    />

    <aplicacion-form-modal
      :mostrar="mostrarModal"
      :modo="modoFormulario"
      :aplicacion-data="formulario"
      :vacantes="vacantes"
      :candidatos="candidatos"
      @cerrar="cerrarModal"
      @guardar="guardarAplicacion"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AplicacionesTabla from '../components/Reclutamiento/AplicacionesTabla.vue';
import AplicacionFormModal from '../components/Reclutamiento/AplicacionFormModal.vue';
import ReclutamientoService from '../services/reclutamiento.js';
import { useAuthStore } from '../store/index.js';

const aplicaciones = ref([]);
const vacantes = ref([]);
const candidatos = ref([]);
const cargando = ref(true);
const mostrarModal = ref(false);
const modoFormulario = ref('crear');

const authStore = useAuthStore();
const formulario = ref({
  id_aplicacion: null,
  id_vacante: null,
  id_candidato: null,
  fecha_aplicacion: '',
  estado_aplicacion: 'En revisión',
  observaciones: ''
});

const obtenerDatos = async () => {
  cargando.value = true;
  try {
    const [aplicacionesData, vacantesData, candidatosData] = await Promise.all([
      ReclutamientoService.obtenerAplicaciones(),
      ReclutamientoService.obtenerVacantes(),
      ReclutamientoService.obtenerCandidatos()
    ]);
    aplicaciones.value = aplicacionesData;
    vacantes.value = vacantesData;
    candidatos.value = candidatosData;
  } catch (error) {
    console.error('Error al obtener datos iniciales:', error);
  } finally {
    cargando.value = false;
  }
};

const abrirFormulario = (modo, aplicacion = null) => {
  modoFormulario.value = modo;
  if (modo === 'crear') {
    formulario.value = {
      id_aplicacion: null,
      id_vacante: null,
      id_candidato: null,
      fecha_aplicacion: new Date().toISOString().slice(0, 10),
      estado_aplicacion: 'En revisión',
      observaciones: ''
    };
  } else {
    const fecha = aplicacion.fecha_aplicacion ? new Date(aplicacion.fecha_aplicacion).toISOString().slice(0, 10) : '';
    formulario.value = { ...aplicacion, fecha_aplicacion: fecha };
  }
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const guardarAplicacion = async (datosAplicacion, modo) => {
  try {
    if (modo === 'crear') {
      await ReclutamientoService.crearAplicacion(datosAplicacion);
    } else {
      await ReclutamientoService.actualizarAplicacion(datosAplicacion.id_aplicacion, datosAplicacion);
    }
    await obtenerDatos();
    cerrarModal();
  } catch (error) {
    window.alert(`Error al guardar la aplicación: ${error.message}`);
  }
};

const eliminarAplicacion = async (id_aplicacion) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar esta aplicación?')) {
    try {
      await ReclutamientoService.eliminarAplicacion(id_aplicacion);
      await obtenerDatos();
    } catch (error) {
      window.alert(`Error al eliminar la aplicación: ${error.message}`);
    }
  }
};

onMounted(() => {
  obtenerDatos();
});
</script>

<style scoped>
.reclutamiento-aplicaciones-container {
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