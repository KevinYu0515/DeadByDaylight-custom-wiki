import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import firebase from "firebase/compat/app"
import "@/firebase"
import "firebase/compat/auth"


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
    component:()=>import(/* webpackChunkName: "register" */"../views/Authorization/Register.vue")
  },
  {
    path:"/personal",
    name:"Personal",
    component:()=> import(/* webpackChunkName: "personal" */"../views/Personal/Personal.vue"),
    meta:{ "requiresAuth": true }
  },
  {
    path:"/records",
    name:"Records",
    component:()=> import(/* webpackChunkName: "records" */"../views/Personal/Records.vue"),
    props: (route) => route.query
  },
  {
    path:"/skills",
    name:"Skills",
    component:()=> import(/* webpackChunkName: "skills" */"../views/Personal/Skills.vue"),
  },
  {
    path:"/video",
    name:"Video",
    component:()=> import(/* webpackChunkName: "videos" */"../components/Others/Video.vue"),
    props: (route) => route.query
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) =>{
  const requiresAuth = to.matched.some( record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if(requiresAuth && !isAuthenticated){
    next("/login")
  }else{
    next()
  }
})

export default router