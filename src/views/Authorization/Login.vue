<template>
  <Navbar></Navbar>
  <div class="login">
    <section>
        <div class="container">
          <div class="login-form">
            <h1>Sign in</h1>
            <form @submit.prevent="submit">
              <input type="email" name="email" v-model="email" placeholder="Example@example.com"/>
              <input type="password" name="password" v-model="password" placeholder="Password"/>
              <input type="submit" value="Login"/>
              <input type="button" value="Sign up" @click="jump('register')" />
            </form>
            <a href="#">Forget Password</a>
          </div>
        </div>
      </section>
  </div>
  <Footer></Footer>
</template>

<script>
import { useRouter } from "vue-router"
import Navbar from "../../components/Navbar/Navbar.vue"
import Footer from "../../components/Footer/Footer.vue"
import "@/firebase"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"

export default {
  components: { Navbar, Footer },
  setup(){
    const router = useRouter()
    const jump = (msg) => { router.push(msg) }
    return{ jump }
  },
  data() {
    return{ 
      email:"",
      password:""
    }
  },
  methods:{
    async submit(){
      try{
        const val = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        console.log(val)
        this.$router.push("/personal")
      }catch(err){
        console.log(err)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/personal/login.scss";
</style>