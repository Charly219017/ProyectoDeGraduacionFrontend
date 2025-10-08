// src/servicios/bienestar.js
import axios from 'axios';
const API_BASE_URL = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
}

export const obtenerTodasActividadesBienestar = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bienestar/obtenertodo-bienestar`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error al obtener actividades de bienestar:', error);
    throw error;
  }
};

export const crearActividadBienestar = async (datosActividad, auditor) => {
  try {
    const payload = { ...datosActividad, auditor };
    const response = await axios.post(`${API_BASE_URL}/bienestar/crearbienestar`, payload, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error al crear actividad de bienestar:', error);
    throw error;
  }
};

export const obtenerActividadBienestarPorId = async (id_bienestar) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bienestar/obtener/${id_bienestar}`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la actividad de bienestar con ID ${id}:`, error);
    throw error;
  }
};

export const actualizarActividadBienestar = async (id_bienestar, datosActualizados, auditor) => {
  try {
    const payload = { ...datosActualizados, auditor };
    const response = await axios.put(`${API_BASE_URL}/bienestar/actualizar/${id_bienestar}`, payload, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar actividad de bienestar:', error);
    throw error;
  }
};

export const eliminarActividadBienestar = async (id_bienestar, auditor) => {
  try {
    await axios.delete(`${API_BASE_URL}/bienestar/eliminar/${id_bienestar}`, {
      headers: getAuthHeader(),
      data: { auditor }
    });
  } catch (error) {
    console.error('Error al eliminar actividad de bienestar:', error);
    throw error;
  }
};
