// src/services/carreras.js
import axios from 'axios';

class CarreraService {
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

  async obtenerCarreras() {
    try {
      const response = await this.axiosInstance.get('/carreras/'); // Added trailing slash
      return response.data;
    } catch (error) {
      console.error('Error al obtener carreras:', error);
      throw error;
    }
  }

  async crearCarrera(datosCarrera, auditor) {
    try {
      const payload = { ...datosCarrera, auditor };
      const response = await this.axiosInstance.post('/carreras/', payload); // Added trailing slash
      return response.data;
    } catch (error) {
      console.error('Error al crear carrera:', error);
      throw error;
    }
  }

  async actualizarCarrera(id, datosActualizados, auditor) {
    try {
      const payload = { ...datosActualizados, auditor };
      const response = await this.axiosInstance.put(`/carreras/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar carrera:', error);
      throw error;
    }
  }

  async eliminarCarrera(id, auditor) {
    try {
      await this.axiosInstance.delete(`/carreras/${id}`);
    } catch (error) {
      console.error('Error al eliminar carrera:', error);
      throw error;
    }
  }
}

export default new CarreraService();