
// frontend/src/vistas/ReclutamientoDetallesEvaluacion.vue
<template>
  <div class="reclutamiento-detalles-evaluacion-container">
    <div class="reclutamiento-header">
      <h1 class="text-3xl font-bold text-gray-800">Gestión de Detalles de Evaluación</h1>
      <button 
        @click="abrirFormulario('crear')"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        + Nuevo Detalle de Evaluación
      </button>
    </div>

    <detalles-evaluacion-tabla 
      :detalles-evaluacion="detallesEvaluacion" 
      :criterios="criterios"
      :cargando="cargando"
      @editar="abrirFormulario('editar', $event)" 
      @eliminar="eliminarDetalleEvaluacion"
    />

    <detalle-evaluacion-form-modal
      :mostrar="mostrarModal"
      :modo="modoFormulario"
      :detalle-evaluacion-data="formulario"
      :evaluaciones="evaluaciones"
      :criterios="criterios"
      @cerrar="cerrarModal"
      @guardar="guardarDetalleEvaluacion"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DetallesEvaluacionTabla from '../components/Reclutamiento/DetallesEvaluacionTabla.vue';
import DetalleEvaluacionFormModal from '../components/Reclutamiento/DetalleEvaluacionFormModal.vue';
import ReclutamientoService from '../services/reclutamiento.js';
import { useAuthStore } from '../store/index.js';

const detallesEvaluacion = ref([]);
const evaluaciones = ref([]);
const criterios = ref([]);
const cargando = ref(true);
const mostrarModal = ref(false);
const modoFormulario = ref('crear');

const authStore = useAuthStore();
const formulario = ref({
  id_detalle_evaluacion: null,
  id_evaluacion: null,
  id_criterio: null,
  puntuacion: 0,
  comentarios: ''
});

const obtenerDatos = async () => {
  cargando.value = true;
  try {
    const [detallesData, evaluacionesData, criteriosData] = await Promise.all([
      ReclutamientoService.obtenerDetallesEvaluacion(),
      ReclutamientoService.obtenerEvaluaciones(),
      ReclutamientoService.obtenerCriterios()
    ]);
    detallesEvaluacion.value = detallesData;
    evaluaciones.value = evaluacionesData;
    criterios.value = criteriosData;
  } catch (error) {
    console.error('Error al obtener datos iniciales:', error);
  } finally {
    cargando.value = false;
  }
};

const abrirFormulario = (modo, detalle = null) => {
  modoFormulario.value = modo;
  if (modo === 'crear') {
    formulario.value = {
      id_detalle_evaluacion: null,
      id_evaluacion: null,
      id_criterio: null,
      puntuacion: 0,
      comentarios: ''
    };
  } else {
    formulario.value = { ...detalle };
  }
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const guardarDetalleEvaluacion = async (datosDetalleEvaluacion, modo) => {
  const usuarioActualId = authStore.usuario?.id_usuario;
  try {
    if (modo === 'crear') {
      await ReclutamientoService.crearDetalleEvaluacion(datosDetalleEvaluacion, usuarioActualId);
    } else {
      await ReclutamientoService.actualizarDetalleEvaluacion(datosDetalleEvaluacion.id_detalle_evaluacion, datosDetalleEvaluacion, usuarioActualId);
    }
    await obtenerDatos();
    cerrarModal();
  } catch (error) {
    window.alert(`Error al guardar el detalle de evaluación: ${error.message}`);
  }
};

const eliminarDetalleEvaluacion = async (id) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar este detalle de evaluación?')) {
    const usuarioActualId = authStore.usuario?.id_usuario;
    try {
      await ReclutamientoService.eliminarDetalleEvaluacion(id, usuarioActualId);
      await obtenerDatos();
    } catch (error) {
      window.alert(`Error al eliminar el detalle de evaluación: ${error.message}`);
    }
  }
};

onMounted(() => {
  obtenerDatos();
});
</script>

<style scoped>
.reclutamiento-detalles-evaluacion-container {
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
