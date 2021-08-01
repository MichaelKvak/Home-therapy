import Vue from "vue";
import VueRouter from "vue-router";

import Create from "@/views/Create.vue";
import List from "@/views/List.vue";
import Task from "@/views/Task.vue";
import Profile from "@/views/Profile.vue";
import firebase from "firebase/app";

Vue.use(VueRouter);

const routes = [
  {
    path: "/create",
    name: "create",
    component: Create,
    meta: {
      layout: "default-layout",
      auth: true,
    },
  },
  {
    path: "/list",
    name: "list",
    component: List,
    meta: {
      layout: "default-layout",
      auth: true,
    },
  },
  {
    path: "/task/:id",
    name: "task",
    component: Task,
    meta: {
      layout: "default-layout",
      auth: true,
    },
  },
  {
    path: "/",
    name: "login",
    meta: {
      layout: "auth-layout",
    },
    component: () => import("../views/Login"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      layout: "auth-layout",
    },
    component: () => import("../views/Register"),
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      layout: "default-layout",
      auth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some((record) => record.meta.auth);

  if (requireAuth && !currentUser) {
    next("/?message=login");
  } else {
    next();
  }
});

export default router;
