<template>
  <div class="one">
    <h3>{{ "Therapy list" | localize }}</h3>
    <div class="row">
      <div class="input-field s6 col">
        <select ref="select" v-model="filter">
          <option value="" disabled selected>{{
            "Choose your option" | localize
          }}</option>
          <option value="active">{{ "Active" | localize }}</option>
          <option value="outdated">{{ "Outdated" | localize }}</option>
          <option value="completed">{{ "Completed" | localize }}</option>
        </select>
        <label>{{ "Status filter" | localize }}</label>
      </div>
    </div>
    <button v-if="filter" class="btn btn-small red" @click="filter = null">
      {{ "Clear filter" | localize }}
    </button>
    <hr />
    <table v-if="tasks.length">
      <thead>
        <tr>
          <th>#</th>
          <th>{{ "Title" | localize }}</th>
          <th>{{ "Date" | localize }}</th>
          <th>{{ "Description" | localize }}</th>
          <th>{{ "Status" | localize }}</th>
          <th>{{ "Edit" | localize }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) of displayTasks" :key="task.id">
          <td>{{ index + 1 }}</td>
          <td>{{ task.title }}</td>
          <td>{{ new Date(task.date).toLocaleDateString() }}</td>
          <td class="td">
            <div class="text">{{ task.description }}</div>
          </td>
          <td>{{ task.status | localize }}</td>
          <td>
            <router-link
              tag="button"
              class="btn btn-small"
              :to="'/task/' + task.id"
            >
              {{ "Open" | localize }}
            </router-link>
            <button
              class="btn btn-small"
              type="button"
              @click="deleteTask(index)"
            >
              {{ "Remove" | localize }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No tasks</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: null,
    };
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    displayTasks() {
      return this.tasks.filter((t) => {
        if (!this.filter) {
          return true;
        }
        return t.status === this.filter;
      });
    },
  },
  methods: {
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
  },

  mounted() {
    M.FormSelect.init(this.$refs.select);
  },
};
</script>

<style lang="scss" scoped>
.text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.td {
  max-width: 400px;
}
.btn {
  margin: 0.1rem;
}
</style>
