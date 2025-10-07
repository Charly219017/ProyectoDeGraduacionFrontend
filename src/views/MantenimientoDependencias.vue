
// frontend/src/vistas/MantenimientoDependencias.vue
<template>
  <div class="mantenimiento-dependencias-container">
    <div class="mantenimiento-header">
      <h1 class="text-3xl font-bold text-gray-800">Mantenimiento de Dependencias</h1>
      <button 
        @click="abrirFormulario('crear')"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        + Nueva Dependencia
      </button>
    </div>

    <dependencias-tabla 
      :dependencias="dependencias" 
      :cargando="cargando"
      @editar="abrirFormulario('editar', $event)" 
      @eliminar="eliminarDependencia"
    />

    <dependencia-form-modal
      :mostrar="mostrarModal"
      :modo="modoFormulario"
      :dependencia-data="formulario"
      :puestos="puestos"
      @cerrar="cerrarModal"
      @guardar="guardarDependencia"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DependenciasTabla from '../components/Mantenimiento/DependenciasTabla.vue';
import DependenciaFormModal from '../components/Mantenimiento/DependenciaFormModal.vue';
import DependenciaService from '../services/dependencias.js';
import PuestoService from '../services/puestos.js';

const dependencias = ref([]);
const puestos = ref([]);
const cargando = ref(true);
const mostrarModal = ref(false);
const modoFormulario = ref('crear');

const formulario = ref({
  id_dependencia: null,
  id_puesto_superior: '',
  id_puesto_subordinado: ''
});

const obtenerDatos = async () => {
  cargando.value = true;
  try {
    const [puestosData, dependenciasData] = await Promise.all([
      PuestoService.obtenerPuestos(),
      DependenciaService.obtenerTodasDependencias()
    ]);
    
    puestos.value = puestosData;

    const dependenciasEnriquecidas = dependenciasData.map(dep => {
      const puestoSuperior = puestosData.find(p => p.id_puesto === dep.id_puesto_superior);
      const puestoSubordinado = puestosData.find(p => p.id_puesto === dep.id_puesto_subordinado);
      return {
        ...dep,
        nombre_puesto_superior: puestoSuperior ? puestoSuperior.nombre_puesto : 'No definido',
        nombre_puesto_subordinado: puestoSubordinado ? puestoSubordinado.nombre_puesto : 'No definido',
      };
    });

    dependencias.value = dependenciasEnriquecidas;

  } catch (error) {
    console.error('Error al obtener datos:', error);
  } finally {
    cargando.value = false;
  }
};

const abrirFormulario = (modo, dependencia = null) => {
  modoFormulario.value = modo;
  if (modo === 'crear') {
    formulario.value = {
      id_dependencia: null,
      id_puesto_superior: '',
      id_puesto_subordinado: ''
    };
  } else {
    formulario.value = { ...dependencia };
  }
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const guardarDependencia = async (datosDependencia, modo) => {
  try {
    if (modo === 'crear') {
      await DependenciaService.crearDependencia(datosDependencia);
    } else {
      await DependenciaService.actualizarDependencia(datosDependencia.id_dependencia, datosDependencia);
    }
    await obtenerDatos();
    cerrarModal();
  } catch (error) {
    window.alert(`Error al guardar la dependencia: ${error.message}`);
  }
};

const eliminarDependencia = async (id) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar esta dependencia?')) {
    try {
      await DependenciaService.eliminarDependencia(id);
      await obtenerDatos();
    } catch (error) {
      window.alert(`Error al eliminar la dependencia: ${error.message}`);
    }
  }
};

onMounted(() => {
  obtenerDatos();
});
</script>

<style scoped>
.mantenimiento-dependencias-container {
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
