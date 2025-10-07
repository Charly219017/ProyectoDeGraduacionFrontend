import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Aplicacion from './Aplicacion.vue'
import router from './router/index.js'
import { useAuthStore } from './store/index.js'

const app = createApp(Aplicacion)

app.use(createPinia())

// Función asíncrona para inicializar la app
async function inicializarApp() {
  const authStore = useAuthStore()
  try {
    await authStore.cargarSesion() // Llamamos a la nueva función y esperamos
  } catch (error) {
    console.error("Fallo crítico durante la carga de sesión:", error)
  }

  app.use(router)
  app.mount('#app')
}

inicializarApp()