// frontend/src/router/inventarioRutas.js
import Inventario from '../views/Inventario.vue';
import InventarioCategorias from '../views/InventarioCategorias.vue';
import InventarioProductos from '../views/InventarioProductos.vue';
import InventarioMovimientos from '../views/InventarioMovimientos.vue';

const inventarioRutas = [
  {
    path: '/inventario',
    name: 'Inventario',
    component: Inventario,
    meta: { requiereAutenticacion: true, roles: ['Administrador'] }
  },
  {
    path: '/inventario/categorias',
    name: 'InventarioCategorias',
    component: InventarioCategorias,
    meta: { requiereAutenticacion: true, roles: ['Administrador'] }
  },
  {
    path: '/inventario/productos',
    name: 'InventarioProductos',
    component: InventarioProductos,
    meta: { requiereAutenticacion: true, roles: ['Administrador'] }
  },
  {
    path: '/inventario/movimientos',
    name: 'InventarioMovimientos',
    component: InventarioMovimientos,
    meta: { requiereAutenticacion: true, roles: ['Administrador'] }
  }
];

export default inventarioRutas;