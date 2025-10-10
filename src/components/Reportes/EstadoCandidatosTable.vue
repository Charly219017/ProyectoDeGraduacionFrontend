<template>
  <div class="table-container">
    <h3>Estado de Candidatos</h3>
    <table class="styled-table">
      <thead>
        <tr>
          <th>Estado de Aplicación</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="estadoCandidatos.length === 0">
          <td colspan="2">No hay datos disponibles</td>
        </tr>
        <tr v-for="item in estadoCandidatos" :key="item.estado_aplicacion">
          <td>{{ item.estado_aplicacion }}</td>
          <td>{{ item.cantidad }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  estadoCandidatos: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.table-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

h3 {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.styled-table thead tr {
  background-color: #667eea;
  color: #ffffff;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #667eea;
}

.styled-table td:last-child {
  text-align: center;
  font-weight: bold;
}
</style>
