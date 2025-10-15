// carpeta frontend src/componentes/BarraNavegacion.vue
<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-brand">
        <h2>Sistema Elinita</h2>
      </div>

      <div class="navbar-menu">
        <router-link to="/dashboard" class="nav-link">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
          Dashboard
        </router-link>

        <router-link to="/empleados" class="nav-link">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          Empleados
        </router-link>

        <div class="nav-dropdown">
          <button class="nav-link dropdown-toggle">
             <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            Reclutamiento
            <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
          </button>
          <div class="dropdown-menu">
            <router-link to="/reclutamiento/vacantes" class="dropdown-item">Gestión de Vacantes</router-link>
            <router-link to="/reclutamiento/candidatos" class="dropdown-item">Gestión de Candidatos</router-link>
            <router-link to="/reclutamiento/aplicaciones" class="dropdown-item">Seguimiento de Aplicaciones</router-link>
            <router-link to="/reclutamiento/evaluaciones" class="dropdown-item">Evaluaciones de Desempeño</router-link>
            <router-link to="/reclutamiento/criterios" class="dropdown-item">Criterios de Evaluación</router-link>
            <router-link to="/reclutamiento/detalles_evaluacion" class="dropdown-item">Detalles de Evaluaciones</router-link>
          </div>
        </div>

        <div class="nav-dropdown">
          <button class="nav-link dropdown-toggle">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
            Nómina
            <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
          </button>
          <div class="dropdown-menu">
            <router-link to="/nomina/nominas" class="dropdown-item">Gestión de Nóminas</router-link>
            <router-link to="/nomina/vacaciones" class="dropdown-item">Gestión de Vacaciones</router-link>
          </div>
        </div>

        <div class="nav-dropdown">
          <button class="nav-link dropdown-toggle">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
            Bienestar
            <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
          </button>
          <div class="dropdown-menu">
            <router-link to="/bienestar" class="dropdown-item">Actividades</router-link>
          </div>
        </div>

        <div class="nav-dropdown">
          <button class="nav-link dropdown-toggle">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17-.59-1.69-.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>
            Mantenimiento
            <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
          </button>
          <div class="dropdown-menu">
            <router-link to="/mantenimiento/usuarios" class="dropdown-item">Usuarios</router-link>
            <router-link to="/mantenimiento/dependencias" class="dropdown-item">Dependencias</router-link>
            <router-link to="/mantenimiento/puestos" class="dropdown-item">Puestos</router-link>
            <router-link to="/mantenimiento/carreras" class="dropdown-item">Carreras</router-link>
          </div>
        </div>

        <div class="nav-dropdown">
          <button class="nav-link dropdown-toggle">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 6h-4.18C16.4 4.84 15.3 4 14 4h-4c-1.3 0-2.4.84-2.82 2H3v14h18V6zm-9-1.5c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5zM5 8h14v10H5V8z"/></svg>
            Inventario
            <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
          </button>
          <div class="dropdown-menu">
            <router-link to="/inventario/categorias" class="dropdown-item">Categorías</router-link>
            <router-link to="/inventario/productos" class="dropdown-item">Productos</router-link>
            <router-link to="/inventario/movimientos" class="dropdown-item">Movimientos</router-link>
          </div>
        </div>

        <router-link to="/reportes" class="nav-link">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
          Reportes
        </router-link>
      </div>

      <div class="navbar-user">
        <div class="user-info">
          <span class="user-name">{{ usuario?.nombre_usuario || 'Usuario' }}</span>
          <span class="user-role">{{ usuario?.rol?.nombre_rol || 'Empleado' }}</span>
        </div>
        <button @click="manejarLogout" class="logout-btn" title="Cerrar sesión">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/index.js'

export default {
  name: 'BarraNavegacion',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const usuario = computed(() => authStore.obtenerUsuario)

    const manejarLogout = () => {
      authStore.logout()
      router.push('/login')
    }

    return {
      usuario,
      manejarLogout
    }
  }
}
</script>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.navbar-brand h2 {
  color: #333;
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  color: #666;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
}

.nav-link:hover {
  background-color: #f5f5f5;
  color: #333;
}

.nav-link svg {
  width: 18px;
  height: 18px;
}

.nav-dropdown {
  position: relative;
}

.dropdown-toggle {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  color: #666;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
}

.dropdown-toggle:hover {
  background-color: #f5f5f5;
  color: #333;
}

.dropdown-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.nav-dropdown:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 220px; /* Aumentado para mejor visualización */
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all 0.2s ease;
  z-index: 1001;
}

.nav-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: block;
  padding: 12px 16px;
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
  color: #333;
}

.navbar-user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-name {
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

.user-role {
  color: #666;
  font-size: 12px;
}

.logout-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-btn:hover {
  background-color: #fee;
  color: #c53030;
}

.logout-btn svg {
  width: 20px;
  height: 20px;
}

@media (max-width: 992px) { /* Ajustado para mejor responsividad */
  .navbar-menu {
    display: none; /* Ocultar menú en pantallas más pequeñas */
  }
}
</style>
