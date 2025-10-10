// src/services/dependencias.js
import axios from 'axios';

class DependenciaService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: '/api',
    });

    this.axiosInstance.interceptors.request.use((config) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });
  }

  async obtenerTodasDependencias() {
    try {
      const response = await this.axiosInstance.get('/dependencias/obtenerdependencias');
      return response.data;
    } catch (error) {
      console.error('Error al obtener dependencias:', error);
      throw error;
    }
  }

  async crearDependencia(datosDependencia) {
    try {
      const response = await this.axiosInstance.post('/dependencias/creardependencia', datosDependencia);
      return response.data;
    } catch (error) {
      console.error('Error al crear dependencia:', error);
      throw error;
    }
  }

  async obtenerDependenciaPorId(id_dependencia) {
    try {
      const response = await this.axiosInstance.get(`/dependencias/${id_dependencia}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la dependencia con ID ${id_dependencia}:`, error);
      throw error;
    }
  }

  async actualizarDependencia(id_dependencia, datosActualizados) {
    try {
      const response = await this.axiosInstance.put(`/dependencias/${id_dependencia}`, datosActualizados);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar dependencia:', error);
      throw error;
    }
  }

  async eliminarDependencia(id_dependencia) {
    try {
      await this.axiosInstance.delete(`/dependencias/${id_dependencia}`);
    } catch (error) {
      console.error('Error al eliminar dependencia:', error);
      throw error;
    }
  }
}

export default new DependenciaService();
