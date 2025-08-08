// carpeta frontend src/vistas/MantenimientoUsuarios.vue
<template>
  <div class="mantenimiento-usuarios-container">
    <!-- Header con título y botón para crear usuario -->
    <div class="mantenimiento-header">
      <h1 class="text-3xl font-bold text-gray-800">Mantenimiento de Usuarios</h1>
      <button 
        @click="abrirFormulario('crear')"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        + Nuevo Usuario
      </button>
    </div>

    <!-- Componente de la tabla de usuarios -->
    <usuarios-tabla 
      :usuarios="usuarios" 
      :cargando="cargando"
      @editar="abrirFormulario('editar', $event)" 
      @eliminar="eliminarUsuario"
    />

    <!-- Componente del formulario en modal -->
    <usuario-form-modal
      :mostrar="mostrarModal"
      :modo="modoFormulario"
      :usuario-data="formulario"
      @cerrar="cerrarModal"
      @guardar="guardarUsuario"
    />

    <hr class="my-10 border-gray-300">

    <!-- Componente de la tabla de auditoría -->
    <auditoria-tabla :auditoria="auditoria" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Rutas de importación corregidas para los componentes que están en otra carpeta
import UsuariosTabla from '../componentes/Mantenimiento/UsuariosTabla.vue';
import UsuarioFormModal from '../componentes/Mantenimiento/UsuarioFormModal.vue';
import AuditoriaTabla from '../componentes/Mantenimiento/AuditoriaTabla.vue';

// Ruta corregida para el servicio
import { 
  obtenerTodosUsuarios, 
  crearUsuario, 
  actualizarUsuario, 
  eliminarUsuario as eliminarUsuarioApi,
  obtenerAuditoria
} from '../servicios/mantenimiento.js';

// Simulamos el store de autenticación (sin tocar tu src/almacen)
const authStore = {
  obtenerUsuario: {
    id_usuario: 1 
  }
};

const usuarios = ref([]);
const auditoria = ref([]);
const cargando = ref(true);
const mostrarModal = ref(false);
const modoFormulario = ref('crear');

const formulario = ref({
  id_usuario: null,
  nombre_usuario: '',
  correo: '',
  contrasena: '',
  id_rol: 2 // Por defecto
});

// Funciones para la gestión de usuarios
const obtenerUsuarios = async () => {
  cargando.value = true;
  try {
    const respuesta = await obtenerTodosUsuarios();
    usuarios.value = respuesta;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  } finally {
    cargando.value = false;
  }
};

const cargarAuditoria = async () => {
  try {
    const logs = await obtenerAuditoria();
    auditoria.value = logs;
  } catch (error) {
    console.error('Error al obtener auditoría:', error);
  }
};

const abrirFormulario = (modo, usuario = null) => {
  modoFormulario.value = modo;
  if (modo === 'crear') {
    formulario.value = {
      id_usuario: null,
      nombre_usuario: '',
      correo: '',
      contrasena: '',
      id_rol: 2
    };
  } else {
    formulario.value = { ...usuario, contrasena: '', id_rol: usuario.id_rol };
  }
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const guardarUsuario = async (datosUsuario, modo) => {
  const usuarioActualId = authStore.obtenerUsuario.id_usuario;
  try {
    if (modo === 'crear') {
      await crearUsuario(datosUsuario, usuarioActualId);
    } else {
      await actualizarUsuario(datosUsuario.id_usuario, datosUsuario, usuarioActualId);
    }
    await obtenerUsuarios();
    await cargarAuditoria();
    cerrarModal();
  } catch (error) {
    window.alert(`Error al guardar el usuario: ${error.message}`);
  }
};

const eliminarUsuario = async (id) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar a este usuario?')) {
    const usuarioActualId = authStore.obtenerUsuario.id_usuario;
    try {
      await eliminarUsuarioApi(id, usuarioActualId);
      await obtenerUsuarios();
      await cargarAuditoria();
    } catch (error) {
      window.alert(`Error al eliminar usuario: ${error.message}`);
    }
  }
};

onMounted(() => {
  obtenerUsuarios();
  cargarAuditoria();
});
</script>

<style scoped>
.mantenimiento-usuarios-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
}

.mantenimiento-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
</style>
