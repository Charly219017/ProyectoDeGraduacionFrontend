<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>Sistema Jireh</h1>
        <p>Gestión de Recursos Humanos</p>
      </div>

      <form @submit.prevent="manejarLogin" class="login-form">
        <div class="form-group">
          <label for="correo">Correo Electrónico</label>
          <input
            id="correo"
            v-model="formulario.correo"
            type="email"
            required
            placeholder="Ingrese su correo electrónico"
            :disabled="cargando"
          />
        </div>

        <div class="form-group">
          <label for="contrasena">Contraseña</label>
          <input
            id="contrasena"
            v-model="formulario.contrasena"
            type="password"
            required
            placeholder="Ingrese su contraseña"
            :disabled="cargando"
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button 
          type="submit" 
          class="btn-login"
          :disabled="cargando"
        >
          <span v-if="cargando">Iniciando sesión...</span>
          <span v-else>Iniciar Sesión</span>
        </button>
      </form>

      <div class="login-footer">
        <p>¿No tienes una cuenta? Contacta al administrador</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/index.js'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const formulario = reactive({
      correo: '',
      contrasena: ''
    })

    const cargando = computed(() => authStore.obtenerCargando)
    const error = computed(() => authStore.obtenerError)

    const manejarLogin = async () => {
      try {
        const credenciales = {
          nombre_usuario: formulario.correo,
          contrasena: formulario.contrasena
        };

        const resultado = await authStore.login(credenciales);
        
        if (resultado && resultado.exito) {
          formulario.correo = '';
          formulario.contrasena = '';
          router.push('/dashboard');
        }
      } catch (err) {
        console.error('Error en login:', err)
      }
    }

    return {
      formulario,
      cargando,
      error,
      manejarLogin
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  color: #333;
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 600;
}

.login-header p {
  color: #666;
  margin: 0;
  font-size: 16px;
}

.login-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.form-group input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.error-message {
  background-color: #fee;
  color: #c53030;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  border: 1px solid #fecaca;
}

.btn-login {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.login-footer {
  text-align: center;
  margin-top: 20px;
}

.login-footer p {
  color: #666;
  font-size: 14px;
  margin: 0;
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }
  
  .login-header h1 {
    font-size: 24px;
  }
}
</style>