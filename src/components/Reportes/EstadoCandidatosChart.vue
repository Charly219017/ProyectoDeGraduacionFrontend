<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps({
  estadoCandidatos: {
    type: Array,
    required: true,
  },
});

const chartData = computed(() => ({
  labels: props.estadoCandidatos.map(item => item.estado_aplicacion),
  datasets: [
    {
      backgroundColor: ['#4299e1', '#48bb78', '#f56565', '#ed8936', '#a0aec0'],
      data: props.estadoCandidatos.map(item => item.cantidad),
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Estado de Aplicaciones de Candidatos',
      font: {
        size: 18,
      },
    },
  },
};
</script>
