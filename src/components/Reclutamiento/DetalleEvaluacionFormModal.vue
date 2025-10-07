// frontend/src/componentes/Reclutamiento/DetalleEvaluacionFormModal.vue
<template>
  <div v-if="mostrar" class="modal-overlay">
    <div class="modal-content">
      <h2 class="text-2xl font-bold mb-4">{{ modo === 'crear' ? 'Crear Nuevo Detalle de Evaluación' : 'Editar Detalle de Evaluación' }}</h2>
      <form @submit.prevent="handleSubmit">

        <!-- Evaluación -->
        <div class="form-group">
          <label for="id_evaluacion">Evaluación</label>
          <select 
            id="id_evaluacion" 
            v-model="formularioLocal.id_evaluacion" 
            @blur="validate('id_evaluacion')"
            :class="{ 'input-error': errors.id_evaluacion }"
            class="w-full px-3 py-2 border rounded-md"
          >
            <option :value="null">Seleccione una evaluación</option>
            <option v-for="evaluacion in evaluaciones" :key="evaluacion.id_evaluacion" :value="evaluacion.id_evaluacion">
              Evaluación #{{ evaluacion.id_evaluacion }} (Empleado: {{ getEmpleadoNombre(evaluacion.id_empleado) }})
            </option>
          </select>
          <p v-if="errors.id_evaluacion" class="error-text">{{ errors.id_evaluacion }}</p>
        </div>

        <!-- Criterio -->
        <div class="form-group">
          <label for="id_criterio">Criterio</label>
          <select 
            id="id_criterio" 
            v-model="formularioLocal.id_criterio" 
            @blur="validate('id_criterio')"
            :class="{ 'input-error': errors.id_criterio }"
            class="w-full px-3 py-2 border rounded-md"
          >
            <option :value="null">Seleccione un criterio</option>
            <option v-for="criterio in criterios" :key="criterio.id_criterio" :value="criterio.id_criterio">{{ criterio.nombre_criterio }}</option>
          </select>
          <p v-if="errors.id_criterio" class="error-text">{{ errors.id_criterio }}</p>
        </div>

        <!-- Puntuación -->
        <div class="form-group">
          <label for="puntuacion">Puntuación (0-100)</label>
          <input 
            type="number"
            step="1"
            id="puntuacion" 
            v-model="formularioLocal.puntuacion" 
            @blur="validate('puntuacion')"
            :class="{ 'input-error': errors.puntuacion }"
            class="w-full px-3 py-2 border rounded-md"
          >
          <p v-if="errors.puntuacion" class="error-text">{{ errors.puntuacion }}</p>
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
  detalleEvaluacionData: { type: Object, default: () => ({}) },
  evaluaciones: { type: Array, required: true },
  criterios: { type: Array, required: true },
  empleados: { type: Array, default: () => [] }
});

const emit = defineEmits(['cerrar', 'guardar']);

const formularioLocal = ref({});
const errors = ref({});

watch(() => props.detalleEvaluacionData, (newData) => {
  formularioLocal.value = { ...newData };
  errors.value = {};
}, { deep: true, immediate: true });

const getEmpleadoNombre = (id_empleado) => {
  const empleado = props.empleados.find(e => e.id_empleado === id_empleado);
  return empleado ? empleado.nombre_completo : 'Desconocido';
};

const validate = (field) => {
  const value = formularioLocal.value[field];
  errors.value[field] = null;

  switch (field) {
    case 'id_evaluacion':
      if (props.modo === 'crear' && (!value || value <= 0)) {
        errors.value[field] = 'Debe seleccionar una evaluación.';
      }
      break;
    case 'id_criterio':
      if (props.modo === 'crear' && (!value || value <= 0)) {
        errors.value[field] = 'Debe seleccionar un criterio.';
      }
      break;
    case 'puntuacion':
      if (value !== null && value !== '' && (isNaN(parseFloat(value)) || value < 0 || value > 100)) {
        errors.value[field] = 'La puntuación debe ser un número entre 0 y 100.';
      }
      break;
  }
  return !errors.value[field];
};

const validateAll = () => {
  const fields = ['id_evaluacion', 'id_criterio', 'puntuacion'];
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
input, select { width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 15px; color: #333; background: #f9fafb; transition: border 0.2s; outline: none; }
input:focus, select:focus { border-color: #667eea; background: #fff; }

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