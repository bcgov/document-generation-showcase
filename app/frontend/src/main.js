import axios from 'axios';
import Vue from 'vue';

import App from './App.vue';
import getRouter from './router';
import store from './store';
import VueKeycloakJs from './plugins/keycloak';
import vuetify from './plugins/vuetify';

import configService from './common/configService';

Vue.config.productionTip = false;

function initializeApp(router = undefined, store = undefined) {
  new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
}

// Do a barebones mount before configuration is in to display a loading spinner
initializeApp();

// application publicPath is ./ - so use relative path here, will hit the backend server using relative path to root.
const CONFIG_URL = process.env.NODE_ENV === 'production' ? 'config' : 'app/config';

configService.load(CONFIG_URL)
  .then(config => {
    // add the config service to Vue as a plugin.
    // can be used in components like: this.$configService.get('title')
    Object.defineProperty(Vue.prototype, '$configService', {
      get() {
        return configService;
      }
    });
    return config;
  })
  .then(config => {
    // now load our keycloak service using our configured realm/client
    // and load up the application.
    Vue.use(VueKeycloakJs, {
      init: {
        onLoad: 'check-sso'
      },
      config: {
        clientId: config.keycloak.clientId,
        realm: config.keycloak.realm,
        url: config.keycloak.serverUrl
      },
      onReady: kc => {
        const timeout = 10000;
        // Generic Axios instance with timeout
        const instance = axios.create({ timeout: timeout });
        // API focused Axios instance with timeout and authorization header insertion
        const instanceApi = axios.create({
          baseURL: `${config.basePath}/${config.apiPath}`,
          timeout: timeout
        });

        instanceApi.interceptors.request.use(cfg => {
          if (kc.authenticated) {
            cfg.headers.Authorization = `Bearer ${kc.token}`;
          }
          return Promise.resolve(cfg);
        }, error => {
          return Promise.reject(error);
        });

        // Make available to components
        Vue.prototype.$http = instance;
        Vue.prototype.$httpApi = instanceApi;

        // Remount once configuration is loaded
        const router = getRouter(config.basePath);
        initializeApp(router, store);
      }
    });
  })
  .catch(err => {
    console.error(err.message); // eslint-disable-line no-console
  });
