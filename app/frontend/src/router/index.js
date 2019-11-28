import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import Secure from '../views/Secure.vue';

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
        path: '/secure',
        name: 'secure',
        component: Secure
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
