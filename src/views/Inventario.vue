<template>
  <div class="inventario-view">
    <header class="view-header">
      <h1>Módulo de Inventario</h1>
      <p>Seleccione una opción para gestionar el inventario.</p>
    </header>

    <div class="options-grid">
      <router-link to="/inventario/productos" class="option-card">
        <div class="option-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.99 8.89L13.1 0 4.21 8.89c-1.64 1.64-1.64 4.3 0 5.94l8.89 8.89 8.89-8.89c1.64-1.64 1.64-4.3 0-5.94zM12 15.5l-4-4h8l-4 4z"/>
          </svg>
        </div>
        <h3>Gestión de Productos</h3>
        <p>Administrar productos, precios y stock.</p>
      </router-link>

      <router-link to="/inventario/categorias" class="option-card">
        <div class="option-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.86L12 5.84zM21.41 11.59l-7.79-7.79a.996.996 0 00-1.41 0L4.59 11.59a.996.996 0 000 1.41l7.79 7.79c.39.39 1.02.39 1.41 0l7.79-7.79a.996.996 0 000-1.41zM12 20.24l-6.36-6.36h12.72L12 20.24z"/>
          </svg>
        </div>
        <h3>Gestión de Categorías</h3>
        <p>Organizar los productos en categorías.</p>
      </router-link>

      <router-link to="/inventario/movimientos" class="option-card">
        <div class="option-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 6.5V3h-2v3.5H6.5V3H3v3.5H1v2h2.5V11H1v2h2.5v2.5H1v2h2.5V21h3v-3.5h6.5V21h3v-3.5H23v-2h-2.5V13H23v-2h-2.5V8.5H23v-2h-2.5V3h-3v3.5H15zM13 13H8.5V8.5H13V13z"/>
          </svg>
        </div>
        <h3>Movimientos de Inventario</h3>
        <p>Registrar entradas y salidas de productos.</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Inventario'
}
</script>

<style scoped>
.inventario-view {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.view-header {
  text-align: center;
  margin-bottom: 40px;
}

.view-header h1 {
  color: #333;
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.view-header p {
  color: #666;
  font-size: 18px;
  margin: 0;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.option-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.option-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.option-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: white;
}

.option-icon svg {
  width: 32px;
  height: 32px;
}

.option-card h3 {
  color: #333;
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
}

.option-card p {
  color: #666;
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}
</style>
