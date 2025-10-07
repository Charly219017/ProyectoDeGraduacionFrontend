// frontend/src/componentes/Reclutamiento/DetallesEvaluacionTabla.vue
<template>
  <div class="detalles-evaluacion-card">
    <h2 class="detalles-evaluacion-title">Lista de Detalles de Evaluación</h2>
    <div v-if="cargando" class="detalles-evaluacion-empty">Cargando detalles de evaluación...</div>
    <div v-else-if="detallesEvaluacion.length > 0" class="detalles-evaluacion-table-container">
      <table class="detalles-evaluacion-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Evaluación</th>
            <th>Criterio</th>
            <th>Puntuación</th>
            <th>Comentarios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="detalle in detallesEvaluacion" :key="detalle.id_detalle_evaluacion">
            <td>{{ detalle.id_detalle_evaluacion }}</td>
            <td>Evaluación #{{ detalle.id_evaluacion }}</td>
            <td>{{ getCriterioNombre(detalle.id_criterio) }}</td>
            <td>{{ detalle.puntuacion }}</td>
            <td>{{ detalle.comentarios }}</td>
            <td>
              <button class="btn-editar" @click="$emit('editar', detalle)">Editar</button>
              <button class="btn-eliminar" @click="$emit('eliminar', detalle.id_detalle_evaluacion)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="detalles-evaluacion-empty">
      No hay detalles de evaluación registrados.
    </div>
  </div>
</template>

<script setup>



const props = defineProps({
  detallesEvaluacion: {
    type: Array,
    required: true,
  },
  criterios: {
    type: Array,
    required: true,
  },
  cargando: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['editar', 'eliminar']);

const getCriterioNombre = (id_criterio) => {
  const criterio = props.criterios.find(c => c.id_criterio === id_criterio);
  return criterio ? criterio.nombre_criterio : 'Desconocido';
};
</script>

<style scoped>
.detalles-evaluacion-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 32px 24px;
  margin-top: 32px;
  max-width: 100%;
}

.detalles-evaluacion-title {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
}

.detalles-evaluacion-table-container {
  overflow-x: auto;
}

.detalles-evaluacion-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.07);
}

.detalles-evaluacion-table th, .detalles-evaluacion-table td {
  padding: 14px 18px;
  text-align: left;
}

.detalles-evaluacion-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 2px solid #e2e8f0;
}

.detalles-evaluacion-table tr {
  transition: background 0.2s;
}

.detalles-evaluacion-table tbody tr:hover {
  background: #f3f6fd;
}

.detalles-evaluacion-table td {
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

.detalles-evaluacion-empty {
  text-align: center;
  color: #888;
  padding: 32px 0 0 0;
  font-size: 16px;
}
</style>