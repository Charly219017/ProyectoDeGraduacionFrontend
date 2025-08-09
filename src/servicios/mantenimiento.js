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
    const response = await axios.get(`${BASE_URL}/usuarios`, {
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
export const crearUsuario = async (datosUsuario) => {
  try {
    const response = await axios.post(`${BASE_URL}/usuarios`, datosUsuario, {
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
export const actualizarUsuario = async (id, datosActualizados) => {
  try {
    const response = await axios.put(`${BASE_URL}/usuarios/${id}`, datosActualizados, {
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
export const eliminarUsuario = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/usuarios/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el usuario con ID ${id}:`, error);
    throw error;
  }
};
