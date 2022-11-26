<template>
  <b-container
    fluid
    class="my-5"
    id="dashboard"
  >
    <div class="row">
      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-body text-center">
            <b-avatar
              v-if="user.avatar !== null"
              :src="user.avatar"
              alt="avatar"
              size="9em"
            >
              <template #badge>
                <b-button
                  variant="primary"
                  size="sm"
                  class="position-absolute"
                  style="bottom: 0; right: 0;"
                  v-b-modal.modal-avatar
                >
                  <b-icon icon="pencil" />
                </b-button>
              </template>
            </b-avatar>
            <b-avatar
              v-else
              :src="setAvatar()"
              alt="avatar"
              size="9em"
            >
              <template #badge>
                <b-button
                  pill
                  variant="primary"
                  size="sm"
                  style="bottom: 0; right: 0;"
                  v-b-modal.modal-avatar
                >
                  <b-icon icon="pencil" />
                </b-button>
              </template>
            </b-avatar>
            <h5 class="my-3">{{user.pseudo}}</h5>
            <div @dblclick="edit_Bio = true">
              <b-textarea
                v-model="user.bio"
                placeholder="Bio"
                no-resize
                :disabled="!edit_Bio"
                @blur="editProfile()"
              >
              </b-textarea>
            </div>
            <b-modal
              id="modal-avatar"
              title="Change avatar"
              @ok="editProfile()"
            >
              <b-input-group>
                <b-form-input
                  v-model="user.avatar"
                  type="text"
                  placeholder="Avatar URL"
                ></b-form-input>
              </b-input-group>
            </b-modal>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="card mb-4">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Full Name</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{user.first_name}} {{user.last_name}}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">birthday</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{user.birthday}}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{user.email}}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Phone</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{user.phone}}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Address</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{user.address}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--
        <div class="card mb-4 mb-lg-0">
          <div class="card-body p-0">
            <ul class="list-group list-group-flush rounded-3">
              <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                <i class="fas fa-globe fa-lg text-warning"></i>
                <p class="mb-0">https://mdbootstrap.com</p>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                <i
                  class="fab fa-github fa-lg"
                  style="color: #333333;"
                ></i>
                <p class="mb-0">mdbootstrap</p>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                <i
                  class="fab fa-twitter fa-lg"
                  style="color: #55acee;"
                ></i>
                <p class="mb-0">@mdbootstrap</p>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                <i
                  class="fab fa-instagram fa-lg"
                  style="color: #ac2bac;"
                ></i>
                <p class="mb-0">mdbootstrap</p>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                <i
                  class="fab fa-facebook-f fa-lg"
                  style="color: #3b5998;"
                ></i>
                <p class="mb-0">mdbootstrap</p>
              </li>
            </ul>
          </div>     
        </div>
        -->
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  name: "DashboardView",
  data() {
    return {
      user: {
        id: null,
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        address: null,
        avatar: null,
      },
      edit_Bio: false,
    };
  },
  created() {
    if (!localStorage.getItem("user")) {
      this.$router.push("/login");
    } else {
      this.$parent.loggedIn = true;
    }
    this.getUser();
  },
  methods: {
    getUser() {
      var user = JSON.parse(localStorage.getItem("user"));
      axios.get("/api/users/" + user.user.id).then((response) => {
        this.user = response.data.data;
      });
    },
    setAvatar() {
      if (this.user.gender === "male") {
        return "https://c.pxhere.com/images/0d/18/4fa31701d2cfa087836d807967f3-1447663.jpg!d";
      } else if (this.user.gender === "female") {
        return "https://c.pxhere.com/images/f6/e0/022ab77c391925931fe227c97ab4-1447675.jpg!d";
      } else {
        return "https://th.bing.com/th/id/R.3cd190548b0f15a338d44eb465dd0476?rik=Bn7r%2fBvgVHSihw&pid=ImgRaw&r=0";
      }
    },
    editProfile() {
      axios
        .put("/api/users/" + this.user.id, this.user)
        .then(() => {
          this.edit_Bio = false;
          this.getUser();
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
#dashboard {
  background: #f5f5f5;
  height: 80vh;
}
</style>