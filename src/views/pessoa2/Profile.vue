<template>
  <Menu />
  <div v-if="pet" class="container">
    <div class="title text-orange-darken-1 text-h5">
      <h1 data-test="pet-name"> {{ pet.name }}</h1>
    </div>
    <v-divider></v-divider>
    <div class="main-container">
      <v-carousel
        class="carousel-container"
        cover
        height="400"
        width="400"
        rounded="xl"
        delimiter-icon="mdi-paw"
      >
        <v-carousel-item
          :src="pet.photo"
          cover
        ></v-carousel-item>
        <v-carousel-item
          :src="pet.photo"
          cover
        ></v-carousel-item>
        <v-carousel-item
          :src="pet.photo"
          cover
        ></v-carousel-item>
      </v-carousel>
      <div class="information-container">
        <v-table>
          <thead>
            <tr>
              <th class="text-left text-h6">
                Informações sobre o pet
              </th>
            </tr>
          </thead>
          <tbody>
            <tr data-test="pet-age">
              <td><strong>Idade:</strong> {{ pet.age }} {{ pet.age === 1 ? 'ano' : 'anos' }}</td>
            </tr>
            <tr data-test="pet-gender">
              <td><strong>Gênero:</strong> {{ pet.gender === 'Female' ? 'Fêmea' : 'Macho' }}</td>
            </tr>
            <tr data-test="pet-size">
              <td><strong>Porte do animal:</strong> {{ this.translateSize(pet.size) }}</td>
            </tr>
            <tr data-test="pet-breed">
              <td><strong>Raça:</strong> {{ pet.breed }}</td>
            </tr>
          </tbody>
        </v-table>
        <v-row justify="center">
          <v-dialog
            v-model="dialog"
            persistent
            width="1024"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                class="button-information mt-8 text-h5 text-brown-darken-3 text-uppercase" 
                color="orange-darken-1" 
                rounded="xl" 
                size="x-large" 
                :width="400" 
                :height="60"
                v-bind="props"
              >
                Adotar
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h4">Programa de Adoção</span>
              </v-card-title>
              <v-card-subtitle>
                Formulário pré-adoção para pessoas interessadas nos animais abrigados nas instalações PetsRescue.
              </v-card-subtitle>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        class="mb-n5"
                        label="Nome completo"
                        type="text"
                        v-model="name" 
                        data-test="input-name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        class="mb-n5"
                        label="Email"
                        type="text"
                        v-model="email"
                        data-test="input-email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        class="mb-n5"
                        label="Telefone"
                        type="text"
                        v-model="contact"
                        data-test="input-contact"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <p>Conte-nos um pouco sobre você, sua casa e a rotina de sua família</p>
                      <v-textarea 
                        v-model="observations"
                        type="text"
                        data-test="input-observations">
                      </v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="orange-darken-1"
                  variant="text"
                  @click="dialog = false"
                >
                  Fechar
                </v-btn>
                <v-btn
                  type="submit"
                  color="orange-darken-1"
                  variant="text"
                  @click="dialog = false"
                  data-test="submit-button"
                >
                  Enviar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
  import Menu from '../pessoa2/Menu.vue'
  import PetService from './services/PetService'

  export default {
    data: () => ({
      dialog: false,
      pet: null,
      photo: '',
      name: '',
      age: '',
      gender: '',
      size: '',
      breed: '',
    }),

    mounted() {
      const id = this.$route.params.id
      PetService.getOnePet(id).then((data) => {
        this.pet = data
      })
    },

    components: {
      Menu
    },

    methods: {
      translateSize(name) {
        const lowerCaseName = name.toLowerCase();

        switch(lowerCaseName) {
          case 'small': {
            return 'Pequeno'
          }
          case 'medium': {
            return 'Médio'
          }
          case 'large' : {
            return 'Grande'
          }
          case 'extra_large' : {
            return 'Gigante'
          }
          default: {
            return name
          }
        }
      },
    }
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Noto+Sans:wght@400;700&family=Poppins&family=Quicksand:wght@300&family=Qwitcher+Grypen:wght@700&family=Rubik&family=Secular+One&display=swap');

.container {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;

  font-family: 'Poppins', Arial, Helvetica, sans-serif;
}

.title {
  margin-top: 100px;
  margin-left: 110px;
  margin-bottom: 20px;
}

.main-container {
  height: 100vh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 100px;
  margin-top: -120px;
}

.information-container {
  width: 100%;
  display: flex;
  flex-direction: column;

  margin-left: 30px;
}

@media screen and (max-width: 600px) {

  .container {
    width: 100%;
    display: flex;
    flex-direction: column; 
  }
  .main-container {
    margin-top: -10px;
    flex-direction: column-reverse;
  }

  .information-container {
    margin-top: 16px;
  }
  .button-information {
    margin: 30px;
  }
  
  .title {
    font-size: 1.5rem; 
    margin-top: 100px;
  }
  .carousel-container {
    width: 100%;
  }
}

</style>