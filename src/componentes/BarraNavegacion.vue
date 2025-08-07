// carpeta frontend src/componentes/BarraNavegacion.vue
<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-brand">
        <h2>Sistema Jireh</h2>
      </div>

      <div class="navbar-menu">
        <router-link to="/dashboard" class="nav-link">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
          </svg>
          Dashboard
        </router-link>
        
        <div class="nav-dropdown">
          <button class="nav-link dropdown-toggle">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Gestión
            <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>
          <div class="dropdown-menu">
            <a href="#" class="dropdown-item">Empleados</a>
            <a href="#" class="dropdown-item">Vacaciones</a>
            <a href="#" class="dropdown-item">Vacantes</a>
            <a href="#" class="dropdown-item">Nómina</a>
            <a href="#" class="dropdown-item">Evaluaciones</a>
          </div>
        </div>

        <div class="nav-dropdown">
          <button class="nav-link dropdown-toggle">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            Reportes
            <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>
          <div class="dropdown-menu">
            <a href="#" class="dropdown-item">Estadísticas</a>
            <a href="#" class="dropdown-item">Análisis</a>
            <a href="#" class="dropdown-item">Exportar</a>
          </div>
        </div>
      </div>

      <div class="navbar-user">
        <div class="user-info">
          <span class="user-name">{{ usuario?.nombre_usuario || 'Usuario' }}</span>
          <span class="user-role">{{ usuario?.rol?.nombre_rol || 'Empleado' }}</span>
        </div>
        <button @click="manejarLogout" class="logout-btn" title="Cerrar sesión">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../almacen/index.js'

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
  min-width: 160px;
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

@media (max-width: 768px) {
  .navbar-container {
    padding: 0 16px;
  }
  
  .navbar-menu {
    display: none;
  }
  
  .user-info {
    display: none;
  }
}
</style> 