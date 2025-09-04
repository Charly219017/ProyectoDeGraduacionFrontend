// src/services/reclutamiento.js
import axios from 'axios';

class ReclutamientoService {
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

  // --- Vacantes ---
  async obtenerVacantes() {
    try {
      const response = await this.axiosInstance.get('/vacantes');
      return response.data;
    } catch (error) {
      console.error('Error al obtener vacantes:', error);
      throw error;
    }
  }

  async crearVacante(datosVacante, auditor) {
    try {
      const payload = { ...datosVacante, auditor };
      const response = await this.axiosInstance.post('/vacantes', payload);
      return response.data;
    } catch (error) {
      console.error('Error al crear vacante:', error);
      throw error;
    }
  }

  async actualizarVacante(id, datosActualizados, auditor) {
    try {
      const payload = { ...datosActualizados, auditor };
      const response = await this.axiosInstance.put(`/vacantes/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar vacante:', error);
      throw error;
    }
  }

  async eliminarVacante(id, auditor) {
    try {
      await this.axiosInstance.delete(`/vacantes/${id}`, {
        data: { auditor }
      });
    } catch (error) {
      console.error('Error al eliminar vacante:', error);
      throw error;
    }
  }

  // --- Candidatos ---
  async obtenerCandidatos() {
    try {
      const response = await this.axiosInstance.get('/candidatos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener candidatos:', error);
      throw error;
    }
  }

  async crearCandidato(datosCandidato, auditor) {
    try {
      const payload = { ...datosCandidato, auditor };
      const response = await this.axiosInstance.post('/candidatos', payload);
      return response.data;
    } catch (error) {
      console.error('Error al crear candidato:', error);
      throw error;
    }
  }

  async actualizarCandidato(id, datosActualizados, auditor) {
    try {
      const payload = { ...datosActualizados, auditor };
      const response = await this.axiosInstance.put(`/candidatos/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar candidato:', error);
      throw error;
    }
  }

  async eliminarCandidato(id, auditor) {
    try {
      await this.axiosInstance.delete(`/candidatos/${id}`, {
        data: { auditor }
      });
    } catch (error) {
      console.error('Error al eliminar candidato:', error);
      throw error;
    }
  }

  // --- Aplicaciones ---
  async obtenerAplicaciones() {
    try {
      const response = await this.axiosInstance.get('/aplicaciones');
      return response.data;
    } catch (error) {
      console.error('Error al obtener aplicaciones:', error);
      throw error;
    }
  }

  async crearAplicacion(datosAplicacion, auditor) {
    try {
      const payload = { ...datosAplicacion, auditor };
      const response = await this.axiosInstance.post('/aplicaciones', payload);
      return response.data;
    } catch (error) {
      console.error('Error al crear aplicación:', error);
      throw error;
    }
  }

  async actualizarAplicacion(id, datosActualizados, auditor) {
    try {
      const payload = { ...datosActualizados, auditor };
      const response = await this.axiosInstance.put(`/aplicaciones/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar aplicación:', error);
      throw error;
    }
  }

  async eliminarAplicacion(id, auditor) {
    try {
      await this.axiosInstance.delete(`/aplicaciones/${id}`, {
        data: { auditor }
      });
    } catch (error) {
      console.error('Error al eliminar aplicación:', error);
      throw error;
    }
  }

  // --- Criterios ---
  async obtenerCriterios() {
    try {
      const response = await this.axiosInstance.get('/criterios');
      return response.data;
    } catch (error) {
      console.error('Error al obtener criterios:', error);
      throw error;
    }
  }

  async crearCriterio(datosCriterio, auditor) {
    try {
      const payload = { ...datosCriterio, auditor };
      const response = await this.axiosInstance.post('/criterios', payload);
      return response.data;
    } catch (error) {
      console.error('Error al crear criterio:', error);
      throw error;
    }
  }

  async actualizarCriterio(id, datosActualizados, auditor) {
    try {
      const payload = { ...datosActualizados, auditor };
      const response = await this.axiosInstance.put(`/criterios/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar criterio:', error);
      throw error;
    }
  }

  async eliminarCriterio(id, auditor) {
    try {
      await this.axiosInstance.delete(`/criterios/${id}`, {
        data: { auditor }
      });
    } catch (error) {
      console.error('Error al eliminar criterio:', error);
      throw error;
    }
  }

    // --- Evaluaciones ---
  async obtenerEvaluaciones() {
    try {
      const response = await this.axiosInstance.get('/evaluaciones');
      return response.data;
    } catch (error) {
      console.error('Error al obtener evaluaciones:', error);
      throw error;
    }
  }

  async crearEvaluacion(datosEvaluacion, auditor) {
    try {
      const payload = { ...datosEvaluacion, auditor };
      const response = await this.axiosInstance.post('/evaluaciones', payload);
      return response.data;
    } catch (error) {
      console.error('Error al crear evaluación:', error);
      throw error;
    }
  }

  async actualizarEvaluacion(id, datosActualizados, auditor) {
    try {
      const payload = { ...datosActualizados, auditor };
      const response = await this.axiosInstance.put(`/evaluaciones/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar evaluación:', error);
      throw error;
    }
  }

  async eliminarEvaluacion(id, auditor) {
    try {
      await this.axiosInstance.delete(`/evaluaciones/${id}`, {
        data: { auditor }
      });
    } catch (error) {
      console.error('Error al eliminar evaluación:', error);
      throw error;
    }
  }

  // --- Detalles de Evaluación ---
  async obtenerDetallesEvaluacion() {
    try {
      const response = await this.axiosInstance.get('/detalles_evaluacion');
      return response.data;
    } catch (error) {
      console.error('Error al obtener detalles de evaluación:', error);
      throw error;
    }
  }

  async crearDetalleEvaluacion(datosDetalleEvaluacion, auditor) {
    try {
      const payload = { ...datosDetalleEvaluacion, auditor };
      const response = await this.axiosInstance.post('/detalles_evaluacion', payload);
      return response.data;
    } catch (error) {
      console.error('Error al crear detalle de evaluación:', error);
      throw error;
    }
  }

  async actualizarDetalleEvaluacion(id, datosActualizados, auditor) {
    try {
      const payload = { ...datosActualizados, auditor };
      const response = await this.axiosInstance.put(`/detalles_evaluacion/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar detalle de evaluación:', error);
      throw error;
    }
  }

  async eliminarDetalleEvaluacion(id, auditor) {
    try {
      await this.axiosInstance.delete(`/detalles_evaluacion/${id}`, {
        data: { auditor }
      });
    } catch (error) {
      console.error('Error al eliminar detalle de evaluación:', error);
      throw error;
    }
  }
}

export default new ReclutamientoService();
