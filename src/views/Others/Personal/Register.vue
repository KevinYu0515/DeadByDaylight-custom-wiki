<template>
  <div class="register">
    <section>
      <div class="container">
        <div class="login-form">
          <h1>Register</h1>
          <form @submit.prevent="submit">
            <input type="email" name="email" v-model="email" placeholder="example@example.com"/>
            <input type="password" name="password" v-model="password" placeholder="Password"/>
            <input type="submit" name="submit" value="Confirm"/>
          </form>
          <input type="button" value="Back" @click="back('login')"/>
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
    const back = (msg) => {  router.push(msg) }
    return { back }
  },

  data() {
    return{ 
      email:"",
      password:""
    }
  },

  methods:{
    async submit(){
      const response = await axios.post("register", {
        email: this.email,
        password: this.password
      })
      console.log(response)
      this.$router.push("/login")
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/others/personal/register.scss";
</style>