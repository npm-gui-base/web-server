import VueRouter from 'vue-router';
import routes from './components/routes';

const router = new VueRouter({
  // mode: 'history',
  routes,
});

export default { router, VueRouter };
