// carpeta frontend src/enrutador/mantenimientoRutas.js
import MantenimientoUsuarios from '../vistas/MantenimientoUsuarios.vue';
import MantenimientoDependencias from '../vistas/MantenimientoDependencias.vue';

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
  }
];
