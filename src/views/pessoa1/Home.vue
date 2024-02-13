<template>
  <div class="main-content">
    <div class="left-content">
      <h1 class="title">Me leva para casa</h1>
      <p class="text-description">Nós cuidamos deles. Agora deixe que eles cuidem de você.</p>
      <p class="text-description">
        Aqui nós cuidamos de animais resgatados de áreas evacuadas de Minas Gerais e queremos
        compartilhar todo esse amor com mais pessoas através da adoção.
      </p>
      <p class="text-description">
        Ter um animal de estimação traz benefícios para a saúde física e mental. É uma troca de amor
        e carinho que faz bem pra todo mundo. Leve um para casa: cuide dele e deixe que ele cuide de
        você também.
      </p>
      <router-link to="pets-adocao">
        <button class="button-action">ADOTAR AGORA</button>
      </router-link>
    </div>
    <div class="right-content">
      <img src="https://vale.com/documents/d/guest/imagem-dogs01" class="main-image" alt="Imagem de cachorros" />
    </div>
  </div>
</template>


<style scoped>
.title {
  font-size: 48px; 
  color: rgb(225, 73, 18);
  margin-bottom: 20px;
}

.text-description {
  font-size: 24px; 
  text-align: justify;
  margin-bottom: 20px; 
}

.main-content {
  display: flex;
  width: 90%; 
  margin: 0 auto;
  align-items: center;
}

.main-image {
  max-width: 100%; 
  height: auto; 
}

.button-action {
    width: 250px;
    height: 50px; 
    background: rgb(225, 73, 18);
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    transition: background-color 0.3s; 
}

.button-action:hover {
  background-color: #d94400; 
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column; 
  }
}
</style>
