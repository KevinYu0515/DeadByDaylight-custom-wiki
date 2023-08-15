<template>
  <Navbar></Navbar>
  <div class="login">
    <section>
        <div class="container">
          <div class="login-form">
            <h1>Sign in</h1>
            <form @submit.prevent="submit()">
              <input type="email" name="email" v-model="user.email" placeholder="Example@example.com"/>
              <input type="password" name="password" v-model="user.password" placeholder="Password"/>
              <input type="submit" value="Login"/>
              <input type="button" value="Sign up" @click="jump('register')" />
            </form>
            <a href="#">Forget Password</a>
          </div>
        </div>
      </section>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue"
import { useRouter } from "vue-router"
import Navbar from "../../@components/Navbar/DBDNavbar.vue"
import "@/firebase"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const user = reactive({
  email: "",
  password: ""
})

const router = useRouter()
const jump = (msg) => { router.push(msg) }
const submit = async () => {
  try{
    await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    window.localStorage.setItem("user", JSON.stringify(user))
    router.push({
      path: "/editor",
      name: "Editor",
      params:{ user: user.email }
    })
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  const userData = JSON.parse(localStorage.getItem("user"))
  if(userData) router.push("/editor")
})

</script>


<style lang="scss" scoped>
@import "@/assets/scss/login.scss";
</style>