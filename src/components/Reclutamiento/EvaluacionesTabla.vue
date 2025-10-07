// frontend/src/componentes/Reclutamiento/EvaluacionesTabla.vue
<template>
  <div class="evaluaciones-card">
    <h2 class="evaluaciones-title">Lista de Evaluaciones</h2>
    <div v-if="cargando" class="evaluaciones-empty">Cargando evaluaciones...</div>
    <div v-else-if="evaluaciones.length > 0" class="evaluaciones-table-container">
      <table class="evaluaciones-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Empleado</th>
            <th>Fecha</th>
            <th>Evaluador</th>
            <th>Puntuación Total</th>
            <th>Comentarios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="evaluacion in evaluaciones" :key="evaluacion.id_evaluacion">
            <td>{{ evaluacion.id_evaluacion }}</td>
            <td>{{ getEmpleadoNombre(evaluacion.id_empleado) }}</td>
            <td>{{ evaluacion.fecha_evaluacion }}</td>
            <td>{{ evaluacion.evaluador }}</td>
            <td>{{ evaluacion.puntuacion_total }}</td>
            <td>{{ evaluacion.comentarios }}</td>
            <td>
              <button class="btn-editar" @click="$emit('editar', evaluacion)">Editar</button>
              <button class="btn-eliminar" @click="$emit('eliminar', evaluacion.id_evaluacion)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="evaluaciones-empty">
      No hay evaluaciones registradas.
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  evaluaciones: {
    type: Array,
    required: true,
  },
  empleados: {
    type: Array,
    required: false,
    default: () => [],
  },
  cargando: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['editar', 'eliminar']);

const getEmpleadoNombre = (id_empleado) => {
  const lista = Array.isArray(props.empleados) ? props.empleados : [];
  const empleado = lista.find(e => e && (e.id_empleado === id_empleado));
  return empleado && empleado.nombre_completo ? empleado.nombre_completo : 'Desconocido';
};
</script>

<style scoped>
.evaluaciones-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 32px 24px;
  margin-top: 32px;
  max-width: 100%;
}

.evaluaciones-title {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
}

.evaluaciones-table-container {
  overflow-x: auto;
}

.evaluaciones-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.07);
}

.evaluaciones-table th, .evaluaciones-table td {
  padding: 14px 18px;
  text-align: left;
}

.evaluaciones-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 2px solid #e2e8f0;
}

.evaluaciones-table tr {
  transition: background 0.2s;
}

.evaluaciones-table tbody tr:hover {
  background: #f3f6fd;
}

.evaluaciones-table td {
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

.evaluaciones-empty {
  text-align: center;
  color: #888;
  padding: 32px 0 0 0;
  font-size: 16px;
}
</style>