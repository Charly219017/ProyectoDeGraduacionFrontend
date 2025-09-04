
// frontend/src/vistas/EmpleadoContratos.vue
<template>
  <div class="contratos-container">
    <div class="contratos-header">
      <h1 v-if="empleado">Contratos de {{ empleado.nombre_completo }}</h1>
      <button 
        @click="abrirFormulario('crear')"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        + Nuevo Contrato
      </button>
    </div>

    <contratos-list 
      :contratos="contratos" 
      :puestos="puestos"
      :cargando="cargando"
      @editar="abrirFormulario('editar', $event)" 
      @eliminar="eliminarContrato"
    />

    <contrato-form-modal
      :mostrar="mostrarModal"
      :modo="modoFormulario"
      :contrato-data="formulario"
      :puestos="puestos"
      @cerrar="cerrarModal"
      @guardar="guardarContrato"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ContratosList from '../components/Contratos/ContratosList.vue';
import ContratoFormModal from '../components/Contratos/ContratoFormModal.vue';
import ContratoService from '../services/contratos.js';
import EmpleadoService from '../services/empleados.js';
import PuestoService from '../services/puestos.js';
import { useAuthStore } from '../store/index.js';

const route = useRoute();
const empleadoId = route.params.id;

const empleado = ref(null);
const contratos = ref([]);
const puestos = ref([]);
const cargando = ref(true);
const mostrarModal = ref(false);
const modoFormulario = ref('crear');

const authStore = useAuthStore();
const formulario = ref({
  id_contrato: null,
  id_puesto: null,
  fecha_inicio: '',
  fecha_fin: '',
  salario: 0
});

const obtenerDatos = async () => {
  cargando.value = true;
  try {
    const [empleadoData, contratosData, puestosData] = await Promise.all([
      EmpleadoService.obtenerEmpleadoPorId(empleadoId),
      ContratoService.obtenerContratosPorEmpleado(empleadoId),
      PuestoService.obtenerPuestos()
    ]);
    empleado.value = empleadoData;
    contratos.value = contratosData;
    puestos.value = puestosData;
  } catch (error) {
    console.error('Error al obtener datos:', error);
  } finally {
    cargando.value = false;
  }
};

const abrirFormulario = (modo, contrato = null) => {
  modoFormulario.value = modo;
  if (modo === 'crear') {
    formulario.value = {
      id_contrato: null,
      id_puesto: null,
      fecha_inicio: '',
      fecha_fin: '',
      salario: 0,
      id_empleado: empleadoId
    };
  } else {
    formulario.value = { ...contrato };
  }
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const guardarContrato = async (datosContrato, modo) => {
  const usuarioActualId = authStore.usuario?.id_usuario;
  try {
    if (modo === 'crear') {
      await ContratoService.crearContrato(datosContrato, usuarioActualId);
    } else {
      await ContratoService.actualizarContrato(datosContrato.id_contrato, datosContrato, usuarioActualId);
    }
    await obtenerDatos();
    cerrarModal();
  } catch (error) {
    window.alert(`Error al guardar el contrato: ${error.message}`);
  }
};

const eliminarContrato = async (id) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar este contrato?')) {
    const usuarioActualId = authStore.usuario?.id_usuario;
    try {
      await ContratoService.eliminarContrato(id, usuarioActualId);
      await obtenerDatos();
    } catch (error) {
      window.alert(`Error al eliminar el contrato: ${error.message}`);
    }
  }
};

onMounted(() => {
  obtenerDatos();
});
</script>

<style scoped>
.contratos-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
  font-family: 'Inter', sans-serif;
  background: #f6f8fc;
  min-height: 100vh;
}

.contratos-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 24px 32px;
}

.contratos-header h1 {
  color: #333;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.contratos-header button {
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

.contratos-header button:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.15);
}

</style>
