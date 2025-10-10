<template>
  <div class="reportes-container">
    <header class="reportes-header">
      <h1>Módulo de Reportería</h1>
      <p>Visualiza estadísticas y exporta datos clave del sistema.</p>
    </header>

    <div v-if="error" class="error-alert">
      {{ error }}
    </div>

    <!-- Sección de Acciones -->
    <div class="actions-card">
      <h2>Acciones Rápidas</h2>
      <button @click="exportarCSV" :disabled="exportando" class="btn-export">
        {{ exportando ? 'Exportando...' : 'Exportar Empleados a CSV' }}
      </button>
    </div>

    <!-- Contenedor de Gráficos -->
    <div class="charts-grid">
      <!-- Card para Total de Empleados -->
      <div class="chart-card total-empleados-card">
        <h3>Total de Empleados Activos</h3>
        <div v-if="cargando.estadisticas" class="loading-spinner"></div>
        <p v-else class="total-number">{{ totalEmpleados }}</p>
      </div>

      <!-- Gráfico de Empleados por Puesto -->
      <div class="chart-card">
        <div v-if="cargando.estadisticas" class="loading-spinner"></div>
        <EmpleadosPorPuestoChart v-else-if="estadisticasEmpleados?.empleadosPorPuesto?.length" :empleados-por-puesto="estadisticasEmpleados.empleadosPorPuesto" />
        <p v-else class="no-data">No hay datos de empleados por puesto.</p>
      </div>

      <!-- Gráfico de Estado de Candidatos -->
      <div class="chart-card">
        <div v-if="cargando.candidatos" class="loading-spinner"></div>
        <EstadoCandidatosChart v-else-if="estadoCandidatos?.length" :estado-candidatos="estadoCandidatos" />
        <p v-else class="no-data">No hay datos de estado de candidatos.</p>
      </div>

      <!-- Gráfico de Promedio de Desempeño -->
      <div class="chart-card">
        <div v-if="cargando.desempeno" class="loading-spinner"></div>
        <PromedioDesempenoChart v-else-if="promedioDesempeno?.length" :promedio-desempeno="promedioDesempeno" />
        <p v-else class="no-data">No hay datos de promedio de desempeño.</p>
      </div>

      <!-- Gráfico de Total de Sueldos -->
      <div class="chart-card large-card">
        <div v-if="cargando.sueldos" class="loading-spinner"></div>
        <TotalSueldosChart v-else-if="totalSueldos?.length" :total-sueldos="totalSueldos" />
        <p v-else class="no-data">No hay datos de total de sueldos.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ReporteService from '../services/reportes.js';
import EmpleadosPorPuestoChart from '../components/Reportes/EmpleadosPorPuestoChart.vue';
import EstadoCandidatosChart from '../components/Reportes/EstadoCandidatosChart.vue';
import PromedioDesempenoChart from '../components/Reportes/PromedioDesempenoChart.vue';
import TotalSueldosChart from '../components/Reportes/TotalSueldosChart.vue';

// --- Estado Reactivo ---
const estadisticasEmpleados = ref(null);
const estadoCandidatos = ref(null);
const promedioDesempeno = ref(null);
const totalSueldos = ref(null);
const error = ref(null);
const exportando = ref(false);

const cargando = ref({
  estadisticas: true,
  candidatos: true,
  desempeno: true,
  sueldos: true,
});

// --- Datos Computados ---
const totalEmpleados = computed(() => estadisticasEmpleados.value?.totalEmpleados || 0);

// --- Métodos ---
const cargarTodosLosReportes = async () => {
  error.value = null;
  
  const cargarReporte = async (clave, servicio) => {
    cargando.value[clave] = true;
    try {
      const response = await servicio();
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.error || `Error en reporte ${clave}`);
      }
    } catch (err) {
      error.value = `Error al cargar ${clave}: ${err.message}`;
      return null;
    } finally {
      cargando.value[clave] = false;
    }
  };

  estadisticasEmpleados.value = await cargarReporte('estadisticas', ReporteService.obtenerEstadisticasEmpleados);
  estadoCandidatos.value = await cargarReporte('candidatos', ReporteService.obtenerEstadoCandidatos);
  promedioDesempeno.value = await cargarReporte('desempeno', ReporteService.obtenerPromedioDesempeno);
  totalSueldos.value = await cargarReporte('sueldos', ReporteService.obtenerTotalSueldosPorMes);
};

const exportarCSV = async () => {
  error.value = null;
  exportando.value = true;
  try {
    const data = await ReporteService.exportarEmpleadosCSV();
    const blob = new Blob([data], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'reporte_empleados.csv';
    link.click();
    window.URL.revokeObjectURL(link.href);
  } catch (err) {
    error.value = `Error al exportar el archivo: ${err.message}`;
  } finally {
    exportando.value = false;
  }
};

// --- Ciclo de Vida ---
onMounted(() => {
  cargarTodosLosReportes();
});
</script>

<style scoped>
.reportes-container {
  padding: 2rem;
  background-color: #f4f7f6;
}

.reportes-header {
  text-align: center;
  margin-bottom: 2rem;
}

.reportes-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
}

.reportes-header p {
  font-size: 1.1rem;
  color: #666;
}

.error-alert {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.actions-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
  text-align: center;
}

.btn-export {
  background-color: #28a745;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-export:hover {
  background-color: #218838;
}

.btn-export:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.chart-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  height: 400px; /* Altura fija para consistencia */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.large-card {
  grid-column: span 2; /* Ocupa dos columnas */
}

.total-empleados-card {
  text-align: center;
}

.total-empleados-card h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.total-number {
  font-size: 4rem;
  font-weight: 700;
  color: #667eea;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-data {
  color: #888;
  font-style: italic;
}
</style>