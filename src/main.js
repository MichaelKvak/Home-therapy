import Vue from "vue";
import App from "./App.vue";
import dateFilter from "./filters/date-filter";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";
import localizeFilter from "./filters/localize.filter";
import DefaultLayout from "./components/DefaultLayout.vue";
import AuthLayout from "./components/AuthLayout.vue";
import firebase from "firebase/app";
import messagePlugin from "./utils/message.plugin";
import "firebase/auth";
import "firebase/database";

Vue.component("default-layout", DefaultLayout);
Vue.component("auth-layout", AuthLayout);

Vue.config.productionTip = false;
Vue.filter("date", dateFilter);
Vue.filter("localize", localizeFilter);
Vue.use(Vuelidate);
Vue.use(messagePlugin);
firebase.initializeApp({
  apiKey: "AIzaSyCh2iSzpTXjAeayvEOpI14ywH-hs7QM4og",
  authDomain: "my-taking-pills.firebaseapp.com",
  projectId: "my-taking-pills",
  storageBucket: "my-taking-pills.appspot.com",
  messagingSenderId: "911116750380",
  appId: "1:911116750380:web:b9e8811d83c14b24484b89",
  measurementId: "G-VPNLH7PN0G",
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
