<template>
  <div v-if="pet" class="adoption-form">
    <h1 class="pet-name">Amigo: {{ pet.name }}</h1>
    <ul class="pet-details">
      <li>Raça: {{ pet.race.name }}</li>
      <li>Espécie: {{ pet.specie.name }}</li>
      <li>IDADE: {{ pet.age }} ANO(S)</li>
      <li>Peso: {{ pet.weight }} KG</li>
      <li>Porte: {{ pet.size }}</li>
    </ul>

    <img src="https://i.imgflip.com/5y7m17.png" :alt="pet.pet_name" class="pet-image" />

    <form class="form" @submit.prevent="handleSubmit">
      <h2 class="form-title">Poucos passos para adotar {{ pet.name }}</h2>
      <div class="form-group">
        <label for="name">Nome</label>
        <input v-model="name" id="name" class="form-input" data-test="input-name"/>
      </div>
      <div class="form-group">
        <label for="contact">Contato</label>
        <input v-model="contact" id="contact" class="form-input" data-test="input-contact" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" id="email" type="email" class="form-input" data-test="input-email"/>
      </div>
      <div class="form-group">
        <label for="observations">Fale um pouco sobre a sua motivação de adotar esse pet:</label>
        <textarea v-model="observations" id="observations" class="form-textarea" data-test="textarea-observations"></textarea>
      </div>
      <button type="submit" class="form-submit" data-test="submit-button">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import PetService from '@/services/PetService'

export default {
  data() {
    return {
      pet: null,
      name: '',
      email: '',
      contact: '',
      observations: ''
    }
  },
  methods: {
    handleSubmit() {
      PetService.adoptPet({
        name: this.name,
        email: this.email,
        contact: this.contact,
        observations: this.observations
      })
        .then(() => {
          alert('Cadastrado com sucesso')
        })
        .catch(() => {
          alert('Erro ao tentar realizar a adocao')
        })
    }
  },
  mounted() {
    const id = this.$route.params.id
    PetService.getOnePet(id).then((data) => {
      this.pet = data
    })
  }
}
</script>

<style scoped>
.adoption-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}

.pet-name {
  font-size: 24px;
  margin-bottom: 20px;
}

.pet-details {
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
}

.pet-image {
  width: 250px;
  height: auto;
  border-radius: 12px;
  margin-bottom: 20px;
}

.form {
  width: 70%;
  text-align: center; /* Centraliza o formulário */
}

.form-title {
  font-size: 20px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 18px;
}

.form-input,
.form-textarea {
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.form-textarea {
  height: 120px;
}

.form-submit {
  width: 200px;
  height: 50px;
  background-color: #007bff;
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.form-submit:hover {
  background-color: #0056b3;
}
</style>
