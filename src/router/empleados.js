// src/enrutador/empleados.js
import Empleados from '../views/Empleados.vue';
import EmpleadoContratos from '../views/EmpleadoContratos.vue';

const empleadosRoutes = [
  {
    path: '/empleados',
    name: 'Empleados',
    component: Empleados,
    meta: { requiereAutenticacion: true }
  },
  {
    path: '/empleados/:id/contratos',
    name: 'EmpleadoContratos',
    component: EmpleadoContratos,
    meta: { requiereAutenticacion: true }
  }
];

export default empleadosRoutes;
