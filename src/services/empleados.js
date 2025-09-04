// src/services/empleados.js
import axios from 'axios';

class EmpleadoService {
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

  async obtenerTodosEmpleados() {
    try {
      const response = await this.axiosInstance.get('/empleados/'); // Added trailing slash
      return response.data;
    } catch (error) {
      console.error('Error al obtener empleados:', error);
      throw error;
    }
  }

  async obtenerEmpleadoPorId(id) {
    try {
      const response = await this.axiosInstance.get(`/empleados/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el empleado con ID ${id}:`, error);
      throw error;
    }
  }

  async crearEmpleado(datosEmpleado, auditor) {
    try {
      const payload = { ...datosEmpleado, auditor };
      const response = await this.axiosInstance.post('/empleados/', payload); // Added trailing slash
      return response.data;
    } catch (error) {
      console.error('Error al crear empleado:', error);
      throw error;
    }
  }

  async actualizarEmpleado(id, datosActualizados, auditor) {
    try {
      const payload = { ...datosActualizados, auditor };
      const response = await this.axiosInstance.put(`/empleados/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
      throw error;
    }
  }

  async eliminarEmpleado(id, auditor) {
    try {
      await this.axiosInstance.delete(`/empleados/${id}`);
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
      throw error;
    }
  }
}

export default new EmpleadoService();