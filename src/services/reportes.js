// frontend/src/services/reportes.js
import axios from 'axios';

const API_URL = '/api/reportes';

const getAuthHeader = () => {
  const token = sessionStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

/**
 * Obtiene las estadísticas de empleados.
 * @returns {Promise<Object>}
 */
const obtenerEstadisticasEmpleados = async () => {
  try {
    const response = await axios.get(`${API_URL}/estadisticas-empleados`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener estadísticas de empleados:', error);
    throw error;
  }
};

/**
 * Descarga el reporte de empleados en formato CSV.
 * El backend ahora envía el archivo directamente.
 */
const exportarEmpleadosCSV = async () => {
  try {
    const response = await axios.get(`${API_URL}/exportar-empleados`, {
      headers: getAuthHeader(),
      responseType: 'blob', // Importante para manejar la descarga de archivos
    });

    // Crear un enlace para descargar el Blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'reporte_empleados.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al exportar empleados a CSV:', error);
    // Si el error es de la API, puede venir como un JSON dentro del blob
    if (error.response && error.response.data.toString() === '[object Blob]') {
      const errText = await error.response.data.text();
      const errJson = JSON.parse(errText);
      alert(`Error al exportar: ${errJson.error || 'Error del servidor'}`);
    } else {
      alert('Error al exportar el archivo.');
    }
    throw error;
  }
};

/**
 * Obtiene el estado de las aplicaciones de los candidatos.
 * @returns {Promise<Object>}
 */
const obtenerEstadoCandidatos = async () => {
  try {
    const response = await axios.get(`${API_URL}/estado-candidatos`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener estado de candidatos:', error);
    throw error;
  }
};

/**
 * Obtiene el promedio de desempeño por puesto.
 * @returns {Promise<Object>}
 */
const obtenerPromedioDesempeno = async () => {
  try {
    const response = await axios.get(`${API_URL}/promedio-desempeno`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener promedio de desempeño:', error);
    throw error;
  }
};

/**
 * Obtiene el total de sueldos pagados por mes.
 * @returns {Promise<Object>}
 */
const obtenerTotalSueldosPorMes = async () => {
  try {
    const response = await axios.get(`${API_URL}/total-sueldos-mes`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener total de sueldos por mes:', error);
    throw error;
  }
};

export default {
  obtenerEstadisticasEmpleados,
  exportarEmpleadosCSV,
  obtenerEstadoCandidatos,
  obtenerPromedioDesempeno,
  obtenerTotalSueldosPorMes,
};