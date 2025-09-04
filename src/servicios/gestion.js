// src/servicios/gestion.js
import axios from 'axios';

const API_BASE_URL = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`
  };
}

// --- Empleados ---
export const obtenerTodosEmpleados = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/empleados`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    throw error;
  }
};

export const obtenerEmpleadoPorId = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/empleados/${id}`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el empleado con ID ${id}:`, error);
    throw error;
  }
};

export const crearEmpleado = async (datosEmpleado, auditor) => {
  try {
    const payload = { ...datosEmpleado, auditor };
    const response = await axios.post(`${API_BASE_URL}/empleados`, payload, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error al crear empleado:', error);
    throw error;
  }
};

export const actualizarEmpleado = async (id, datosActualizados, auditor) => {
  try {
    const payload = { ...datosActualizados, auditor };
    const response = await axios.put(`${API_BASE_URL}/empleados/${id}`, payload, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar empleado:', error);
    throw error;
  }
};

export const eliminarEmpleado = async (id, auditor) => {
  try {
    await axios.delete(`${API_BASE_URL}/empleados/${id}`, { 
      headers: getAuthHeader(),
      data: { auditor } 
    });
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
    throw error;
  }
};

// --- Puestos ---
export const obtenerPuestos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/puestos`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error al obtener puestos:', error);
    throw error;
  }
};

// --- Carreras ---
export const obtenerCarreras = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/carreras`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error al obtener carreras:', error);
    throw error;
  }
};

// --- Dependencias ---
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

// --- Contratos ---
export const obtenerContratos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/contratos`, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      console.error('Error al obtener contratos:', error);
      throw error;
    }
  };

export const obtenerContratosPorEmpleado = async (empleadoId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/empleados/${empleadoId}/contratos`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error al obtener contratos por empleado:', error);
    throw error;
  }
};
  
export const crearContrato = async (datosContrato, auditor) => {
  try {
    const payload = { ...datosContrato, auditor };
    const response = await axios.post(`${API_BASE_URL}/contratos`, payload, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error al crear contrato:', error);
    throw error;
  }
};
  
export const actualizarContrato = async (id, datosActualizados, auditor) => {
  try {
    const payload = { ...datosActualizados, auditor };
    const response = await axios.put(`${API_BASE_URL}/contratos/${id}`, payload, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar contrato:', error);
    throw error;
  }
};

export const eliminarContrato = async (id, auditor) => {
  try {
    await axios.delete(`${API_BASE_URL}/contratos/${id}`, { 
      headers: getAuthHeader(),
      data: { auditor } 
    });
  } catch (error) {
    console.error('Error al eliminar contrato:', error);
    throw error;
  }
};

// --- Bienestar ---
export const obtenerActividadesBienestar = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bienestar`, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      console.error('Error al obtener actividades de bienestar:', error);
      throw error;
    }
  };
  
  export const crearActividadBienestar = async (datosActividad, auditor) => {
    try {
      const payload = { ...datosActividad, auditor };
      const response = await axios.post(`${API_BASE_URL}/bienestar`, payload, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      console.error('Error al crear actividad de bienestar:', error);
      throw error;
    }
  };
  
  export const actualizarActividadBienestar = async (id, datosActualizados, auditor) => {
    try {
      const payload = { ...datosActualizados, auditor };
      const response = await axios.put(`${API_BASE_URL}/bienestar/${id}`, payload, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar actividad de bienestar:', error);
      throw error;
    }
  };

export const eliminarActividadBienestar = async (id, auditor) => {
    try {
        await axios.delete(`${API_BASE_URL}/bienestar/${id}`, {
            headers: getAuthHeader(),
            data: { auditor }
        });
    } catch (error) {
        console.error('Error al eliminar actividad de bienestar:', error);
        throw error;
    }
};