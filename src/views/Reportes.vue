<template>
  <div class="reportes-container">
    <div class="reportes-header">
      <h1>Panel de Reportería</h1> 
      <p>Visualiza las métricas y estadísticas clave de la organización.</p> 
      <button @click="exportarCSV" class="btn btn-export" :disabled="exportando">
        <span v-if="exportando">Exportando...</span>
        <span v-else>Exportar Empleados a CSV</span>
      </button>
    </div>

    <div v-if="cargando" class="loading-container">
      <div class="spinner"></div>
      <p>Cargando reportes...</p>
    </div>

    <div v-if="error" class="error-alert">
      <strong>Error:</strong> {{ error }}
    </div>

    <div v-if="!cargando && !error" class="report-grid">
      <!-- Reporte de Empleados -->
      <div class="report-card chart-card">
        <EmpleadosPorPuestoChart v-if="reportes.estadisticasEmpleados?.empleadosPorPuesto" :empleados-por-puesto="reportes.estadisticasEmpleados.empleadosPorPuesto" />
        <p v-else class="no-data">No hay datos de empleados por puesto.</p>
      </div>

      <!-- Reporte de Estado de Candidatos -->
      <div class="report-card">
        <EstadoCandidatosTable v-if="reportes.estadoCandidatos?.length" :estado-candidatos="reportes.estadoCandidatos" />
        <p v-else class="no-data">No hay datos de candidatos.</p>
      </div>

      <!-- Reporte de Desempeño -->
      <div class="report-card chart-card">
        <PromedioDesempenoChart v-if="reportes.promedioDesempeno?.length" :promedio-desempeno="reportes.promedioDesempeno" />
        <p v-else class="no-data">No hay datos de desempeño.</p>
      </div>

      <!-- Reporte de Nómina -->
      <div class="report-card large-card">
        <TotalSueldosChart v-if="reportes.totalSueldos?.length" :total-sueldos="reportes.totalSueldos" />
        <p v-else class="no-data">No hay datos de nómina.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'; 
import ReporteService from '../services/reportes.js';
import EmpleadosPorPuestoChart from '../components/Reportes/EmpleadosPorPuestoChart.vue';
import EstadoCandidatosTable from '../components/Reportes/EstadoCandidatosTable.vue';
import PromedioDesempenoChart from '../components/Reportes/PromedioDesempenoChart.vue';
import TotalSueldosChart from '../components/Reportes/TotalSueldosChart.vue';

const reportes = reactive({
  estadisticasEmpleados: null,
  estadoCandidatos: null,
  promedioDesempeno: null,
  totalSueldos: null,
});

const cargando = ref(true);
const exportando = ref(false);
const error = ref(null);

const cargarReportes = async () => {
  cargando.value = true;
  error.value = null;
  try {
    const [
      empleadosRes,
      candidatosRes,
      desempenoRes,
      sueldosRes
    ] = await Promise.allSettled([
      ReporteService.obtenerEstadisticasEmpleados(),
      ReporteService.obtenerEstadoCandidatos(),
      ReporteService.obtenerPromedioDesempeno(),
      ReporteService.obtenerTotalSueldosPorMes(),
    ]);

    if (empleadosRes.status === 'fulfilled' && empleadosRes.value.success) reportes.estadisticasEmpleados = empleadosRes.value.data;
    if (candidatosRes.status === 'fulfilled' && candidatosRes.value.success) reportes.estadoCandidatos = candidatosRes.value.data;
    if (desempenoRes.status === 'fulfilled' && desempenoRes.value.success) reportes.promedioDesempeno = desempenoRes.value.data;
    if (sueldosRes.status === 'fulfilled' && sueldosRes.value.success) reportes.totalSueldos = sueldosRes.value.data;

    const failedRequest = [empleadosRes, candidatosRes, desempenoRes, sueldosRes].find(res => res.status === 'rejected');
    if (failedRequest) {
      throw new Error('No se pudieron cargar todos los reportes.');
    }

  } catch (err) {
    error.value = err.message || 'Error de conexión al servidor.';
  } finally {
    cargando.value = false;
  }
};

const exportarCSV = async () => {
  exportando.value = true;
  try {
    await ReporteService.exportarEmpleadosCSV();
  } catch (err) {
    console.error("Fallo en la exportación desde el componente:", err);
  } finally {
    exportando.value = false;
  }
};

onMounted(cargarReportes);
</script>

<style scoped>
.reportes-container { max-width: 1200px; margin: 0 auto; padding: 32px 16px; font-family: 'Inter', sans-serif; background-color: #f7f9fc; min-height: 100vh; }
.reportes-header { text-align: center; margin-bottom: 24px; }
.reportes-header h1 { font-size: 32px; font-weight: 700; color: #2c3e50; }
.reportes-header p { font-size: 16px; color: #7f8c8d; margin-top: 8px; }

.loading-container { text-align: center; padding: 50px; }
.spinner { width: 40px; height: 40px; border: 4px solid #ecf0f1; border-top-color: #3498db; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px; }
@keyframes spin { to { transform: rotate(360deg); } }

.report-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.report-card { background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.07); padding: 24px; display: flex; flex-direction: column; gap: 16px; }
.chart-card { min-height: 400px; }
.large-card { grid-column: 1 / -1; }

.no-data { color: #95a5a6; text-align: center; padding: 20px; }
.error-alert { margin-top: 20px; padding: 15px; background-color: #e74c3c; color: white; border-radius: 8px; }

.btn-export {
  margin-top: 16px;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #2ecc71;
  color: white;
}
.btn-export:hover:not(:disabled) { background-color: #27ae60; }
.btn-export:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
