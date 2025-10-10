// src/router/reportesRutas.js
import Reportes from '../views/Reportes.vue';

const reportesRutas = [
  {
    path: '/reportes',
    name: 'Reportes',
    component: Reportes,
    meta: { requiereAutenticacion: true } // Suponiendo que se requiere autenticación
  }
];

export default reportesRutas;
