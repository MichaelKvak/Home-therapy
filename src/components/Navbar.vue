<template>
  <nav class="teal lighten-2">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo">
        <img
          src="https://st2.depositphotos.com/2668729/5598/v/600/depositphotos_55986311-stock-illustration-apple-icon-with-a-pharmacy.jpg"
          class="imagge"
        />
      </router-link>

      <ul class="right hide-on-med-and-down">
        <router-link tag="li" to="/create" exact active-class="active">
          <a href="#"> {{ "Create" | localize }}</a>
        </router-link>
        <router-link tag="li" to="/list" active-class="active">
          <a href="#">{{ "List" | localize }}</a>
        </router-link>
        <router-link tag="li" to="/register" active-class="active">
          <a href="#">{{ "Registration" | localize }}</a>
        </router-link>
        <span class="black-text">{{ date | date("datetime") }}</span>
      </ul>
      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
    };
  },
  computed: {
    name() {
      return this.$store.getters.info.name;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/?message=logout");
    },
  },
  mounted() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
    M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
    });
  },
};
</script>

<style lang="scss" scoped>
nav {
  padding: 0 2rem;
}
.imagge {
  width: 50px;
  height: 50px;
  margin: 7px 10px;
}
</style>
