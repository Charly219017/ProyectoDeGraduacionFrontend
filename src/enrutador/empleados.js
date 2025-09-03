// src/enrutador/empleados.js
import Empleados from '../vistas/Empleados.vue';

const empleadosRoutes = [
  {
    path: '/mantenimiento/empleados',
    name: 'Empleados',
    component: Empleados,
    meta: { requiereAutenticacion: true }
  },
];

export default empleadosRoutes;
