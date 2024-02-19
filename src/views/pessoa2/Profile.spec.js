import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it, vi} from "vitest";
import Profile from './Profile.vue'
import PetService from "@/views/pessoa2/services/PetService";

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe("Tela profile", () => {

    const mockRoute = {
        params: {
            id: 1
        }
    }

    vi.spyOn(PetService, 'getOnePet').mockResolvedValue({
        id: 1,
        name: 'Bolinha',
        age: 2,
        gender: 'Female',
        size: 'Small',
        breed: 'Mixed Breed',
      })


    it('Espera-se que a tela seja renderizada', () => {
        const component = mount(Profile, {
          global: {
            plugins: [vuetify],
            mocks: {
              $route: mockRoute
            }
          }
        })
    
        expect(component).toBeTruthy()
    })

    it('Espera-se que exiba as informações do pet', async () => {
        const component = mount(Profile, {
          global: {
            plugins: [vuetify],
            mocks: {
              $route: mockRoute
            }
          }
        })
    
        await flushPromises()
    
        expect(component.get("[data-test='pet-name']").text()).toContain('Bolinha')
        expect(component.get("[data-test='pet-age']").text()).toContain('Idade: 2')
        expect(component.get("[data-test='pet-gender']").text()).toContain('Gênero: Fêmea')
        expect(component.get("[data-test='pet-size']").text()).toContain('Porte do animal: Pequeno')
        expect(component.get("[data-test='pet-breed']").text()).toContain('Raça: Mixed Breed')
    })

    it('Espera-se que ao submeter o formulário, seja enviado os dados corretamente', async () => {
        const adoptPet = vi.spyOn(PetService, 'adoptPet').mockRejectedValue([])
    
        const component = mount(Profile, {
          global: {
            plugins: [vuetify],
            mocks: {
              $route: mockRoute
            }
          }
        })
    
        await flushPromises()
    
        component.getComponent("[data-test='input-name']").setValue('Rodrigo Rodrigues')
        component.getComponent("[data-test='input-email']").setValue('rodrigues@gmail.com')
        component.getComponent("[data-test='input-contact']").setValue('1234-5678')
        component.getComponent("[data-test='input-observations']").setValue('...')

        component.getComponent("[data-test='submit-button']").trigger('submit')
    
        expect(adoptPet).toBeCalledWith({
          name: 'Rodrigo Rodrigues',
          email: 'rodrigues@gmail.com',
          contact: '1234-5678',
          observations: '...'
        })
    })
    
})