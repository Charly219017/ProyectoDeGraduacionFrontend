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
      
      const respuesta = await authService.login(credenciales)
      
      token.value = respuesta.token
      usuario.value = respuesta.usuario
      
      localStorage.setItem('token', respuesta.token)
      localStorage.setItem('usuario', JSON.stringify(respuesta.usuario))
      
      return { exito: true }
    } catch (err) {
      error.value = err.response?.data?.mensaje || 'Error en el inicio de sesión'
      return { exito: false, error: error.value }
    } finally {
      cargando.value = false
    }
  }

  const registro = async (datosUsuario) => {
    try {
      cargando.value = true
      error.value = null
      
      const respuesta = await authService.registro(datosUsuario)
      
      return { exito: true, mensaje: 'Usuario registrado exitosamente' }
    } catch (err) {
      error.value = err.response?.data?.mensaje || 'Error en el registro'
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

  const cargarUsuario = async () => {
    if (!token.value) return false
    
    try {
      const respuesta = await authService.obtenerPerfil()
      usuario.value = respuesta.usuario
      return true
    } catch (err) {
      logout()
      return false
    }
  }

  const limpiarError = () => {
    error.value = null
  }

  // Inicializar usuario desde localStorage
  const inicializar = () => {
    const usuarioGuardado = localStorage.getItem('usuario')
    if (usuarioGuardado && token.value) {
      usuario.value = JSON.parse(usuarioGuardado)
    }
  }

  return {
    // Estado
    usuario,
    token,
    cargando,
    error,
    
    // Getters
    estaAutenticado,
    obtenerUsuario,
    obtenerToken,
    obtenerCargando,
    obtenerError,
    
    // Actions
    login,
    registro,
    logout,
    cargarUsuario,
    limpiarError,
    inicializar
  }
}) 