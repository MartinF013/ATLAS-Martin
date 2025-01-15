import { createWebHashHistory, createRouter } from "vue-router";
import Home from "@views/Home";
import Map from "@views/Map";

const routes = [
  {
    path: "/:catchAll(.*)",
    redirect: { name: "Home" },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/map",
    name: "Map",
    component: Map,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//aqui se controla el acceso a las rutas
router.beforeEach((to, from, next) => {
  // el usuario se guarda en el local storage
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  // si el usuario esta logeado se redirige a la ruta map
  window.scroll(0, 0);

  // si el usuario esta logeado se redirige a la ruta map
  if (userInfo) {
    if (to.path == "/") {
      next("/map");
    } else {
      next();
    }
  } else {
    // si el usuario no esta logeado se redirige a la ruta home
    // if (to.path == "/map") {
    //   next("/map"); // lo dejamos irse al mapa, pero la vista mapa validara si es un usuario logueado solo para asignar el id mapa
    // } else {
      next(); // lo dejamos irse al mapa, pero la vista mapa validara si es un usuario logueado solo para asignar el id mapa para publico
   // }
  }
});

export default router;
