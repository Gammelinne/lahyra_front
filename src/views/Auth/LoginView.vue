<template>
  <div id="login">
    <b-card
      title="Login"
      class="mx-auto my-5"
      style="max-width: 400px"
    >
      <b-input-group
        prepend="Email"
        class="mb-3"
      >
        <b-form-input
          v-model="email"
          placeholder="Enter email"
        ></b-form-input>
      </b-input-group>
      <b-input-group
        prepend="Password"
        class="mb-3"
      >
        <b-form-input
          v-model="password"
          type="password"
          placeholder="Enter password"
        ></b-form-input>
      </b-input-group>
      <vue-recaptcha
        ref="recaptcha"
        sitekey="6LcMZZwiAAAAANjt8vA3ImwtiVJwRibO79wTwRW1"
      />
      <b-button
        @click="login"
        variant="primary"
      >
        Loggin</b-button>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import { VueRecaptcha } from "vue-recaptcha";
export default {
  name: "LoginView",
  components: { VueRecaptcha },
  data() {
    return {
      email: null,
      password: null,
    };
  },
  created() {
    if (localStorage.getItem("user")) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    login() {
      if (this.email && this.password) {
        axios
          .post("/api/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if (response.data[0] === "success") {
              //save user data to local storage
              localStorage.setItem("user", JSON.stringify(response.data));
              //redirect to home page
              this.$router.go();
              this.$parent.loggedIn = true;
            }
          });
      }
    },
  },
};
</script>

<style>
</style>