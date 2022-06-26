<template>
  <div class="register">
    <section>
      <div class="container">
        <div class="login-form">
          <h1>Register</h1>
          <form @submit.prevent="submit">
            <input type="email" name="email" placeholder="example@example.com"/>
            <input type="password" name="password" placeholder="Password"/>
            <input type="submit" value="Confirm"/>
            <input type="button" value="Back" @click="jump('login')"/>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios"
import { useRouter } from "vue-router"

export default {
  setup(){
    const router = useRouter()
    const submit = async e =>{
      const form = new FormData(e.target)
      const inputs = Object.fromEntries(form.entries())
      await axios.post("register", inputs)
      await router.push("/login")
    }
    return{ submit }
  },
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