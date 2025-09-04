// src/enrutador/reclutamientoRutas.js
import ReclutamientoVacantes from '../views/ReclutamientoVacantes.vue';
import ReclutamientoCandidatos from '../views/ReclutamientoCandidatos.vue';
import ReclutamientoAplicaciones from '../views/ReclutamientoAplicaciones.vue';
import ReclutamientoCriterios from '../views/ReclutamientoCriterios.vue';
import ReclutamientoEvaluaciones from '../views/ReclutamientoEvaluaciones.vue';
import ReclutamientoDetallesEvaluacion from '../views/ReclutamientoDetallesEvaluacion.vue';

const reclutamientoRoutes = [
  {
    path: '/reclutamiento/vacantes',
    name: 'ReclutamientoVacantes',
    component: ReclutamientoVacantes,
    meta: { requiereAutenticacion: true }
  },
  {
    path: '/reclutamiento/candidatos',
    name: 'ReclutamientoCandidatos',
    component: ReclutamientoCandidatos,
    meta: { requiereAutenticacion: true }
  },
  {
    path: '/reclutamiento/aplicaciones',
    name: 'ReclutamientoAplicaciones',
    component: ReclutamientoAplicaciones,
    meta: { requiereAutenticacion: true }
  },
  {
    path: '/reclutamiento/criterios',
    name: 'ReclutamientoCriterios',
    component: ReclutamientoCriterios,
    meta: { requiereAutenticacion: true }
  },
  {
    path: '/reclutamiento/evaluaciones',
    name: 'ReclutamientoEvaluaciones',
    component: ReclutamientoEvaluaciones,
    meta: { requiereAutenticacion: true }
  },
  {
    path: '/reclutamiento/detalles_evaluacion',
    name: 'ReclutamientoDetallesEvaluacion',
    component: ReclutamientoDetallesEvaluacion,
    meta: { requiereAutenticacion: true }
  }
];

export default reclutamientoRoutes;