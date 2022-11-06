<template>
  <div class="home">
    <!--
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="8000"
      indicators
      background="#ababab"
      img-width="100%"
      img-height="100%"
      style="height: 500px"
    >
      <b-carousel-slide
        v-for="(item, index) in items"
        :key="index"
        :img-src="item.src"
        :img-alt="item.alt"
        :caption="item.caption"
        :text="item.text"
      ></b-carousel-slide>
    </b-carousel>
    -->
    <b-img
      src="https://zupimages.net/up/22/43/dy61.png"
      :width="is_mobile ? '300' : '500'"
      class="my-4"
    />
    <p>Lahyra is my personal project to learn Vue.js, bootstap and Laravel. It is a simple social media platform where you can post and comment on posts,
      and follow other users. It is still in development, you can check out the source code on Github (<a href="https://github.com/Gammelinne/lahyra_front">front part</a>
      and <a href="https://github.com/Gammelinne/lahyra_back">back part</a>).</p>
      <p> If you want to see how I make Lahyra go<b-link href="https://server.lahyra.com/Lahyra-back"> to my API url</b-link></p>
  </div>
</template>

<script>
export default {};
</script>

<style>
.home {
  margin: 0 auto;
  background-color: #6ac3ff;
  background-attachment: fixed;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%236a9ccc' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%231e1faa' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%235f8cc8' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23251ea3' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23537cc3' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%232d1d9c' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23486abf' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23331d95' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23415ab6' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23391d8f' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%233d4caa' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%233e1c88' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}
</style>