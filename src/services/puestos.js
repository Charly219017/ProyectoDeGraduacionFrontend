import axios from 'axios';
import { useAuthStore } from '../store';

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
      const response = await this.axiosInstance.get('/puestos/obtenerpuestos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener puestos:', error);
      throw error;
    }
  }

  async crearPuesto(datosPuesto) {
    try {
      const response = await this.axiosInstance.post('/puestos/crearpuesto', datosPuesto);
      return response.data;
    } catch (error) {
      console.error('Error al crear puesto:', error);
      throw error;
    }
  }

  async obtenerPuestoPorId(id_puesto) {
    try {
      const response = await this.axiosInstance.get(`/puestos/${id_puesto}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el puesto con ID ${id_puesto}:`, error);
      throw error;
    }
  }

  async actualizarPuesto(id_puesto, datosActualizados) {
    try {
      const response = await this.axiosInstance.put(`/puestos/${id_puesto}`, datosActualizados);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar puesto:', error);
      throw error;
    }
  }

  async eliminarPuesto(id_puesto) {
    try {
      await this.axiosInstance.delete(`/puestos/${id_puesto}`);
    } catch (error) {
      console.error('Error al eliminar puesto:', error);
      throw error;
    }
  }
}

export default new PuestoService();
