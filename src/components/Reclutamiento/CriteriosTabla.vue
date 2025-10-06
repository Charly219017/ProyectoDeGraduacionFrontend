
// frontend/src/componentes/Reclutamiento/CriteriosTabla.vue
<template>
  <div class="criterios-card">
    <h2 class="criterios-title">Lista de Criterios</h2>
    <div v-if="cargando" class="criterios-empty">Cargando criterios...</div>
    <div v-else-if="criterios.length > 0" class="criterios-table-container">
      <table class="criterios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="criterio in criterios" :key="criterio.id_criterio">
            <td>{{ criterio.id_criterio }}</td>
            <td>{{ criterio.nombre_criterio }}</td>
            <td>{{ criterio.descripcion }}</td>
            <td>
              <button class="btn-editar" @click="$emit('editar', criterio)">Editar</button>
              <button class="btn-eliminar" @click="$emit('eliminar', criterio.id_criterio)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="criterios-empty">
      No hay criterios registrados.
    </div>
  </div>
</template>

<script setup>



const props = defineProps({
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
</script>

<style scoped>
.criterios-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 32px 24px;
  margin-top: 32px;
  max-width: 100%;
}

.criterios-title {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
}

.criterios-table-container {
  overflow-x: auto;
}

.criterios-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.07);
}

.criterios-table th, .criterios-table td {
  padding: 14px 18px;
  text-align: left;
}

.criterios-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 2px solid #e2e8f0;
}

.criterios-table tr {
  transition: background 0.2s;
}

.criterios-table tbody tr:hover {
  background: #f3f6fd;
}

.criterios-table td {
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

.criterios-empty {
  text-align: center;
  color: #888;
  padding: 32px 0 0 0;
  font-size: 16px;
}
</style>
