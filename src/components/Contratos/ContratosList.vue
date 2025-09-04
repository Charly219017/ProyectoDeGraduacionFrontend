
// frontend/src/componentes/Contratos/ContratosList.vue
<template>
  <div class="contratos-card">
    <h2 class="contratos-title">Lista de Contratos</h2>
    <div v-if="cargando" class="contratos-empty">Cargando contratos...</div>
    <div v-else-if="contratos.length > 0" class="contratos-table-container">
      <table class="contratos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Puesto</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Fin</th>
            <th>Salario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contrato in contratos" :key="contrato.id_contrato">
            <td>{{ contrato.id_contrato }}</td>
            <td>{{ getPuestoNombre(contrato.id_puesto) }}</td>
            <td>{{ new Date(contrato.fecha_inicio).toLocaleDateString() }}</td>
            <td>{{ contrato.fecha_fin ? new Date(contrato.fecha_fin).toLocaleDateString() : '-' }}</td>
            <td>{{ contrato.salario }}</td>
            <td>
              <button class="btn-editar" @click="$emit('editar', contrato)">Editar</button>
              <button class="btn-eliminar" @click="$emit('eliminar', contrato.id_contrato)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="contratos-empty">
      No hay contratos registrados para este empleado.
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  contratos: {
    type: Array,
    required: true,
  },
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

const getPuestoNombre = (id_puesto) => {
  const puesto = props.puestos.find(p => p.id_puesto === id_puesto);
  return puesto ? puesto.nombre_puesto : 'Desconocido';
};
</script>

<style scoped>
.contratos-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 32px 24px;
  margin-top: 32px;
  max-width: 100%;
}

.contratos-title {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
}

.contratos-table-container {
  overflow-x: auto;
}

.contratos-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.07);
}

.contratos-table th, .contratos-table td {
  padding: 14px 18px;
  text-align: left;
}

.contratos-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 2px solid #e2e8f0;
}

.contratos-table tr {
  transition: background 0.2s;
}

.contratos-table tbody tr:hover {
  background: #f3f6fd;
}

.contratos-table td {
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

.contratos-empty {
  text-align: center;
  color: #888;
  padding: 32px 0 0 0;
  font-size: 16px;
}
</style>
