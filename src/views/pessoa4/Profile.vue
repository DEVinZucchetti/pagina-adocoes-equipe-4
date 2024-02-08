<template>
  <div v-if="pet">
    <h1>Amigo: {{ pet.name }}</h1>
    <ul>
      <li>Raça: {{ pet.race.name }}</li>
      <li>Espécie: {{ pet.specie.name }}</li>
      <li>IDADE: {{ pet.age }} ANO(S)</li>
      <li>Peso: {{ pet.weight }} KG</li>
      <li>Porte: {{ pet.size }}</li>
    </ul>
    <form class="form" @submit.prevent="handleSubmit">
      <p>Poucos passos para adotar {{ pet.name }}</p>
      <div class="input-form">
        <label>Nome</label>
        <input v-model="name" />
      </div>
     <div class="input-form">
        <label>Contato</label>
        <input v-model="contact" />
      </div>
       <div class="input-form">
        <label>Email</label>
        <input v-model="email" type="email" />
      </div>
      <div class="input-form">
        <label>Fale um pouco sobre a sua motivação de adotar esse pet:</label>
        <textarea v-model="observations" />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>


<script>
import axios from 'axios'

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
    handleSubmit(){
        axios.post("http://127.0.0.1:8000/api/adocoes", {
            name: this.name,
            email: this.email,
            contact: this.contact,
            observations: this.observations,
        })
        .then(() => {
            alert("Cadastrado com sucesso")
        })
        .catch(() => {
            alert("Erro ao tentar realizar a adocao")
        })
    }
  },
  mounted() {
    const id = this.$route.params.id
    axios.get(`http://127.0.0.1:8000/api/pets/${id}`).then((response) => {
      this.pet = response.data
    })
  }
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}

.form input {
  width: 30%;
  height: 32px;
}

.input-form {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
</style>