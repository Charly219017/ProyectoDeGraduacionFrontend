<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const props = defineProps({
  totalSueldos: {
    type: Array,
    required: true,
  },
});

const chartData = computed(() => {
  // Ordenar los datos por fecha para que la línea tenga sentido
  const sortedData = [...props.totalSueldos].sort((a, b) => {
    if (a.anio !== b.anio) return a.anio - b.anio;
    return a.mes - b.mes;
  });

  return {
    labels: sortedData.map(item => `${item.mes}/${item.anio}`),
    datasets: [
      {
        label: 'Sueldo Líquido Total (Q)',
        backgroundColor: '#48bb78',
        borderColor: '#38a169',
        tension: 0.1,
        fill: true,
        data: sortedData.map(item => parseFloat(item.total_sueldos)),
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Evolución de Sueldos Pagados por Mes',
      font: {
        size: 18,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value) {
          return 'Q' + new Intl.NumberFormat('es-GT').format(value);
        }
      }
    },
  },
};
</script>
