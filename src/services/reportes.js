// src/services/reportes.js
import axios from 'axios';

class ReporteService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: '/api/reportes', // Base URL para los endpoints de reportes
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

  async obtenerEstadisticasEmpleados() {
    try {
      const response = await this.axiosInstance.get('/estadisticas-empleados');
      return response.data;
    } catch (error) {
      console.error('Error al obtener estadísticas de empleados:', error);
      throw error;
    }
  }

  async exportarEmpleadosCSV() {
    try {
      const response = await this.axiosInstance.get('/exportar-empleados', {
        responseType: 'blob', // Importante para manejar la descarga de archivos
      });
      return response.data;
    } catch (error) {
      console.error('Error al exportar empleados a CSV:', error);
      throw error;
    }
  }

  async obtenerEstadoCandidatos() {
    try {
      const response = await this.axiosInstance.get('/estado-candidatos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener estado de candidatos:', error);
      throw error;
    }
  }

  async obtenerPromedioDesempeno() {
    try {
      const response = await this.axiosInstance.get('/promedio-desempeno');
      return response.data;
    } catch (error) {
      console.error('Error al obtener promedio de desempeño:', error);
      throw error;
    }
  }

  async obtenerTotalSueldosPorMes() {
    try {
      const response = await this.axiosInstance.get('/total-sueldos-mes');
      return response.data;
    } catch (error) {
      console.error('Error al obtener total de sueldos por mes:', error);
      throw error;
    }
  }
}

export default new ReporteService();
