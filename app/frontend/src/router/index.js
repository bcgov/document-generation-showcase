import Vue from 'vue';
import VueRouter from 'vue-router';

import CDOGS from '../views/CDOGS.vue';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import Performance from '../views/Performance.vue';

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
