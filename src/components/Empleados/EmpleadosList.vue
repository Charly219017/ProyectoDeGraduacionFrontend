<!-- src/componentes/Empleados/EmpleadosList.vue -->
<template>
  <div class="lista-empleados-card">
    <h2 class="lista-empleados-title">
      Lista de Empleados
    </h2>

    <div v-if="cargando" class="cargando-mensaje">
      Cargando empleados...
    </div>

    <div v-else-if="empleados.length > 0" class="tabla-container">
      <table class="empleados-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Puesto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="empleado in empleados" 
            :key="empleado.id_empleado"
          >
            <td>{{ empleado.id_empleado }}</td>
            <td>{{ empleado.nombre_completo }}</td>
            <td>{{ empleado.correo_personal }}</td>
            <td>{{ getPuestoNombre(empleado.id_puesto) }}</td>
            <td class="acciones-cell">
              <button @click="$emit('editar', empleado)" class="btn-editar">
                Editar
              </button>
              <button @click="$emit('eliminar', empleado.id_empleado)" class="btn-eliminar">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="sin-empleados-mensaje">
      No hay empleados registrados.
    </div>
  </div>
</template>

<script setup>



const props = defineProps({
  empleados: {
    type: Array,
    required: true
  },
  cargando: {
    type: Boolean,
    required: true
  },
  puestos: {
    type: Array,
    required: true
  }
});

const getPuestoNombre = (puestoId) => {
  const puesto = props.puestos.find(p => p.id_puesto === puestoId);
  return puesto ? puesto.nombre_puesto : 'No asignado';
};

const emits = defineEmits(['editar', 'eliminar']);
</script>

<style scoped>
/* Estilos para la tarjeta principal de la lista */
.lista-empleados-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 32px 24px;
  margin-top: 32px;
  max-width: 100%;
}

.lista-empleados-title {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
}

/* Mensajes de estado */
.cargando-mensaje,
.sin-empleados-mensaje {
  text-align: center;
  color: #888;
  padding: 32px 0;
  font-size: 16px;
}

/* Contenedor de la tabla para overflow en móvil */
.tabla-container {
  overflow-x: auto;
}

/* Estilos de la tabla */
.empleados-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.07);
}

.empleados-table th,
.empleados-table td {
  padding: 14px 18px;
  text-align: left;
  vertical-align: middle;
}

.empleados-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 2px solid #e2e8f0;
  white-space: nowrap;
}

.empleados-table tbody tr {
  transition: background 0.2s ease;
}

.empleados-table tbody tr:hover {
  background: #f3f6fd;
}

.empleados-table td {
  color: #444;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
}

.acciones-cell {
  display: flex;
  gap: 8px;
  align-items: center;
}

.acciones-cell button {
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
}

.btn-editar {
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
}
.btn-editar:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.btn-eliminar {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}
.btn-eliminar:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}
</style>
