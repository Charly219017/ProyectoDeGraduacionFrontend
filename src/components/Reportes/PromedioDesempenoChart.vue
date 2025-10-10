<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler
);

const props = defineProps({
  promedioDesempeno: {
    type: Array,
    required: true,
  },
});

const chartData = computed(() => ({
  labels: props.promedioDesempeno.map(item => item.nombre_puesto),
  datasets: [
    {
      label: 'Puntuación Promedio',
      borderColor: '#fb923c',
      backgroundColor: 'rgba(251, 146, 60, 0.2)',
      fill: true,
      tension: 0.4,
      data: props.promedioDesempeno.map(item => parseFloat(item.promedio_puntuacion).toFixed(2)),
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
      display: true,
      text: 'Promedio de Desempeño por Puesto',
      font: {
        size: 18,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
</script>
