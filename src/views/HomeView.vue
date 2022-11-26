<template>
  <div class="home">
    <section id="presentation">
      <b-container fluid>
        <b-row>
          <b-col>
            <b-img
              src="https://zupimages.net/up/22/43/dy61.png"
              :width="is_mobile ? '300' : '500'"
              :style="is_mobile ? 'margin-top : 100px' : 'margin-top : 300px; margin-left : 100px'"
            />
          </b-col>
          <b-col>
            <b-card
              size="sm"
              title="Lahyra"
              :style="is_mobile ? 'margin-top : 100px' : 'margin-top : 250px; max-width: 750px'"
              sub-title="The new social media"
            >
              <p>Lahyra is a simple social media platform where you can post, comment and like posts. You can also follow other users.</p>
              <p>It is still in development, you can check out the source code on Github (<a href="https://github.com/Gammelinne/lahyra_front">front part</a> and <a href="https://github.com/Gammelinne/lahyra_back">back part</a>).</p>
              <p> If you want to see how I make Lahyra go<b-link href="https://server.lahyra.com/lahyra-back/"> to my API url</b-link> (Doc in development)</p>
              <b-button
                pill
                block
                variant="outline-primary"
                class="mt-3"
                :to="{ name: 'register' }"
              >Join us</b-button>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section id="services">
      <b-container fluid>
        <b-row>
          <b-col>
            <h2 class="text-uppercase section-heading">Why Lahyra ?</h2>
            <h3 class="text-muted section-subheading">All you need to know</h3>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col>
            <span class="fa-stack fa-4x"><i class="fa fa-circle fa-stack-2x text-warning"></i><i class="fa fa-eye-slash fa-stack-1x fa-inverse"></i></span>
            <h4 class="my-3">
              <b>Privacy</b>
            </h4>
            <p class="text-muted">
              Lahyra is independant, so we don't have to sell your data to advertisers. I don't even have ads on my website. It's just to talk with friends. Not more.

            </p>
          </b-col>
          <b-col>
            <span class="fa-stack fa-4x"><i class="fa fa-circle fa-stack-2x text-warning"></i><i class="fa fa-laptop fa-stack-1x fa-inverse"></i></span>
            <h4 class="my-3">Disponibility</h4>
            <p class="text-muted">
              Lahyra is available on all devices, so you can use it on your computer, your tablet or your phone. It's up to you.
            </p>
          </b-col>
          <b-col>
            <span class="fa-stack fa-4x"><i class="fa fa-circle fa-stack-2x text-warning"></i><i class="fa fa-lock fa-stack-1x fa-inverse"></i></span>
            <h4 class="my-3">Web Security</h4>
            <p class="text-muted">
              Lahyra is a secure website. We use the Bcrypt algorithm to hash your password, and we don't store your password in plain text. Moreover, we use HTTPS to encrypt your data.
              To finish, we use jwt to authenticate you. So you can be sure that your data is safe.
            </p>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <hr>
    <section id="creator">
      <b-container>
        <b-row>
          <b-col cols="8">
            <h2 class="text-uppercase section-heading">Who am I ?</h2>
            <h3 class="text-muted section-subheading">A little presentation</h3>
            <p>
              I'm a french student in computer science. I'm 21 years old and I'm currently in my 3rd year of engineering school.
              I'm passionate about web development and I'm currently learning Vue.js and Node.js.
              When I'm not coding, I like to play video games, watch movies and series, and read books.
              I also like culture in general, I like to learn new things and I'm always curious.
              I practice judo and I play drums.
              You can find me on <a href="https://www.linkedin.com/in/kylian-renault/">LinkedIn</a>,
              <a href="https://github.com/Gammelinne">Github</a> and you can see my online CV <a href="https://kylianrenault.lahyra.com">here</a>.
              I'm currently looking for an internship for the juanary 2023. If you are interested, you can contact me on my email just <a href="mailto:kylian.renault@viacesi.fr">here</a>.
            </p>
            <p>
              I hope you will enjoy Lahyra and I hope to see you soon on the platform when it will be finished.
            </p>
            <h4 class="my-2">
              <p>Kylian RENAULT - Founder of Lahyra</p>
            </h4>
          </b-col>
          <b-col>
            <b-avatar
              src="https://i.ibb.co/QKzfTvm/photo-de-profile.jpg"
              size="250"
              style="margin-top : 50px"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      is_mobile: false,
    };
  },
  created() {
    if (window.innerWidth < 768) {
      this.is_mobile = true;
    }
  },
};
</script>

<style>
#presentation {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  text-align: justify;
  background-color: #6ac3ff;
  background-attachment: fixed;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%236a9ccc' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%231e1faa' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%235f8cc8' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23251ea3' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23537cc3' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%232d1d9c' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23486abf' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23331d95' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23415ab6' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23391d8f' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%233d4caa' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%233e1c88' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
}
#services {
  background-color: #f8f9fa;
  padding: 100px 0;
}
#creator {
  background-color: #f8f9fa;
  padding: 100px 0;
  text-align: center;
  text-align: justify;
}
</style>