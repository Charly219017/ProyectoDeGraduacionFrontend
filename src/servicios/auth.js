// carpeta frontend src/servicios/auth.js
import axios from 'axios'

// Configurar axios con la URL base
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // <-- ¡CORRECCIÓN AQUÍ!
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

const authService = {
  // Login de usuario
  async login(credenciales) {
    try {
      const respuesta = await api.post('/auth/login', credenciales)
      return respuesta.data
    } catch (error) {
      throw error
    }
  },

  // Registro de usuario
  async registro(datosUsuario) {
    try {
      const respuesta = await api.post('/auth/registro', datosUsuario)
      return respuesta.data
    } catch (error) {
      throw error
    }
  },

  // Obtener perfil del usuario
  async obtenerPerfil() {
    try {
      const respuesta = await api.get('/auth/perfil')
      return respuesta.data
    } catch (error) {
      throw error
    }
  },

  // Verificar si el token es válido
  async verificarToken() {
    try {
      const respuesta = await api.get('/auth/perfil')
      return respuesta.data
    } catch (error) {
      throw error
    }
  }
}

export default authService