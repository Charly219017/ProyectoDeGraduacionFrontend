/src/Aplicacion.vue
<template>
  <div id="app">
    <BarraNavegacion v-if="mostrarNavegacion" />
    <main class="contenido-principal">
      <router-view />
    </main>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BarraNavegacion from './components/BarraNavegacion.vue'

export default {
  name: 'Aplicacion',
  components: {
    BarraNavegacion
  },
  setup() {
    const route = useRoute()
    
    // Mostrar navegación solo si no estamos en login
    const mostrarNavegacion = computed(() => {
      return route.name !== 'Login'
    })

    return {
      mostrarNavegacion
    }
  }
}
</script>

<style>
/* Reset y estilos base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
  color: #333;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.contenido-principal {
  flex: 1;
  padding: 20px;
}

/* Variables CSS para colores del tema */
:root {
  --color-primario: #2563eb;
  --color-secundario: #1e40af;
  --color-exito: #059669;
  --color-advertencia: #d97706;
  --color-error: #dc2626;
  --color-fondo: #f8fafc;
  --color-texto: #1f2937;
  --color-texto-secundario: #6b7280;
  --color-borde: #e5e7eb;
  --color-sombra: rgba(0, 0, 0, 0.1);
}

/* Estilos para botones */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.btn-primario {
  background-color: var(--color-primario);
  color: white;
}

.btn-primario:hover {
  background-color: var(--color-secundario);
}

.btn-secundario {
  background-color: white;
  color: var(--color-primario);
  border: 1px solid var(--color-primario);
}

.btn-secundario:hover {
  background-color: var(--color-primario);
  color: white;
}

/* Estilos para formularios */
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-texto);
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-borde);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: border-color 0.2s ease-in-out;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primario);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* Estilos para tarjetas */
.card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px var(--color-sombra);
  padding: 1.5rem;
}

/* Estilos para alertas */
.alert {
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.alert-error {
  background-color: #fef2f2;
  color: var(--color-error);
  border: 1px solid #fecaca;
}

.alert-success {
  background-color: #f0fdf4;
  color: var(--color-exito);
  border: 1px solid #bbf7d0;
}

/* Utilidades */
.text-center {
  text-align: center;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-4 {
  margin-top: 1rem;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}
</style> 