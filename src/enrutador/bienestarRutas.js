
// src/enrutador/bienestarRutas.js
import Bienestar from '../vistas/Bienestar.vue';

const bienestarRoutes = [
  {
    path: '/bienestar',
    name: 'Bienestar',
    component: Bienestar,
    meta: { requiereAutenticacion: true }
  },
];

export default bienestarRoutes;
