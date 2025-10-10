// src/services/reclutamiento.js
import axios from 'axios';

class ReclutamientoService {
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

  // --- Vacantes ---
  async obtenerVacantes() {
    try {
      const response = await this.axiosInstance.get('/vacantes/obtenervacantes');
      return response.data;
    } catch (error) {
      console.error('Error al obtener vacantes:', error);
      throw error;
    }
  }

  async obtenerVacantePorId(id_vacante) {
    try {
      const response = await this.axiosInstance.get(`/vacantes/${id_vacante}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la vacante con ID ${id_vacante}:`, error);
      throw error;
    }
  }

  async crearVacante(datosVacante) {
    try {
      const response = await this.axiosInstance.post('/vacantes/crearvacantes', datosVacante);
      return response.data;
    } catch (error) {
      console.error('Error al crear vacante:', error);
      throw error;
    }
  }

  async actualizarVacante(id_vacante, datosActualizados) {
    try {
      const response = await this.axiosInstance.put(`/vacantes/${id_vacante}`, datosActualizados);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar vacante:', error);
      throw error;
    }
  }

  async eliminarVacante(id_vacante) {
    try {
      await this.axiosInstance.delete(`/vacantes/${id_vacante}`);
    } catch (error) {
      console.error('Error al eliminar vacante:', error);
      throw error;
    }
  }

  // --- Candidatos ---
  async obtenerCandidatos() {
    try {
      const response = await this.axiosInstance.get('/candidatos/obtenercandidatos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener candidatos:', error);
      throw error;
    }
  }

  async obtenerCandidatoPorId(id_candidato) {
    try {
      const response = await this.axiosInstance.get(`/candidatos/obtener/${id_candidato}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el candidato con ID ${id_candidato}:`, error);
      throw error;
    }
  }

  async crearCandidato(datosCandidato) {
    try {
      const response = await this.axiosInstance.post('/candidatos/crearcandidato', datosCandidato);
      return response.data;
    } catch (error) {
      console.error('Error al crear candidato:', error);
      throw error;
    }
  }

  async actualizarCandidato(id_candidato, datosActualizados) {
    try {
      const response = await this.axiosInstance.put(`/candidatos/actualizar/${id_candidato}`, datosActualizados);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar candidato:', error);
      throw error;
    }
  }

  async eliminarCandidato(id_candidato) {
    try {
      await this.axiosInstance.delete(`/candidatos/eliminar/${id_candidato}`);
    } catch (error) {
      console.error('Error al eliminar candidato:', error);
      throw error;
    }
  }

  // --- Aplicaciones ---
  async obtenerAplicaciones() {
    try {
      const response = await this.axiosInstance.get('/aplicaciones/obtener-aplicaciones');
      return response.data;
    } catch (error) {
      console.error('Error al obtener aplicaciones:', error);
      throw error;
    }
  }

  async obtenerAplicacionPorId(id_aplicacion) {
    try {
      const response = await this.axiosInstance.get(`/aplicaciones/obtener/${id_aplicacion}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la aplicacion con ID ${id_aplicacion}:`, error);
      throw error;
    }
  }

  async crearAplicacion(datosAplicacion) {
    try {
      const response = await this.axiosInstance.post('/aplicaciones/crearaplicacion', datosAplicacion);
      return response.data;
    } catch (error) {
      console.error('Error al crear aplicación:', error);
      throw error;
    }
  }

  async actualizarAplicacion(id_aplicacion, datosActualizados) {
    try {
      const response = await this.axiosInstance.put(`/aplicaciones/actualizar/${id_aplicacion}`, datosActualizados);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar aplicación:', error);
      throw error;
    }
  }

  async eliminarAplicacion(id_aplicacion) {
    try {
      await this.axiosInstance.delete(`/aplicaciones/eliminar/${id_aplicacion}`);
    } catch (error) {
      console.error('Error al eliminar aplicación:', error);
      throw error;
    }
  }

  // --- Criterios ---
  async obtenerCriterios() {
    try {
      const response = await this.axiosInstance.get('/criterios/obtenercriterios');
      return response.data;
    } catch (error) {
      console.error('Error al obtener criterios:', error);
      throw error;
    }
  }

