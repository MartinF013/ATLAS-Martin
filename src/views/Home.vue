<template>
  <div class="home-container"> 
    <section class="home-section">
      <h2 class="home__body--title">
        Bienvenido al Atlas de Riesgos del Municipio de Querétaro
      </h2>
      <p class="home__body--content">
        Esta plataforma ofrece una visión integral de la información geográfica sobre los riesgos actuales y potenciales que afectan al municipio. Representa un esfuerzo continuo por identificar, clasificar y analizar los riesgos, con el propósito de prevenir incidentes y fortalecer la seguridad de la población. Al proporcionar un panorama detallado, el Atlas busca apoyar la toma de decisiones y la implementación de medidas que salvaguarden la integridad y el bienestar de los ciudadanos de Querétaro.
      </p>
      <section class="home__body--button">
        <Button @click="goToMap"
          :icon="'icon_arrow_long_right'"
          :title="'Inicio se desisón.'"
          class="blue-button">Acceso Público</Button>

        <Button @click=" () => {  open = true;}"
          :icon="'icon_arrow_long_right'"
          :title="'Inicio se desisón.'"
          class="blue-button">Acceso Privado</Button>

      </section>

    </section>
    <!-- <footer></footer> -->
  </div>
  <Teleport to="body">
    <Transition>
      <Login
        v-if="open"
        @close="
          () => {
            open = false;
          }
        "
      />
    </Transition>
  </Teleport>
</template> 

<script setup>

import Banner from "@components/container/Banner";
import Button from "@components/base/Button";
import Login from "@components/container/Login";
//import router from "@/router/index.router.js";
import { useRouter } from 'vue-router';

import { ref } from "vue";

let open = ref(false);
const router = useRouter();

const goToMap = () => {
       console.log("goToMap");
       router.push({ name: 'Map' });
    };

</script> 

<style scoped>
.home-container {
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  height: 100vh; /* Asegura que el contenedor ocupe toda la altura de la vista */
  background-image: url('@/assets/images/main_por.png');
  background-size: cover; /* Ajusta la imagen para cubrir todo el contenedor */
  background-position: top center; /* Centra la imagen */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
}

.home-section {
  background-color: rgba(128, 128, 128, .9); /* Fondo gris muy transparente */
  padding: 20px; /* Espaciado interno */
  border-radius: 10px; /* Bordes redondeados */
  text-align: center; /* Centra el texto dentro de la sección */
  max-width: 650px; /* Ancho máximo del contenedor */
  margin: 0 auto; /* Centra el contenedor horizontalmente */
  /*asignar el texto de color blaco*/
  color:white ;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.home__body--title {
  font-size: 2.5em; /* Aumenta el tamaño de la fuente */
  font-weight: bold; /* Hace el texto más grueso */
  color:#30ace4; /* Cambia el color del texto a amarillo */
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8); /* Sombra más pronunciada */
}

.home__body--title, .home__body--content {
/*  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);  Sombra para el texto */
  text-shadow: 2px 2px 2px blue ; /* Sombra para el texto */
}
.home__body--content {
  margin: 0 auto; /* Centra el párrafo horizontalmente */
  max-width: 600px; /* Limita el ancho del párrafo para mejor legibilidad */
}
.home__body--button {
  display: flex;
  justify-content: center; /* Centra el botón horizontalmente */
   gap: 20px; /* Espacio entre los botones */
  margin-top: 20px; /* Añade un margen superior para separar el botón del contenido */
}
.blue-button {
  background-color: #2d2e64; /* Color de fondo azul */
  color: white; /* Color del texto blanco */
  padding: 10px 20px; /* Espaciado interno */
  border: none; /* Sin borde */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
}

.blue-button:hover {
  background-color:#30ace4; /* Color de fondo azul oscuro al pasar el cursor */
}
</style>
