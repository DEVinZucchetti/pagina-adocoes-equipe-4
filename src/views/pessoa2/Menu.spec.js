import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Menu from './Menu.vue'


import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe("Menu", () => {

   it('Espera-se que a tela seja renderizada', () => {
      const component = mount(Menu, {
          global: {
              plugins: [vuetify]
          }
      })
      expect(component).toBeTruthy()
   })

   it("Espera-se alternar a propriedade 'drawer' quando o ícone de navegação é clicado", async () => {
     
      const wrapper = mount(Menu, {
         global: {
            plugins: [vuetify]
         }   
      });
  
      expect(wrapper.vm.drawer).toBe(false);

      await wrapper.find('.v-app-bar-nav-icon').trigger("click");

      expect(wrapper.vm.drawer).toBe(true);

   });
})
