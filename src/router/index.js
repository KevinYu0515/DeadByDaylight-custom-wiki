
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
    component:()=>import(/* webpackChunkName: "login" */"../views/Authorization/Login.vue")
  },
  {
    path:"/register",
    name:"Register",
    component:()=>import(/* webpackChunkName: "login" */"../views/Authorization/Register.vue")
  },
  {
    path:"/personal",
    name:"Personal",
    component:()=> import(/* webpackChunkName: "personal" */"../views/Personal/Personal.vue")
  },
  {
    path:"/records",
    name:"Records",
    component:()=> import(/* webpackChunkName: "records" */"../views/Personal/Records.vue"),
    props: (route) => route.query
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router