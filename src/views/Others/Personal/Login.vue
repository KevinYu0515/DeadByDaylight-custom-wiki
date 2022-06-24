<template>
  <div class="login">
    <section>
        <div class="container">
          <div class="login-form">
            <h1>Sign in</h1>
            <form>
              <input type="text" name="" placeholder="Username"/>
              <input type="password" name="" placeholder="Password"/>
              <input type="button" name="" value="Login" @click="jump('personal')"/>
              <input type="button" name="" value="Sign up" @click="jump('register')" />
            </form>
            <a href="#">Forget Password</a>
          </div>
        </div>
      </section>
  </div>
</template>

<script>
export default {
 methods: {
    jump(msg){
      this.$router.push({ path: msg })
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/others/personal/login.scss";
</style>