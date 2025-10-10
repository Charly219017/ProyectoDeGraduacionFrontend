
// frontend/src/componentes/Bienestar/ActividadesList.vue
<template>
  <div class="actividades-card">
    <h2 class="actividades-title">Lista de Actividades de Bienestar</h2>
    <div v-if="cargando" class="actividades-empty">Cargando actividades...</div>
    <div v-else-if="actividades.length > 0" class="actividades-table-container">
      <table class="actividades-table">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="actividad in actividades" :key="actividad.id_bienestar">
            <td>{{ actividad.id_bienestar }}</td>
            <td>{{ actividad.nombre_actividad }}</td>
            <td>{{ actividad.descripcion }}</td>
            <td>{{ formatDate(actividad.fecha_actividad) }}</td>
            <td>
              <button class="btn-editar" @click="$emit('editar', actividad)">Editar</button>
              <button class="btn-eliminar" @click="$emit('eliminar', actividad.id_bienestar)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="actividades-empty">
      No hay actividades de bienestar registradas.
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  actividades: {
    type: Array,
    required: true,
  },
  cargando: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['editar', 'eliminar']);

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date)) {
    return 'Fecha Inválida';
  }
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};
</script>

<style scoped>
.actividades-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 32px 24px;
  margin-top: 32px;
  max-width: 100%;
}

.actividades-title {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
}

.actividades-table-container {
  overflow-x: auto;
}

.actividades-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.07);
}

.actividades-table th, .actividades-table td {
  padding: 14px 18px;
  text-align: left;
}

.actividades-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 2px solid #e2e8f0;
}

.actividades-table tr {
  transition: background 0.2s;
}

.actividades-table tbody tr:hover {
  background: #f3f6fd;
}

.actividades-table td {
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

.actividades-empty {
  text-align: center;
  color: #888;
  padding: 32px 0 0 0;
  font-size: 16px;
}
</style>
