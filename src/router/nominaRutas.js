// src/enrutador/nominaRutas.js
import NominaNominas from '../views/NominaNominas.vue';
import NominaVacaciones from '../views/NominaVacaciones.vue';

const nominaRoutes = [
  {
    path: '/nomina/nominas',
    name: 'NominaNominas',
    component: NominaNominas,
    meta: { requiereAutenticacion: true }
  },
  {
    path: '/nomina/vacaciones',
    name: 'NominaVacaciones',
    component: NominaVacaciones,
    meta: { requiereAutenticacion: true }
  }
];

export default nominaRoutes;