<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps({
  empleadosPorPuesto: {
    type: Array,
    required: true,
  },
});

const chartData = computed(() => ({
  labels: props.empleadosPorPuesto.map(item => item.puesto.nombre_puesto),
  datasets: [
    {
      label: 'Número de Empleados',
      backgroundColor: '#667eea',
      data: props.empleadosPorPuesto.map(item => item.cantidad),
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
      text: 'Distribución de Empleados por Puesto',
      font: {
        size: 18,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
};
</script>
