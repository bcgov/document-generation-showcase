import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';

import getRouter from '@/router';
import NavigationBar from '@/components/bcgov/NavigationBar.vue';

const router = getRouter();
const localVue = createLocalVue();
localVue.use(router);
localVue.use(Vuetify);

describe('NavigationBar.vue', () => {
  let vuetify;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();

    wrapper = mount(NavigationBar, {
      localVue,
      router,
      vuetify
    });
  });

  it('renders', () => {
    expect(wrapper.html()).toContain('Home');
    expect(wrapper.html()).toContain('CDOGS v2');
    expect(wrapper.html()).toContain('CDOGS Performance');
  });
});
