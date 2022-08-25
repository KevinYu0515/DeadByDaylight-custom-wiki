
import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"


const routes = [
  {
    path: "/",
    name: "Home",
    component:Home
  },
  {
    path: "/home",
    component:Home
  },
  {
    path:"/login",
    name:"Login",
    component:()=>import(/* webpackChunkName: "login" */"../views/Others/Personal/Login.vue")
  },
  {
    path:"/register",
    name:"Register",
    component:()=>import(/* webpackChunkName: "login" */"../views/Others/Personal/Register.vue")
  },
  {
    path:"/personal",
    name:"Personal",
    component:()=> import(/* webpackChunkName: "personal" */"../views/Others/Personal/Personal.vue")
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router