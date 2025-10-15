<template>
  <div class="movimientos-card">
    <h2 class="movimientos-title">Historial de Movimientos</h2>
    <div v-if="cargando" class="movimientos-empty">Cargando movimientos...</div>
    <div v-else-if="movimientos.length > 0" class="movimientos-table-container">
      <table class="movimientos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Producto</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Usuario</th>
            <th>Observaciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movimiento in movimientos" :key="movimiento.id_movimiento">
            <td>{{ movimiento.id_movimiento }}</td>
            <td>{{ new Date(movimiento.fecha_movimiento).toLocaleString() }}</td>
            <td>{{ movimiento.producto ? movimiento.producto.nombre_producto : 'N/A' }}</td>
            <td>
              <span :class="getTipoClass(movimiento.tipo_movimiento)">
                {{ movimiento.tipo_movimiento }}
              </span>
            </td>
            <td>{{ movimiento.cantidad }}</td>
            <td>{{ movimiento.creador ? movimiento.creador.nombre_usuario : 'N/A' }}</td>
            <td>{{ movimiento.observaciones }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="movimientos-empty">
      No hay movimientos registrados.
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  movimientos: {
    type: Array,
    required: true,
  },
  cargando: {
    type: Boolean,
    default: true,
  },
});

const getTipoClass = (tipo) => {
  return tipo === 'Entrada' ? 'tipo-entrada' : 'tipo-salida';
};
</script>

<style scoped>
.movimientos-card { background: white; border-radius: 16px; box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06); padding: 32px 24px; margin-top: 32px; max-width: 100%; }
.movimientos-title { color: #333; font-size: 24px; font-weight: 600; margin-bottom: 24px; text-align: center; }
.movimientos-table-container { overflow-x: auto; }
.movimientos-table { width: 100%; border-collapse: separate; border-spacing: 0; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.07); }
.movimientos-table th, .movimientos-table td { padding: 14px 18px; text-align: left; white-space: nowrap; }
.movimientos-table th { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 14px; font-weight: 600; border-bottom: 2px solid #e2e8f0; }
.movimientos-table tr { transition: background 0.2s; }
.movimientos-table tbody tr:hover { background: #f3f6fd; }
.movimientos-table td { color: #444; font-size: 14px; border-bottom: 1px solid #f0f0f0; }
.movimientos-empty { text-align: center; color: #888; padding: 32px 0 0 0; font-size: 16px; }

.tipo-entrada {
  background-color: #e6f4ea;
  color: #34a853;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.tipo-salida {
  background-color: #fce8e6;
  color: #ea4335;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
}
</style>
