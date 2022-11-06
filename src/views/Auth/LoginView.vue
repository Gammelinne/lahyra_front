<template>
  <div id="login">
    <b-img
      src="https://zupimages.net/up/22/43/dy61.png"
      :width="is_mobile ? '300' : '500'"
      class="my-4"
    />
    <div class="d-flex justify-content-center align-items-center">
      <b-card
        title="Login"
        sub-title="Welcome back!"
        class="mx-auto mb-5"
      >
        <span
          v-if="errors.login"
          class="text-danger"
        >{{ errors.login }}</span>
        <span
          v-if="errors.length"
          class="text-danger"
        >{{ errors.length }}</span>
        <b-input-group
          class="mb-3"
          size="md"
        >

          <b-form-input
            :state="errors.login ? false : null"
            v-model="email"
            placeholder="Email"
            type="email"
          ></b-form-input>
        </b-input-group>
        <b-input-group
          class="mb-3"
          size="md"
        >
          <b-form-input
            :state="errors.login ? false : null"
            v-model="password"
            type="password"
            placeholder="Password"
          ></b-form-input>
        </b-input-group>
        <b-badge
          v-if="errors.recaptcha"
          variant="danger"
        >
          {{ errors.recaptcha }}
        </b-badge>
        <vue-recaptcha
          id="recaptcha"
          ref="recaptcha"
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          @verify="onVerify($event)"
        />
        <b-button
          v-if="!on_loading"
          @click="login"
          variant="outline-primary"
          class="mt-3"
          pill
          block
        >
          Login</b-button>
        <b-button
          v-if="on_loading"
          variant="outline-primary"
          class="mt-3"
          disabled
          pill
          block
        >
          <b-spinner
            small
            type="grow"
          ></b-spinner>
          Loading...
        </b-button>
        <p class="my-2">Don't have an account? <router-link to="/register">Register</router-link>
        </p>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginView",
  data() {
    return {
      email: null,
      password: null,
      is_verify: false,
      recaptha_token: null,
      errors: {
        recaptcha: null,
        login: null,
        length: null,
      },
      on_loading: false,
      is_mobile: false,
    };
  },
  created() {
    if (localStorage.getItem("user")) {
      this.$router.push("/dashboard");
    }
    if (window.innerWidth < 768) {
      this.is_mobile = true;
    }
  },
  methods: {
    onVerify(response) {
      if (response.length > 0) {
        this.recaptha_token = response;
        this.is_verify = true;
      } else {
        this.is_verify = false;
      }
    },
    login() {
      this.on_loading = true;
      this.errors = {
        recaptcha: null,
        login: null,
        length: null,
      };
      if (this.email && this.password) {
        if (this.is_verify) {
          axios
            .post("/api/login", {
              email: this.email,
              password: this.password,
              recaptha_token: this.recaptha_token,
            })
            .then((response) => {
              if (response.data[0] === "success") {
                //save user data to local storage
                localStorage.setItem("user", JSON.stringify(response.data));
                //redirect to home page
                this.$router.go();
                this.$parent.loggedIn = true;
                this.on_loading = false;
              }
            })
            .catch(() => {
              this.errors.login = "Invalid email or password";
              this.on_loading = false;
            });
        } else {
          this.errors.recaptcha = "please verify you are not a robot";
          this.on_loading = false;
        }
      } else {
        this.errors.length = "Please fill all fields";
        this.on_loading = false;
      }
    },
  },
};
</script>

<style>
#login {
  height: 90vh;
  background-color: #ff7700;
  background-color: #6ac3ff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%236a9ccc' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%231e1faa' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%235f8cc8' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23251ea3' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23537cc3' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%232d1d9c' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23486abf' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23331d95' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23415ab6' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23391d8f' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%233d4caa' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%233e1c88' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}
</style>