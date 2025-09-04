// src/services/puestos.js
import axios from 'axios';

class PuestoService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: '/api',
    });

    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });
  }

  async obtenerPuestos() {
    try {
      const response = await this.axiosInstance.get('/puestos/'); // Added trailing slash
      return response.data;
    } catch (error) {
      console.error('Error al obtener puestos:', error);
      throw error;
    }
  }

  async crearPuesto(datosPuesto, auditor) {
    try {
      const payload = { ...datosPuesto, auditor };
      const response = await this.axiosInstance.post('/puestos/', payload); // Added trailing slash
      return response.data;
    } catch (error) {
      console.error('Error al crear puesto:', error);
      throw error;
    }
  }

  async actualizarPuesto(id, datosActualizados, auditor) {
    try {
      const payload = { ...datosActualizados, auditor };
      const response = await this.axiosInstance.put(`/puestos/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar puesto:', error);
      throw error;
    }
  }

  async eliminarPuesto(id, auditor) {
    try {
      await this.axiosInstance.delete(`/puestos/${id}`);
    } catch (error) {
      console.error('Error al eliminar puesto:', error);
      throw error;
    }
  }
}

export default new PuestoService();