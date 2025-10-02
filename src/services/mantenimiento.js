// frontend/src/servicios/mantenimiento.js
import axios from 'axios'; // Asegúrate de que este es el axios configurado con el interceptor

const BASE_URL = '/api/mantenimiento';

// Función para obtener el token
function getAuthHeader() {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`
  };
}


/**
 * Obtiene todos los usuarios del sistema desde el backend.
 * @returns {Promise<Array>} Una promesa que se resuelve con un array de usuarios.
 */
export const obtenerTodosUsuarios = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/obtebertodoslosmantenimientos/usuarios`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener todos los usuarios:', error);
    throw error;
  }
};

/**
 * Obtiene todos los registros de auditoría desde el backend.
 * @returns {Promise<Array>} Una promesa que se resuelve con un array de logs.
 */
export const obtenerAuditoria = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/auditoria`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener la auditoría:', error);
    throw error;
  }
};


/**
 * Crea un nuevo usuario en el backend.
 * @param {Object} datosUsuario - El objeto con los datos del nuevo usuario.
 * @returns {Promise<Object>} Una promesa que se resuelve con el nuevo usuario creado.
 */
export const crearUsuario = async (datosUsuario, auditorId) => {
  try {
    // Incluimos el ID del auditor en el payload para el registro de auditoría en el backend.
    const payload = { ...datosUsuario, auditor: auditorId };
    const response = await axios.post(`${BASE_URL}/crearmantenimiento/usuarios`, payload, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
};

/**
 * Actualiza un usuario existente en el backend.
 * @param {number} id - El ID del usuario a actualizar.
 * @param {Object} datosActualizados - El objeto con los datos a modificar.
 * @returns {Promise<Object>} Una promesa que se resuelve con el usuario actualizado.
 */
export const actualizarUsuario = async (id, datosActualizados, auditorId) => {
  try {
    // Incluimos el ID del auditor en el payload.
    const payload = { ...datosActualizados, auditor: auditorId };
    const response = await axios.put(`${BASE_URL}/usuarios/${id}`, payload, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el usuario con ID ${id}:`, error);
    throw error;
  }
};

/**
 * Elimina un usuario del backend.
 * @param {number} id - El ID del usuario a eliminar.
 * @returns {Promise<Object>} Una promesa que se resuelve con un mensaje de éxito.
 */
export const eliminarUsuario = async (id, auditorId) => {
  try {
    // Para el borrado lógico, enviamos el ID del auditor en el cuerpo de la petición DELETE.
    // El backend usará esto para marcar al usuario como inactivo y registrar la auditoría.
    const response = await axios.delete(`${BASE_URL}/usuarios/${id}`, {
      headers: getAuthHeader(),
      data: { auditor: auditorId }
    });
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el usuario con ID ${id}:`, error);
    throw error;
  }
};
