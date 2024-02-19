import axios from 'axios'

class PetService {

  async getAllPets(){
    const response = await axios.get("http://localhost:3000/pets")
    return response.data
  }

  async getOnePet(id) {
    const response = await axios.get(`http://127.0.0.1:3000/pets/${id}`)
    return response.data
  }

  async adoptPet(data){
    const response = await axios.post(`http://127.0.0.1:3000/pets/adocao`, data)
    return response.data
  }

}

export default new PetService