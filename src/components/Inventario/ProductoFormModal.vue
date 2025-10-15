<template>
  <div v-if="mostrar" class="modal-overlay">
    <div class="modal-content">
      <h2 class="text-2xl font-bold mb-4">{{ modo === 'crear' ? 'Crear Nuevo Producto' : 'Editar Producto' }}</h2>
      <form @submit.prevent="handleSubmit">
        
        <div class="form-group">
          <label for="nombre_producto">Nombre del Producto</label>
          <input type="text" id="nombre_producto" v-model="formularioLocal.nombre_producto" required>
        </div>

        <div class="form-group">
          <label for="descripcion">Descripción</label>
          <textarea id="descripcion" v-model="formularioLocal.descripcion" rows="3"></textarea>
        </div>

        <div class="grid-cols-2 gap-4">
          <div class="form-group">
            <label for="id_categoria">Categoría</label>
            <select id="id_categoria" v-model="formularioLocal.id_categoria">
              <option :value="null">Sin categoría</option>
              <option v-for="cat in categorias" :key="cat.id_categoria" :value="cat.id_categoria">
                {{ cat.nombre_categoria }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="precio_unitario">Precio Unitario</label>
            <input type="number" id="precio_unitario" v-model="formularioLocal.precio_unitario" step="0.01" min="0">
          </div>
        </div>

        <div class="form-group">
          <label for="stock_minimo">Stock Mínimo</label>
          <input type="number" id="stock_minimo" v-model="formularioLocal.stock_minimo" min="0">
        </div>

        <div v-if="errorFormulario" class="error-message">
          {{ errorFormulario }}
        </div>

        <div class="form-actions">
          <button type="submit" class="bg-green-600">Guardar</button>
          <button @click="$emit('cerrar')" type="button" class="bg-gray-400">Cancelar</button>
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
  productoData: { type: Object, default: () => ({}) },
  categorias: { type: Array, default: () => [] }
});

const emit = defineEmits(['cerrar', 'guardar']);

const formularioLocal = ref({});
const errorFormulario = ref(null);

watch(() => props.productoData, (newData) => {
  formularioLocal.value = { 
    nombre_producto: ' ',
    descripcion: ' ',
    id_categoria: null,
    precio_unitario: 0,
    stock_minimo: 0,
    ...newData
   };
}, { deep: true, immediate: true });

const handleSubmit = () => {
  if (!formularioLocal.value.nombre_producto) {
    errorFormulario.value = 'El nombre del producto es obligatorio.';
    return;
  }
  emit('guardar', formularioLocal.value, props.modo);
  errorFormulario.value = null;
};
</script>

<style scoped>
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(102, 126, 234, 0.15); display: flex; justify-content: center; align-items: center; z-index: 100;
}
.modal-content { 
  background: white; border-radius: 16px; box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 32px 24px; width: 100%; max-width: 600px; animation: modalIn 0.2s;
}
@keyframes modalIn { from { transform: translateY(40px) scale(0.98); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
h2 { color: #333; font-size: 24px; font-weight: 600; margin-bottom: 24px; text-align: center; }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; font-weight: 600; margin-bottom: 0.5rem; color: #4b5563; }
input, textarea, select { 
  width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 15px; 
  color: #333; background: #f9fafb; transition: border 0.2s; outline: none; 
}
input:focus, textarea:focus, select:focus { border-color: #667eea; background: #fff; }
.grid-cols-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
.form-actions { display: flex; justify-content: flex-end; margin-top: 1.5rem; }
.form-actions button { 
  border: none; border-radius: 8px; padding: 10px 24px; font-size: 15px; font-weight: 600; 
  cursor: pointer; margin-left: 8px; transition: background 0.2s, box-shadow 0.2s; 
}
.form-actions .bg-green-600 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
.form-actions .bg-green-600:hover { background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%); }
.form-actions .bg-gray-400 { background: #e2e8f0; color: #333; }
.form-actions .bg-gray-400:hover { background: #cbd5e1; }
.error-message { 
  background: #fef2f2; color: #ef4444; padding: 0.75rem; border-radius: 0.5rem; 
  margin-bottom: 1rem; border: 1px solid #fca5a5; text-align: center; font-weight: 500; 
}
</style>
