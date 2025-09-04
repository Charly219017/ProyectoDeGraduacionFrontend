
// frontend/src/vistas/ReclutamientoEvaluaciones.vue
<template>
  <div class="reclutamiento-evaluaciones-container">
    <div class="reclutamiento-header">
      <h1 class="text-3xl font-bold text-gray-800">Gestión de Evaluaciones</h1>
      <button 
        @click="abrirFormulario('crear')"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        + Nueva Evaluación
      </button>
    </div>

    <evaluaciones-tabla 
      :evaluaciones="evaluaciones" 
      :criterios="criterios"
      :cargando="cargando"
      @editar="abrirFormulario('editar', $event)" 
      @eliminar="eliminarEvaluacion"
    />

    <evaluacion-form-modal
      :mostrar="mostrarModal"
      :modo="modoFormulario"
      :evaluacion-data="formulario"
      :aplicaciones="aplicaciones"
      :criterios="criterios"
      :vacantes="vacantes"
      :candidatos="candidatos"
      @cerrar="cerrarModal"
      @guardar="guardarEvaluacion"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import EvaluacionesTabla from '../components/Reclutamiento/EvaluacionesTabla.vue';
import EvaluacionFormModal from '../components/Reclutamiento/EvaluacionFormModal.vue';
import ReclutamientoService from '../services/reclutamiento.js';
import { useAuthStore } from '../store/index.js';

const evaluaciones = ref([]);
const aplicaciones = ref([]);
const criterios = ref([]);
const vacantes = ref([]);
const candidatos = ref([]);
const cargando = ref(true);
const mostrarModal = ref(false);
const modoFormulario = ref('crear');

const authStore = useAuthStore();
const formulario = ref({
  id_evaluacion: null,
  id_aplicacion: null,
  id_criterio: null,
  puntuacion: 0,
  comentarios: ''
});

const obtenerDatos = async () => {
  cargando.value = true;
  try {
    const [evaluacionesData, aplicacionesData, criteriosData, vacantesData, candidatosData] = await Promise.all([
      ReclutamientoService.obtenerEvaluaciones(),
      ReclutamientoService.obtenerAplicaciones(),
      ReclutamientoService.obtenerCriterios(),
      ReclutamientoService.obtenerVacantes(),
      ReclutamientoService.obtenerCandidatos()
    ]);
    evaluaciones.value = evaluacionesData;
    aplicaciones.value = aplicacionesData;
    criterios.value = criteriosData;
    vacantes.value = vacantesData;
    candidatos.value = candidatosData;
  } catch (error) {
    console.error('Error al obtener datos iniciales:', error);
  } finally {
    cargando.value = false;
  }
};

const abrirFormulario = (modo, evaluacion = null) => {
  modoFormulario.value = modo;
  if (modo === 'crear') {
    formulario.value = {
      id_evaluacion: null,
      id_aplicacion: null,
      id_criterio: null,
      puntuacion: 0,
      comentarios: ''
    };
  } else {
    formulario.value = { ...evaluacion };
  }
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const guardarEvaluacion = async (datosEvaluacion, modo) => {
  const usuarioActualId = authStore.usuario?.id_usuario;
  try {
    if (modo === 'crear') {
      await ReclutamientoService.crearEvaluacion(datosEvaluacion, usuarioActualId);
    } else {
      await ReclutamientoService.actualizarEvaluacion(datosEvaluacion.id_evaluacion, datosEvaluacion, usuarioActualId);
    }
    await obtenerDatos();
    cerrarModal();
  } catch (error) {
    window.alert(`Error al guardar la evaluación: ${error.message}`);
  }
};

const eliminarEvaluacion = async (id) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar esta evaluación?')) {
    const usuarioActualId = authStore.usuario?.id_usuario;
    try {
      await ReclutamientoService.eliminarEvaluacion(id, usuarioActualId);
      await obtenerDatos();
    } catch (error) {
      window.alert(`Error al eliminar la evaluación: ${error.message}`);
    }
  }
};

onMounted(() => {
  obtenerDatos();
});
</script>

<style scoped>
.reclutamiento-evaluaciones-container {
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
