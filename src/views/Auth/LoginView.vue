<template>
  <div
    id="login"
    class="d-flex justify-content-center align-items-center"
  >
    <b-card
      title="Login"
      sub-title="Welcome back!"
      class="mx-auto my-5"
      style="max-width: 300px"
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
        size="sm"
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
        size="sm"
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
        @click="login"
        variant="primary"
        class="mt-3"
      >
        Loggin</b-button>
    </b-card>
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
    };
  },
  created() {
    if (localStorage.getItem("user")) {
      this.$router.push("/dashboard");
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
              }
            })
            .catch(() => {
              this.errors.login = "Invalid email or password";
            });
        } else {
          this.errors.recaptcha = "please verify you are not a robot";
        }
      } else {
        this.errors.length = "Please fill all fields";
      }
    },
  },
};
</script>

<style>
#login {
  background-color: #ff7700;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23cc0000' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23aa0000' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23ca002c' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23a70022' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23c6004c' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23a3003c' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23c0006a' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%239d0055' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23b7008a' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%2394006e' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23aa00aa' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23880088' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}
#recaptcha {
  transform: scale(0.85);
  -webkit-transform: scale(0.85);
  transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
}
</style>