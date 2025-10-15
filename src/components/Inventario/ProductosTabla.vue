<template>
  <div class="productos-card">
    <h2 class="productos-title">Lista de Productos</h2>
    <div v-if="cargando" class="productos-empty">Cargando productos...</div>
    <div v-else-if="productos.length > 0" class="productos-table-container">
      <table class="productos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Stock Mín.</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.id_producto">
            <td>{{ producto.id_producto }}</td>
            <td>{{ producto.nombre_producto }}</td>
            <td>{{ producto.descripcion }}</td>
            <td>{{ producto.categoria ? producto.categoria.nombre_categoria : 'N/A' }}</td>
            <td>{{ producto.precio_unitario }}</td>
            <td>{{ producto.stock_actual }}</td>
            <td>{{ producto.stock_minimo }}</td>
            <td>
              <button class="btn-editar" @click="$emit('editar', producto)">Editar</button>
              <button class="btn-eliminar" @click="$emit('eliminar', producto.id_producto)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="productos-empty">
      No hay productos registrados.
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  productos: {
    type: Array,
    required: true,
  },
  cargando: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['editar', 'eliminar']);
</script>

<style scoped>
.productos-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 32px 24px;
  margin-top: 32px;
  max-width: 100%;
}

.productos-title {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
}

.productos-table-container {
  overflow-x: auto;
}

.productos-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.07);
}

.productos-table th, .productos-table td {
  padding: 14px 18px;
  text-align: left;
  white-space: nowrap;
}

.productos-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 2px solid #e2e8f0;
}

.productos-table tr {
  transition: background 0.2s;
}

.productos-table tbody tr:hover {
  background: #f3f6fd;
}

.productos-table td {
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

.productos-empty {
  text-align: center;
  color: #888;
  padding: 32px 0 0 0;
  font-size: 16px;
}
</style>
