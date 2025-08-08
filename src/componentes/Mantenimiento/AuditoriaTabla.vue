<template>
  <div class="bg-white rounded-lg shadow-md p-6 mt-6">
    <h2 class="text-xl font-semibold mb-4">Registro de Auditoría</h2>
    <div v-if="auditoria.length > 0" class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usuario
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acción
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descripción
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(log, index) in auditoria" :key="index">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ log.usuarioNombre }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ log.accion }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ new Date(log.fecha).toLocaleString() }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ log.descripcion }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center p-4 text-gray-500">
      No hay registros de auditoría.
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  auditoria: {
    type: Array,
    required: true,
  }
});
</script>
