// frontend/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../vistas/Login.vue'
import Dashboard from '../vistas/Dashboard.vue'
import { rutasMantenimiento } from './mantenimientoRutas'
import MantenimientoUsuarios from '../vistas/MantenimientoUsuarios.vue'

// Importa tu servicio de autenticación
import authService from '../servicios/auth'

const rutasPrincipales = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiereAutenticacion: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiereAutenticacion: true }
  },
]

// Rutas para mantenimiento de usuarios
const rutas = [...rutasPrincipales, ...rutasMantenimiento]

const router = createRouter({
  history: createWebHistory(),
  routes: rutas
})

// Guardia de navegación para autenticación mejorada
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  const requiereAutenticacion = to.meta.requiereAutenticacion

  // Caso 1: La ruta requiere autenticación.
  if (requiereAutenticacion) {
    if (!token) {
      // No hay token, redirige al login inmediatamente.
      next('/login')
    } else {
      // Hay un token, verifica si es válido haciendo una petición al backend.
      try {
        await authService.verificarToken()
        // Si la verificación es exitosa, permite el acceso.
        next()
      } catch (error) {
        // Si la verificación falla (el token es inválido o expirado),
        // el interceptor de Axios ya maneja el borrado del token y la redirección.
        // No se necesita hacer nada más aquí, el interceptor se encarga.
      }
    }
  }
  // Caso 2: La ruta no requiere autenticación (ej. /login).
  else {
    if (token) {
      // Si hay un token válido, redirige al dashboard para evitar que
      // el usuario logueado acceda al login.
      // Aquí también validamos el token por si está expirado.
      try {
        await authService.verificarToken()
        next('/dashboard')
      } catch (error) {
        // Si el token es inválido, el interceptor ya borró el token y
        // permite que el usuario permanezca en la página de login.
        next()
      }
    } else {
      // No hay token, permite el acceso a la ruta de login.
      next()
    }
  }
})

export default router
