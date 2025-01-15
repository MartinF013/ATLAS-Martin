<template>
  <div class="modal">
    <div class="modal__container">
      <section class="modal__container--header">
        <img src="@/assets/images/pt_qro.png" alt="" />
        <Button @click="close" icon="icon_x_mark" title="Cerrar" />
      </section>
      <section class="modal__container--body">
        <Input label="Correo electrónico" :inputValue="data.email" type="email" :error="error.email"
          helper="Correo inválido" class="mt-5" @change="(payment) => handleChange(payment, 'email')" />
        <Input label="Contraseña" :inputValue="data.password" type="password" :error="error.password"
          helper="Contraseña no válida" class="mt-5" @change="(payment) => handleChange(payment, 'password')" />
        <Button title="Iniciar sesión." @click="handleLogin">Confirmar</Button>
      </section>
    </div>
    <Teleport to="body">
      <Transition>
        <div class="modal" v-if="showSpinner">
          <div class="m-auto">
            <ring-loader color="#E7AA4C" :size="size"></ring-loader>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import Button from "@components/base/Button";
import Input from "@components/base/Input";
import router from "@/router/index.router.js";
import RingLoader from "vue-spinner/src/RingLoader.vue";
import { login } from "@/utils/authentication.js";
import { ref, reactive } from "vue";

const emit = defineEmits(["close"]);

const data = reactive({
  email: null,
  password: null,
});
const error = reactive({
  email: null,
  password: null,
});

const regEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
const regPassword =
  /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;

const showSpinner = ref(false);

const handleChange = (payment, field) => {
  switch (field) {
    case "email":
      data.email = payment;
      error.email = !regEmail.test(data.email);
      break;
    case "password":
      data.password = payment;
      error.password = false; // !regPassword.test(data.password);
      break;

    default:
      console.log("Error");
      break;
  }
};

const handleLogin = () => {
  if (regEmail.test(data.email)) {// && regPassword.test(data.password)) {
    login(data.email, data.password, showSpinner)
      .then((resolve) => {
        if (resolve) {
          //router.push("/map");
          router.push({ name: 'Map' }).then(() => {
            // Forzar recarga de la página
           // window.location.reload();
          }).catch(err => {
            console.error(err);
            // Forzar recarga si hay un error
           // window.location.href = "/map";
          });
        } else {
          console.log("Error");
        }
      })
      .catch((reject) => {
        console.log(reject);
      });
  } else {
    error.email = true;
    error.password = true;
  }
};

const close = () => {
  data.email = null;
  data.password = null;
  error.email = false;
  error.password = false;
  emit("close");
};
</script>
