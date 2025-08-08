// carpeta frontend src/componentes/Mantenimiento/UsuariosTabla.vue
<template>
  <div class="bg-white rounded-lg shadow-md p-6 mt-6">
    <h2 class="text-xl font-semibold mb-4">Lista de Usuarios</h2>
    <div v-if="cargando" class="text-center p-4 text-gray-500">Cargando usuarios...</div>
    <div v-else-if="usuarios.length > 0" class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="usuario in usuarios" :key="usuario.id_usuario">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ usuario.id_usuario }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ usuario.nombre_usuario }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ usuario.correo }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ usuario.rol }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button @click="$emit('editar', usuario)" class="text-indigo-600 hover:text-indigo-900 mr-4">Editar</button>
              <button @click="$emit('eliminar', usuario.id_usuario)" class="text-red-600 hover:text-red-900">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center p-4 text-gray-500">
      No hay usuarios registrados.
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  usuarios: {
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
