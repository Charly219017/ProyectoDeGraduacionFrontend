// src/services/nomina.js
import axios from 'axios';

class NominaService {
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

  async imprimirNomina(id) {
    try {
      const token = sessionStorage.getItem('token');
      const response = await this.axiosInstance.get(`/nomina/${id}/imprimir`, {
        responseType: 'blob', // Importante para manejar la respuesta como un archivo
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Crear una URL para el blob y iniciar la descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Opcional: intentar obtener el nombre del archivo de las cabeceras
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'recibo_nomina.pdf';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (filenameMatch.length > 1) {
          filename = filenameMatch[1];
        }
      }
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      
      // Limpiar
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(`Error al imprimir la nómina con ID ${id}:`, error);
      // Si el error es por acceso prohibido, se puede notificar al usuario
      if (error.response && error.response.status === 403) {
        alert('No tiene permiso para realizar esta acción.');
      }
      throw error;
    }
  }

  async imprimirNominasPorLote(mes, anio) {
    try {
      const token = sessionStorage.getItem('token');
      const response = await this.axiosInstance.get('/nomina/lote/imprimir', {
        params: { mes, anio },
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      const contentDisposition = response.headers['content-disposition'];
      let filename = `nominas_${mes}_${anio}.pdf`;
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (filenameMatch.length > 1) {
          filename = filenameMatch[1];
        }
      }
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(`Error al imprimir las nóminas por lote:`, error);
      if (error.response && error.response.status === 404) {
        alert('No se encontraron nóminas para el período especificado.');
      }
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