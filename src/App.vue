<template>
  <div id="app">
    <b-navbar
      type="dark"
      variant="dark"
    >
      <b-navbar-brand to="/" class="mx-3">Lahyra</b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item
          v-if="loggedIn"
          to="/dashboard"
        >Dashboard</b-nav-item>
        <b-nav-item v-if="!loggedIn" to="/register">
          Register
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item
          v-if="!loggedIn"
          to="/login"
        >Login</b-nav-item>
        <b-nav-item
          v-if="loggedIn"
          @click="logoutAccount"
        >Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view />
  </div>
</template>
<script>
import axios from "axios";
if (localStorage.getItem("user")) {
  axios.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}
export default {
  name: "App",
  data() {
    return {
      user: null,
      loggedIn: false,
    };
  },
  mounted() {
    axios.defaults.baseURL = "https://server.lahyra.com/Lahyra-back/";
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user) {
      this.loggedIn = true;
    }
  },
  methods: {
    logoutAccount() {
      axios
        .post("/api/logout")
        .then((response) => {
          if (response.data.message === "Successfully logged out") {
            localStorage.removeItem("user");
            this.$router.go("/");
            this.loggedIn = false;
          }
        })
        .catch(() => {
          this.$bvToast.toast("Something went wrong", {
            title: "Error",
            variant: "danger",
            solid: true,
          });
        });
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