  async obtenerCriterioPorId(id_criterio) {
    try {
      const response = await this.axiosInstance.get(`/criterios/${id_criterio}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el criterio con ID ${id_criterio}:`, error);
      throw error;
    }
  }

  async crearCriterio(datosCriterio) {
    try {
      const response = await this.axiosInstance.post('/criterios/crearcriterio', datosCriterio);
      return response.data;
    } catch (error) {
      console.error('Error al crear criterio:', error);
      throw error;
    }
  }

  async actualizarCriterio(id_criterio, datosActualizados) {
    try {
      const response = await this.axiosInstance.put(`/criterios/${id_criterio}`, datosActualizados);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar criterio:', error);
      throw error;
    }
  }

  async eliminarCriterio(id_criterio) {
    try {
      await this.axiosInstance.delete(`/criterios/${id_criterio}`);
    } catch (error) {
      console.error('Error al eliminar criterio:', error);
      throw error;
    }
  }

    // --- Evaluaciones ---
  async obtenerEvaluaciones() {
    try {
      const response = await this.axiosInstance.get('/evaluaciones/obtenerevaluaciones');
      return response.data;
    } catch (error) {
      console.error('Error al obtener evaluaciones:', error);
      throw error;
    }
  }

  async obtenerEvaluacionPorId(id_evaluacion) {
    try {
      const response = await this.axiosInstance.get(`/evaluaciones/${id_evaluacion}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la evaluacion con ID ${id_evaluacion}:`, error);
      throw error;
    }
  }

  async crearEvaluacion(datosEvaluacion) {
    try {
      const response = await this.axiosInstance.post('/evaluaciones/crearevaluacion', datosEvaluacion);
      return response.data;
    } catch (error) {
      console.error('Error al crear evaluación:', error);
      throw error;
    }
  }

  async actualizarEvaluacion(id_evaluacion, datosActualizados) {
    try {
      const response = await this.axiosInstance.put(`/evaluaciones/${id_evaluacion}`, datosActualizados);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar evaluación:', error);
      throw error;
    }
  }

  async eliminarEvaluacion(id_evaluacion) {
    try {
      await this.axiosInstance.delete(`/evaluaciones/${id_evaluacion}`);
    } catch (error) {
      console.error('Error al eliminar evaluación:', error);
      throw error;
    }
  }

  // --- Detalles de Evaluación ---
  async obtenerDetallesEvaluacion(id_evaluacion = null) {
    try {
      const params = {};
      if (id_evaluacion) {
        params.id_evaluacion = id_evaluacion;
      }
      const response = await this.axiosInstance.get('/detalles_evaluacion/obtenerdetalleevaluacion', { params });
      return response.data;
    } catch (error) {
      console.error('Error al obtener detalles de evaluación:', error);
      throw error;
    }
  }

  async obtenerDetalleEvaluacionPorId(id_detalle) {
    try {
      const response = await this.axiosInstance.get(`/detalles_evaluacion/${id_detalle}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el detalle de evaluacion con ID ${id_detalle}:`, error);
      throw error;
    }
  }

  async crearDetalleEvaluacion(datosDetalleEvaluacion) {
    try {
      const response = await this.axiosInstance.post('/detalles_evaluacion/creardetalleevaluacion', datosDetalleEvaluacion);
      return response.data;
    } catch (error) {
      console.error('Error al crear detalle de evaluación:', error);
      throw error;
    }
  }

  async actualizarDetalleEvaluacion(id_detalle, datosActualizados) {
    try {
      const response = await this.axiosInstance.put(`/detalles_evaluacion/${id_detalle}`, datosActualizados);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar detalle de evaluación:', error);
      throw error;
    }
  }

  async eliminarDetalleEvaluacion(id_detalle) {
    try {
      await this.axiosInstance.delete(`/detalles_evaluacion/${id_detalle}`);
    } catch (error) {
      console.error('Error al eliminar detalle de evaluación:', error);
      throw error;
    }
  }
}

export default new ReclutamientoService();