// carpeta frontend src/componentes/UsuarioFormModal.vue
<template>
  <div v-if="mostrar" class="modal-overlay">
    <div class="modal-content">
      <h2 class="text-2xl font-bold mb-4">{{ modo === 'crear' ? 'Crear Nuevo Usuario' : 'Editar Usuario' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="nombre_usuario">Nombre de Usuario</label>
          <input 
            type="text" 
            id="nombre_usuario" 
            v-model="formularioLocal.nombre_usuario" 
            required 
            class="w-full px-3 py-2 border rounded-md"
          >
        </div>
        <div class="form-group">
          <label for="correo">Email</label>
          <input 
            type="email" 
            id="correo" 
            v-model="formularioLocal.correo" 
            required 
            class="w-full px-3 py-2 border rounded-md"
          >
        </div>
        <div class="form-group">
          <label for="contrasena">Contraseña</label>
          <input 
            type="password" 
            id="contrasena" 
            v-model="formularioLocal.contrasena" 
            :required="modo === 'crear'"
            class="w-full px-3 py-2 border rounded-md"
          >
          <p v-if="modo === 'editar'" class="text-sm text-gray-500 mt-1">
            Deja en blanco para no cambiar la contraseña.
          </p>
        </div>
        <div class="form-group">
          <label for="id_rol">Rol</label>
          <select 
            id="id_rol" 
            v-model="formularioLocal.id_rol" 
            required
            class="w-full px-3 py-2 border rounded-md"
          >
            <option :value="1">Administrador</option>
            <option :value="2">Supervisor</option>
            <option :value="3">Digitador</option>
            <option :value="4">Empleado</option>
            <option :value="7">Externo</option>
          </select>
        </div>
        <div class="form-group">
          <label for="estadousuario" class="flex items-center">
            <input 
              type="checkbox" 
              id="estadousuario" 
              v-model="formularioLocal.estadousuario" 
              class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            >
            <span class="ml-2 text-gray-700">Usuario Activo</span>
          </label>
        </div>
        <div v-if="errorFormulario" class="error-message">
          {{ errorFormulario }}
        </div>
        <div class="form-actions">
          <button 
            type="submit" 
            class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
          >
            Guardar
          </button>
          <button 
            @click="$emit('cerrar')" 
            type="button" 
            class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  mostrar: {
    type: Boolean,
    required: true,
  },
  modo: {
    type: String,
    required: true,
  },
  usuarioData: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['cerrar', 'guardar']);

const formularioLocal = ref({});
const errorFormulario = ref(null);

watch(() => props.usuarioData, (newData) => {
  formularioLocal.value = { ...newData };
}, { deep: true, immediate: true });

const handleSubmit = () => {
  if (!formularioLocal.value.nombre_usuario || !formularioLocal.value.correo || !formularioLocal.value.id_rol || (props.modo === 'crear' && !formularioLocal.value.contrasena)) {
    errorFormulario.value = 'Por favor, completa todos los campos obligatorios.';
    return;
  }
  emit('guardar', formularioLocal.value, props.modo);
  errorFormulario.value = null; // Limpiamos el error
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(102, 126, 234, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 32px 24px;
  width: 100%;
  max-width: 500px;
  animation: modalIn 0.2s;
  max-height: 90vh;
  overflow-y: auto;
}

@keyframes modalIn {
  from { transform: translateY(40px) scale(0.98); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
}

h2 {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #4b5563;
}

input,
select {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  color: #333;
  background: #f9fafb;
  transition: border 0.2s;
  outline: none;
}

input:focus,
select:focus {
  border-color: #667eea;
  background: #fff;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.form-actions button {
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 8px;
  transition: background 0.2s, box-shadow 0.2s;
}

.form-actions .bg-green-600 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.form-actions .bg-green-600:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
}

.form-actions .bg-gray-400 {
  background: #e2e8f0;
  color: #333;
}

.form-actions .bg-gray-400:hover {
  background: #cbd5e1;
}

.error-message {
  background: #fef2f2;
  color: #ef4444;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #fca5a5;
  text-align: center;
  font-weight: 500;
}
</style>
