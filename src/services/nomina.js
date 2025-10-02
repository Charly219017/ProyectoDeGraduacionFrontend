// src/services/nomina.js
import axios from 'axios';

class NominaService {
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

  // --- Nominas ---
  async obtenerNominas() {
    try {
      const response = await this.axiosInstance.get('/nomina/obtenernominas');
      return response.data;
    } catch (error) {
      console.error('Error al obtener nóminas:', error);
      throw error;
    }
  }

  async obtenerNominaPorId(id) {
    try {
      const response = await this.axiosInstance.get(`/nomina/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la nómina con ID ${id}:`, error);
      throw error;
    }
  }

  async crearNomina(datosNomina, auditor) {
    try {
      const payload = { ...datosNomina, auditor };
      const response = await this.axiosInstance.post('/nomina/crearnomina', payload);
      return response.data;
    } catch (error) {
      console.error('Error al crear nómina:', error);
      throw error;
    }
  }

  async actualizarNomina(id, datosActualizados, auditor) {
    try {
      const payload = { ...datosActualizados, auditor };
      const response = await this.axiosInstance.put(`/nomina/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar nómina:', error);
      throw error;
    }
  }

  async eliminarNomina(id, auditor) {
    try {
      await this.axiosInstance.delete(`/nomina/${id}`, {
        data: { auditor }
      });
    } catch (error) {
      console.error('Error al eliminar nómina:', error);
      throw error;
    }
  }

  // --- Vacaciones ---
  async obtenerVacaciones() {
    try {
      const response = await this.axiosInstance.get('/vacaciones/obtenervacaciones');
      return response.data;
    } catch (error) {
      console.error('Error al obtener vacaciones:', error);
      throw error;
    }
  }

  async obtenerVacacionPorId(id) {
    try {
      const response = await this.axiosInstance.get(`/vacaciones/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la vacación con ID ${id}:`, error);
      throw error;
    }
  }

  async crearVacacion(datosVacacion, auditor) {
    try {
      const payload = { ...datosVacacion, auditor };
      const response = await this.axiosInstance.post('/vacaciones/crearvacacion', payload);
      return response.data;
    } catch (error) {
      console.error('Error al crear vacación:', error);
      throw error;
    }
  }

  async actualizarVacacion(id, datosActualizados, auditor) {
    try {
      const payload = { ...datosActualizados, auditor };
      const response = await this.axiosInstance.put(`/vacaciones/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar vacación:', error);
      throw error;
    }
  }

  async eliminarVacacion(id, auditor) {
    try {
      await this.axiosInstance.delete(`/vacaciones/${id}`, {
        data: { auditor }
      });
    } catch (error) {
      console.error('Error al eliminar vacación:', error);
      throw error;
    }
  }
}

export default new NominaService();
