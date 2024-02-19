import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import Pets from './Pets.vue'
import PetService from "@/views/pessoa2/services/PetService";

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe("Tela Pets", () => {

    vi.spyOn(PetService, 'getAllPets').mockResolvedValue([
        {
            id: 1,
            name: "Bolinha",
            age: 2,
            gender: "Female",
            size: "Small"
        },
        {
            id: 2,
            name: "Frajola",
            age: 3,
            gender: "Male",
            size: "Medium"
        },
        {
            id: 3,
            name: "Mel",
            age: 1,
            gender: "Female",
            size: "Small"
        }
    ])

    it('Espera-se que a tela seja renderizada', () => {

        const component = mount(Pets, {
            global: {
                plugins: [vuetify]
            }
        })
        expect(component).toBeTruthy()
    })

   it("Espera-se que liste um card para cada pet", async () => {

        const component = mount(Pets)

        await flushPromises()

        expect(component.text()).toContain("Bolinha")
        expect(component.text()).toContain("Frajola")
        expect(component.text()).toContain("Mel")

        expect(component.findAll("[data-test='item-pet']")).toHaveLength(3)
    })

    it("Espera-se que navegue para a tela de perfil do pet clicado", async () => {

        const mockRouter = {
            push: vi.fn()
        }

        const component = mount(Pets, {
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        })

        await flushPromises()

        component.findAll("[data-test='item-pet']")[0].trigger("click")

        expect(mockRouter.push).toHaveBeenCalledWith('/pets-adocao/1/perfil')
        
    })

    it('Espera-se que a busca filtre os pets', async () => {

        const component = mount(Pets, {
          global: {
            plugins: [vuetify]
          }
        })
    
        await flushPromises()
    
        component.getComponent("[data-test='search-input']").setValue('')
        component.getComponent("[data-test='search-input']").trigger('input')
    
        await flushPromises()
    
        expect(component.text()).toContain('Bolinha')
        expect(component.text()).toContain('Frajola')
        expect(component.text()).toContain('Mel')
    })
})