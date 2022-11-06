<template>
  <div>
    <b-card
      title="Dashboard"
      class="mb-3"
    >
      <b-card-text>
        This is the dashboard page. You can only see this page if you are logged in.
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
//import axios from "axios";
export default {
    name: "DashboardView",
    data() {
        return {
          user: {
            first_name: null,
            last_name: null,
            email: null,
            
          },
        }
    },
    created() {
        if (!localStorage.getItem("user")) {
            this.$router.push("/login");
        }else{
            this.$parent.loggedIn = true;
        }
    },
};
</script>

<style>
</style>