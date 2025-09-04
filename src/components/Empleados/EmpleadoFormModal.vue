<!-- src/componentes/Empleados/EmpleadoFormModal.vue -->
<template>
  <Transition name="fade">
    <div 
      v-if="mostrar" 
      class="modal-overlay"
      @click="cerrar"
    >
      <div 
        class="modal-content"
        @click.stop
      >
        <h3 class="modal-title">
          {{ modo === 'crear' ? 'Crear Nuevo Empleado' : 'Editar Empleado' }}
        </h3>

        <form @submit.prevent="manejarGuardar" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="nombre_completo" class="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
              <input
                type="text"
                id="nombre_completo"
                v-model="formularioLocal.nombre_completo"
                class="form-input"
                required
              />
            </div>

            <div>
              <label for="correo" class="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
              <input 
                type="email"
                id="correo"
                v-model="formularioLocal.correo"
                class="form-input"
                required
              />
            </div>

            <div>
              <label for="puesto" class="block text-sm font-medium text-gray-700 mb-2">Puesto</label>
              <select
                id="puesto"
                v-model="formularioLocal.puesto"
                class="form-select"
                required
              >
                <option value="" disabled>Selecciona un puesto</option>
                <option v-for="puesto in puestos" :key="puesto.id_puesto" :value="puesto.id_puesto">
                  {{ puesto.nombre_puesto }}
                </option>
              </select>
            </div>

            <div>
              <label for="departamento" class="block text-sm font-medium text-gray-700 mb-2">Departamento</label>
              <select
                id="departamento"
                v-model="formularioLocal.departamento"
                class="form-select"
                required
              >
                <option value="" disabled>Selecciona un departamento</option>
                <option v-for="carrera in carreras" :key="carrera.id_carrera" :value="carrera.id_carrera">
                  {{ carrera.nombre_carrera }}
                </option>
              </select>
            </div>

            <div>
              <label for="fecha_ingreso" class="block text-sm font-medium text-gray-700 mb-2">Fecha de Ingreso</label>
              <input 
                type="date"
                id="fecha_ingreso"
                v-model="formularioLocal.fecha_ingreso"
                class="form-input"
                required
              />
            </div>
            
            <div>
              <label for="salario" class="block text-sm font-medium text-gray-700 mb-2">Salario</label>
              <input 
                type="number"
                id="salario"
                v-model="formularioLocal.salario"
                class="form-input"
                required
              />
            </div>
          </div>
          
          <div class="modal-actions">
            <button 
              type="button" 
              @click="cerrar" 
              class="btn-cancelar"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              class="btn-guardar"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  mostrar: {
    type: Boolean,
    required: true,
  },
  modo: {
    type: String,
    default: 'crear',
  },
  empleadoData: {
    type: Object,
    default: () => ({
      id_empleado: null,
      nombre_completo: '',
      correo: '',
      puesto: '',
      departamento: '',
      fecha_ingreso: '',
      salario: 0
    }),
  },
  puestos: {
    type: Array,
    required: true,
  },
  carreras: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits(['cerrar', 'guardar']);

const formularioLocal = ref({ ...props.empleadoData });

watch(() => props.empleadoData, (newData) => {
  formularioLocal.value = { ...newData };
});

const manejarGuardar = () => {
  emits('guardar', formularioLocal.value, props.modo);
};

const cerrar = () => {
  emits('cerrar');
};
</script>

<style scoped>
/* Estilos para el overlay y el contenedor del modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 16px;
}

.modal-content {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 650px;
  padding: 32px;
  transform: scale(0.95);
  animation: modal-pop 0.3s ease-out forwards;
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 24px;
  text-align: center;
}

/* Estilos para los campos del formulario */
.form-input,
.form-select {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
}

/* Estilos para los botones de acción */
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.modal-actions button {
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancelar {
  background-color: #e2e8f0;
  color: #4a5568;
}
.btn-cancelar:hover {
  background-color: #cbd5e0;
}

.btn-guardar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
.btn-guardar:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

/* Animaciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes modal-pop {
  to { transform: scale(1); }
}
</style>
