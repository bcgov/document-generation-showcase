import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';

import getRouter from '@/router';
import NotFound from '@/views/NotFound.vue';

const router = getRouter();
const localVue = createLocalVue();
localVue.use(router);
localVue.use(Vuetify);

describe('NotFound.vue', () => {
  let vuetify;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();

    wrapper = mount(NotFound, {
      localVue,
      router,
      vuetify
    });
  });

  it('renders', () => {
    expect(wrapper.html()).toContain('404: Page not found. :(');
  });
});
