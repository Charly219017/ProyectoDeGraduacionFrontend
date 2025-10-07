// frontend/src/componentes/Reclutamiento/CandidatoFormModal.vue
<template>
  <div v-if="mostrar" class="modal-overlay">
    <div class="modal-content">
      <h2 class="text-2xl font-bold mb-4">{{ modo === 'crear' ? 'Crear Nuevo Candidato' : 'Editar Candidato' }}</h2>
      <form @submit.prevent="handleSubmit">
        
        <!-- Nombre Completo -->
        <div class="form-group">
          <label for="nombre_completo">Nombre Completo</label>
          <input 
            type="text" 
            id="nombre_completo" 
            v-model="formularioLocal.nombre_completo" 
            @blur="validate('nombre_completo')"
            :class="{ 'input-error': errors.nombre_completo }"
            class="w-full px-3 py-2 border rounded-md"
            maxlength="100"
          >
          <p v-if="errors.nombre_completo" class="error-text">{{ errors.nombre_completo }}</p>
        </div>

        <!-- Correo Electrónico -->
        <div class="form-group">
          <label for="correo">Correo Electrónico</label>
          <input 
            type="email" 
            id="correo" 
            v-model="formularioLocal.correo" 
            @blur="validate('correo')"
            :class="{ 'input-error': errors.correo }"
            class="w-full px-3 py-2 border rounded-md"
            maxlength="100"
          >
          <p v-if="errors.correo" class="error-text">{{ errors.correo }}</p>
        </div>

        <!-- Teléfono -->
        <div class="form-group">
          <label for="telefono">Teléfono</label>
          <input 
            type="tel" 
            id="telefono" 
            v-model="formularioLocal.telefono"
            @blur="validate('telefono')"
            :class="{ 'input-error': errors.telefono }"
            class="w-full px-3 py-2 border rounded-md"
            maxlength="20"
          >
          <p v-if="errors.telefono" class="error-text">{{ errors.telefono }}</p>
        </div>

        <!-- URL del CV -->
        <div class="form-group">
          <label for="cv_url">URL del CV (Opcional)</label>
          <input 
            type="url" 
            id="cv_url" 
            v-model="formularioLocal.cv_url"
            @blur="validate('cv_url')"
            :class="{ 'input-error': errors.cv_url }"
            class="w-full px-3 py-2 border rounded-md"
          >
          <p v-if="errors.cv_url" class="error-text">{{ errors.cv_url }}</p>
        </div>

        <!-- Fecha de Aplicación -->
        <div class="form-group">
          <label for="fecha_aplicacion">Fecha de Aplicación</label>
          <input 
            type="date" 
            id="fecha_aplicacion" 
            v-model="formularioLocal.fecha_aplicacion"
            :class="{ 'input-error': errors.fecha_aplicacion }"
            class="w-full px-3 py-2 border rounded-md"
          >
           <p v-if="errors.fecha_aplicacion" class="error-text">{{ errors.fecha_aplicacion }}</p>
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
import { ref, watch } from 'vue';

const props = defineProps({
  mostrar: { type: Boolean, required: true },
  modo: { type: String, required: true },
  candidatoData: { type: Object, default: () => ({}) }
});

const emit = defineEmits(['cerrar', 'guardar']);

const formularioLocal = ref({});
const errors = ref({});

watch(() => props.candidatoData, (newData) => {
  formularioLocal.value = { ...newData };
  errors.value = {}; // Limpiar errores al cambiar de candidato
}, { deep: true, immediate: true });

const validate = (field) => {
  const value = formularioLocal.value[field];
  errors.value[field] = null;

  switch (field) {
    case 'nombre_completo':
      if (props.modo === 'crear' && !value) {
        errors.value[field] = 'El nombre es obligatorio.';
      } else if (value && (value.length < 2 || value.length > 100)) {
        errors.value[field] = 'El nombre debe tener entre 2 y 100 caracteres.';
      }
      break;
    case 'correo':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (props.modo === 'crear' && !value) {
        errors.value[field] = 'El correo es obligatorio.';
      } else if (value && !emailRegex.test(value)) {
        errors.value[field] = 'Por favor, introduce un correo válido.';
      } else if (value && value.length > 100) {
        errors.value[field] = 'El correo no puede exceder los 100 caracteres.';
      }
      break;
    case 'telefono':
      if (value && value.length > 20) {
        errors.value[field] = 'El teléfono no puede exceder los 20 caracteres.';
      }
      break;
    case 'cv_url':
      try {
        if (value) new URL(value);
      } catch (_) {
        errors.value[field] = 'Por favor, introduce una URL válida.';
      }
      break;
    case 'fecha_aplicacion':
        if(!value){
            errors.value[field] = 'La fecha de aplicación es obligatoria';
        }
  }
  return !errors.value[field];
};

const validateAll = () => {
  const fields = ['nombre_completo', 'correo', 'telefono', 'cv_url', 'fecha_aplicacion'];
  fields.forEach(field => validate(field));
  return Object.values(errors.value).every(error => !error);
};

const handleSubmit = () => {
  if (validateAll()) {
    emit('guardar', formularioLocal.value, props.modo);
  }
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

input {
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

input:focus {
  border-color: #667eea;
  background: #fff;
}

.input-error {
  border-color: #ef4444;
}

.input-error:focus {
  border-color: #ef4444;
}

.error-text {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
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
</style>
