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
      const response = await this.axiosInstance.get('/empleados/obtenerempleados');
      return response.data;
    } catch (error) {
      console.error('Error al obtener empleados:', error);
      throw error;
    }
  }

  async obtenerEmpleadoPorId(id) {
    try {
      const response = await this.axiosInstance.get(`/empleados/obtener/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el empleado con ID ${id}:`, error);
      throw error;
    }
  }

  async crearEmpleado(datosEmpleado, idUsuario) {
    try {
      const payload = { ...datosEmpleado, creado_por: idUsuario };
      const response = await this.axiosInstance.post('/empleados/crearempleado', payload);
      return response.data;
    } catch (error) {
      console.error('Error al crear empleado:', error);
      throw error;
    }
  }

  async actualizarEmpleado(id, datosActualizados, idUsuario) {
    try {
      const payload = { ...datosActualizados, actualizado_por: idUsuario };
      const response = await this.axiosInstance.put(`/empleados/actualizar/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
      throw error;
    }
  }

  async eliminarEmpleado(id, idUsuario) {
    try {
      // Borrado lógico: se actualiza el estado del empleado a 'inactivo'
      await this.axiosInstance.delete(`/empleados/eliminar/${id}`, { data: { actualizado_por: idUsuario } });
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
      throw error;
    }
  }
}

export default new EmpleadoService();