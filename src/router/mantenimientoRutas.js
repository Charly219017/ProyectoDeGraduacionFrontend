// src/router/mantenimientoRutas.js
import MantenimientoUsuarios from '../views/MantenimientoUsuarios.vue';
import MantenimientoDependencias from '../views/MantenimientoDependencias.vue';
import MantenimientoPuestos from '../views/MantenimientoPuestos.vue';
import MantenimientoCarreras from '../views/MantenimientoCarreras.vue';

export const rutasMantenimiento = [
  {
    path: '/mantenimiento/usuarios',
    name: 'MantenimientoUsuarios',
    component: MantenimientoUsuarios,
    meta: { requiereAutenticacion: true, rolRequerido: ['administrador'] }
  },
  {
    path: '/mantenimiento/dependencias',
    name: 'MantenimientoDependencias',
    component: MantenimientoDependencias,
    meta: { requiereAutenticacion: true, rolRequerido: ['administrador'] }
  },
  {
    path: '/mantenimiento/puestos',
    name: 'MantenimientoPuestos',
    component: MantenimientoPuestos,
    meta: { requiereAutenticacion: true, rolRequerido: ['administrador'] }
  },
  {
    path: '/mantenimiento/carreras',
    name: 'MantenimientoCarreras',
    component: MantenimientoCarreras,
    meta: { requiereAutenticacion: true, rolRequerido: ['administrador'] }
  }
];