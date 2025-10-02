// frontend/src/componentes/Contratos/ContratoFormModal.vue
<template>
  <div v-if="mostrar" class="modal-overlay">
    <div class="modal-content">
      <h2 class="text-2xl font-bold mb-4">{{ modo === 'crear' ? 'Crear Nuevo Contrato' : 'Editar Contrato' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="id_empleado">Empleado</label>
          <select 
            id="id_empleado" 
            v-model="formularioLocal.id_empleado" 
            required
            class="w-full px-3 py-2 border rounded-md"
          >
            <option v-for="empleado in empleados" :key="empleado.id_empleado" :value="empleado.id_empleado">{{ empleado.nombre_completo }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="tipo_contrato">Tipo de Contrato</label>
          <input 
            type="text" 
            id="tipo_contrato" 
            v-model="formularioLocal.tipo_contrato" 
            required 
            class="w-full px-3 py-2 border rounded-md"
          >
        </div>
        <div class="form-group">
          <label for="fecha_inicio">Fecha de Inicio</label>
          <input 
            type="date" 
            id="fecha_inicio" 
            v-model="formularioLocal.fecha_inicio" 
            required 
            class="w-full px-3 py-2 border rounded-md"
          >
        </div>
        <div class="form-group">
          <label for="fecha_fin">Fecha de Fin</label>
          <input 
            type="date" 
            id="fecha_fin" 
            v-model="formularioLocal.fecha_fin" 
            class="w-full px-3 py-2 border rounded-md"
          >
        </div>
        <div class="form-group">
          <label for="observaciones">Observaciones</label>
          <textarea 
            id="observaciones" 
            v-model="formularioLocal.observaciones" 
            rows="3"
            class="w-full px-3 py-2 border rounded-md"
          ></textarea>
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
  contratoData: {
    type: Object,
    default: () => ({})
  },
  empleados: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['cerrar', 'guardar']);

const formularioLocal = ref({});
const errorFormulario = ref(null);

watch(() => props.contratoData, (newData) => {
  formularioLocal.value = { ...newData };
  if (formularioLocal.value.fecha_inicio) {
    formularioLocal.value.fecha_inicio = formularioLocal.value.fecha_inicio.split('T')[0];
  }
  if (formularioLocal.value.fecha_fin) {
    formularioLocal.value.fecha_fin = formularioLocal.value.fecha_fin.split('T')[0];
  }
}, { deep: true, immediate: true });

const handleSubmit = () => {
  if (!formularioLocal.value.id_empleado || !formularioLocal.value.tipo_contrato || !formularioLocal.value.fecha_inicio) {
    errorFormulario.value = 'Por favor, completa todos los campos obligatorios.';
    return;
  }
  emit('guardar', formularioLocal.value, props.modo);
  errorFormulario.value = null;
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

input, select, textarea {
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

input:focus, select:focus, textarea:focus {
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