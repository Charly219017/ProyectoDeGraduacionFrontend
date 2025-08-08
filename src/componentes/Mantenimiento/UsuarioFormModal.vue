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
            <option :value="2">Usuario</option>
          </select>
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
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #4b5563;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.error-message {
  background-color: #fef2f2;
  color: #ef4444;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #fca5a5;
  text-align: center;
}
</style>
