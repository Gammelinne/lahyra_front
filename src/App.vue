<template>
  <div id="app">
    <b-navbar
      type="dark"
      variant="dark"
    >
      <b-navbar-brand
        to="/"
        id="title"
      >
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
        <!--<b-nav-form v-if="loggedIn">
          <b-form-input
            v-model="search"
            placeholder="Search"
            size="sm"
          ></b-form-input>
          <b-list-group
            v-for="item in filteredItems"
            :key="item.id"
          >
            <b-list-group-item>
              <b-link :to="item.link">
                {{ item.name }}
              </b-link>
            </b-list-group-item>
          </b-list-group>
        </b-nav-form>-->
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
    <footer>
      <div id="link">
        <a
          href="https://github.com/Gammelinne"
          target="_blank"
        >
          <b-icon
            class="mx-2 my-2"
            icon="github"
            font-scale="1"
          ></b-icon>
        </a>
        <a
          href="https://www.linkedin.com/in/kylian-renault/"
          target="_blank"
        >
          <b-icon
            class="mx-2 my-2"
            icon="linkedin"
            font-scale="1"
          ></b-icon>
        </a>
        <a href="">
          <b-icon
            class="mx-2 my-2"
            icon="instagram"
            font-scale="1"
          ></b-icon>
        </a>
      </div>
      <div>
        Lahyra &copy; 2021 - All rights reserved - Made with <b-icon
          icon="heart-fill"
          font-scale="1"
        ></b-icon> by
        RENAULT Kylian
        <a href="">Terms of Service</a> -
        <a href="">Privacy Policy</a> -
        <a href="">Cookie Policy</a> -
        <a href="">GDPR</a>
      </div>
    </footer>
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
      value: null,
      option: [{ name: "test" }, { name: "test2" }, { name: "test3" }],
      user: null,
      loggedIn: false,
    };
  },
  mounted() {
    axios.defaults.baseURL = "https://server.lahyra.com/lahyra-back/"; //production
    //axios.defaults.baseURL = "http://localhost:8525/lahyra_back/"; //development
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
          localStorage.removeItem("user");
          this.$router.go("/");
          this.loggedIn = false;
        });
    },
  },
};
</script>

<style>
#app {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f5f5f5;
}
footer {
  bottom: 0;
  background-color: #343a40;
  color: white;
}
</style>
