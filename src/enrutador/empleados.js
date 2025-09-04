// src/enrutador/empleados.js
import Empleados from '../vistas/Empleados.vue';
import EmpleadoContratos from '../vistas/EmpleadoContratos.vue';

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
