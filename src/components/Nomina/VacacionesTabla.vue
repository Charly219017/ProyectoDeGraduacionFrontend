
// frontend/src/componentes/Nomina/VacacionesTabla.vue
<template>
  <div class="vacaciones-card">
    <h2 class="vacaciones-title">Lista de Solicitudes de Vacaciones</h2>
    <div v-if="cargando" class="vacaciones-empty">Cargando solicitudes de vacaciones...</div>
    <div v-else-if="vacaciones.length > 0" class="vacaciones-table-container">
      <table class="vacaciones-table">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Empleado</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Fin</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vacacion in vacaciones" :key="vacacion.id_vacacion">
            <td>{{ vacacion.id_vacacion }}</td>
            <td>{{ getEmpleadoNombre(vacacion.id_empleado) }}</td>
            <td>{{ new Date(vacacion.fecha_inicio).toLocaleDateString() }}</td>
            <td>{{ new Date(vacacion.fecha_fin).toLocaleDateString() }}</td>
            <td>{{ vacacion.estado }}</td>
            <td>
              <button class="btn-editar" @click="$emit('editar', vacacion)">Editar</button>
              <button class="btn-eliminar" @click="$emit('eliminar', vacacion.id_vacacion)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="vacaciones-empty">
      No hay solicitudes de vacaciones registradas.
    </div>
  </div>
</template>

<script setup>



const props = defineProps({
  vacaciones: {
    type: Array,
    required: true,
  },
  empleados: {
    type: Array,
    required: true,
  },
  cargando: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['editar', 'eliminar']);

const getEmpleadoNombre = (id_empleado) => {
  const empleado = props.empleados.find(e => e.id_empleado === id_empleado);
  return empleado ? empleado.nombre_completo : 'Desconocido';
};
</script>

<style scoped>
.vacaciones-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 32px 24px;
  margin-top: 32px;
  max-width: 100%;
}

.vacaciones-title {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
}

.vacaciones-table-container {
  overflow-x: auto;
}

.vacaciones-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.07);
}

.vacaciones-table th, .vacaciones-table td {
  padding: 14px 18px;
  text-align: left;
}

.vacaciones-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 2px solid #e2e8f0;
}

.vacaciones-table tr {
  transition: background 0.2s;
}

.vacaciones-table tbody tr:hover {
  background: #f3f6fd;
}

.vacaciones-table td {
  color: #444;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
}

.btn-editar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 600;
  margin-right: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-editar:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
}

.btn-eliminar {
  background: linear-gradient(135deg, #f56565 0%, #c53030 100%);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-eliminar:hover {
  background: linear-gradient(135deg, #e53e3e 0%, #9b2c2c 100%);
}

.vacaciones-empty {
  text-align: center;
  color: #888;
  padding: 32px 0 0 0;
  font-size: 16px;
}
</style>
