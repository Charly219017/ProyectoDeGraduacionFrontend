<template>
  <div class="auditoria-card">
    <h2 class="auditoria-title">Registro de Auditoría</h2>
    <div v-if="auditoria.length > 0" class="auditoria-table-container">
      <table class="auditoria-table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Acción</th>
            <th>Fecha</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(log, index) in auditoria" :key="index">
            <td>{{ log.usuarioNombre }}</td>
            <td>{{ log.accion }}</td>
            <td>{{ new Date(log.fecha).toLocaleString() }}</td>
            <td>{{ log.descripcion }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="auditoria-empty">
      No hay registros de auditoría.
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  auditoria: {
    type: Array,
    required: true,
  }
});
</script>

<style scoped>
.auditoria-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 32px 24px;
  margin-top: 32px;
  max-width: 100%;
}

.auditoria-title {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
}

.auditoria-table-container {
  overflow-x: auto;
}

.auditoria-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.07);
}

.auditoria-table th, .auditoria-table td {
  padding: 14px 18px;
  text-align: left;
}

.auditoria-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 2px solid #e2e8f0;
}

.auditoria-table tr {
  transition: background 0.2s;
}

.auditoria-table tbody tr:hover {
  background: #f3f6fd;
}

.auditoria-table td {
  color: #444;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
}

.auditoria-empty {
  text-align: center;
  color: #888;
  padding: 32px 0 0 0;
  font-size: 16px;
}
</style>