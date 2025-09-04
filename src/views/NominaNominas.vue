
// frontend/src/vistas/NominaNominas.vue
<template>
  <div class="nomina-nominas-container">
    <div class="nomina-header">
      <h1 class="text-3xl font-bold text-gray-800">Gestión de Nóminas</h1>
      <button 
        @click="abrirFormulario('crear')"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        + Nueva Nómina
      </button>
    </div>

    <nominas-tabla 
      :nominas="nominas" 
      :empleados="empleados"
      :cargando="cargando"
      @editar="abrirFormulario('editar', $event)" 
      @eliminar="eliminarNomina"
    />

    <nomina-form-modal
      :mostrar="mostrarModal"
      :modo="modoFormulario"
      :nomina-data="formulario"
      :empleados="empleados"
      @cerrar="cerrarModal"
      @guardar="guardarNomina"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NominasTabla from '../components/Nomina/NominasTabla.vue';
import NominaFormModal from '../components/Nomina/NominaFormModal.vue';
import NominaService from '../services/nomina.js';
import EmpleadoService from '../services/empleados.js';
import { useAuthStore } from '../store/index.js';

const nominas = ref([]);
const empleados = ref([]);
const cargando = ref(true);
const mostrarModal = ref(false);
const modoFormulario = ref('crear');

const authStore = useAuthStore();
const formulario = ref({
  id_nomina: null,
  id_empleado: null,
  fecha_pago: '',
  monto_bruto: 0,
  deducciones: 0,
  monto_neto: 0
});

const obtenerDatos = async () => {
  cargando.value = true;
  try {
    const [nominasData, empleadosData] = await Promise.all([
      NominaService.obtenerNominas(),
      EmpleadoService.obtenerTodosEmpleados()
    ]);
    nominas.value = nominasData;
    empleados.value = empleadosData;
  } catch (error) {
    console.error('Error al obtener datos iniciales:', error);
  } finally {
    cargando.value = false;
  }
};

const abrirFormulario = (modo, nomina = null) => {
  modoFormulario.value = modo;
  if (modo === 'crear') {
    formulario.value = {
      id_nomina: null,
      id_empleado: null,
      fecha_pago: '',
      monto_bruto: 0,
      deducciones: 0,
      monto_neto: 0
    };
  } else {
    formulario.value = { ...nomina };
  }
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const guardarNomina = async (datosNomina, modo) => {
  const usuarioActualId = authStore.usuario?.id_usuario;
  try {
    if (modo === 'crear') {
      await NominaService.crearNomina(datosNomina, usuarioActualId);
    } else {
      await NominaService.actualizarNomina(datosNomina.id_nomina, datosNomina, usuarioActualId);
    }
    await obtenerDatos();
    cerrarModal();
  } catch (error) {
    window.alert(`Error al guardar la nómina: ${error.message}`);
  }
};

const eliminarNomina = async (id) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar esta nómina?')) {
    const usuarioActualId = authStore.usuario?.id_usuario;
    try {
      await NominaService.eliminarNomina(id, usuarioActualId);
      await obtenerDatos();
    } catch (error) {
      window.alert(`Error al eliminar la nómina: ${error.message}`);
    }
  }
};

onMounted(() => {
  obtenerDatos();
});
</script>

<style scoped>
.nomina-nominas-container {
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
