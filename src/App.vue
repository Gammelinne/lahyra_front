<template>
  <div id="app">
    <b-navbar
      type="dark"
      variant="dark"
    >
      <b-navbar-brand to="/">
        <b-img
          src="https://i.ibb.co/FhQzwwh/logo-lahyra.png"
          width="25"
          height="25"
        ></b-img>
        Lahyra
      </b-navbar-brand>

      <b-navbar-nav class="mx-2">
        <b-nav-item to="/">
          <b-icon
            icon="house-door-fill"
            font-scale="1"
          ></b-icon><br>
          Home
        </b-nav-item>
        <b-nav-item
          v-if="loggedIn"
          to="/dashboard"
        >
          <b-icon
            icon="person-fill"
            font-scale="1"
          ></b-icon><br>
          Dashboard
        </b-nav-item>

      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item
          v-if="!loggedIn"
          to="/register"
        >
          <b-icon
            icon="person-plus-fill"
            font-scale="1"
          ></b-icon><br>
          Register
        </b-nav-item>
        <b-nav-item
          v-if="!loggedIn"
          to="/login"
        >
          <b-icon
            icon="box-arrow-in-right"
            font-scale="1"
          ></b-icon><br>
          Login
        </b-nav-item>
        <b-nav-item
          v-if="loggedIn"
          @click="logoutAccount"
        >
          <b-icon
            icon="person-dash-fill"
            font-scale="1"
          ></b-icon><br>
          Logout
        </b-nav-item>
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
    //axios.defaults.baseURL = "https://server.lahyra.com/Lahyra-back/"; //production
    axios.defaults.baseURL = "http://localhost:8525/lahyra_back/public/"; //development
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
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f5f5f5;
}

</style>
