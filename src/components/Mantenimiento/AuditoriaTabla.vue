<template>
  <div class="auditoria-card">
    <h2 class="auditoria-title">Registro de Auditoría</h2>
    <div v-if="auditoria.length > 0" class="auditoria-table-container">
      <table class="auditoria-table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Acción</th>
            <th>Fecha</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(log, index) in auditoria" :key="index">
            <td>{{ obtenerUsuario(log) }}</td>
            <td><span :class="['accion-badge', `accion-${log.accion.toLowerCase()}`]">{{ log.accion }}</span></td>
            <td>{{ new Date(log.fecha).toLocaleString() }}</td>
            <td>{{ obtenerDescripcion(log) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="auditoria-empty">
      No hay registros de auditoría.
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  auditoria: {
    type: Array,
    required: true,
  }
});

/**
 * Obtiene el identificador del usuario que realizó la acción.
 * El backend ahora envía el nombre del usuario directamente.
 * @param {Object} log - El objeto de log de auditoría.
 * @returns {string} El nombre del usuario o un ID de respaldo.
 */
const obtenerUsuario = (log) => {
  // Asumiendo que el backend ahora une la tabla de usuarios y envía el nombre.
  // Si 'log.nombre_usuario' no existe, muestra el ID como respaldo.
  return log.nombre_usuario || `ID: ${log.usuario || 'Sistema'}`;
};

/**
 * Devuelve la descripción del log.
 * Aprovecha los campos del trigger para dar más detalle en los UPDATES.
 * @param {Object} log - El objeto de log de auditoría.
 * @returns {string} La descripción de la acción.
 */
const obtenerDescripcion = (log) => {
  // Si es un UPDATE, construye la descripción a partir de los campos individuales.
  if (log.accion === 'UPDATE' && log.campo_modificado) {
    return `Campo '${log.campo_modificado}' cambió de '${log.valor_anterior || 'vacío'}' a '${log.valor_nuevo || 'vacío'}'`;
  }
  
  // Para otros tipos de logs (login, etc.), intenta parsear el JSON.
  // Esto mantiene la compatibilidad con logs que guardan la descripción como JSON.
  if (log.descripcion && log.descripcion.startsWith('{')) {
    try {
      const detalles = JSON.parse(log.descripcion);
      return detalles.mensaje || log.descripcion;
    } catch (e) {
      // Si falla el parseo, devuelve la descripción original.
      return log.descripcion;
    }
  }
  
  // Para logs de INSERT/DELETE de los triggers, que tienen descripciones simples.
  return log.descripcion;
};
</script>

<style scoped>
.auditoria-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 32px 24px;
  margin-top: 32px;
  max-width: 100%;
}

.auditoria-title {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
}

.auditoria-table-container {
  overflow-x: auto;
}

.auditoria-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.07);
}

.auditoria-table th, .auditoria-table td {
  padding: 14px 18px;
  text-align: left;
}

.auditoria-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 2px solid #e2e8f0;
}

.auditoria-table tr {
  transition: background 0.2s;
}

.auditoria-table tbody tr:hover {
  background: #f3f6fd;
}

.auditoria-table td {
  color: #444;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
}

.auditoria-empty {
  text-align: center;
  color: #888;
  padding: 32px 0 0 0;
  font-size: 16px;
}

.accion-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 12px;
  color: white;
  text-transform: uppercase;
}

.accion-insert {
  background-color: #3100f6; /* Azul (anteriormente verde) */
}

.accion-update {
  background-color: #fbbf24; /* Ámbar */
}

.accion-delete {
  background-color: #f87171; /* Rojo */
}


</style>
