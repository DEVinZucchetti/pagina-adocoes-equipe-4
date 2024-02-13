<template>
  <div class="container">
    <h1>Adote um amigo!</h1>
    <div class="pet-list">
      <div class="pet-item" v-for="pet in pets" :key="pet.id" @click="redirectToProfile(pet.id)" data-test="item-pet">
        <img src="https://i.imgflip.com/5y7m17.png" :alt="pet.pet_name" class="pet-image" />
        <span class="pet-name">{{ pet.pet_name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import PetService from '@/services/PetService'

export default {
  data() {
    return {
      pets: []
    }
  },
  methods: {
    redirectToProfile(petId) {
      this.$router.push(`/pets-adocao/${petId}/perfil`)
    }
  },
  mounted() {
    PetService.getAllPets()
      .then((data) => {
        this.pets = data
      })
      .catch(() => alert('Houve um erro. Entre em contato com a ONG'))
  }
}
</script>

<style scoped>
.container {
  width: 70%;
  margin: 0 auto;
}

.pet-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.pet-item {
  width: 250px;
  padding: 10px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: box-shadow 0.3s;
}

.pet-item:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.pet-image {
  width: 100%;
  border-radius: 12px 12px 0 0;
}

.pet-name {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-top: 10px;
}
</style>
