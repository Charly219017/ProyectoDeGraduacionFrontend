
// frontend/src/vistas/NominaVacaciones.vue
<template>
  <div class="nomina-vacaciones-container">
    <div class="nomina-header">
      <h1 class="text-3xl font-bold text-gray-800">Gestión de Vacaciones</h1>
      <button 
        @click="abrirFormulario('crear')"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        + Nueva Solicitud de Vacación
      </button>
    </div>

    <vacaciones-tabla 
      :vacaciones="vacaciones" 
      :empleados="empleados"
      :cargando="cargando"
      @editar="abrirFormulario('editar', $event)" 
      @eliminar="eliminarVacacion"
    />

    <vacacion-form-modal
      :mostrar="mostrarModal"
      :modo="modoFormulario"
      :vacacion-data="formulario"
      :empleados="empleados"
      @cerrar="cerrarModal"
      @guardar="guardarVacacion"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import VacacionesTabla from '../components/Nomina/VacacionesTabla.vue';
import VacacionFormModal from '../components/Nomina/VacacionFormModal.vue';
import NominaService from '../services/nomina.js';
import EmpleadoService from '../services/empleados.js';
import { useAuthStore } from '../store/index.js';

const vacaciones = ref([]);
const empleados = ref([]);
const cargando = ref(true);
const mostrarModal = ref(false);
const modoFormulario = ref('crear');

const authStore = useAuthStore();
const formulario = ref({
  id_vacacion: null,
  id_empleado: null,
  fecha_inicio: '',
  fecha_fin: '',
  estado: 'Pendiente'
});

const obtenerDatos = async () => {
  cargando.value = true;
  try {
    const [vacacionesData, empleadosData] = await Promise.all([
      NominaService.obtenerVacaciones(),
      EmpleadoService.obtenerTodosEmpleados()
    ]);
    vacaciones.value = vacacionesData;
    empleados.value = empleadosData;
  } catch (error) {
    console.error('Error al obtener datos iniciales:', error);
  } finally {
    cargando.value = false;
  }
};

const abrirFormulario = (modo, vacacion = null) => {
  modoFormulario.value = modo;
  if (modo === 'crear') {
    formulario.value = {
      id_vacacion: null,
      id_empleado: null,
      fecha_inicio: '',
      fecha_fin: '',
      estado: 'Pendiente'
    };
  } else {
    formulario.value = { ...vacacion };
  }
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const guardarVacacion = async (datosVacacion, modo) => {
  const usuarioActualId = authStore.usuario?.id_usuario;
  try {
    if (modo === 'crear') {
      await NominaService.crearVacacion(datosVacacion, usuarioActualId);
    } else {
      await NominaService.actualizarVacacion(datosVacacion.id_vacacion, datosVacacion, usuarioActualId);
    }
    await obtenerDatos();
    cerrarModal();
  } catch (error) {
    window.alert(`Error al guardar la solicitud de vacación: ${error.message}`);
  }
};

const eliminarVacacion = async (id) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar esta solicitud de vacación?')) {
    const usuarioActualId = authStore.usuario?.id_usuario;
    try {
      await NominaService.eliminarVacacion(id, usuarioActualId);
      await obtenerDatos();
    } catch (error) {
      window.alert(`Error al eliminar la solicitud de vacación: ${error.message}`);
    }
  }
};

onMounted(() => {
  obtenerDatos();
});
</script>

<style scoped>
.nomina-vacaciones-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
  font-family: 'Inter', sans-serif;
  background: #f6f8fc;
  min-height: 100vh;
}

.nomina-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 24px 32px;
}

.nomina-header h1 {
  color: #333;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.nomina-header button {
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

.nomina-header button:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.15);
}

</style>
