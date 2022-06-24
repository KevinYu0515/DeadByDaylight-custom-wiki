<template>
  <div class="register">
    <section>
      <div class="container">
        <div class="login-form">
          <h1>Register</h1>
          <form>
            <input type="text" name="" placeholder="Username"/>
            <input type="password" name="" placeholder="Password"/>
            <input type="submit" name="" value="Confirm"/>
            <input type="Button" name="" value="Back" @click="jump('login')"/>
          </form>
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
@import "@/assets/scss/others/personal/register.scss";
</style>