// frontend/src/componentes/Reclutamiento/AplicacionesTabla.vue
<template>
  <div class="aplicaciones-card">
    <h2 class="aplicaciones-title">Lista de Aplicaciones</h2>
    <div v-if="cargando" class="aplicaciones-empty">Cargando aplicaciones...</div>
    <div v-else-if="aplicaciones.length > 0" class="aplicaciones-table-container">
      <table class="aplicaciones-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vacante</th>
            <th>Candidato</th>
            <th>Fecha de Aplicación</th>
            <th>Estado</th>
            <th>Observaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="aplicacion in aplicaciones" :key="aplicacion.id_aplicacion">
            <td>{{ aplicacion.id_aplicacion }}</td>
            <td>{{ getVacanteNombre(aplicacion.id_vacante) }}</td>
            <td>{{ getCandidatoNombre(aplicacion.id_candidato) }}</td>
            <td>{{ new Date(aplicacion.fecha_aplicacion).toLocaleDateString() }}</td>
            <td>{{ aplicacion.estado_aplicacion }}</td>
            <td>{{ aplicacion.observaciones }}</td>
            <td>
              <button class="btn-editar" @click="$emit('editar', aplicacion)">Editar</button>
              <button class="btn-eliminar" @click="$emit('eliminar', aplicacion.id_aplicacion)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="aplicaciones-empty">
      No hay aplicaciones registradas.
    </div>
  </div>
</template>

<script setup>



const props = defineProps({
  aplicaciones: {
    type: Array,
    required: true,
  },
  vacantes: {
    type: Array,
    required: true,
  },
  candidatos: {
    type: Array,
    required: true,
  },
  cargando: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['editar', 'eliminar']);

const getVacanteNombre = (id_vacante) => {
  const vacante = props.vacantes.find(v => v.id_vacante === id_vacante);
  return vacante ? vacante.titulo : 'Desconocido';
};

const getCandidatoNombre = (id_candidato) => {
  const candidato = props.candidatos.find(c => c.id_candidato === id_candidato);
  return candidato ? candidato.nombre_completo : 'Desconocido';
};
</script>

<style scoped>
.aplicaciones-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 32px 24px;
  margin-top: 32px;
  max-width: 100%;
}

.aplicaciones-title {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
}

.aplicaciones-table-container {
  overflow-x: auto;
}

.aplicaciones-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.07);
}

.aplicaciones-table th, .aplicaciones-table td {
  padding: 14px 18px;
  text-align: left;
}

.aplicaciones-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 2px solid #e2e8f0;
}

.aplicaciones-table tr {
  transition: background 0.2s;
}

.aplicaciones-table tbody tr:hover {
  background: #f3f6fd;
}

.aplicaciones-table td {
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

.aplicaciones-empty {
  text-align: center;
  color: #888;
  padding: 32px 0 0 0;
  font-size: 16px;
}
</style>