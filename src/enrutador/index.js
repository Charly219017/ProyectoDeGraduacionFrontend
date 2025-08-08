import { createRouter, createWebHistory } from 'vue-router'
import Login from '../vistas/Login.vue'
import Dashboard from '../vistas/Dashboard.vue'
import { rutasMantenimiento } from './mantenimientoRutas'
// Importa el nuevo componente para la ruta de mantenimiento
import MantenimientoUsuarios from '../vistas/MantenimientoUsuarios.vue'

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

// Guardia de navegación para autenticación
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const requiereAutenticacion = to.meta.requiereAutenticacion

  // Caso 1: La ruta requiere autenticación y no hay token.
  // Se redirige al login.
  if (requiereAutenticacion && !token) {
    next('/login')
  } 
  // Caso 2: La ruta no requiere autenticación (es el login) y ya hay un token.
  // Se redirige al dashboard para evitar que un usuario logueado acceda al login.
  else if (!requiereAutenticacion && token) {
    next('/dashboard')
  } 
  // Caso 3: En cualquier otro escenario, se permite la navegación.
  // Esto cubre:
  // - Estar logueado y querer ir al dashboard.
  // - No estar logueado y querer ir al login.
  else {
    next()
  }
})

export default router