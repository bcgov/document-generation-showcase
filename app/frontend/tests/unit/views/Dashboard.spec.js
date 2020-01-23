import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';

import getRouter from '@/router';
import Dashboard from '@/views/Dashboard.vue';

const router = getRouter();
const localVue = createLocalVue();
localVue.use(router);
localVue.use(Vuetify);

describe('Dashboard.vue', () => {
  let vuetify;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();

    wrapper = mount(Dashboard, {
      localVue,
      router,
      vuetify
    });
  });

  it('renders', () => {
    expect(wrapper.html()).toContain('Performance Dashboard');
  });
});
