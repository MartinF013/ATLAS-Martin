<template>
  <div
    class="banner"
    @click="
      () => {
        router.push('/');
      }
    "
  >
    <section class="banner__logos"  @click="bannerLogo">
      <img class="img__banner top-0" src="@/assets/images/pt_qro.png" />
    </section>
    <!-- <section class="banner__bg">     -->
    <section :class="[isLoggedIn ? 'banner__bg_private' : 'banner__bg_public']">  
    </section>
    <span class="banner__title"> Atlas de Riesgos </span>
  </div>
</template>
<script setup>
import Button from "@components/base/Button";
import router from "@/router/index.router.js";
import { ref, onMounted } from "vue";

let icon = ref("icon_arrow_long_right");

const isLoggedIn = ref(false); 
const userInfo = JSON.parse(localStorage.getItem("user-info"));
  
  if (userInfo) isLoggedIn.value = true; else isLoggedIn.value = false;

onMounted(() => {
  resizeEvent();
  window.addEventListener("resize", resizeEvent);
});

const resizeEvent = () => {
  if (window.innerWidth < 545) {
    icon.value = "icon_arrow_long_right";
  } else {
    icon.value = "icon_arrow_long_right";
  }
};
</script>
