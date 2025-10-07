// carpeta frontend src/almacen/index.js

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '../services/auth.js'

export const useAuthStore = defineStore('auth', () => {
  // Estado
  const usuario = ref(null)
  const token = ref(localStorage.getItem('token') || null)
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
      localStorage.setItem('token', respuestaToken.token)
      
      const respuestaUsuario = await authService.obtenerPerfil()
      usuario.value = respuestaUsuario.usuario
      localStorage.setItem('usuario', JSON.stringify(respuestaUsuario.usuario))

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
    token.value = null
    usuario.value = null
    error.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  }

  const cargarSesion = async () => {
    const tokenGuardado = localStorage.getItem('token');
    token.value = tokenGuardado;

    if (!tokenGuardado) {
      return; // No hay sesión que cargar
    }

    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado && usuarioGuardado !== 'undefined' && usuarioGuardado !== 'null') {
      try {
        usuario.value = JSON.parse(usuarioGuardado);
        return; // Carga exitosa desde localStorage
      } catch (e) {
        console.error("Datos de usuario corruptos en localStorage, limpiando.", e);
        localStorage.removeItem('usuario'); // Limpiar datos erróneos
      }
    }

    // Si no hay usuario en localStorage o los datos estaban corruptos, obtener de la API
    try {
      console.log("No hay usuario en localStorage, obteniendo perfil desde la API...");
      const respuestaUsuario = await authService.obtenerPerfil();
      usuario.value = respuestaUsuario.usuario;
      localStorage.setItem('usuario', JSON.stringify(respuestaUsuario.usuario));
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