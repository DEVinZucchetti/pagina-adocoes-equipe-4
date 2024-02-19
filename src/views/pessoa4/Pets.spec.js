import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import Pets from './Pets.vue'
import PetService from "@/services/PetService";

describe("Tela de listagem de pets", () => {

    vi.spyOn(PetService, 'getAllPets').mockResolvedValue([
        {
            id: 1,
            pet_name: "Dog",
            age: 12
        },
        {
            id: 2,
            pet_name: "Cat",
            age: 2
        },
        {
            id: 3,
            pet_name: "Cacau",
            age: 3
        }
    ])

    it("Espera-se que a tela seja renderizada", () => {

        const component = mount(Pets)

        expect(component).toBeTruthy()

    })

    it("Espera-se que liste um card para cada pet", async () => {

        const component = mount(Pets)

        await flushPromises()

        expect(component.text()).toContain("Dog") //Aparecer os nomes na tela
        expect(component.text()).toContain("Cat")

        expect(component.findAll("[data-test='item-pet']")).toHaveLength(3) //contar quantos elementos tem na tela com base nos dados da API
    })


    it("Espera-se que navegue para a tela de perfil do pet clicado", async () => {

        const mockRouter = {
            push: vi.fn() //como se estivesse criando uma função falsa para o push
        }

        const component = mount(Pets, {
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        })

        await flushPromises()

        component.findAll("[data-test='item-pet']")[0].trigger("click") //clicar no primeiro card da tela, ou seja, vai clicar no Dog

        expect(mockRouter.push).toHaveBeenCalledWith('/pets-adocao/1/perfil') //espera-se que a url chamada seja essa
        
    })
})