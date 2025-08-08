// carpeta frontend src/servicios/mantenimiento.js
import axios from 'axios';

/**
 * @description Simula la lógica del backend para la gestión de usuarios y auditoría.
 * En un entorno real, estas funciones harían peticiones HTTP a los endpoints de tu API.
 */

// Simulación de datos del backend - Usamos 'const' ya que los arrays no se reasignan,
// solo se modifican sus contenidos.
let usuariosSimulados = [
  { id_usuario: 1, nombre_usuario: 'admin', correo: 'admin@sistema.com', id_rol: 1, rol: 'administrador' },
  { id_usuario: 2, nombre_usuario: 'carlos', correo: 'carlos@sistema.com', id_rol: 2, rol: 'usuario' },
];

const rolesSimulados = [
  { id_rol: 1, nombre_rol: 'administrador' },
  { id_rol: 2, nombre_rol: 'usuario' },
];

let auditoriaSimulada = [
  { id_log: 1, tabla_afectada: 'usuarios', id_registro: null, accion: 'Creación inicial', usuario: 1, fecha: new Date(), descripcion: 'Usuarios iniciales creados por el sistema.' }
];

const SIMULATE_DELAY = 500;

// Helper para encontrar el nombre de usuario por su ID
const getUsernameById = (id) => {
  const user = usuariosSimulados.find(u => u.id_usuario === id);
  return user ? user.nombre_usuario : 'Desconocido';
};

/**
 * Obtiene todos los usuarios del sistema.
 * @returns {Promise<Array>} Una promesa que se resuelve con un array de usuarios.
 */
export const obtenerTodosUsuarios = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      // Unimos los usuarios con los roles para mostrar el nombre del rol.
      const usuariosConRol = usuariosSimulados.map(user => ({
        ...user,
        rol: rolesSimulados.find(r => r.id_rol === user.id_rol)?.nombre_rol || 'Desconocido'
      }));
      resolve(usuariosConRol);
    }, SIMULATE_DELAY);
  });
};

/**
 * Obtiene un usuario por su ID.
 * @param {number} id - El ID del usuario a buscar.
 * @returns {Promise<Object>} Una promesa que se resuelve con el usuario encontrado o null.
 */
export const obtenerUsuarioPorId = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const usuario = usuariosSimulados.find(u => u.id_usuario === id);
      if (usuario) {
        // En un entorno real, no se devolvería el hash de la contraseña
        const { contrasena_hash, ...usuarioSinHash } = usuario;
        resolve(usuarioSinHash);
      } else {
        resolve(null);
      }
    }, SIMULATE_DELAY);
  });
};

/**
 * Obtiene todos los registros de auditoría.
 * @returns {Promise<Array>} Una promesa que se resuelve con un array de logs.
 */
export const obtenerAuditoria = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      // Formateamos los registros para que sean más legibles en el frontend,
      // añadiendo el nombre del usuario que realizó la acción.
      const logsFormateados = auditoriaSimulada.map(log => ({
        ...log,
        usuarioNombre: getUsernameById(log.usuario)
      }));
      resolve(logsFormateados);
    }, SIMULATE_DELAY);
  });
};

/**
 * Crea un nuevo usuario.
 * @param {Object} datosUsuario - El objeto con los datos del nuevo usuario (nombre_usuario, correo, contrasena, id_rol).
 * @param {number} usuarioActualId - El ID del usuario que está realizando la acción de creación.
 * @returns {Promise<Object>} Una promesa que se resuelve con el nuevo usuario creado.
 */
