import axios from 'axios'

class PetService {

  async getAllPets(){
    const response = await axios.get("http://localhost:3000/pets")
    return response.data
  }

}

export default new PetService