import Vue from 'vue';
import VueRouter from 'vue-router';

const CDOGS = () => import('../views/CDOGS.vue');
const Home = () => import('../views/Home.vue');
const NotFound = () => import('../views/NotFound.vue');
const Performance = () => import('../views/Performance.vue');

Vue.use(VueRouter);

const getRouter = (pathRoot = '/') => {
  return new VueRouter({
    base: pathRoot,
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/cdogs',
        name: 'cdogs',
        component: CDOGS
      },
      {
        path: '/performance',
        name: 'performance',
        component: Performance
      },
      {
        path: '/404',
        alias: '*',
        name: 'notFound',
        component: NotFound
      }
    ]
  });
};

export default getRouter;
