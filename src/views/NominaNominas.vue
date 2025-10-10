// frontend/src/vistas/NominaNominas.vue
<template>
  <div class="nomina-nominas-container">
    <div class="nomina-header">
      <h1 class="text-3xl font-bold text-gray-800">Gestión de Nóminas</h1>
      <div>
        <button 
          @click="abrirFormulario('crear')"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          + Generar Nómina
        </button>
      </div>
    </div>

    <nominas-tabla 
      :nominas="nominas" 
      :cargando="cargando"
      @editar="abrirFormulario('editar', $event)" 
      @eliminar="handleEliminarNomina"
      @imprimir="handleImprimirNomina"
    />

    <nomina-form-modal
      v-if="mostrarModal"
      :mostrar="mostrarModal"
      :modo="modoFormulario"
      :nomina-data="nominaSeleccionada"
      :empleados="empleados"
      @cerrar="cerrarModal"
      @guardar="handleGuardarNomina"
    />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NominasTabla from '../components/Nomina/NominasTabla.vue';
import NominaFormModal from '../components/Nomina/NominaFormModal.vue';
import nominaService from '../services/nomina.js';
import empleadoService from '../services/empleados.js';

const nominas = ref([]);
const empleados = ref([]);
const cargando = ref(true);
const mostrarModal = ref(false);
const modoFormulario = ref('crear');
const nominaSeleccionada = ref(null);

const cargarDatos = async () => {
  cargando.value = true;
  try {
    const [nominasData, empleadosData] = await Promise.all([
      nominaService.obtenerNominas(),
      empleadoService.obtenerTodosEmpleados()
    ]);
    nominas.value = nominasData;
    empleados.value = empleadosData;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    alert('No se pudieron cargar los datos. Por favor, intente de nuevo.');
  } finally {
    cargando.value = false;
  }
};

const abrirFormulario = (modo, nomina = null) => {
  modoFormulario.value = modo;
  nominaSeleccionada.value = nomina;
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
  nominaSeleccionada.value = null;
};

const handleGuardarNomina = async (datosNomina) => {
  try {
    if (modoFormulario.value === 'crear') {
      await nominaService.crearNomina(datosNomina);
    } else {
      await nominaService.actualizarNomina(datosNomina.id_nomina, datosNomina);
    }
    await cargarDatos();
    cerrarModal();
  } catch (error) {
    console.error('Error al guardar la nómina:', error);
    alert(`Error al guardar la nómina: ${error.response?.data?.mensaje || error.message}`);
  }
};

const handleEliminarNomina = async (id) => {
  if (window.confirm('¿Está seguro de que desea eliminar este registro de nómina?')) {
    try {
      await nominaService.eliminarNomina(id);
      await cargarDatos();
    } catch (error) {
      console.error('Error al eliminar la nómina:', error);
      alert(`Error al eliminar la nómina: ${error.response?.data?.mensaje || error.message}`);
    }
  }
};

const handleImprimirNomina = async (id) => {
  try {
    await nominaService.imprimirNomina(id);
  } catch (error) {
    console.error('Error al imprimir la nómina:', error);
    if (error.response?.status !== 403) {
      alert(`Error al generar el PDF: ${error.response?.data?.mensaje || error.message}`);
    }
  }
};

onMounted(() => {
  cargarDatos();
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