// src/servicios/dependencias.js
import axios from 'axios';
const API_BASE_URL = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
}

export const obtenerDependencias = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dependencias`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error al obtener dependencias:', error);
    throw error;
  }
};

export const crearDependencia = async (datosDependencia, auditor) => {
  try {
    const payload = { ...datosDependencia, auditor };
    const response = await axios.post(`${API_BASE_URL}/dependencias`, payload, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error al crear dependencia:', error);
    throw error;
  }
};

export const actualizarDependencia = async (id, datosActualizados, auditor) => {
  try {
    const payload = { ...datosActualizados, auditor };
    const response = await axios.put(`${API_BASE_URL}/dependencias/${id}`, payload, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar dependencia:', error);
    throw error;
  }
};

export const eliminarDependencia = async (id, auditor) => {
  try {
    await axios.delete(`${API_BASE_URL}/dependencias/${id}`, {
      headers: getAuthHeader(),
      data: { auditor }
    });
  } catch (error) {
    console.error('Error al eliminar dependencia:', error);
    throw error;
  }
};