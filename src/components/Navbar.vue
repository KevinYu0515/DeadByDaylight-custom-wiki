<template>
  <header :class="{ 'scrolled-nav': scrollNav }">
    <nav>
      <router-link to="/" class="logo">Logo</router-link>
      <ul v-show="!mobile" class="navigation">
        <li><router-link to="/home">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/program">Program</router-link></li>
        <li><router-link to="/personal">Personal</router-link></li>
        <li><router-link to="/creativity">Creativity</router-link></li>
        <li><router-link to="/outdoors">Outdoors</router-link></li>
      </ul>
      <div class="navbar_icon">
        <i
          @click="toggleMobileNav"
          v-show="mobile"
          class="fi fi-br-menu-burger"
          :class="{ 'icon-active': mobileNav }"
        ></i>
      </div>
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li><router-link to="/home">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/program">Program</router-link></li>
          <li><router-link to="/personal">Personal</router-link></li>
          <li><router-link to="/creativity">Creativity</router-link></li>
          <li><router-link to="/outdoors">Outdoors</router-link></li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      scrollNav: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    }
  },
  created() {
    window.addEventListener("resize", this.checkScreen)
    this.checkScreen()
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll)
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav
    },

    updateScroll() {
      const scrollPosition = window.scrollY
      if (scrollPosition > 50) {
        this.scrollNav = true
        return
      }
      this.scrollNav = false
    },
    checkScreen() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth <= 850) {
        this.mobile = true
        return
      }
      this.mobile = false
      this.mobileNav = false
      return
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/scss/navbar.scss";
</style>
