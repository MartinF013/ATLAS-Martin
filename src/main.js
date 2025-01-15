import { createApp } from "vue";
import "./style.css";
import Layout from "./Layout.vue";
import router from "./router/index.router.js";

createApp(Layout).use(router).mount("#app");
