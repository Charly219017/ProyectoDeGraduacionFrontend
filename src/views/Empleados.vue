<!-- src/vistas/Empleados.vue -->
<template>
  <div class="empleados-container">
    <div class="empleados-header">
      <h1>Gestión de Empleados</h1>
      <button 
        @click="abrirFormulario('crear')"
        class="nuevo-empleado-btn"
      >
        + Nuevo Empleado
      </button>
    </div>

    <!-- Componente de la tabla de empleados -->
    <EmpleadosList
      :empleados="empleados" 
      :cargando="cargando"
      :puestos="puestos"
      @editar="abrirFormulario('editar', $event)" 
      @eliminar="eliminarEmpleado"
    />

    <!-- Componente del formulario en modal -->
    <EmpleadoFormModal
      :mostrar="mostrarModal"
      :modo="modoFormulario"
      :empleado-data="formulario"
      :puestos="puestos"
      :carreras="carreras"
      @cerrar="cerrarModal"
      @guardar="guardarEmpleado"
    />

    <!-- Modal de confirmación para eliminar -->
    <div 
      v-if="mostrarConfirmacion" 
      class="confirmacion-modal-overlay"
    >
      <div class="confirmacion-modal-content">
        <h3>Confirmar Eliminación</h3>
        <p>¿Estás seguro de que deseas eliminar a este empleado?</p>
        <div class="confirmacion-modal-actions">
          <button 
            @click="mostrarConfirmacion = false"
            class="btn-cancelar"
          >
            Cancelar
          </button>
          <button @click="confirmarEliminar" class="btn-confirmar">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import EmpleadosList from '../components/Empleados/EmpleadosList.vue';
import EmpleadoFormModal from '../components/Empleados/EmpleadoFormModal.vue';

// Importa los nuevos services
import EmpleadoService from '../services/empleados.js';
import PuestoService from '../services/puestos.js';
import CarreraService from '../services/carreras.js';

// Importamos el store de autenticación para la auditoría
import { useAuthStore } from '../store/index.js';

const empleados = ref([]);
const puestos = ref([]);
const carreras = ref([]);
const cargando = ref(true);
const mostrarModal = ref(false);
const modoFormulario = ref('crear');
const formulario = ref({
  id_empleado: null,
  nombre_completo: '',
  dpi: '',
  telefono: '',
  correo_personal: '',
  direccion: '',
  fecha_nacimiento: '',
  genero: '',
  estado_civil: '',
  fecha_ingreso: '',
  id_puesto: '',
});

const mostrarConfirmacion = ref(false);
const empleadoAEliminar = ref(null);

const authStore = useAuthStore();

const obtenerDatosIniciales = async () => {
  cargando.value = true;
  try {
    const [empleadosData, puestosData, carrerasData] = await Promise.all([
      EmpleadoService.obtenerTodosEmpleados(),
      PuestoService.obtenerPuestos(),
      CarreraService.obtenerCarreras()
    ]);
    empleados.value = empleadosData;
    puestos.value = puestosData;
    carreras.value = carrerasData;
  } catch (error) {
    console.error('Error al obtener datos iniciales:', error);
  } finally {
    cargando.value = false;
  }
};

const abrirFormulario = (modo, empleado = null) => {
  modoFormulario.value = modo;
  if (modo === 'crear') {
    formulario.value = {
      id_empleado: null,
      nombre_completo: '',
      dpi: '',
      telefono: '',
      correo_personal: '',
      direccion: '',
      fecha_nacimiento: '',
      genero: '',
      estado_civil: '',
      fecha_ingreso: '',
      id_puesto: '',
    };
  } else {
    formulario.value = { ...empleado };
  }
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const guardarEmpleado = async (datosEmpleado, modo) => {
  const usuarioIdAuditor = authStore.usuario?.id_usuario;
  try {
    if (modo === 'crear') {
      // **AUDITORÍA**: Pasamos el ID del usuario auditor al servicio
      await EmpleadoService.crearEmpleado(datosEmpleado, usuarioIdAuditor);
    } else {
      // **AUDITORÍA**: Pasamos el ID del usuario auditor al servicio
      await EmpleadoService.actualizarEmpleado(datosEmpleado.id_empleado, datosEmpleado, usuarioIdAuditor);
    }
    await obtenerDatosIniciales();
    cerrarModal();
  } catch (error) {
    console.error('Error al guardar el empleado:', error);
  }
};

const eliminarEmpleado = async (id) => {
  empleadoAEliminar.value = id;
  mostrarConfirmacion.value = true;
};

const confirmarEliminar = async () => {
  if (!empleadoAEliminar.value) return;
  const usuarioIdAuditor = authStore.usuario?.id_usuario;
  try {
    // **AUDITORÍA**: Pasamos el ID del usuario auditor al servicio
    await EmpleadoService.eliminarEmpleado(empleadoAEliminar.value, usuarioIdAuditor);
    await obtenerDatosIniciales();
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
  } finally {
    mostrarConfirmacion.value = false;
    empleadoAEliminar.value = null;
  }
};

onMounted(() => {
  obtenerDatosIniciales();
});
</script>

<style scoped>
/* Estilos generales del contenedor */
.empleados-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
  font-family: 'Inter', sans-serif;
  background: #f6f8fc;
  min-height: 100vh;
}

/* Estilos del encabezado */
.empleados-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 24px 32px;
  flex-wrap: wrap;
}

.empleados-header h1 {
  color: #333;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.nuevo-empleado-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 28px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.07);
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 16px;
  width: 100%;
}

.nuevo-empleado-btn:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.15);
  transform: translateY(-1px);
}

/* Estilos para el modal de confirmación */
.confirmacion-modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 16px;
}

.confirmacion-modal-content {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 450px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transform: scale(0.95);
  animation: modal-pop 0.3s ease-out forwards;
}

.confirmacion-modal-content h3 {
  font-size: 22px;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
}

.confirmacion-modal-content p {
  color: #555;
  margin-bottom: 24px;
  line-height: 1.6;
}

.confirmacion-modal-actions {
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: center;
}

.confirmacion-modal-actions button {
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancelar {
  background-color: #e2e8f0;
  color: #4a5568;
}
.btn-cancelar:hover { background-color: #cbd5e0; }

.btn-confirmar {
  background-color: #e53e3e;
  color: white;
}
.btn-confirmar:hover { background-color: #c53030; }

@keyframes modal-pop {
  to { transform: scale(1); }
}

/* Media queries para responsividad */
@media (min-width: 640px) {
  .nuevo-empleado-btn {
    margin-top: 0;
    width: auto;
  }
}

@media (max-width: 900px) {
  .empleados-header {
    flex-direction: column;
    gap: 16px;
    padding: 20px 12px;
    text-align: center;
  }
  .empleados-header h1 {
    font-size: 22px;
  }
  .empleados-container {
    padding: 16px 4px;
  }
}
</style>
