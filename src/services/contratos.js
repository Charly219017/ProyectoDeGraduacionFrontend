// src/services/contratos.js
import axios from 'axios';

class ContratoService {
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

  async obtenerContratos() {
    try {
      const response = await this.axiosInstance.get('/contratos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener contratos:', error);
      throw error;
    }
  }

  async obtenerContratosPorEmpleado(empleadoId) {
    try {
      const response = await this.axiosInstance.get(`/empleados/${empleadoId}/contratos`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener contratos por empleado:', error);
      throw error;
    }
  }

  async crearContrato(datosContrato, auditor) {
    try {
      const payload = { ...datosContrato, auditor };
      const response = await this.axiosInstance.post('/contratos', payload);
      return response.data;
    } catch (error) {
      console.error('Error al crear contrato:', error);
      throw error;
    }
  }

  async actualizarContrato(id, datosActualizados, auditor) {
    try {
      const payload = { ...datosActualizados, auditor };
      const response = await this.axiosInstance.put(`/contratos/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar contrato:', error);
      throw error;
    }
  }

  async eliminarContrato(id, auditor) {
    try {
      await this.axiosInstance.delete(`/contratos/${id}`, {
        data: { auditor }
      });
    } catch (error) {
      console.error('Error al eliminar contrato:', error);
      throw error;
    }
  }
}

export default new ContratoService();