// frontend/src/vistas/ReclutamientoVacantes.vue
<template>
  <div class="reclutamiento-vacantes-container">
    <div class="reclutamiento-header">
      <h1 class="text-3xl font-bold text-gray-800">Gestión de Vacantes</h1>
      <button 
        @click="abrirFormulario('crear')"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        + Nueva Vacante
      </button>
    </div>

    <vacantes-tabla 
      :vacantes="vacantes" 
      :puestos="puestos"
      :cargando="cargando"
      @editar="abrirFormulario('editar', $event)" 
      @eliminar="eliminarVacante"
    />

    <vacante-form-modal
      :mostrar="mostrarModal"
      :modo="modoFormulario"
      :vacante-data="formulario"
      :puestos="puestos"
      @cerrar="cerrarModal"
      @guardar="guardarVacante"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import VacantesTabla from '../components/Reclutamiento/VacantesTabla.vue';
import VacanteFormModal from '../components/Reclutamiento/VacanteFormModal.vue';
import ReclutamientoService from '../services/reclutamiento.js';
import PuestoService from '../services/puestos.js';
import { useAuthStore } from '../store/index.js';

const vacantes = ref([]);
const puestos = ref([]);
const cargando = ref(true);
const mostrarModal = ref(false);
const modoFormulario = ref('crear');

const authStore = useAuthStore();
const formulario = ref({
  id_vacante: null,
  titulo: '',
  descripcion: '',
  id_puesto: null,
  fecha_publicacion: ''
});

const obtenerDatos = async () => {
  cargando.value = true;
  try {
    const [vacantesData, puestosData] = await Promise.all([
      ReclutamientoService.obtenerVacantes(),
      PuestoService.obtenerPuestos()
    ]);
    vacantes.value = vacantesData;
    puestos.value = puestosData;
  } catch (error) {
    console.error('Error al obtener datos iniciales:', error);
  } finally {
    cargando.value = false;
  }
};

const abrirFormulario = (modo, vacante = null) => {
  modoFormulario.value = modo;
  if (modo === 'crear') {
    formulario.value = {
      id_vacante: null,
      titulo: '',
      descripcion: '',
      id_puesto: null,
      fecha_publicacion: ''
    };
  } else {
    formulario.value = { ...vacante };
  }
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const guardarVacante = async (datosVacante, modo) => {
  try {
    if (modo === 'crear') {
      await ReclutamientoService.crearVacante(datosVacante);
    } else {
      await ReclutamientoService.actualizarVacante(datosVacante.id_vacante, datosVacante);
    }
    await obtenerDatos();
    cerrarModal();
  } catch (error) {
    window.alert(`Error al guardar la vacante: ${error.message}`);
  }
};

const eliminarVacante = async (id_vacante) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar esta vacante?')) {
    try {
      await ReclutamientoService.eliminarVacante(id_vacante);
      await obtenerDatos();
    } catch (error) {
      window.alert(`Error al eliminar la vacante: ${error.message}`);
    }
  }
};

onMounted(() => {
  obtenerDatos();
});
</script>

<style scoped>
.reclutamiento-vacantes-container {
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