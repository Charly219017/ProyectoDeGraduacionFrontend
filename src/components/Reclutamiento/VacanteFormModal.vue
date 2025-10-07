// frontend/src/componentes/Reclutamiento/VacanteFormModal.vue
<template>
  <div v-if="mostrar" class="modal-overlay">
    <div class="modal-content">
      <h2 class="text-2xl font-bold mb-4">{{ modo === 'crear' ? 'Crear Nueva Vacante' : 'Editar Vacante' }}</h2>
      <form @submit.prevent="handleSubmit">

        <!-- Título -->
        <div class="form-group">
          <label for="titulo">Título de la Vacante</label>
          <input 
            type="text" 
            id="titulo" 
            v-model="formularioLocal.titulo" 
            @blur="validate('titulo')"
            :class="{ 'input-error': errors.titulo }"
            class="w-full px-3 py-2 border rounded-md"
            minlength="2"
            maxlength="100"
          >
          <p v-if="errors.titulo" class="error-text">{{ errors.titulo }}</p>
        </div>

        <!-- Descripción -->
        <div class="form-group">
          <label for="descripcion">Descripción</label>
          <textarea 
            id="descripcion" 
            v-model="formularioLocal.descripcion" 
            rows="4"
            class="w-full px-3 py-2 border rounded-md"
          ></textarea>
        </div>

        <!-- Puesto -->
        <div class="form-group">
          <label for="id_puesto">Puesto</label>
          <select 
            id="id_puesto" 
            v-model="formularioLocal.id_puesto" 
            @blur="validate('id_puesto')"
            :class="{ 'input-error': errors.id_puesto }"
            class="w-full px-3 py-2 border rounded-md"
          >
            <option :value="null">Seleccione un puesto</option>
            <option v-for="puesto in puestos" :key="puesto.id_puesto" :value="puesto.id_puesto">{{ puesto.nombre_puesto }}</option>
          </select>
          <p v-if="errors.id_puesto" class="error-text">{{ errors.id_puesto }}</p>
        </div>

        <!-- Fecha de Publicación -->
        <div class="form-group">
          <label for="fecha_publicacion">Fecha de Publicación</label>
          <input 
            type="date" 
            id="fecha_publicacion" 
            v-model="formularioLocal.fecha_publicacion" 
            class="w-full px-3 py-2 border rounded-md"
          >
        </div>

        <!-- Estado -->
        <div class="form-group">
          <label for="estado">Estado</label>
          <select 
            id="estado" 
            v-model="formularioLocal.estado" 
            class="w-full px-3 py-2 border rounded-md"
          >
            <option value="Abierta">Abierta</option>
            <option value="Cerrada">Cerrada</option>
            <option value="En Revisión">En Revisión</option>
            <option value="Cancelada">Cancelada</option>
          </select>
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
  vacanteData: { type: Object, default: () => ({}) },
  puestos: { type: Array, required: true }
});

const emit = defineEmits(['cerrar', 'guardar']);

const formularioLocal = ref({});
const errors = ref({});

watch(() => props.vacanteData, (newData) => {
  formularioLocal.value = { ...newData };
  if (formularioLocal.value.fecha_publicacion) {
    formularioLocal.value.fecha_publicacion = formularioLocal.value.fecha_publicacion.split('T')[0];
  }
  errors.value = {};
}, { deep: true, immediate: true });

const validate = (field) => {
  const value = formularioLocal.value[field];
  errors.value[field] = null;

  switch (field) {
    case 'titulo':
      if (!value) {
        errors.value[field] = 'El título es obligatorio.';
      } else if (value.length < 2 || value.length > 100) {
        errors.value[field] = 'El título debe tener entre 2 y 100 caracteres.';
      }
      break;
    case 'id_puesto':
      if (value && value <= 0) {
        errors.value[field] = 'Debe seleccionar un puesto válido.';
      }
      break;
  }
  return !errors.value[field];
};

const validateAll = () => {
  const fields = ['titulo', 'id_puesto'];
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