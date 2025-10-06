
// frontend/src/componentes/Nomina/NominasTabla.vue
<template>
  <div class="nominas-card">
    <h2 class="nominas-title">Lista de Nóminas</h2>
    <div v-if="cargando" class="nominas-empty">Cargando nóminas...</div>
    <div v-else-if="nominas.length > 0" class="nominas-table-container">
      <table class="nominas-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Empleado</th>
            <th>Fecha de Pago</th>
            <th>Monto Bruto</th>
            <th>Deducciones</th>
            <th>Monto Neto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="nomina in nominas" :key="nomina.id_nomina">
            <td>{{ nomina.id_nomina }}</td>
            <td>{{ getEmpleadoNombre(nomina.id_empleado) }}</td>
            <td>{{ new Date(nomina.fecha_pago).toLocaleDateString() }}</td>
            <td>{{ nomina.monto_bruto }}</td>
            <td>{{ nomina.deducciones }}</td>
            <td>{{ nomina.monto_neto }}</td>
            <td>
              <button class="btn-editar" @click="$emit('editar', nomina)">Editar</button>
              <button class="btn-eliminar" @click="$emit('eliminar', nomina.id_nomina)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="nominas-empty">
      No hay nóminas registradas.
    </div>
  </div>
</template>

<script setup>



const props = defineProps({
  nominas: {
    type: Array,
    required: true,
  },
  empleados: {
    type: Array,
    required: true,
  },
  cargando: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['editar', 'eliminar']);

const getEmpleadoNombre = (id_empleado) => {
  const empleado = props.empleados.find(e => e.id_empleado === id_empleado);
  return empleado ? empleado.nombre_completo : 'Desconocido';
};
</script>

<style scoped>
.nominas-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 32px 24px;
  margin-top: 32px;
  max-width: 100%;
}

.nominas-title {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
}

.nominas-table-container {
  overflow-x: auto;
}

.nominas-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.07);
}

.nominas-table th, .nominas-table td {
  padding: 14px 18px;
  text-align: left;
}

.nominas-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 2px solid #e2e8f0;
}

.nominas-table tr {
  transition: background 0.2s;
}

.nominas-table tbody tr:hover {
  background: #f3f6fd;
}

.nominas-table td {
  color: #444;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
}

.btn-editar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 600;
  margin-right: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-editar:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
}

.btn-eliminar {
  background: linear-gradient(135deg, #f56565 0%, #c53030 100%);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-eliminar:hover {
  background: linear-gradient(135deg, #e53e3e 0%, #9b2c2c 100%);
}

.nominas-empty {
  text-align: center;
  color: #888;
  padding: 32px 0 0 0;
  font-size: 16px;
}
</style>
