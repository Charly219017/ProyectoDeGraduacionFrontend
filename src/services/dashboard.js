// src/services/dashboard.js
import axios from 'axios';

class DashboardService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: '/api/dashboard',
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

  async obtenerEstadisticas() {
    try {
      const response = await this.axiosInstance.get('/estadisticas');
      return response.data;
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
      throw error;
    }
  }
}

export default new DashboardService();
