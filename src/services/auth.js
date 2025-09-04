// src/services/auth.js
import axios from 'axios';

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: '/api',
    });

    // Interceptor to add the token to requests
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor to handle response errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('usuario');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // User login
  async login(credenciales) {
    try {
      const respuesta = await this.api.post('/auth/login', credenciales);
      return respuesta.data;
    } catch (error) {
      throw error;
    }
  }

  // User registration
  async registro(datosUsuario) {
    try {
      const respuesta = await this.api.post('/auth/registro', datosUsuario);
      return respuesta.data;
    } catch (error) {
      throw error;
    }
  }

  // Get user profile
  async obtenerPerfil() {
    try {
      const respuesta = await this.api.get('/auth/perfil');
      return respuesta.data;
    } catch (error) {
      throw error;
    }
  }

  // Verify if the token is valid
  async verificarToken() {
    try {
      // Re-using obtenerPerfil to verify token, as it hits an authenticated route
      const respuesta = await this.api.get('/auth/perfil');
      return respuesta.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();