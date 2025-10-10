<template>
  <div class="component-container">
    <h3>Historial de Sueldos Totales</h3>
    <div class="content-wrapper">
      <div class="chart-container">
        <Line :data="chartData" :options="chartOptions" />
      </div>
      <div class="table-container">
        <table class="styled-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Total Sueldos (GTQ)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="totalSueldos.length === 0">
              <td colspan="2">No hay datos disponibles</td>
            </tr>
            <tr v-for="item in totalSueldos" :key="`${item.anio}-${item.mes}`">
              <td>{{ getMonthName(item.mes) }} {{ item.anio }}</td>
              <td>{{ new Intl.NumberFormat('es-GT', { style: 'currency', currency: 'GTQ' }).format(item.total_sueldos) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler);

const props = defineProps({
  totalSueldos: {
    type: Array,
    required: true,
  },
});

const getMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('es-ES', { month: 'long' });
};

// La data se invierte para el gráfico para mostrar del más antiguo al más nuevo
const chartData = computed(() => ({
  labels: [...props.totalSueldos].reverse().map(item => `${getMonthName(item.mes).substring(0,3)}. ${item.anio}`),
  datasets: [
    {
      label: 'Total Sueldos (GTQ)',
      backgroundColor: 'rgba(129, 140, 248, 0.2)',
      borderColor: '#6366f1',
      data: [...props.totalSueldos].reverse().map(item => item.total_sueldos),
      fill: true,
      tension: 0.3,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false, // El título ahora está fuera del gráfico
    },
  },
};
</script>

<style scoped>
.component-container {
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

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

@media (min-width: 768px) {
  .content-wrapper {
    grid-template-columns: 2fr 1fr;
  }
}

.chart-container {
  min-height: 300px;
}

.table-container {
  max-height: 350px;
  overflow-y: auto;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.styled-table thead tr {
  background-color: #6366f1;
  color: #ffffff;
  text-align: left;
  position: sticky;
  top: 0;
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

.styled-table td:last-child {
  text-align: right;
  font-weight: 500;
}
</style>
