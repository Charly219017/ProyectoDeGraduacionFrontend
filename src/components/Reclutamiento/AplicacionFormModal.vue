// frontend/src/componentes/Reclutamiento/AplicacionFormModal.vue
<template>
  <div v-if="mostrar" class="modal-overlay">
    <div class="modal-content">
      <h2 class="text-2xl font-bold mb-4">{{ modo === 'crear' ? 'Crear Nueva Aplicación' : 'Editar Aplicación' }}</h2>
      <form @submit.prevent="handleSubmit">

        <!-- Vacante -->
        <div class="form-group">
          <label for="id_vacante">Vacante</label>
          <select 
            id="id_vacante" 
            v-model="formularioLocal.id_vacante" 
            @blur="validate('id_vacante')"
            :class="{ 'input-error': errors.id_vacante }"
            class="w-full px-3 py-2 border rounded-md"
          >
            <option :value="null">Seleccione una vacante</option>
            <option v-for="vacante in vacantes" :key="vacante.id_vacante" :value="vacante.id_vacante">{{ vacante.titulo }}</option>
          </select>
          <p v-if="errors.id_vacante" class="error-text">{{ errors.id_vacante }}</p>
        </div>

        <!-- Candidato -->
        <div class="form-group">
          <label for="id_candidato">Candidato</label>
          <select 
            id="id_candidato" 
            v-model="formularioLocal.id_candidato" 
            @blur="validate('id_candidato')"
            :class="{ 'input-error': errors.id_candidato }"
            class="w-full px-3 py-2 border rounded-md"
          >
            <option :value="null">Seleccione un candidato</option>
            <option v-for="candidato in candidatos" :key="candidato.id_candidato" :value="candidato.id_candidato">{{ candidato.nombre_completo }}</option>
          </select>
          <p v-if="errors.id_candidato" class="error-text">{{ errors.id_candidato }}</p>
        </div>

        <!-- Estado de la Aplicación -->
        <div class="form-group">
          <label for="estado_aplicacion">Estado</label>
          <select 
            id="estado_aplicacion" 
            v-model="formularioLocal.estado_aplicacion" 
            class="w-full px-3 py-2 border rounded-md"
          >
            <option value="En revisión">En revisión</option>
            <option value="Entrevista">Entrevista</option>
            <option value="Rechazado">Rechazado</option>
            <option value="Contratado">Contratado</option>
          </select>
        </div>

        <!-- Observaciones -->
        <div class="form-group">
          <label for="observaciones">Observaciones</label>
          <textarea 
            id="observaciones" 
            v-model="formularioLocal.observaciones" 
            rows="3"
            class="w-full px-3 py-2 border rounded-md"
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mr-2">Guardar</button>
          <button @click="$emit('cerrar')" type="button" class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg">Cancelar</button>
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
  aplicacionData: { type: Object, default: () => ({}) },
  vacantes: { type: Array, required: true },
  candidatos: { type: Array, required: true }
});

const emit = defineEmits(['cerrar', 'guardar']);

const formularioLocal = ref({});
const errors = ref({});

watch(() => props.aplicacionData, (newData) => {
  formularioLocal.value = { ...newData };
  errors.value = {};
}, { deep: true, immediate: true });

const validate = (field) => {
  const value = formularioLocal.value[field];
  errors.value[field] = null;

  switch (field) {
    case 'id_vacante':
      if (props.modo === 'crear' && (!value || value <= 0)) {
        errors.value[field] = 'Debe seleccionar una vacante.';
      }
      break;
    case 'id_candidato':
      if (props.modo === 'crear' && (!value || value <= 0)) {
        errors.value[field] = 'Debe seleccionar un candidato.';
      }
      break;
  }
  return !errors.value[field];
};

const validateAll = () => {
  const fields = ['id_vacante', 'id_candidato'];
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
/* Estilos del modal y formulario */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(102, 126, 234, 0.15); display: flex; justify-content: center; align-items: center; z-index: 100; }
.modal-content { background: white; border-radius: 16px; box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06); padding: 32px 24px; width: 100%; max-width: 500px; animation: modalIn 0.2s; max-height: 90vh; overflow-y: auto; }
@keyframes modalIn { from { transform: translateY(40px) scale(0.98); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
h2 { color: #333; font-size: 24px; font-weight: 600; margin-bottom: 24px; text-align: center; }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; font-weight: 600; margin-bottom: 0.5rem; color: #4b5563; }
input, select, textarea { width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 15px; color: #333; background: #f9fafb; transition: border 0.2s; outline: none; }
input:focus, select:focus, textarea:focus { border-color: #667eea; background: #fff; }

/* Estilos de validación */
.input-error { border-color: #ef4444; }
.input-error:focus { border-color: #ef4444; }
.error-text { color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem; }

/* Estilos de botones */
.form-actions { display: flex; justify-content: flex-end; margin-top: 1.5rem; }
.form-actions button { border: none; border-radius: 8px; padding: 10px 24px; font-size: 15px; font-weight: 600; cursor: pointer; margin-left: 8px; transition: background 0.2s, box-shadow 0.2s; }
.form-actions .bg-green-600 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
.form-actions .bg-green-600:hover { background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%); }
.form-actions .bg-gray-400 { background: #e2e8f0; color: #333; }
.form-actions .bg-gray-400:hover { background: #cbd5e1; }
</style>
