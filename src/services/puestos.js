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
      const response = await this.axiosInstance.get('/puestos/obtenerpuestos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener puestos:', error);
      throw error;
    }
  }

  async crearPuesto(datosPuesto, idUsuario) {
    try {
      const payload = { ...datosPuesto, creado_por: idUsuario };
      const response = await this.axiosInstance.post('/puestos/crearpuesto', payload);
      return response.data;
    } catch (error) {
      console.error('Error al crear puesto:', error);
      throw error;
    }
  }

  async obtenerPuestoPorId(id) {
    try {
      const response = await this.axiosInstance.get(`/puestos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el puesto con ID ${id}:`, error);
      throw error;
    }
  }

  async actualizarPuesto(id, datosActualizados, idUsuario) {
    try {
      const payload = { ...datosActualizados, actualizado_por: idUsuario };
      const response = await this.axiosInstance.put(`/puestos/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar puesto:', error);
      throw error;
    }
  }

  async eliminarPuesto(id, idUsuario) {
    try {
      await this.axiosInstance.delete(`/puestos/${id}`, { data: { actualizado_por: idUsuario } });
    } catch (error) {
      console.error('Error al eliminar puesto:', error);
      throw error;
    }
  }
}

export default new PuestoService();