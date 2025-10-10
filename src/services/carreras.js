import axios from 'axios';

class CarreraService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: '/api',
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

  async obtenerCarreras() {
    try {
      const response = await this.axiosInstance.get('/carreras/obtener-todas');
      return response.data;
    } catch (error) {
      console.error('Error al obtener carreras:', error);
      throw error;
    }
  }

  async crearCarrera(datosCarrera, idUsuario) {
    try {
      const payload = { ...datosCarrera, creado_por: idUsuario };
      const response = await this.axiosInstance.post('/carreras/crear', payload);
      return response.data;
    } catch (error) {
      console.error('Error al crear carrera:', error);
      throw error;
    }
  }

  async obtenerCarreraPorId(id) {
    try {
      const response = await this.axiosInstance.get(`/carreras/obtener/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la carrera con ID ${id}:`, error);
      throw error;
    }
  }

  async actualizarCarrera(id, datosActualizados, idUsuario) {
    try {
      const payload = { ...datosActualizados, actualizado_por: idUsuario };
      const response = await this.axiosInstance.put(`/carreras/actualizar/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar carrera:', error);
      throw error;
    }
  }

  async eliminarCarrera(id, idUsuario) {
    try {
      await this.axiosInstance.delete(`/carreras/eliminar/${id}`, { data: { actualizado_por: idUsuario } });
    } catch (error) {
      console.error('Error al eliminar carrera:', error);
      throw error;
    }
  }
}

export default new CarreraService();