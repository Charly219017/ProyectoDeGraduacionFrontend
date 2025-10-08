
// frontend/src/componentes/Nomina/NominasTabla.vue
<template>
  <div class="nominas-card">
    <h2 class="nominas-title">Lista de Nóminas</h2>
    <div v-if="cargando" class="nominas-empty">Cargando nóminas...</div>
    <div v-else-if="nominas.length > 0" class="nominas-table-container">
      <table class="nominas-table">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Empleado</th>
            <th>Período</th>
            <th>Salario Base</th>
            <th>Total Ingresos</th>
            <th>Total Descuentos</th>
            <th>Sueldo Líquido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="nomina in nominas" :key="nomina.id_nomina">
            <td>{{ nomina.id_nomina }}</td>
            <td>{{ nomina.empleado ? nomina.empleado.nombre_completo : 'N/A' }}</td>
            <td>{{ nomina.mes }}/{{ nomina.anio }}</td>
            <td>{{ formatCurrency(nomina.salario_base) }}</td>
            <td>{{ formatCurrency(nomina.total_ingresos) }}</td>
            <td>{{ formatCurrency(nomina.total_descuentos) }}</td>
            <td class="font-bold">{{ formatCurrency(nomina.sueldo_liquido) }}</td>
            <td>
              <button class="btn-editar" @click="$emit('editar', nomina)" title="Editar Entradas">Editar</button>
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
  cargando: {
    type: Boolean,
    default: true,
  },
});

defineEmits(['editar', 'eliminar']);

/**
 * Formatea un número como moneda en Quetzales (GTQ).
 * @param {number} value - El número a formatear.
 * @returns {string} - El valor formateado como moneda.
 */
const formatCurrency = (value) => {
  if (value === null || value === undefined) {
    return 'Q 0.00';
  }
  return new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ',
  }).format(value);
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
  white-space: nowrap; /* Evita que el texto se rompa en varias líneas */
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

.nominas-table td.font-bold {
    font-weight: 600;
    color: #333;
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
