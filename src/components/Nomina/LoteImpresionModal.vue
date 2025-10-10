<template>
  <transition name="modal-fade">
    <div v-if="mostrar" class="modal-overlay" @click.self="$emit('cerrar')">
      <div class="modal-container">
        
        <div class="modal-header">
          <h3>Imprimir Nóminas por Lote</h3>
          <button @click="$emit('cerrar')" class="close-button" title="Cerrar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="modal-body">
          <p class="modal-instructions">
            Selecciona el mes y el año para generar el reporte de nóminas en formato PDF.
          </p>
          
          <div class="form-grid">
            <div class="form-group">
              <label for="mes">Mes</label>
              <select id="mes" v-model.number="mes" required>
                <option v-for="m in 12" :key="m" :value="m">{{ getMonthName(m) }}</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="anio">Año</label>
              <input type="number" id="anio" v-model.number="anio" min="2000" max="2100" required placeholder="Ej: 2025">
            </div>
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </form>

        <div class="modal-footer">
          <button @click="$emit('cerrar')" type="button" class="btn btn-secondary">
            Cancelar
          </button>
          <button @click="handleSubmit" type="submit" class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>
            <span>Imprimir</span>
          </button>
        </div>

      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  mostrar: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['cerrar', 'imprimir']);

const mes = ref(new Date().getMonth() + 1);
const anio = ref(new Date().getFullYear());
const error = ref(null);

const getMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('es-ES', { month: 'long' });
};

const handleSubmit = () => {
  if (mes.value && anio.value) {
    emit('imprimir', { mes: mes.value, anio: anio.value });
  } else {
    error.value = 'Por favor, ingrese un mes y un año válidos.';
  }
};
</script>

<style scoped>
/* General Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

/* Modal Container */
.modal-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
}

/* Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
}
.modal-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}
.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  color: #9ca3af;
  transition: background-color 0.2s, color 0.2s;
}
.close-button:hover {
  background-color: #f3f4f6;
  color: #1f2937;
}
.close-button svg {
  width: 20px;
  height: 20px;
}

/* Body */
.modal-body {
  padding: 24px;
}
.modal-instructions {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 24px;
  text-align: center;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}
.form-group input, .form-group select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.form-group input:focus, .form-group select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

/* Footer */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
.btn-primary:hover {
  opacity: 0.9;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}
.btn-primary svg {
  width: 18px; height: 18px;
}
.btn-secondary {
  background-color: #e5e7eb;
  color: #374151;
}
.btn-secondary:hover {
  background-color: #d1d5db;
}

/* Error Message */
.error-message {
  margin-top: 16px;
  padding: 12px;
  background-color: #fee2e2;
  color: #b91c1c;
  border: 1px solid #fecaca;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

/* Transitions */
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active .modal-container,
.modal-fade-leave-active .modal-container {
  transition: transform 0.3s ease;
}
.modal-fade-enter-from .modal-container,
.modal-fade-leave-to .modal-container {
  transform: translateY(-20px);
}
</style>