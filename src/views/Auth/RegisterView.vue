<template>
  <div id="register">
    <b-img
      src="https://zupimages.net/up/22/43/dy61.png"
      :width="is_mobile ? '300' : '500'"
      class="my-4"
    />
    <div class="d-flex">
      <b-card
        title="Welcome to Lahyra"
        sub-title="Please let us know who you are"
        class="mx-auto my-5"
        style="max-width: 800px"
      >
        <b-input-group class="mb-3">
          <b-form-select
            class="form-control"
            v-model="login.gender"
            :options="gender_options"
          >
            <template #first>
              <b-form-select-option
                :value="null"
                disabled
              > -- Select your gender --
              </b-form-select-option>
            </template>
          </b-form-select>
          <b-form-invalid-feedback v-if="errors.gender">
            {{ errors.gender }}
          </b-form-invalid-feedback>
        </b-input-group>
        <b-row class="mt-4">
          <b-col>
            <b-input-group class="mb-3"
            >
              <b-form-input
                v-model="login.first_name"
                placeholder="First Name"
                type="text"
                :state="state('first_name')"

              ></b-form-input>
              <b-form-invalid-feedback v-if="errors.first_name">
                {{ errors.first_name[0] }}
              </b-form-invalid-feedback>
             
            </b-input-group>
          </b-col>
          <b-col>
            <b-input-group class="mb-3">
              <b-form-input
                v-model="login.last_name"
                type="text"
                placeholder="Last Name"
                :state="state('last_name')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="errors.last_name">
                {{ errors.last_name[0] }}
              </b-form-invalid-feedback>
            </b-input-group>
          </b-col>
        </b-row>
        <b-input-group class="mb-3">
          <b-input-group-prepend is-text>
            <b-icon
              icon="person-fill"
              font-scale="1"
            ></b-icon>
          </b-input-group-prepend>
          <b-form-input
            v-model="login.pseudo"
            type="text"
            placeholder="Pseudo"
            :state="state('pseudo')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="errors.pseudo">
            {{ errors.pseudo[0] }}
          </b-form-invalid-feedback>
        </b-input-group>
        <b-input-group class="mb-3">
          <b-form-input
            v-model="login.email"
            type="email"
            placeholder="Email"
            :state="state('email')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="errors.email">
            {{ errors.email[0] }}
          </b-form-invalid-feedback>
        </b-input-group>
        <b-row>
          <b-col>
            <b-input-group class="mb-3">
              <b-form-input
                v-model="login.phone"
                type="text"
                placeholder="Phone"
                :state="state('phone')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="errors.phone">
                {{ errors.phone[0] }}
              </b-form-invalid-feedback>
            </b-input-group>
          </b-col>
          <b-col>
            <b-input-group class="mb-3">
              <!-- prepend icon birthday -->
              <b-input-group-prepend is-text>
                Birthday
              </b-input-group-prepend>
              <b-form-input
                v-model="login.birthday"
                type="date"
                placeholder="Birthday"
                :state="state('birthday')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="errors.birthday">
                {{ errors.birthday[0] }}
              </b-form-invalid-feedback>
            </b-input-group>
          </b-col>
        </b-row>
        <b-input-group class="mb-3">
          <b-form-input
            v-model="login.password"
            type="password"
            placeholder="Password"
            :state="state('password')"
          ></b-form-input>
          <!-- invalid-feedback -->

          <b-form-invalid-feedback v-if="errors.password">
            Password must contain at between 8 and 32 characters with 1 number and 1 uppercase letter and 1 lowercase letter
          </b-form-invalid-feedback>

        </b-input-group>
        <b-input-group class="mb-3">
          <b-form-input
            v-if="login.password != null && login.password != ''"
            v-model="login.password_confirmation"
            type="password"
            placeholder="Password"
            :state="login.password === login.password_confirmation ? true : false"
          ></b-form-input>
          <b-form-invalid-feedback
            v-if="login.password != null && login.password != ''"
            :state="login.password === login.password_confirmation ? true : false"
          >
            Passwords do not match
          </b-form-invalid-feedback>
        </b-input-group>

        <b-input-group
          class="mb-3"
          v-if="login.address == null "
        >
          <b-form-input
            v-model="postal_code"
            type="text"
            placeholder="Postal Code"
            :state="state('postal_code')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="errors.postal_code">
            {{ errors.postal_code }}
          </b-form-invalid-feedback>
        </b-input-group>
        <b-input-group class="mb-3">
          <VueMultiselect
            v-model="login.address"
            @search-change="getAddress($event)"
            :options="address_options"
            :searchable="true"
            :multiple="false"
            :close-on-select="true"
            :show-no-results="false"
            :placeholder="'Address'"
          ></VueMultiselect>
        </b-input-group>
        <vue-recaptcha
          class="mx-5 my-2"
          id="recaptcha"
          ref="recaptcha"
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          @verify="onVerify($event)"
        />
        <b-button
          @click="register"
          variant="outline-primary"
          pill
          block
        >
          Register
          <b-icon
            icon="arrow-right"
            font-scale="1"
          ></b-icon>
        </b-button>
      </b-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "RegisterView",
  data() {
    return {
      login: {
        first_name: null,
        last_name: null,
        pseudo: null,
        gender: null,
        email: null,
        avatar: null,
        phone: null,
        password: null,
        password_confirmation: null,
        address: null,
        birthday: null,
        recaptha_token: null,
      },
      errors: {},
      gender_options: ["male", "female", "other"],
      is_mobile: false,
      postal_code: null,
      address_options: [],
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
        this.login.recaptha_token = response;
        this.is_verify = true;
      } else {
        this.is_verify = false;
      }
    },
    getAddress(address) {
      axios
        .get(
          "https://api-adresse.data.gouv.fr/search/?q=" +
            address +
            "&postcode=" +
            this.postal_code +
            "&limit=10"
        )
        .then((response) => {
          this.address_options = response.data.features.map(
            (feature) => feature.properties.label
          );
        });
    },
    register() {
      axios
        .post("/api/register", this.login)
        .then((response) => {
          if (response.data[0] === "success") {
            //save user data to local storage
            localStorage.setItem("user", JSON.stringify(response.data));
            //redirect to home page
            this.$router.go();
            this.$parent.loggedIn = true;
          }
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    state(field) {
      if (this.errors[field]) {
        return false;
      }
    },
  },
};
</script>

<style>
#register {
  height: 130vh;
  background-color: #6ac3ff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%236a9ccc' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%231e1faa' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%235f8cc8' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23251ea3' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23537cc3' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%232d1d9c' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23486abf' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23331d95' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23415ab6' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23391d8f' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%233d4caa' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%233e1c88' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}
</style>