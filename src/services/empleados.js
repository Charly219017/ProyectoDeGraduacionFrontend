// src/services/empleados.js
import axios from 'axios';
import { useAuthStore } from '../store';

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
      const response = await this.axiosInstance.get('/empleados/obtenerempleados');
      return response.data;
    } catch (error) {
      console.error('Error al obtener empleados:', error);
      throw error;
    }
  }

  async obtenerEmpleadoPorId(id_empleado) {
    try {
      const response = await this.axiosInstance.get(`/empleados/obtener/${id_empleado}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el empleado con ID ${id_empleado}:`, error);
      throw error;
    }
  }

  async crearEmpleado(datosEmpleado) {
    try {
      const response = await this.axiosInstance.post('/empleados/crearempleado', datosEmpleado);
      return response.data;
    } catch (error) {
      console.error('Error al crear empleado:', error);
      throw error;
    }
  }

  async actualizarEmpleado(id_empleado, datosActualizados) {
    try {
      const response = await this.axiosInstance.put(`/empleados/actualizar/${id_empleado}`, datosActualizados);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
      throw error;
    }
  }

  async eliminarEmpleado(id_empleado) {
    try {
      await this.axiosInstance.delete(`/empleados/eliminar/${id_empleado}`);
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
      throw error;
    }
  }
}

export default new EmpleadoService();
