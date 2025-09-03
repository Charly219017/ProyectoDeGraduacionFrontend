// src/servicios/gestion.js

import axios from 'axios';
// Reemplaza 'http://api.jireh.com' con la URL base de tu backend real.
const API_BASE_URL = 'http://api.jireh.com';

/**
 * Obtiene todos los empleados del backend.
 * @returns {Promise<Array>} Un array de objetos de empleado.
 */
export const obtenerTodosEmpleados = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/empleados`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    throw error;
  }
};

/**
 * Crea un nuevo empleado en el backend.
 * Se envía el ID del usuario que realiza la acción para la auditoría.
 * @param {Object} datosEmpleado - Los datos del nuevo empleado.
 * @param {string|number} auditor - El ID del usuario que realiza la acción.
 * @returns {Promise<Object>} El empleado creado.
 */
export const crearEmpleado = async (datosEmpleado, auditor) => {
  try {
    const payload = { ...datosEmpleado, auditor }; // Agrega el auditor al payload
    const response = await axios.post(`${API_BASE_URL}/empleados`, payload);
    return response.data;
  } catch (error) {
    console.error('Error al crear empleado:', error);
    throw error;
  }
};

/**
 * Actualiza un empleado existente por su ID.
 * Se envía el ID del usuario que realiza la acción para la auditoría.
 * @param {string|number} id - El ID del empleado a actualizar.
 * @param {Object} datosActualizados - Los datos actualizados del empleado.
 * @param {string|number} auditor - El ID del usuario que realiza la acción.
 * @returns {Promise<Object>} El empleado actualizado.
 */
export const actualizarEmpleado = async (id, datosActualizados, auditor) => {
  try {
    const payload = { ...datosActualizados, auditor }; // Agrega el auditor al payload
    const response = await axios.put(`${API_BASE_URL}/empleados/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar empleado:', error);
    throw error;
  }
};

/**
 * Elimina un empleado por su ID.
 * Se envía el ID del usuario que realiza la acción para la auditoría.
 * @param {string|number} id - El ID del empleado a eliminar.
 * @param {string|number} auditor - El ID del usuario que realiza la acción.
 * @returns {Promise<void>}
 */
export const eliminarEmpleado = async (id, auditor) => {
  try {
    // La información de auditoría se puede enviar en el cuerpo o como query param.
    // Aquí la enviamos en el cuerpo de una petición PUT con un cambio de estado a "inactivo".
    // Depende de la implementación de tu backend.
    await axios.delete(`${API_BASE_URL}/empleados/${id}`, { data: { auditor } });
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
    throw error;
  }
};

/**
 * Obtiene la lista de todos los puestos disponibles.
 * @returns {Promise<Array>} Un array de objetos de puesto.
 */
export const obtenerPuestos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/puestos`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener puestos:', error);
    throw error;
  }
};

/**
 * Obtiene la lista de todas las carreras disponibles.
 * @returns {Promise<Array>} Un array de objetos de carrera.
 */
export const obtenerCarreras = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/carreras`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener carreras:', error);
    throw error;
  }
};
