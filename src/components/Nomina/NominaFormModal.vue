
// frontend/src/componentes/Nomina/NominaFormModal.vue
<template>
  <div v-if="mostrar" class="modal-overlay">
    <div class="modal-content">
      <h2 class="text-2xl font-bold mb-4">{{ modo === 'crear' ? 'Generar Nueva Nómina' : 'Editar Nómina' }}</h2>
      <form @submit.prevent="handleSubmit">
        
        <!-- Empleado, Mes, Anio (se mantienen) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="form-group">
            <label for="id_empleado">Empleado</label>
            <select id="id_empleado" v-model="formularioLocal.id_empleado" required class="w-full px-3 py-2 border rounded-md">
              <option disabled value="">Seleccione un empleado</option>
              <option v-for="empleado in empleados" :key="empleado.id_empleado" :value="empleado.id_empleado">{{ empleado.nombre_completo }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="mes">Mes</label>
            <input type="number" id="mes" v-model.number="formularioLocal.mes" required min="1" max="12" class="w-full px-3 py-2 border rounded-md">
          </div>
          <div class="form-group">
            <label for="anio">Año</label>
            <input type="number" id="anio" v-model.number="formularioLocal.anio" required min="2000" class="w-full px-3 py-2 border rounded-md">
          </div>
        </div>

        <hr class="my-4">
        <p class="text-center font-semibold mb-4">Datos para el Cálculo</p>

        <!-- Nuevos campos de entrada -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-group">
            <label for="salario_base">Salario Base (Q)</label>
            <input type="number" step="0.01" id="salario_base" v-model.number="formularioLocal.salario_base" required class="w-full px-3 py-2 border rounded-md">
          </div>
          <div class="form-group">
            <label for="comisiones">Comisiones (Q)</label>
            <input type="number" step="0.01" id="comisiones" v-model.number="formularioLocal.comisiones" class="w-full px-3 py-2 border rounded-md">
          </div>
          <div class="form-group">
            <label for="horas_extras">Horas Extras (cantidad)</label>
            <input type="number" step="0.01" id="horas_extras" v-model.number="formularioLocal.horas_extras" class="w-full px-3 py-2 border rounded-md">
          </div>
        </div>

        <hr class="my-4">
        <p class="text-center font-semibold mb-4">Deducciones Manuales</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-group">
            <label for="isr">ISR (Q)</label>
            <input type="number" step="0.01" id="isr" v-model.number="formularioLocal.isr" class="w-full px-3 py-2 border rounded-md">
          </div>
          <div class="form-group">
            <label for="otros_descuentos">Otros Descuentos (Q)</label>
            <input type="number" step="0.01" id="otros_descuentos" v-model.number="formularioLocal.otros_descuentos" class="w-full px-3 py-2 border rounded-md">
          </div>
        </div>

        <div v-if="errorFormulario" class="error-message">
          {{ errorFormulario }}
        </div>
        <div class="form-actions">
          <button type="submit" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mr-2">
            {{ modo === 'crear' ? 'Generar Nómina' : 'Actualizar Nómina' }}
          </button>
          <button @click="$emit('cerrar')" type="button" class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg">
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
  modo: { type: String, required: true, validator: (value) => ['crear', 'editar'].includes(value) },
  nominaData: { type: Object, default: () => ({}) },
  empleados: { type: Array, required: true }
});

const emit = defineEmits(['cerrar', 'guardar']);

const formularioLocal = ref({});
const errorFormulario = ref(null);

// Inicializa el formulario cuando el modal se muestra o los datos cambian
watch(() => props.mostrar, (newVal) => {
  if (newVal) {
    // Si es modo 'crear', inicializa con valores por defecto
    if (props.modo === 'crear') {
      const today = new Date();
      formularioLocal.value = {
        id_empleado: null,
        mes: today.getMonth() + 1,
        anio: today.getFullYear(),
        salario_base: 0,
        horas_extras: 0,
        comisiones: 0,
        isr: 0,
        otros_descuentos: 0,
      };
    } else {
      // Si es modo 'editar', carga los datos de la nómina existente
      formularioLocal.value = { ...props.nominaData };
    }
  }
}, { immediate: true });


const handleSubmit = () => {
  // Validación básica
  if (!formularioLocal.value.id_empleado || !formularioLocal.value.mes || !formularioLocal.value.anio || formularioLocal.value.salario_base === null || formularioLocal.value.salario_base < 0) {
    errorFormulario.value = 'Empleado, Mes, Año y Salario Base son campos obligatorios.';
    return;
  }
  
  // Prepara el payload para enviar, asegurando que los opcionales sean 0 si están vacíos
  const payload = {
    ...formularioLocal.value,
    horas_extras: formularioLocal.value.horas_extras || 0,
    comisiones: formularioLocal.value.comisiones || 0,
    isr: formularioLocal.value.isr || 0,
    otros_descuentos: formularioLocal.value.otros_descuentos || 0,
  };

  emit('guardar', payload, props.modo);
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
  max-width: 600px; /* Aumentado para más campos */
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

input, textarea, select {
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

input:focus, textarea:focus, select:focus {
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
