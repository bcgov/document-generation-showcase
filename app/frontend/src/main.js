import axios from 'axios';
import Vue from 'vue';

import App from './App.vue';
import getRouter from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import KeycloakService from './common/keycloakService';
import configService from './common/configService';

Vue.config.productionTip = false;

// application publicPath is ./ - so use relative path here, will hit the backend server using relative path to root.
const CONFIG_URL = process.env.NODE_ENV === 'production' ? 'config' : 'app/config';

configService.load(CONFIG_URL)
  .then(config => {
    // add the config service to Vue as a plugin.
    // can be used in components like: this.$configService.get('title')
    Object.defineProperty(Vue.prototype, '$configService', {
      get () {
        return configService;
      }
    });
    return config;
  })
  .then(config => {
    //
    // now load our keycloak service using our configured realm/client
    // and load up the application.
    Vue.use(KeycloakService, {
      init: {
        onLoad: 'check-sso'
      },

      config: {
        url: config.keycloak.serverUrl,
        realm: config.keycloak.realm,
        clientId: config.keycloak.clientId
      },

      onReady: keycloak => {
        // load up some axios instances
        const instance = axios.create({});
        // one strictly for api, which we can automatically add the authorization header
        const instanceApi = axios.create({
          baseURL: config.apiPath
        });

        instanceApi.interceptors.request.use((config) => {
          if (keycloak.authenticated) {
            config.headers.Authorization = `Bearer ${keycloak.token}`;
          }
          return config;
        }, (error) => {
          return Promise.reject(error);
        });

        // make available to components...
        Vue.prototype.$http = instance;
        Vue.prototype.$httpApi = instanceApi;

        const router = getRouter(config.basePath);
        new Vue({
          vuetify,
          router,
          store,
          render: h => h(App),
        }).$mount('#app');
      }
    });
  });