export const crearUsuario = async (datosUsuario, usuarioActualId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Validación de datos obligatorios.
      if (!datosUsuario.nombre_usuario || !datosUsuario.correo || !datosUsuario.contrasena || !datosUsuario.id_rol) {
        return reject(new Error('Faltan campos obligatorios para crear el usuario.'));
      }
      
      const id_usuario = Math.max(...usuariosSimulados.map(u => u.id_usuario), 0) + 1;
      const nuevoUsuario = {
        id_usuario,
        nombre_usuario: datosUsuario.nombre_usuario,
        correo: datosUsuario.correo,
        contrasena_hash: `hash_simulado_${id_usuario}`, // Simulación de hash de contraseña
        id_rol: datosUsuario.id_rol,
        creado_por: usuarioActualId,
        fecha_creacion: new Date()
      };
      usuariosSimulados.push(nuevoUsuario);

      // Registro de auditoría
      const id_log = auditoriaSimulada.length + 1;
      auditoriaSimulada.push({
        id_log,
        tabla_afectada: 'usuarios',
        id_registro: nuevoUsuario.id_usuario,
        accion: 'Creación',
        usuario: usuarioActualId,
        fecha: new Date(),
        descripcion: `Usuario "${nuevoUsuario.nombre_usuario}" creado.`
      });

      resolve(nuevoUsuario);
    }, SIMULATE_DELAY);
  });
};

/**
 * Actualiza un usuario existente.
 * @param {number} id - El ID del usuario a actualizar.
 * @param {Object} datosActualizados - El objeto con los datos a modificar.
 * @param {number} usuarioActualId - El ID del usuario que está realizando la acción de actualización.
 * @returns {Promise<Object>} Una promesa que se resuelve con el usuario actualizado.
 */
export const actualizarUsuario = async (id, datosActualizados, usuarioActualId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const indice = usuariosSimulados.findIndex(u => u.id_usuario === id);
      if (indice !== -1) {
        const usuarioOriginal = usuariosSimulados[indice];
        
        const usuarioActualizado = {
          ...usuarioOriginal,
          ...datosActualizados,
          actualizado_por: usuarioActualId,
          fecha_actualizacion: new Date(),
        };

        // Si se proporciona una nueva contraseña, simulamos el hash.
        if (datosActualizados.contrasena) {
          usuarioActualizado.contrasena_hash = `nuevo_hash_simulado_${id}`;
        }
        
        usuariosSimulados[indice] = usuarioActualizado;
        
        // Registro de auditoría
        const id_log = auditoriaSimulada.length + 1;
        auditoriaSimulada.push({
          id_log,
          tabla_afectada: 'usuarios',
          id_registro: id,
          accion: 'Actualización',
          usuario: usuarioActualId,
          fecha: new Date(),
          descripcion: `Usuario "${usuarioOriginal.nombre_usuario}" actualizado.`
        });
        
        resolve(usuarioActualizado);
      } else {
        reject(new Error('Usuario no encontrado.'));
      }
    }, SIMULATE_DELAY);
  });
};

/**
 * Elimina un usuario.
 * @param {number} id - El ID del usuario a eliminar.
 * @param {number} usuarioActualId - El ID del usuario que está realizando la acción de eliminación.
 * @returns {Promise<Object>} Una promesa que se resuelve con un mensaje de éxito.
 */
export const eliminarUsuario = async (id, usuarioActualId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const indice = usuariosSimulados.findIndex(u => u.id_usuario === id);
      if (indice === -1) {
        return reject(new Error('Usuario no encontrado.'));
      }
      
      const usuarioEliminado = usuariosSimulados[indice];
      usuariosSimulados = usuariosSimulados.filter(u => u.id_usuario !== id);

      // Registro de auditoría
      const id_log = auditoriaSimulada.length + 1;
      auditoriaSimulada.push({
        id_log,
        tabla_afectada: 'usuarios',
        id_registro: id,
        accion: 'Eliminación',
        usuario: usuarioActualId,
        fecha: new Date(),
        descripcion: `Usuario "${usuarioEliminado.nombre_usuario}" eliminado.`
      });
      
      resolve({ mensaje: 'Usuario eliminado correctamente' });
    }, SIMULATE_DELAY);
  });
};
