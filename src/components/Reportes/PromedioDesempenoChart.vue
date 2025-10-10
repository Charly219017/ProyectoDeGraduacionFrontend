<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  promedioDesempeno: {
    type: Array,
    required: true,
  },
});

const chartData = computed(() => ({
  labels: props.promedioDesempeno.map(item => item['empleado.puesto.nombre_puesto'] || 'Puesto no especificado'),
  datasets: [
    {
      label: 'Puntuación Promedio',
      backgroundColor: '#ed8936',
      data: props.promedioDesempeno.map(item => parseFloat(item.promedio_puntuacion).toFixed(2)),
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Promedio de Desempeño por Puesto',
      font: {
        size: 18,
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      max: 100, // Asumiendo que la puntuación es sobre 100
    },
  },
};
</script>
