<template>
  <div class="login">
    <section>
        <div class="container">
          <div class="login-form">
            <h1>Sign in</h1>
            <form @submit.prevent="submit">
              <input type="email" name="email" placeholder="Example@example.com"/>
              <input type="password" name="password" placeholder="Password"/>
              <input type="submit" value="Login"/>
              <input type="button" value="Sign up" @click="jump('register')" />
              <input type="button" value="Default" @click="jump('personal')" />
            </form>
            <a href="#">Forget Password</a>
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
      const {data} = await axios.post("login", inputs, { withCredentials: true })
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`
      await router.push("/personal")
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
@import "@/assets/scss/others/personal/login.scss";
</style>