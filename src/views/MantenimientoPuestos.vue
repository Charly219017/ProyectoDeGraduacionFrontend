
// frontend/src/vistas/MantenimientoPuestos.vue
<template>
  <div class="mantenimiento-puestos-container">
    <div class="mantenimiento-header">
      <h1 class="text-3xl font-bold text-gray-800">Mantenimiento de Puestos</h1>
      <button 
        @click="abrirFormulario('crear')"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        + Nuevo Puesto
      </button>
    </div>

    <puestos-tabla 
      :puestos="puestos" 
      :cargando="cargando"
      @editar="abrirFormulario('editar', $event)" 
      @eliminar="eliminarPuesto"
    />

    <puesto-form-modal
      :mostrar="mostrarModal"
      :modo="modoFormulario"
      :puesto-data="formulario"
      @cerrar="cerrarModal"
      @guardar="guardarPuesto"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PuestosTabla from '../components/Mantenimiento/PuestosTabla.vue';
import PuestoFormModal from '../components/Mantenimiento/PuestoFormModal.vue';
import PuestoService from '../services/puestos.js';
import { useAuthStore } from '../store/index.js';

const puestos = ref([]);
const cargando = ref(true);
const mostrarModal = ref(false);
const modoFormulario = ref('crear');

const authStore = useAuthStore();
const formulario = ref({
  id_puesto: null,
  nombre_puesto: '',
  salario_base: 0
});

const obtenerDatos = async () => {
  cargando.value = true;
  try {
    const respuesta = await PuestoService.obtenerPuestos();
    puestos.value = respuesta;
  } catch (error) {
    console.error('Error al obtener puestos:', error);
  } finally {
    cargando.value = false;
  }
};

const abrirFormulario = (modo, puesto = null) => {
  modoFormulario.value = modo;
  if (modo === 'crear') {
    formulario.value = {
      id_puesto: null,
      nombre_puesto: '',
      salario_base: 0
    };
  } else {
    formulario.value = { ...puesto };
  }
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const guardarPuesto = async (datosPuesto, modo) => {
  const usuarioActualId = authStore.usuario?.id_usuario;
  try {
    if (modo === 'crear') {
      await PuestoService.crearPuesto(datosPuesto, usuarioActualId);
    } else {
      await PuestoService.actualizarPuesto(datosPuesto.id_puesto, datosPuesto, usuarioActualId);
    }
    await obtenerDatos();
    cerrarModal();
  } catch (error) {
    window.alert(`Error al guardar el puesto: ${error.message}`);
  }
};

const eliminarPuesto = async (id) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar este puesto?')) {
    const usuarioActualId = authStore.usuario?.id_usuario;
    try {
      await PuestoService.eliminarPuesto(id, usuarioActualId);
      await obtenerDatos();
    } catch (error) {
      window.alert(`Error al eliminar el puesto: ${error.message}`);
    }
  }
};

onMounted(() => {
  obtenerDatos();
});
</script>

<style scoped>
.mantenimiento-puestos-container {
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
