import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import Secure from '../views/Secure.vue';

Vue.use(VueRouter);

const getRouter = (pathRoot = '/') => {
  const router = new VueRouter({
    mode: 'history',
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

  // WIP attempt to handle refresh routing issues
  // router.beforeEach((to, _from, next) => {
  //   console.log(to);
  //   if (!to.matched.length) {
  //     next({ name: 'notFound' });
  //   } else {
  //     console.log(to.query.rpath);
  //     next({ path: to.query.rpath, query: '' });
  //     // window.location.href = to.query.rpath;
  //   }
  // });

  return router;
};

export default getRouter;
