<template>
  <div class="register">
    <h1>Register</h1>
    <p>This is the register page.</p>
    <b-card
      title="Register"
      class="mx-auto my-5"
      style="max-width: 400px"
    >
      <b-input-group
        prepend="Name"
        class="mb-3"
      >
        <b-form-input
          v-model="name"
          placeholder="Enter name"
        ></b-form-input>
      </b-input-group>
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
      <b-input-group
        prepend="Confirm Password"
        class="mb-3"
      >
        <b-form-input
          v-model="password_confirmation"
          type="password"
          placeholder="Enter password"
        ></b-form-input>
      </b-input-group>
      <b-button
        @click="register"
        variant="primary"
      >
        Register</b-button>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterView",
  data() {
    return {
      name: null,
      email: null,
      password: null,
      password_confirmation: null,
    };
  },
  created() {
    if (localStorage.getItem("user")) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    register() {
      if (
        this.name &&
        this.email &&
        this.password &&
        this.password_confirmation
      ) {
        if (this.password === this.password_confirmation) {
          axios
            .post("/api/register", {
              name: this.name,
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
        } else {
          alert("Password and Confirm Password must be same");
        }
      } else {
        alert("Please fill all fields");
      }
    },
  },
};
</script>

<style>
</style>