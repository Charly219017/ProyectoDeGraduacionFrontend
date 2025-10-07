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
              <label for="dpi" class="block text-sm font-medium text-gray-700 mb-2">DPI</label>
              <input 
                type="text"
                id="dpi"
                v-model="formularioLocal.dpi"
                class="form-input"
                required
              />
            </div>
            <div>
              <label for="telefono" class="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <input 
                type="text"
                id="telefono"
                v-model="formularioLocal.telefono"
                class="form-input"
              />
            </div>
            <div>
              <label for="correo_personal" class="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
              <input 
                type="email"
                id="correo_personal"
                v-model="formularioLocal.correo_personal"
                class="form-input"
                required
              />
            </div>
            <div>
              <label for="direccion" class="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
              <input 
                type="text"
                id="direccion"
                v-model="formularioLocal.direccion"
                class="form-input"
              />
            </div>
            <div>
              <label for="fecha_nacimiento" class="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento</label>
              <input 
                type="date"
                id="fecha_nacimiento"
                v-model="formularioLocal.fecha_nacimiento"
                class="form-input"
              />
            </div>
            <div>
              <label for="genero" class="block text-sm font-medium text-gray-700 mb-2">Género</label>
              <select
                id="genero"
                v-model="formularioLocal.genero"
                class="form-select"
              >
                <option value="" disabled>Selecciona un género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            <div>
              <label for="estado_civil" class="block text-sm font-medium text-gray-700 mb-2">Estado Civil</label>
              <select
                id="estado_civil"
                v-model="formularioLocal.estado_civil"
                class="form-select"
              >
                <option value="" disabled>Selecciona un estado civil</option>
                <option value="Soltero">Soltero(a)</option>
                <option value="Casado">Casado(a)</option>
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
              <label for="id_puesto" class="block text-sm font-medium text-gray-700 mb-2">Puesto</label>
              <select
                id="id_puesto"
                v-model="formularioLocal.id_puesto"
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
              <label for="estado_empleo" class="block text-sm font-medium text-gray-700 mb-2">Estado del Empleado</label>
              <select
                id="estado_empleo"
                v-model="formularioLocal.estado_empleo"
                class="form-select"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
            <div v-if="carreraNombre">
              <label class="block text-sm font-medium text-gray-700 mb-2">Departamento</label>
              <p class="form-input-readonly">{{ carreraNombre }}</p>
            </div>
          </div>
          <div v-if="errorFormulario" class="error-message">
            {{ errorFormulario }}
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
import { ref, watch, computed } from 'vue';

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
      dpi: '',
      telefono: '',
      correo_personal: '',
      direccion: '',
      fecha_nacimiento: '',
      genero: '',
      estado_civil: '',
      fecha_ingreso: '',
      id_puesto: '',
      estado_empleo: 'Activo',
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
const errorFormulario = ref(null);

watch(() => props.empleadoData, (newData) => {
  formularioLocal.value = { ...newData };
});

const carreraNombre = computed(() => {
  if (formularioLocal.value.id_puesto && props.puestos.length && props.carreras.length) {
    const puesto = props.puestos.find(p => p.id_puesto === formularioLocal.value.id_puesto);
    if (puesto && puesto.id_carrera) {
      const carrera = props.carreras.find(c => c.id_carrera === puesto.id_carrera);
      return carrera ? carrera.nombre_carrera : '';
    }
  }
  return '';
});

const manejarGuardar = () => {
  const datosParaGuardar = { ...formularioLocal.value };

  // Validación de campos obligatorios
  if (!datosParaGuardar.nombre_completo || !datosParaGuardar.dpi || !datosParaGuardar.correo_personal || !datosParaGuardar.fecha_ingreso || !datosParaGuardar.id_puesto) {
    errorFormulario.value = 'Por favor, completa todos los campos obligatorios.';
    return;
  }

  // Convertir campos opcionales vacíos a null para consistencia en la BD
  if (datosParaGuardar.fecha_nacimiento === '') {
    datosParaGuardar.fecha_nacimiento = null;
  }
  if (datosParaGuardar.genero === '') {
    datosParaGuardar.genero = null;
  }
  if (datosParaGuardar.estado_civil === '') {
    datosParaGuardar.estado_civil = null;
  }

  emits('guardar', datosParaGuardar, props.modo);
  errorFormulario.value = null; // Limpiar error si la validación pasa
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
  max-height: 90vh;
  overflow-y: auto;
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

.form-input-readonly {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f3f4f6;
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
