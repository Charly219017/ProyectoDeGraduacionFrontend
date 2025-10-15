// carpeta frontend src/vistas/Dashboard.vue
<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Dashboard Principal</h1>
      <p>Bienvenido al Sistema Elenita</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ estadisticas.pendingEvaluations || 0 }}</h3>
          <p>Evaluaciones Pendientes</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ estadisticas.approvedVacations || 0 }}</h3>
          <p>Vacaciones Aprobadas</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-4.7 6.3c-.33.44-.49.95-.49 1.47V22h6zm-6 0v-6.23c0-.52.16-1.03.49-1.47L15.99 9c.47-.63 1.21-1 2.01-1h1.54c.71 0 1.36.37 1.72.97L23.5 16H21v6h-7zM7.5 14c.83 0 1.5-.67 1.5-1.5S8.33 11 7.5 11 6 11.67 6 12.5 6.67 14 7.5 14zm3.5 8v-6h-2.5l2.54-7.63A1.5 1.5 0 0 1 12.46 8H13c.8 0 1.54.37 2.01 1l4.7 6.3c.33.44.49.95.49 1.47V22h-6z"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ estadisticas.activeEmployees || 0 }}</h3>
          <p>Empleados Activos</p>
        </div>
      </div>
    </div>

    <div class="modules-grid">
      <div class="module-card">
        <div class="module-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <h3>Gestión de Empleados</h3>
        <p>Gestión de personal y información laboral</p>
        <button class="module-btn" @click="navegarAModulo('empleados')">
          Acceder
        </button>
      </div>

      <div class="module-card">
        <div class="module-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
        <h3>Vacaciones</h3>
        <p>Control de solicitudes y aprobaciones</p>
        <button class="module-btn" @click="navegarAModulo('vacaciones')">
          Acceder
        </button>
      </div>

      <div class="module-card">
        <div class="module-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4V8h16v11z"/>
          </svg>
        </div>
        <h3>Vacantes</h3>
        <p>Publicación y gestión de ofertas laborales</p>
        <button class="module-btn" @click="navegarAModulo('vacantes')">
          Acceder
        </button>
      </div>

      <div class="module-card">
        <div class="module-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
          </svg>
        </div>
        <h3>Nómina</h3>
        <p>Gestión de salarios y compensaciones</p>
        <button class="module-btn" @click="navegarAModulo('nomina')">
          Acceder
        </button>
      </div>

      <div class="module-card">
        <div class="module-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3>Evaluaciones</h3>
        <p>Seguimiento del desempeño laboral</p>
        <button class="module-btn" @click="navegarAModulo('evaluaciones')">
          Acceder
        </button>
      </div>

      <div class="module-card">
        <div class="module-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h3>Bienestar</h3>
        <p>Actividades y programas de bienestar</p>
        <button class="module-btn" @click="navegarAModulo('bienestar')">
          Acceder
        </button>
      </div>


      <div class="module-card">
        <div class="module-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h3>Reportes</h3>
        <p>Análisis y estadísticas del sistema</p>
        <button class="module-btn" @click="navegarAModulo('reportes')">
          Acceder
        </button>
      </div>

      <div class="module-card">
        <div class="module-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-6 0C7.79 11 6 9.21 6 7s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1.89 4.25c-2.31.84-4.22 2.23-5.56 3.65C2.12 19.34 2 20 2 20.73V22h12v-1.27c0-1.42-1.63-2.81-3.72-3.65A7.994 7.994 0 0 1 10.11 15.25zM16 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <h3>Mantenimiento de Usuarios</h3>
        <p>Gestión de usuarios y roles del sistema</p>
        <button class="module-btn" @click="navegarAModulo('mantenimientoEmpleados')">
          Acceder
        </button>
      </div>

      <div class="module-card">
        <div class="module-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 6h-4.18C16.4 4.84 15.3 4 14 4h-4c-1.3 0-2.4.84-2.82 2H3v14h18V6zm-9-1.5c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5zM5 8h14v10H5V8z"/>
          </svg>
        </div>
        <h3>Inventario</h3>
        <p>Gestión de productos, categorías y stock</p>
        <button class="module-btn" @click="navegarAModulo('inventario')">
          Acceder
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DashboardService from '../services/dashboard.js';

const router = useRouter();
const estadisticas = ref({
  pendingEvaluations: 0,
  approvedVacations: 0,
  activeEmployees: 0
});

const cargarEstadisticas = async () => {
  try {
    estadisticas.value = await DashboardService.obtenerEstadisticas();
  } catch (error) {
    // The service already logs the error
  }
};

const navegarAModulo = (modulo) => {
  const rutas = {
    empleados: '/empleados',
    vacaciones: '/nomina/vacaciones',
    vacantes: '/reclutamiento/vacantes',
    nomina: '/nomina/nominas',
    evaluaciones: '/reclutamiento/evaluaciones',
    bienestar: '/bienestar',
    reportes: '/reportes',
    mantenimientoEmpleados: '/mantenimiento/usuarios',
    inventario: '/inventario'
  };

  const ruta = rutas[modulo];
  if (ruta) {
    router.push(ruta);
  } else {
    alert(`Módulo ${modulo} en desarrollo`);
  }
};

onMounted(() => {
  cargarEstadisticas();
});
</script>

<style scoped>
.dashboard {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 40px;
}

.dashboard-header h1 {
  color: #333;
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 600;
}

.dashboard-header p {
  color: #666;
  margin: 0;
  font-size: 18px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  color: white;
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}

.stat-content h3 {
  color: #333;
  margin: 0 0 4px 0;
  font-size: 28px;
  font-weight: 600;
}

.stat-content p {
  color: #666;
  margin: 0;
  font-size: 14px;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.module-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.module-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.module-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: white;
}

.module-icon svg {
  width: 32px;
  height: 32px;
}

.module-card h3 {
  color: #333;
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
}

.module-card p {
  color: #666;
  margin: 0 0 20px 0;
  font-size: 14px;
  line-height: 1.5;
}

.module-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.module-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .dashboard {
    padding: 20px;
  }
  
  .dashboard-header h1 {
    font-size: 24px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .modules-grid {
    grid-template-columns: 1fr;
  }
}
</style> 