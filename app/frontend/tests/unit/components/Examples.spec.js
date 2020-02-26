import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';

import Examples from '@/components/Examples.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('Examples.vue', () => {
  let vuetify;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();

    wrapper = mount(Examples, {
      localVue,
      vuetify
    });
  });

  it('renders', () => {
    expect(wrapper.html()).toContain('Example Templates and Data Files');
  });
});
