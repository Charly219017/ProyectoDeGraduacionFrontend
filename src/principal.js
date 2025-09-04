// carpeta frontend src/principal.js

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Aplicacion from './Aplicacion.vue'
import router from './router/index.js'

// Crear Pinia store
const pinia = createPinia()

// Crear aplicación Vue
const app = createApp(Aplicacion)

// Usar plugins
app.use(pinia)
app.use(router)

// Montar aplicación
app.mount('#app') 