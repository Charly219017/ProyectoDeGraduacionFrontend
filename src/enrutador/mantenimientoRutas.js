// carpeta frontend src/enrutador/mantenimientoRutas.js
import MantenimientoUsuarios from '../vistas/MantenimientoUsuarios.vue';

export const rutasMantenimiento = [
  {
    path: '/mantenimiento/usuarios',
    name: 'MantenimientoUsuarios',
    component: MantenimientoUsuarios,
    meta: { requiereAutenticacion: true, rolRequerido: ['administrador'] }
  }
];
