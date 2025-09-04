
// frontend/src/componentes/Mantenimiento/PuestosTabla.vue
<template>
  <div class="puestos-card">
    <h2 class="puestos-title">Lista de Puestos</h2>
    <div v-if="cargando" class="puestos-empty">Cargando puestos...</div>
    <div v-else-if="puestos.length > 0" class="puestos-table-container">
      <table class="puestos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Salario Base</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="puesto in puestos" :key="puesto.id_puesto">
            <td>{{ puesto.id_puesto }}</td>
            <td>{{ puesto.nombre_puesto }}</td>
            <td>{{ puesto.salario_base }}</td>
            <td>
              <button class="btn-editar" @click="$emit('editar', puesto)">Editar</button>
              <button class="btn-eliminar" @click="$emit('eliminar', puesto.id_puesto)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="puestos-empty">
      No hay puestos registrados.
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  puestos: {
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
.puestos-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 32px 24px;
  margin-top: 32px;
  max-width: 100%;
}

.puestos-title {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
}

.puestos-table-container {
  overflow-x: auto;
}

.puestos-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.07);
}

.puestos-table th, .puestos-table td {
  padding: 14px 18px;
  text-align: left;
}

.puestos-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 2px solid #e2e8f0;
}

.puestos-table tr {
  transition: background 0.2s;
}

.puestos-table tbody tr:hover {
  background: #f3f6fd;
}

.puestos-table td {
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

.puestos-empty {
  text-align: center;
  color: #888;
  padding: 32px 0 0 0;
  font-size: 16px;
}
</style>
