// carpeta frontend src/almacen/index.js

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '../services/auth.js'

export const useAuthStore = defineStore('auth', () => {
  // --- INICIO: Lógica de Inactividad ---
  const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutos
  let inactivityTimer = null;

  const activityEvents = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      // Solo cerrar sesión si hay un token, para evitar bucles.
      if (token.value) {
        console.log("Cerrando sesión por inactividad.");
        logout();
      }
    }, INACTIVITY_TIMEOUT);
  };

  const setupInactivityDetection = () => {
    activityEvents.forEach(event => {
      window.addEventListener(event, resetInactivityTimer);
    });
    resetInactivityTimer(); // Iniciar el temporizador la primera vez
  };

  const cleanupInactivityDetection = () => {
    clearTimeout(inactivityTimer);
    activityEvents.forEach(event => {
      window.removeEventListener(event, resetInactivityTimer);
    });
  };
  // --- FIN: Lógica de Inactividad ---

  // Estado
  const usuario = ref(null)
  const token = ref(sessionStorage.getItem('token') || null) // <--- CAMBIO
  const cargando = ref(false)
  const error = ref(null)

  // Getters
  const estaAutenticado = computed(() => !!token.value)
  const obtenerUsuario = computed(() => usuario.value)
  const obtenerToken = computed(() => token.value)
  const obtenerCargando = computed(() => cargando.value)
  const obtenerError = computed(() => error.value)

  // Actions
  const login = async (credenciales) => {
    try {
      cargando.value = true
      error.value = null
      
      const respuestaToken = await authService.login(credenciales)
      token.value = respuestaToken.token
      sessionStorage.setItem('token', respuestaToken.token) // <--- CAMBIO
      
      const respuestaUsuario = await authService.obtenerPerfil()
      usuario.value = respuestaUsuario.usuario
      sessionStorage.setItem('usuario', JSON.stringify(respuestaUsuario.usuario)) // <--- CAMBIO

      setupInactivityDetection(); // <--- AÑADIDO

      return { exito: true }
    } catch (err) {
      error.value = err.response?.data?.mensaje || 'Error en el inicio de sesión'
      logout()
      return { exito: false, error: error.value }
    } finally {
      cargando.value = false
    }
  }

  const logout = () => {
    cleanupInactivityDetection(); 
    token.value = null
    usuario.value = null
    error.value = null
    sessionStorage.removeItem('token') 
    sessionStorage.removeItem('usuario') 
  }

  const cargarSesion = async () => {
    const tokenGuardado = sessionStorage.getItem('token'); 
    token.value = tokenGuardado;

    if (!tokenGuardado) {
      return; // No hay sesión que cargar
    }

    // Si hay token, iniciamos el detector de inactividad
    setupInactivityDetection(); // <--- AÑADIDO

    const usuarioGuardado = sessionStorage.getItem('usuario'); // <--- CAMBIO
    if (usuarioGuardado && usuarioGuardado !== 'undefined' && usuarioGuardado !== 'null') {
      try {
        usuario.value = JSON.parse(usuarioGuardado);
        return; // Carga exitosa desde sessionStorage
      } catch (e) {
        console.error("Datos de usuario corruptos en sessionStorage, limpiando.", e);
        sessionStorage.removeItem('usuario'); // <--- CAMBIO
      }
    }

    // Si no hay usuario en sessionStorage o los datos estaban corruptos, obtener de la API
    try {
      console.log("No hay usuario en sessionStorage, obteniendo perfil desde la API...");
      const respuestaUsuario = await authService.obtenerPerfil();
      usuario.value = respuestaUsuario.usuario;
      sessionStorage.setItem('usuario', JSON.stringify(respuestaUsuario.usuario)); // <--- CAMBIO
    } catch (err) {
      console.error("Fallo al obtener el perfil del usuario, cerrando sesión.", err);
      logout(); // El token probablemente es inválido
    }
  };

  const limpiarError = () => {
    error.value = null
  }

  return {
    usuario,
    token,
    cargando,
    error,
    estaAutenticado,
    obtenerUsuario,
    obtenerToken,
    obtenerCargando,
    obtenerError,
    login,
    logout,
    cargarSesion,
    limpiarError
  }
})