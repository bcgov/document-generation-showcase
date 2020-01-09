import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';

import Header from '@/components/Header';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('Header.vue', () => {
  let vuetify;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();

    // need to add in our keycloak service
    Object.defineProperty(localVue.prototype, '$keycloak', {
      get () {
        return {
          authenticated: false,
          logoutFn: () => {},
          loginFn: () => {}
        };
      }
    });

    // need to add in our config service
    Object.defineProperty(localVue.prototype, '$configService', {
      get () {
        return {
          get: (v) => { return `Value of ${v}`; }
        };
      }
    });

    wrapper = mount(Header, {
      localVue,
      vuetify
    });
  });

  it('has the gov link', () => {
    expect(wrapper.html()).toContain('https://www2.gov.bc.ca');
  });
});
