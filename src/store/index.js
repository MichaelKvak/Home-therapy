import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import info from "./info";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem("tasks") || "[]").map((task) => {
      if (new Date(task.date) < new Date()) {
        task.status = "outdated";
      }
      return task;
    }),
    layout: "default-layout",
    error: null,
  },
  mutations: {
    createTask(state, task) {
      state.tasks.push(task);

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    updateTask(state, { id, description, date }) {
      const tasks = state.tasks.concat();

      const index = tasks.findIndex((t) => t.id === id);
      const task = tasks[index];

      const status = new Date(date) > new Date() ? "active" : "outdated";

      tasks[index] = { ...task, date, description, status };

      state.tasks = tasks;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    completeTask(state, id) {
      const index = state.tasks.findIndex((t) => t.id === id);
      state.tasks[index].status = "completed";
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    setLayout(state, payload) {
      state.layout = payload;
    },
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    createTask({ commit }, task) {
      commit("createTask", task);
    },
    updateTask({ commit }, task) {
      commit("updateTask", task);
    },
    completeTask({ commit }, id) {
      commit("completeTask", id);
    },
  },
  modules: {
    auth,
    info,
  },
  getters: {
    tasks: (s) => s.tasks,
    taskById: (s) => (id) => s.tasks.find((t) => t.id === id),
    layout(state) {
      return state.layout;
    },
    error: (s) => s.error,
  },
});
